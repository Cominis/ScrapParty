let checkForValidUrl = (tabId, changeInfo, tab) => {
  if (typeof tab != "undefined" && typeof tab != "null") {
    if (/meet[.]google[.]com/.test(tab.url)) {
      chrome.pageAction.show(tabId);
    }
  }
};

chrome.tabs.onUpdated.addListener(checkForValidUrl);
