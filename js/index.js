document.addEventListener("DOMContentLoaded", () => {
  var missingPartyButton = document.getElementById("missingPartyButton");

  missingPartyButton.addEventListener("click", () =>
    chrome.tabs.query({ active: true }, (tab) => activeTabCallback(tab))
  );
});

let activeTabCallback = (tab) => {
  findParticipants((participants) => {
    window.open(
      "https://www.google.com/search?q=" + JSON.stringify(participants),
      "blank"
    );
  });
};

let findParticipants = (callback) => {
  chrome.tabs.executeScript(
    { allFrames: true, file: "js/selector.js" },
    (result) => scriptCallback(result, callback)
  );
};

let scriptCallback = (result, callback) => {
  if (chrome.runtime.lastError) {
    console.error(chrome.runtime.lastError);
  } else {
    callback(result[0]);
  }
};
