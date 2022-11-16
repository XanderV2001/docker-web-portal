import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import Components from "unplugin-vue-components/vite";
import VueTypeImports from "vite-plugin-vue-type-imports";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueTypeImports(),
    Icons(),
    Components({
      dts: true,
      resolvers: [IconsResolver()],
    }),
  ],
  appType: "mpa",
});
