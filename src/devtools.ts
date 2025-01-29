// devtools.ts
chrome.devtools.panels.create(
  "Render Flow",
  "assets/icon.png",
  "panel.html",
  function (panel) {
    console.log("Render Flow DevTools Panel Loaded!");
    console.log(panel);
  }
);
