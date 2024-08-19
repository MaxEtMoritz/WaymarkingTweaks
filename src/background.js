if (typeof browser == "undefined") {
  // Chrome does not support the browser namespace yet.
  globalThis.browser = chrome;
}

function openExtension() {
  let createData = {
    url: "index.html",
  };
  browser.tabs.create(createData);
}

browser.browserAction.onClicked.addListener(openExtension);

browser.webRequest.onHeadersReceived.addListener(
  (details) => {
    details.responseHeaders.push({
      name: "Access-Control-Allow-Origin",
      value: "chrome-extension://" + browser.runtime.id,
    });
    return {
      responseHeaders: details.responseHeaders,
    };
  },
  { urls: ["*://*.waymarking.com/*"] },
  ["extraHeaders", "responseHeaders", "blocking"]
);
