module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-pug');

    //noinspection JSUnresolvedFunction
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Compile JS (Jquiry/bootstrap/global)
        concat: {
            dist: {
                src: [
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/bootstrap/dist/js/bootstrap.js',
                    'source/scripts/Functions.js',
                    'source/scripts/global.js'
                ],
                dest: 'public/js/production.js' // File Production
            },
            carbon : {
                src: [
                    'source/scripts/webcam.js',
                    'source/scripts/jsontree.js',
                    'source/scripts/carbon.js'
                ],
                dest: 'public/js/textEditor.js' // File Production
            }
        },
        uglify: {
            build: {
                src: 'public/js/production.js',
                dest: 'public/js/production.min.js'
            },
            carbon : {
                src: 'public/js/textEditor.js',
                dest: 'public/js/textEditor.min.js'
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'public/css/production.css': 'source/sass/global.sass',
                    'public/css/textEditor.css' : 'source/sass/carbon.sass',
                    'public/css/jsonTree.css' : 'source/sass/jsontree.sass'
                }
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'source/images',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'public/images/'
                }]
            }
        },
        pug: {
            compile: {
                options: {
                    data: {
                        debug: false
                    }
                },
                files: {
                    'public/index.html': 'source/jade/index.jade',
                    'public/create.html': 'source/jade/CreateArticle.jade'
                }
            }
        },
        watch: {
            options: {
                livereload: true
            },
            scripts: {
                files: ['source/scripts/*.js'], // لسنا بحاجة لمرافبة المكتبات
                tasks: ['concat', 'uglify'], // المهمات التي ستنفذ
                options: {
                    spawn: false // لا تسألني عن هذا
                }
            },
            css: {
                files: ['source/sass/*.sass','source/sass/Parts/*.sass'],
                tasks: ['sass'],
                options: {
                    spawn: false
                }
            },
            images: {
                files: ['source/images/**/*.{png,jpg,gif}'],
                tasks: ['imagemin'],
                options: {
                    spawn: false
                }
            },
            html: {
                files: ['source/jade/Parts/*.jade','source/jade/Parts/**/*.jade','source/jade/*.jade'],
                tasks: ['pug'],
                options: {
                    spawn: false
                }
            }
        }

    });

    grunt.registerTask('default', ['concat', 'uglify','sass','imagemin','pug']);

};