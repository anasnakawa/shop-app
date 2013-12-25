/**
 * combining all files together
 */

module.exports = function( grunt ) {

	grunt.initConfig({
		concat: {
			css: {
				src: [ 
				  	  'bower_components/ratchet/dist/ratchet.css'
				  	, 'css/main.css' 
			  	]
				, dest: 'dest/app.css'
			}
			, js: {
				src: [
					  'bower_components/ratchet/dist/ratchet.js'
					, 'bower_components/knockout.js/knockout.debug.js'
					, 'js/ko-default.js'
					, 'js/store.js'
					, 'js/model.js'
					, 'js/app.js'
				]
				, dest: 'dest/app.js'
			}
		}

		, uglify: {
			app: {
				files: {
					'dest/app.min.js': [ 'dest/app.js' ]
				}
			}
		}

		, cssmin: {
			app: {
				files: {
					'dest/app.min.css': [ 'dest/app.css' ]
				}
			}
		}

		, watch: {
			js: {
				  files: [ 'js/*.js' ]
			    , tasks: [ 'concat:js', 'uglify' ]
			}
			, css: {
				  files: [ 'css/*.css' ]
				, tasks: [ 'concat:css', 'cssmin' ]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-bump');

	grunt.registerTask( 'default', [ 'concat' ] );
	grunt.registerTask( 'min', [ 'concat', 'uglify', 'cssmin' ] );

}
