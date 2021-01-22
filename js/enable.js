let checkForValidUrl = (tabId, changeInfo, tab) => {
  if (typeof tab != "undefined" && typeof tab != "null") {
    if (/meet[.]google[.]com/.test(tab.url)) {
      chrome.pageAction.show(tabId);
    } else {
      chrome.pageAction.hide(tabId);
      chrome.pageAction.setIcon({
        tabId: tabId,
        path: "images/logo.png",
      });
    }
  } else {
    chrome.pageAction.hide(tabId);
    chrome.pageAction.setIcon({
      tabId: tabId,
      path: "images/logo.png",
    });
  }
};

chrome.tabs.onUpdated.addListener(checkForValidUrl);
