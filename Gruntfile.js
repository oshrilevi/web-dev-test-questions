module.exports = function(grunt) {
    var settings = grunt.file.readJSON('grunt-settings.json');
    var tools = require('./grunt-functions');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            json: {
                files: settings.json_files,
                tasks: ['copy:json', 'json-minify']
            },
            css: {
                files: settings.css_files,
                tasks: ['csslint', 'newer:cssmin', 'copy:css', 'clean:css']
            },
            js: {
                files: settings.js_files,
                tasks: ['jshint', 'newer:uglify', 'copy:js', 'clean:js']
            }
        },
        copy: {
            json: {
                files: [
                  {expand: true, src: ['assets/data/**'], dest: 'build'}
                ]
            },
            css: {
                files: [
                  {expand: true, src: ['assets/css/*min.css'], dest: 'build'}
                ]
            },
            js: {
                files: [
                  {expand: true, src: ['assets/js/*min.js'], dest: 'build'}
                ]
            }
        },
        'json-minify': {
            build: {
                files: 'build/assets/data/*.json'
            }
        },
        uglify: {
            uglify_files: {
                files: tools.generateMinFilesObj(settings.js_files, 'js')
            }
        },
        cssmin: {
            minify_files: {
                files: tools.generateMinFilesObj(settings.css_files, 'css')
            }
        },
        csslint: {
            src: settings.css_files
        },
        jshint: {
            all: ['Gruntfile.js'].concat(settings.js_files)
        },
        clean: {
            js: ["assets/js/*.min.js"],
            css: ["assets/css/*.min.css"]
        }
    });

    // Load the Grunt plugins.
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-json-minify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-contrib-clean');

    // Register the default tasks.
    grunt.registerTask('default', ['watch']);
};