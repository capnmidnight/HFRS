function jsBuild(name) {
  return marigold.js({
    name,
    entry: `src/${name}/index.js`
  });
}

var gulp = require("gulp"),
  pkg = require("./package.json"),
  marigold = require("marigold-build").setup(gulp, pkg),

  jsHeader = jsBuild("header"),
  jsHome = jsBuild("home"),

  css = marigold.css(["css/*.styl"]),
  
  html = marigold.html(["*.pug"], {
    watch: ["*.md", "templates/**/*.pug"],
    data: {
      indexFile: "/index.html"
    } }),

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

marigold.taskify([
  jsHeader,
  jsHome, 
  html, 
  css, 
  images
], { default: devServer });

gulp.task("test", ["release"], devServer);
