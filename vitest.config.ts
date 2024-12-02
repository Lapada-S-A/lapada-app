import { fileURLToPath } from "node:url";
import { defineVitestConfig } from "@nuxt/test-utils/config";

export default defineVitestConfig({
  test: {
    environment: "nuxt",
    globals: true,
    environmentOptions: {
      nuxt: {
        rootDir: fileURLToPath(new URL("./", import.meta.url)),
        domEnvironment: "jsdom",
      },
    },
    onConsoleLog(log: string | string[]) {
      if (log.includes("<Suspense> is an experimental feature")) return false;
    },
  },
});
