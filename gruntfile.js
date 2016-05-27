module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        copy: {
            index: {
                src: 'src/index.html',
                dest: 'dist/index.html'
            },
            images: {
                expand: true,
                cwd: 'src/images/',
                src: '**/*',
                dest: 'dist/images/'
            }
        },
        sass: {
            styles: {
                options: {
                    update: true,
                    style: 'expanded'
                },
                files: [{
                    expand: true,
                    cwd: 'src/styles',
                    src: ['**/*.scss'],
                    dest: 'dist/styles',
                    ext: '.css'
                }]
            }
        },
        watch: {
            options: {
                livereload: {
                    host: 'localhost',
                    port: 9000
                }
            },
            styles: {
                files: ['src/styles/**/*.scss'],
                tasks: ['newer:sass']
            },
            index: {
                files: ['src/index.html'],
                tasks: ['newer:copy:index']
            },
            images: {
                files: ['src/images/**/*'],
                tasks: ['newer:copy:images']
            }
        },
        'string-replace': {
            injectlivereload: {
                files: {
                    './dist/index.html': './dist/index.html'
                },
                options: {
                    replacements: [
                        {
                            pattern: '</body>',
                            replacement: "<script src=\"//localhost:9000/livereload.js\"></script>\n</body>"
                        }
                    ]
                }
            }
        },
        connect: {
            dev: {
                options: {
                    port: 8888,
                    hostname: '*',
                    base: 'dist'
                }
            }
        },
        clean: {
            dist: ['dist/']
        }
    });

    grunt.registerTask('build', [
        'newer:copy:index',
        'newer:copy:images',
        'newer:sass'
    ]);

    grunt.registerTask('dev', [
        'build',
        'string-replace:injectlivereload',
        'connect:dev',
        'watch'
    ]);

    grunt.registerTask('dist', [
        'clean:dist',
        'build'
    ]);



};
