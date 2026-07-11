// Context(AI) — Background Service Worker
import { routeMessage } from "./router";
import type { RuntimeRequest, RuntimeResponse } from "../services";

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    console.log("[Context(AI)] Extension installed.");
  }

  if (details.reason === "update") {
    console.log(
      "[Context(AI)] Extension updated to version:",
      chrome.runtime.getManifest().version,
    );
  }

  // Setup Side Panel behavior or fallback to popup
  if (chrome.sidePanel && chrome.sidePanel.setPanelBehavior) {
    chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch(console.error);
  } else {
    // Graceful fallback for older Chrome versions without sidePanel API
    chrome.action.setPopup({ popup: "popup.html" });
  }
});

chrome.runtime.onMessage.addListener(
  (
    request: RuntimeRequest,
    sender,
    sendResponse: (response: RuntimeResponse) => void,
  ) => {
    // Fire and forget routing, but return true to keep sendResponse channel open
    routeMessage(request, sender, sendResponse);
    return true;
  },
);

console.log("[Context(AI)] Background service worker started.");
