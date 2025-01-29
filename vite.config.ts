import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  publicDir: "public",
  build: {
    rollupOptions: {
      input: {
        devtools: "src/devtools.ts",
        background: "src/background.ts",
        content: "src/content.ts",
        panel: "src/panel.tsx",
      },
      output: {
        inlineDynamicImports: false, // 동적 임포트를 인라인 형태로 처리
        format: "esm", // 즉시 실행 함수로 번들링 (크롬 확장 프로그램에서 필요)
        entryFileNames: "[name].js", // 번들된 파일명을 [name].js 형태로 저장
        chunkFileNames: "[name]-[hash].js", // 청크 파일명 지정
        assetFileNames: "[name]-[hash][extname]", // 에셋 파일명 지정
      },
    },
  },
});
