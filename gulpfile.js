function scriptFile(f) {
  return "src/" + f + ".js";
}

var gulp = require("gulp"),
  pkg = require("./package.json"),
  marigold = require("marigold-build").setup(gulp, pkg),
  html = marigold.html(["*.pug"], {
    watch: ["*.md"],
    data: {
      indexFile: "/index.html",
      headerFiles: ["analytics", "ga", "promise", "requests", "sha512"].map(scriptFile),
      indexFiles: ["contactForm", "imageFader", "mapResizer", "rotator"].map(scriptFile),
    } }),

  devServer = marigold.devServer(
    ["src/**/*.js"],
    [
      "!gulpfile.js",
      "*.js",
      "*.css",
      "*.html"
    ]);

marigold.taskify([html], { default: devServer });
