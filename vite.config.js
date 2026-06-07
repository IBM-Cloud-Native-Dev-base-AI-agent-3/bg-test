import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      // ❌ 기존 "/oauth2" 대신
      // ⭕ 백엔드 로그인 진입용 주소만 정확하게 프록시 태우기
      "/oauth2/authorization": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
      "/login/oauth2": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
    },
  },
});
