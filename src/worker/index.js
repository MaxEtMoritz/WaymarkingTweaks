/** @import {Browser} from 'webextension-polyfill' */

if (typeof browser == "undefined") {
    // Chrome does not support the browser namespace yet.
    globalThis.browser = chrome;
  }
  
  function openExtension() {
    let createData = {
      url: "/index.html",
    };
    browser.tabs.create(createData);
  }
  browser.action.onClicked.addListener(openExtension);
  
  console.debug(caches)