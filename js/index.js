document.addEventListener("DOMContentLoaded", () => {
  var button = document.getElementById("missingPartyButton");

  button.addEventListener("click", () =>
    chrome.tabs.query({ currentWindow: true, active: true }, (tabs) =>
      activeTabCallback(tabs)
    )
  );
});

let activeTabCallback = (tabs) => {
  findParticipants((participants) => {
    const list = document.getElementById("missingPartyList");
    list.innerHTML = "";

    const msg = document.getElementById("errorMessage");
    msg.style.display = "none";

    const token = getGoogleMeetToken(tabs[0].url);

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

let getGoogleMeetToken = (url) => {
  const matches = url.match("\\b[a-zA-Z]{3}-[a-zA-Z]{4}-[a-zA-Z]{3}\\b");
  return matches[0];
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
