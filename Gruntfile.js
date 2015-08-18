module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            json: {
                files: ['assets/inputs/*.json'],
                tasks: ['copy:json', 'json-minify']
            },
            css: {
                files: ['assets/css/*.css', '!assets/css/*.min.css'],
                tasks: ['csslint', 'cssmin', 'concat:css']
            },
            js: {
                files: ['assets/js/*.js'],
                tasks: ['jshint', 'newer:uglify:js']
            },
            svg_images: {
                files: 'assets/images/*.svg',
                tasks: ['svg_sprite:main', 'string-replace:svg_css', 'copy:svg_file', 'clean:tmp']
            },
            png_images: {
                files: 'assets/images/*.png',
                tasks: ['sprite:main', 'string-replace:png_css', 'clean:tmp']
            }
        },
        copy: {
            json: {
                files: [
                  {expand: true, src: ['assets/inputs/**'], dest: 'build'}
                ]
            },
            svg_file: {
                files: [
                  {expand: false, src: ['tmp/css/svg/sprite.css.svg'], dest: 'build/assets/images/spritesheet.svg'}
                ]
            }
        },
        'json-minify': {
            build: {
                files: 'build/assets/inputs/*.json'
            }
        },
        uglify: {
            js: {
                files: [{
                    expand: true,
                    cwd: 'assets/js',
                    src: '**/*.js',
                    dest: 'build/assets/js',
                    ext: '.min.js'
                }]
            }
        },
        cssmin: {
            minify_files: {
                files: [{
                    expand: true,
                    cwd: 'assets/css',
                    src: ['*.css'],
                    dest: 'assets/css',
                    ext: '.min.css'
                }]
            }
        },
        csslint: {
            options: {
                csslintrc: 'csslintrc'
            },
            src: ['assets/css/*.css']
        },
        jshint: {
            all: ['Gruntfile.js'].concat(['assets/js/*.js'])
        },
        svg_sprite: {
            main: {
                expand      : true,
                cwd         : 'assets/images',
                src         : ['**/*.svg'],
                dest        : 'tmp',
                options     : {
                    mode : {
                        css : {     // Activate the «css» mode
                            bust : false,
                            render : {
                                css : true  // Activate CSS output (with default options)
                            }
                        }
                    }
                }
            }
        },
        sprite: {
            main: {
                src: 'assets/images/*.png',
                dest: 'build/assets/images/spritesheet.png',
                destCss: 'tmp/png_sprites.css'
            }
        },
        clean: {
            png_sprite: ["assets/css/png_sprites.css"],
            svg_sprite: ["assets/css/sprite.css"],
            build: ["build/assets/css/*.css", "!build/assets/css/*.min.css"],
            tmp: ["tmp"]
        },
        concat: {
            css: {
                src: ["assets/css/*.min.css"],
                dest: 'build/assets/css/style.min.css',
            },
        },
        'string-replace': {
            png_css: {
                files: [{
                    expand: true,
                        cwd: 'tmp/',
                        src: 'png_sprites.css',
                        dest: 'assets/css'
                    }],
                    options: {
                        replacements: [{
                            pattern: /\.\.\/build\/assets\/images/ig,
                            replacement: '../images'
                        }]
                }
            },
            svg_css: {
                files: [{
                    expand: true,
                        cwd: 'tmp/css/',
                        src: 'sprite.css',
                        dest: 'assets/css'
                    }],
                    options: {
                        replacements: [{
                            pattern: /svg\/sprite\.css\.svg/ig,
                            replacement: '../images/spritesheet.svg'
                        }]
                }
            }
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
    grunt.loadNpmTasks('grunt-svg-sprite');
    grunt.loadNpmTasks('grunt-spritesmith');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-string-replace');

    // Register the default tasks.
    grunt.registerTask('default', ['watch']);
};