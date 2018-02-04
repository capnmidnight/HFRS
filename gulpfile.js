function jsBuild(name) {
  return marigold.js({
    advertise: false,
    name,
    entry: `src/${name}/index.js`
  });
}

var gulp = require("gulp"),
  pkg = require("./package.json"),
  marigold = require("marigold").setup(gulp, pkg),

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
      env: {
        // These are Stripe's own publicly published keys, they won't actually
        // charge any cards or send any money anywhere.
        STRIPE_PUBLIC_KEY: "pk_test_HJOlWoH2inHcxBfGWUtxzH4G",
        STRIPE_PRIVATE_KEY: "sk_test_BQokikJOvBiI2HlWgH4olfQ2"
      },
      path: ".",
      url: "downloads.html",
      express: require("./src/server/stripe")
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
