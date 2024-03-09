import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import viteCompression from "vite-plugin-compression";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  plugins: [
    vue({}),
    /* 开启gzip压缩 */
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: "gzip",
      ext: ".gz",
    }),
    /* 按需加载Antdv组件 */
    Components({
      dts: true,
      resolvers: [AntDesignVueResolver()],
    }),
  ],
  server: {
    /* 设置启动ip */
    host: "0.0.0.0",
    port: 8830,
    proxy: {
      '/api/v1/': {
        secure: false,
        // target: "https://api.yuanki.cn",
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api\/v1/, '/api/v1'),
      },
    }
  },
  build: {
    minify: "terser",
    terserOptions: {
      compress: {
        //生产环境时移除console
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
});
