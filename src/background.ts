// background.ts
chrome.runtime.onInstalled.addListener(() => {
  console.log("Render Flow Extension Installed!");
});

// DevTools 패널과 연결
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "RENDER_EVENT") {
    console.log("Captured Render Event:", message.data);
    console.log("Sender:", sender, "Response:", sendResponse);
    chrome.runtime.sendMessage(message);
  }
});
