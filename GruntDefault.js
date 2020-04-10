module.exports = function(grunt) {
  grunt.loadNpmTasks("grunt-screeps");

  grunt.initConfig({
    screeps: {
      options: {
        email: "meisterlama@outlook.com",
        password: "Bonjour97410",
        branch: "default",
        ptr: false
      },
      dist: {
        src: ["dist/*.js"]
      }
    }
  });
  grunt.registerTask("default", ["screepsyolo"]);
};
