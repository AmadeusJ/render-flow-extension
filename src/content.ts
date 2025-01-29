// content.ts
console.log("Render Flow Content Script Loaded");

// Reflow 감지
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    chrome.runtime.sendMessage({
      type: "RENDER_EVENT",
      data: `Reflow detected: ${mutation.target.nodeName}`,
    });
  });
});

observer.observe(document.body, {
  attributes: true,
  childList: true,
  subtree: true,
});

// PerformanceObserver 활용
const performanceObserver = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    if (entry.entryType === "layout-shift") {
      chrome.runtime.sendMessage({
        type: "RENDER_EVENT",
        data: `Layout Shift detected: ${entry.name}`,
      });
    }
  });
});
performanceObserver.observe({ type: "layout-shift", buffered: true });
