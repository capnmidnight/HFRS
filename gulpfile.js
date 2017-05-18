function scriptFile(f) {
  return "src/" + f + ".js";
}

var gulp = require("gulp"),
  pkg = require("./package.json"),
  marigold = require("marigold-build").setup(gulp, pkg),
  html = marigold.html(["*.pug"], {
    watch: ["*.md", "templates/**/*.pug"],
    data: {
      indexFile: "/index.html",
      headerFiles: ["analytics", "ga", "promise", "requests", "sha512"].map(scriptFile),
      indexFiles: ["contactForm", "imageFader", "mapResizer", "rotator"].map(scriptFile),
    } }),

  css = marigold.css(["css/*.styl"]),

  images = marigold.images(["images/*.png", "images/*.jpg", "images/*.svg"]),

  devServer = marigold.devServer(
    [
      "*.pug",
      "templates/**/*.pug",
      "css/**/*.styl",
      "src/**/*.js"
    ],
    [
      "!gulpfile.js",
      "*.js",
      "*.css",
      "css/*.css",
      "*.html"
    ]);

marigold.taskify([html, css, images], { default: devServer });

gulp.task("test", ["release"], devServer);
