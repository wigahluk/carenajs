module.exports = function (grunt) {
    'use strict';

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            banner: [
                '/**',
                ' * <%= pkg.description %>',
                ' * @version v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>',
                ' * @author <%= pkg.author %>',
                ' * @license http://www.apache.org/licenses/LICENSE-2.0',
                ' **/\n'
            ].join('\n')
        },
        dirs: {
            dest: 'dist'
        },
        concat: {
            options: {
                banner: '<%= meta.banner %>'
            },
            dist: {
                src: ['src/*.js'],
                dest: '<%= dirs.dest %>/<%= pkg.name %>.js'
            }
        },
        // TODO, add compress.
        compress: {
            main: {
                options: {
                    archive: '<%= dirs.dest %>/carena.zip'
                },
                files: [
                    {src: ['<%= dirs.dest %>/*.js'], filter: 'isFile'}
                ]
            }
        },
        uglify: {
            options: {
                banner: '<%= meta.banner %>'
            },
            build: {
                src: ['<%= concat.dist.dest %>'],
                dest: '<%= dirs.dest %>/<%= pkg.name %>.min.js'
            }
        },
        karma: {
            options: {
                configFile: 'karma.conf.js'
            },
            build: {
                browsers: ['PhantomJS'],
                singleRun: true,
                autoWatch: false
            },
            test: {
                singleRun: false,
                autoWatch: true,
                browsers: ['Chrome']
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadNpmTasks('grunt-contrib-compress');

    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('default', 'build');
    grunt.registerTask('build', ['karma:build', 'concat', 'uglify', 'compress']);
    grunt.registerTask('test', ['karma:test']);
};