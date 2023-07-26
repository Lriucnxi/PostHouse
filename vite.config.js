import { fileURLToPath, URL } from "node:url";    //导入了 Node.js 中的 fileURLToPath 和 URL 模块，用于将 URL 转换为本地文件系统路径

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import Components from "unplugin-vue-components/vite";    //自动按需引入 Vue 组件。它可以动态地将 Vue 组件注册到应用程序中，而无需手动在组件中导入和注册每个组件。
import { VantResolver } from "unplugin-vue-components/resolvers";  //VantResolver 是一个用于在应用程序中自动注册 Vant UI 组件的组件解析器。它会自动查找和注册 Vant 组件，并将其添加到 Vue 实例的组件选项中。

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  //代理服务器解决跨域，表示会将请求头中的 Host 字段设置为目标服务器的主机名，以解决跨域请求时的问题
  server: {
    proxy: {
      "^/api": {
        target: "https://m.tujia.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),     //rewrite 属性是一个函数，用于重写请求路径。在这里，将 /api 前缀从路径中去掉。
      },
    },
  },
})
