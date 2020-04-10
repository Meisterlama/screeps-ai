module.exports = function(grunt) {
  grunt.loadNpmTasks("grunt-screeps");

  grunt.initConfig({
    screeps: {
      options: {
        email: "meisterlama@outlook.com",
        password: "Bonjour97410",
        branch: "sim",
        ptr: false
      },
      dist: {
        src: ["dist/*.js"]
      }
    }
  });
};
