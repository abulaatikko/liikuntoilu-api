module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
		
        clean: {
            tmp: ["tmp/*"],
            static: ["static/*"]
        },
        jshint: {
            files: [
                'Gruntfile.js',
                'src/frontend/**/*.js',
                'src/backend/**/*.js'
            ]
        },
        copy: {
            dev: {
                files: [
                    {src: 'tmp/app.min.js', dest: 'static/app.min.js'},
                    {src: 'tmp/app.min.css', dest: 'static/app.min.css'},
                    {expand: true, cwd: 'bower_components/bootstrap/', src: 'fonts/**', dest: 'static/'},
                ]
            }
        },
        concat: {
            js_vendor: {
                src: [
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/bootstrap/dist/js/bootstrap.js',
                ],
                dest: 'tmp/vendor.concat.js'
            },
            css: {
                src: ['bower_components/**/*.css', 'src/**/*.css'],
                dest: 'tmp/app.concat.css'
            }
        },
        uglify: {
            files: {src: ['tmp/vendor.concat.js'], dest: 'tmp/app.min.js'}
        },
        cssmin: {
            files: {src: ['tmp/app.concat.css'], dest: 'tmp/app.min.css'}
        }
    });
	
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('dev', [
        'clean:tmp',
        'jshint',
        'concat_all',
        'uglify',
        'cssmin',
        'clean:static',
        'copy:dev'
    ]);

    grunt.registerTask('concat_all', [
        'concat:js_vendor',
        'concat:css'
    ]);

};
