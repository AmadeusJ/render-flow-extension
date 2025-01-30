// devtools.ts

/**
 * This script runs in the Chrome Developer Tools environment.
 * It creates a custom "Render Flow" panel within DevTools.
 */

chrome.devtools.panels.create(
  "Render Flow", // The name of the custom DevTools panel
  "assets/icon.png", // The panel's icon (optional, can be an empty string)
  "panel.html", // The HTML file that will be loaded inside the panel
  function (panel) {
    console.log("Render Flow DevTools Panel Loaded!");
    console.log(panel); // Logs the panel object for debugging
  }
);
