let checkForValidUrl = (tabId, changeInfo, tab) => {
  if (typeof tab != "undefined" && typeof tab != "null") {
    if (/meet[.]google[.]com/.test(tab.url)) {
      chrome.pageAction.show(tabId);
    } else {
      chrome.pageAction.hide(tabId);
    }
  } else {
    chrome.pageAction.hide(tabId);
  }
};

chrome.tabs.onUpdated.addListener(checkForValidUrl);
