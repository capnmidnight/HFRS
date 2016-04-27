/* global module */

function scriptFile(f) {
  return "src/" + f + ".js";
}

var pkg = require("./package.json"),
  headerFiles = ["analytics", "ga", "promise", "requests", "sha512"].map(scriptFile),
  indexFiles = ["contactForm", "imageFader", "mapResizer", "rotator"].map(scriptFile),
  allFiles = headerFiles.concat(indexFiles);

function jadeConfiguration(options, defaultData) {
  var config = {
    options: options,
    files: [{
      expand: true,
      src: ["*.html.jade"],
      dest: "",
      ext: "",
      extDot: "last"
    }]
  };

  defaultData.pkg = pkg;
  if (defaultData.debug) {
    defaultData.headerFiles = headerFiles;
    defaultData.indexFiles = indexFiles;
  }
  else {
    defaultData.headerFiles = ["src/code.min.js"];
    defaultData.indexFiles = [];
  }

  config.options.data = function (dest, src) {
    defaultData.filename = dest;
    defaultData.fileRoot = dest.replace(/\\/g, "/").split("/").map(function (p) {
      return "";
    }).join("../");
    defaultData.indexFile = dest === "index.html" ? "" : defaultData.fileRoot + "index.html";
    return defaultData;
  }.bind(config);

  return config;
}

module.exports = function (grunt) {
  grunt.initConfig({

    clean: ["src/*.min.js", "css/*.min.css"],

    pkg: pkg,

    jade: {
      release: jadeConfiguration({}, {}),
      debug: jadeConfiguration({ pretty: true }, { debug: true })
    },

    watch: {
      debug: {
        files: ["*.jade", "templates/*.jade"],
        tasks: ["jade:debug"]
      },
      release: {
        files: ["src/*.js", "*.jade", "templates/*.jade", "css/*.css", "!src/*.min.js", "!css/*.min.css"],
        tasks: ["clean", "cssmin", "uglify", "concat", "jade:release", "jade:release"]
      }
    },

    cssmin: {
      default: {
        files: [{
          expand: true,
          src: ["css/*.css"],
          dest: "",
          ext: ".min.css"
        }]
      }
    },

    uglify: {
      default: {
        files: [{
          expand: true,
          src: allFiles,
          dest: "",
          ext: ".min.js"
        }]
      }
    },

    concat: {
      options: {
        banner: "/*\n\
  <%= pkg.name %> v<%= pkg.version %> <%= grunt.template.today(\"yyyy-mm-dd\") %>\n\
  <%= pkg.license.type %>\n\
  Copyright (C) 2012 - 2016 <%= pkg.author %>\n\
  <%= pkg.homepage %>\n\
  <%= pkg.repository.url %>\n\
*/\n",
        separator: ";\n"
      },
      default: {
        files: {
          "src/code.min.js": allFiles.map(function (f) {
            return f.replace(".js", ".min.js");
          })
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-jade");

  grunt.registerTask("none", []);
  grunt.registerTask("debug", ["jade:debug", "watch:debug"]);
  grunt.registerTask("release", ["clean", "cssmin", "uglify", "concat", "jade:release", "watch:release"]);
  grunt.registerTask("default", ["debug"]);
};
