const esbuild = require("esbuild");

esbuild.build({
  entryPoints: ["main.js"],
  bundle: true,
  outfile: "dist/bundle.js",
  format: "iife", 
  minify: true,
  sourcemap: false,
  target: ["chrome58"], 
}).catch(() => process.exit(1));
