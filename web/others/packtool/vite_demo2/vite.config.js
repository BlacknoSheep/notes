import { defineConfig } from "vite"; // 提供代码提示
import legacy from "@vitejs/plugin-legacy";

export default defineConfig({
  plugins: [
    legacy({
      // targets: ["defaults", "not IE 11"],
    }),
  ],
});
