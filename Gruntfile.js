module.exports = function(grunt) {

    grunt.initConfig({
        clean: {
            tmp: [".tmp/*"],
            build: ["build/*"],
        },
        jshint: {
            files: [
                'Gruntfile.js',
                'app/frontend/**/*.js',
                'app/backend/**/*.js',
            ],
        },
        copy: {
            dev: {
                files: [
                    {src: '.tmp/vendor.concat.js', dest: 'build/app.js'},
                    {src: '.tmp/app.concat.css', dest: 'build/app.css'},
                    {expand: true, cwd: 'bower_components/bootstrap/', src: 'fonts/**', dest: 'build/'},
                    {expand: true, cwd: 'app/frontend/', src: 'image/**', dest: 'build/'},
                ],
            },
            dist: {
                files: [
                    {src: '.tmp/app.min.js', dest: 'build/app.js'},
                    {src: '.tmp/app.min.css', dest: 'build/app.css'},
                    {expand: true, cwd: 'bower_components/bootstrap/', src: 'fonts/**', dest: 'build/'},
                    {expand: true, cwd: 'app/frontend/', src: 'image/**', dest: 'build/'},
                ],
            },
        },
        concat: {
            js_vendor: {
                src: [
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/bootstrap/dist/js/bootstrap.js',
                ],
                dest: '.tmp/vendor.concat.js',
            },
            css: {
                src: [
                    'bower_components/bootstrap/dist/css/bootstrap-theme.css',
                    'bower_components/bootstrap/dist/css/bootstrap.css',
                    'app/**/*.css',
                ],
                dest: '.tmp/app.concat.css',
            },
        },
        uglify: {
            files: {src: ['.tmp/vendor.concat.js'], dest: '.tmp/app.min.js'},
        },
        cssmin: {
            files: {src: ['.tmp/app.concat.css'], dest: '.tmp/app.min.css'},
        },
        mochaTest: {
            test: {
                src: ['test/*.js'],
            },
        },
    });
	
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.registerTask('dev', [
        'clean:tmp',
        'jshint',
        'concat_all',
        'clean:build',
        'copy:dev'
    ]);

    grunt.registerTask('dist', [
        'clean:tmp',
        'jshint',
        'concat_all',
        'uglify',
        'cssmin',
        'clean:build',
        'copy:dist'
    ]);

    grunt.registerTask('test', [
        'mochaTest',
    ]);

    grunt.registerTask('concat_all', [
        'concat:js_vendor',
        'concat:css'
    ]);

};
