document.addEventListener('DOMContentLoaded', function() {  
    var checkPageButton = document.getElementById('getParticipants');  
    checkPageButton.addEventListener('click', function() {  
        chrome.tabs.query(
            {active: true}, 
            function(tab) {  
            findParticipants(function(participants) {
                const myObj = JSON.stringify(participants)
                window.open('https://www.google.com/search?q=' + myObj, 'blank'); 
                console.log("Found %i divs", myObj);
            });
             
        });
    }, false);  
}, false);

//var myQuery = "document.querySelector('div[role=\"listitem\"]')"
//var myQuery = "document.querySelector('div[data-self-name=\"You\"]')"
var myQuery = "document.querySelectorAll('div[data-self-name=\"You\"]')"

function findParticipants(callback) {
    chrome.tabs.executeScript(
        {allFrames: true, code: myQuery}, 
        function(result) {
        if (chrome.runtime.lastError) {
            window.open('https://www.google.com/search?q=' + chrome.runtime.lastError, 'blank');
            console.error(chrome.runtime.lastError);
        } else {
            callback(result[0]);
        }
    });
}