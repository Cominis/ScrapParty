document.addEventListener('DOMContentLoaded', function() {  
    var checkPageButton = document.getElementById('getParticipants');  
    checkPageButton.addEventListener('click', function() {  
        chrome.tabs.query(
            {active: true}, 
            function(tab) {  
            findParticipants(function(participants) {
                window.open('https://www.google.com/search?q=' + JSON.stringify(participants), 'blank'); 
                console.log("Found %i divs", JSON.stringify(participants));
            });
             
        });
    }, false);  
}, false);

function findParticipants(callback) {
    chrome.tabs.executeScript(
        {allFrames: true, file: "selector.js"}, 
        function(result) {
        if (chrome.runtime.lastError) {
            window.open('https://www.google.com/search?q=' + chrome.runtime.lastError, 'blank');
            console.error(chrome.runtime.lastError);
        } else {
            callback(result[0]);
        }
    });
}