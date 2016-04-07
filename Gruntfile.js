/* global module */

var pkg = require("./package.json"),
  indexFiles = ["analytics", "ga", "contactForm", "imageFader", "mapResizer", "rotator"];

function jadeConfiguration(options, defaultData) {
  var config = {
    options: options,
    files: [{
      expand: true,
      src: ["*.jade"],
      dest: "",
      ext: "",
      extDot: "last"
    }]
  };

  defaultData.pkg = pkg;
  if (defaultData.debug) {
    defaultData.indexFiles = indexFiles.map(function (f) {
      return "/src/" + f + ".js";
    });
  }
  else {
    defaultData.indexFiles = ["/src/code.min.js"];
  }

  config.options.data = function (dest, src) {
    defaultData.filename = dest;
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
        files: ["*.jade"],
        tasks: ["jade:debug"]
      },
      release: {
        files: ["src/*.js", "*.jade", "css/*.css", "!src/*.min.js", "!css/*.min.css"],
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
          src: ["src/*.js", "!src/*.min.js"],
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
        separator: ";"
      },
      default: {
        files: {
          "src/code.min.js": indexFiles.map(function (f) {
            return "src/" + f + ".min.js";
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
