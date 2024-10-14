import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src"],
  dts: true,
  bundle: true,
  minify: false,
  format: ["esm"],
});
