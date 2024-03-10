import { defineConfig } from "vite"
import { resolve } from "path"
import { qwikVite } from "@builder.io/qwik/optimizer"
import dts from "vite-plugin-dts"
import { libInjectCss } from "vite-plugin-lib-inject-css"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    qwikVite({
      csr: true,
    }),
    libInjectCss(),
    dts({ include: ["lib"] }),
  ],

  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, "lib/main.ts"),
      formats: ["es"],
      name: "Qwik-Pick",
      // the proper extensions will be added
      fileName: "qwik-pick",
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["@builder.io/qwik"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {},
        assetFileNames: "assets/[name][extname]",
        entryFileNames: "[name].js",
      },
    },
    copyPublicDir: false,
  },
})
