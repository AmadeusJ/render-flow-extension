/**
 * This script runs in the context of the web page and monitors rendering-related events.
 * It detects Reflow, Layout Shifts, Repaint, Scroll Events, and Animation Overloads.
 */

console.log("Render Flow Content Script Loaded");

/**
 * 🟢 Reflow Detection using MutationObserver
 *
 * A reflow occurs when the browser recalculates the layout due to DOM changes.
 * This observer watches for changes in the document structure (e.g., attribute changes, child elements added/removed).
 */
const reflowObserver = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    chrome.runtime.sendMessage({
      type: "RENDER_EVENT",
      eventType: "Reflow",
      targetElement: mutation.target,
      elementDetails: {
        id: (mutation.target as HTMLElement).id || "N/A",
        classes: (mutation.target as HTMLElement).classList.toString() || "N/A",
      },
      changeType: mutation.type,
    });
  });
});

// Start observing DOM changes
reflowObserver.observe(document.body, {
  attributes: true, // Detect attribute changes (e.g., style changes)
  childList: true, // Detect new elements added/removed
  subtree: true, // Observe all child elements within <body>
});

/**
 * 🟠 Layout Shift Detection using PerformanceObserver
 *
 * Layout shifts occur when visible elements unexpectedly move on the page.
 * This observer captures "layout-shift" performance entries and reports them.
 */
const layoutShiftObserver = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    if (entry.entryType === "layout-shift") {
      chrome.runtime.sendMessage({
        type: "RENDER_EVENT",
        eventType: "Layout Shift",
        affectedElement: (entry as any).sources?.[0]?.nodeName || "Unknown",
        impact: (entry as any).value, // Layout shift score
      });
    }
  });
});
layoutShiftObserver.observe({ type: "layout-shift", buffered: true });

/**
 * 🔵 Repaint Detection using MutationObserver
 *
 * Detects style changes that trigger a Repaint (color, background, opacity, etc.).
 * Identifies which element is affected and what property changed.
 */

// Full list of properties that can trigger a Repaint
const repaintProperties = [
  "color",
  "background",
  "background-color",
  "border",
  "border-color",
  "border-style",
  "border-width",
  "box-shadow",
  "outline",
  "outline-color",
  "outline-style",
  "outline-width",
  "visibility",
  "opacity",
  "filter",
  "mix-blend-mode",
  "backdrop-filter",
  "clip",
  "clip-path",
  "mask",
  "mask-image",
  "mask-position",
  "mask-size",
  "mask-repeat",
  "mask-clip",
  "text-shadow",
  "text-decoration",
  "text-decoration-color",
  "text-outline",
  "letter-spacing",
  "word-spacing",
  "background-blend-mode",
  "background-image",
  "background-position",
  "background-size",
  "background-repeat",
  "background-attachment",
  "cursor",
  "caret-color",
  "selection",
];

const repaintObserver = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === "attributes") {
      const target = mutation.target as HTMLElement;
      const changedAttribute = mutation.attributeName;
      const computedStyle = window.getComputedStyle(target);

      if (repaintProperties.includes(changedAttribute!)) {
        chrome.runtime.sendMessage({
          type: "RENDER_EVENT",
          eventType: "Repaint",
          targetElement: target.nodeName,
          elementDetails: {
            id: target.id || "N/A",
            classes: target.classList.toString() || "N/A",
          },
          changedAttribute: changedAttribute,
          computedValue: computedStyle.getPropertyValue(changedAttribute!),
        });
      }
    }
  });
});
repaintObserver.observe(document.body, {
  attributes: true,
  subtree: true,
});

/**
 * 🟣 Scroll Event Tracking
 *
 * Detects rapid scroll events that might cause excessive Repaints.
 * Logs which element triggered the scroll.
 */
// let lastScrollY = window.scrollY;
// window.addEventListener("scroll", (event) => {
//   window.requestAnimationFrame(() => {
//     const deltaY = Math.abs(window.scrollY - lastScrollY);
//     lastScrollY = window.scrollY;

//     chrome.runtime.sendMessage({
//       type: "RENDER_EVENT",
//       eventType: "Scroll",
//       triggeredByEvent: event.type,
//       scrollAmount: deltaY,
//       targetElement: (event.target as HTMLElement)?.nodeName || "Window",
//     });
//   });
// });

/**
 * 🟡 Large DOM Updates Detection
 *
 * Detects when more than 20 elements are added to the DOM at once.
 * Helps identify expensive Reflows & Repaints.
 */
const largeDomObserver = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes.length > 20) {
      chrome.runtime.sendMessage({
        type: "RENDER_EVENT",
        eventType: "Large DOM Update",
        targetElement: mutation.target.nodeName,
        addedNodesCount: mutation.addedNodes.length,
      });
    }
  });
});
largeDomObserver.observe(document.body, {
  childList: true,
  subtree: true,
});

/**
 * 🟡 Animation Overload Detection
 *
 * Detects if requestAnimationFrame is running too fast (high FPS load).
 */
// let lastFrameTime = performance.now();
// function detectAnimationOverload() {
//   const now = performance.now();
//   const frameDuration = now - lastFrameTime;
//   lastFrameTime = now;

//   if (frameDuration < 16) {
//     // More than 60FPS
//     chrome.runtime.sendMessage({
//       type: "RENDER_EVENT",
//       eventType: "Animation Overload",
//       frameDuration: frameDuration.toFixed(2) + "ms",
//     });
//   }

//   requestAnimationFrame(detectAnimationOverload);
// }
// requestAnimationFrame(detectAnimationOverload);
