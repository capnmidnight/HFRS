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

    pkg: pkg,

    jade: {
      release: jadeConfiguration({}, { jsExt: ".min.js" }),
      debug: jadeConfiguration({ pretty: true }, { debug: true, jsExt: ".js" })
    },

    watch: {
      jade: {
        files: "*.jade",
        tasks: ["jade:debug"]
      }
    },

    cssmin: {
      default: {
        files: [{
          expand: true,
          src: ["css/**/*.css", "!*.min.css"],
          dest: "",
          ext: ".min.css"
        }]
      }
    },

    uglify: {
      default: {
        files: [{
          expand: true,
          src: ["src/**/*.js", "!*.min.js"],
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
  grunt.loadNpmTasks("grunt-contrib-jade");

  grunt.registerTask("none", []);
  grunt.registerTask("debug", ["jade:debug", "watch:jade"]);
  grunt.registerTask("release", ["cssmin", "uglify", "concat", "jade:release"]);
  grunt.registerTask("default", ["debug"]);
};
