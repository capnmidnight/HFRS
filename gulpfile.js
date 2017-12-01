function jsBuild(name) {
  return marigold.js({
    name,
    entry: `src/${name}/index.js`
  });
}

var gulp = require("gulp"),
  pkg = require("./package.json"),
  marigold = require("marigold-build").setup(gulp, pkg),

  jsTasks = [
    "purchase",
    "header",
    "home"
  ].map(jsBuild),

  css = marigold.css(["css/*.styl"]),

  html = marigold.html(["*.pug"], { watch: ["*.md", "templates/**/*.pug"] }),

  images = marigold.images(["images/*.png", "images/*.jpg", "images/*.svg"]),

  devServer = marigold.devServer([
      "*.pug",
      "templates/**/*.pug",
      "css/**/*.styl",
      "src/**/*.js"
    ], [
      "!gulpfile.js",
      "*.js",
      "*.css",
      "css/*.css",
      "*.html"
    ], {
      url: "HFRS/downloads.html",
      express: require("./src/server/stripe"),
      keepOpenOnLastDisconnect: true
    });

marigold.taskify(
  jsTasks.concat([
    html,
    css,
    images
  ]), {
    default: devServer
  });

gulp.task("test", ["release"], devServer);
