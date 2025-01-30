// background.ts

/**
 * This script runs as a background service worker in the Chrome extension.
 * It listens for installation events and manages communication between different parts of the extension.
 */

// Fires when the Chrome extension is installed or updated
chrome.runtime.onInstalled.addListener(() => {
  console.log("Render Flow Extension Installed!");
});

chrome.runtime.onConnect.addListener((port) => {
  console.log("DevTools Connected:", port.name);

  port.onDisconnect.addListener(() => {
    console.log("DevTools Disconnected - Preparing for Reload");
  });
});

/**
 * Listens for messages from other parts of the extension (e.g., content scripts, DevTools panel).
 * It captures "RENDER_EVENT" messages and logs their details.
 *
 * @param message - The message object received
 * @param sender - The sender of the message
 * @param sendResponse - A callback function to send a response
 */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Background onMessage", message);
  if (message.type === "RENDER_EVENT") {
    console.log("Captured Render Event:", message.eventType);
    console.log("Target Element:", message.targetElement);
    console.log("Sender:", sender);

    sendResponse({ status: "OK" });
    return true;
  }
});
