import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import {AntDesignVueResolver} from 'unplugin-vue-components/resolvers'
import viteCompression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({}),
    /* 开启gzip压缩 */
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz',
    }),
    /* 按需加载Antdv组件 */
    Components({
      dts: true,
      resolvers: [AntDesignVueResolver(),]
    })],
  server: {
    /* 设置启动ip */
    host: '0.0.0.0',
    port: 8830
  },
  build: {
    terserOptions: {
      /* 打包后移除console和注释 */
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
})
