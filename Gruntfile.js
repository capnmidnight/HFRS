/* global module */

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

  config.options.data = function (dest, src) {
    defaultData.filename = dest;
    return defaultData;
  }.bind(config);

  return config;
}

module.exports = function (grunt) {
  grunt.initConfig({

    pkg: grunt.file.readJSON("package.json"),

    jade: {
      release: jadeConfiguration({}, { jsExt: ".min.js"}),
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
    }
  });

  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-jade");

  grunt.registerTask("none", []);
  grunt.registerTask("debug", ["jade:debug", "watch:jade"]);
  grunt.registerTask("release", ["jade:release", "cssmin", "uglify"]);
  grunt.registerTask("default", ["debug"]);
};
