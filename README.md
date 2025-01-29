# 🚀 Render Flow DevTools

**Render Flow DevTools** is a Chrome extension that helps developers analyze browser rendering performance.  
It integrates into Chrome Developer Tools (DevTools) and provides insights into how JavaScript events, functions, and operations trigger browser processes such as **Reflow, Repaint, and Composition**.

## 🔥 Features

- Chrome DevTools integration with a custom "Render Flow" panel.
- Tracks rendering performance and browser workload.
- Monitors JavaScript execution that affects rendering.
- Built using **Vite + TypeScript + React + Emotion**.
- Supports **Manifest V3** for improved security and performance.

## 📦 Project Setup

### 1️⃣ Install Dependencies

```bash
yarn install
```

### 2️⃣ Build the Extension

```bash
yarn build
```

### 3️⃣ Load into Chrome

1. Open `chrome://extensions/`
2. Enable **Developer Mode**
3. Click **"Load unpacked"** and select the `dist/` folder

### 4️⃣ Open DevTools

1. Open Chrome Developer Tools (`F12` or `Cmd + Option + I`)
2. Navigate to the `Render Flow` panel

## 🛠️ Tech Stack

- **Vite** - Fast development bundler
- **TypeScript** - Typed JavaScript
- **React** - UI framework
- **Emotion** - CSS-in-JS for styling
- **Chrome DevTools API** - Integrating into Chrome debugging tools

## 📌 Roadmap

- [ ] Implement core rendering performance tracking
- [ ] Improve UI visualization for Reflow & Repaint events
- [ ] Add memory usage monitoring
- [ ] Publish to Chrome Web Store

---

Stay tuned for updates! 🚀
