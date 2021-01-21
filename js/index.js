document.addEventListener("DOMContentLoaded", () => {
  var button = document.getElementById("missingPartyButton");

  button.addEventListener("click", () =>
    chrome.tabs.query({ active: true }, (tab) => activeTabCallback(tab))
  );
});

let activeTabCallback = (tab) => {
  findParticipants((participants) => {
    const list = document.getElementById("missingPartyList");
    list.innerHTML = "";

    const msg = document.getElementById("errorMessage");
    msg.style.display = "none";

    if (
      typeof participants == "undefined" ||
      participants == null ||
      participants.length == 0
    ) {
      msg.style.display = "block";
    } else {
      for (let i = 0; i < participants.length; i++) {
        const item = document.createElement("li");
        item.appendChild(document.createTextNode(participants[i]));
        list.appendChild(item);
      }
    }
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
