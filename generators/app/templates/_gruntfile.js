
// Generated on 2015-05-28 using generator-angular 0.11.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function(grunt) {

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

	// Configurable paths for the application
	var appConfig = {
		app: require('./bower.json').appPath || 'app',
		bower: 'bower_components',
		dist: 'dist',
		styles: 'styles',
		scripts: 'scripts',
		
	};

	// Define the configuration for all the tasks
	grunt.initConfig({

		// Project settings
		config: appConfig,

		// Watches files for changes and runs tasks based on the changed files
		watch: {
			bower: {
				files: ['bower.json'],
				tasks: ['wiredep']
			},
			js: {
				files: ['<%= config.app %>/<%= config.scripts %>/**/*.js'],
				tasks: ['newer:jshint:all'],
				options: {
					livereload: '<%= connect.options.livereload %>'
				}
			},
			less: {
				files: ['<%= config.styles %>/less/**/*.less'],
				tasks: ['less:nomap', 'autoprefixer']
			},
			gruntfile: {
				files: ['Gruntfile.js']
			},
			livereload: {
				options: {
					livereload: '<%= connect.options.livereload %>'
				},
				files: [
					'<%= config.app %>/{,*/}*.html',
					'.tmp/styles/{,*/}*.css',
					'<%= config.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
				]
			}
		},

		// The actual grunt server settings
		connect: {
			options: {
				port: 9000,
				// Change this to '0.0.0.0' to access the server from outside.
				hostname: 'localhost',
				livereload: 35729
			},
			livereload: {
				options: {
					open: true,
					middleware: function(connect) {
						return [
							connect.static('.tmp'),
							connect().use(
								'/bower_components',
								connect.static('./bower_components')
							),
							connect().use(
								'styles',
								connect.static('./styles')
							),
							connect.static(appConfig.app)
						];
					}
				}
			},
			dist: {
				options: {
					open: true,
					base: '<%= config.dist %>'
				}
			}
		},

		// Make sure code styles are up to par and there are no obvious mistakes
		jshint: {
			options: {
				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish')
			},
			all: {
				src: [
					'Gruntfile.js',
					'<%= config.app %>/<%= config.scripts %>/{,*/}*.js'
				]
			}
		},

		// Empties folders to start fresh
		clean: {
			dist: {
				files: [{
					dot: true,
					src: [
						'.tmp',
						'<%= config.dist %>/{,*/}*',
						'!<%= config.dist %>/.git{,*/}*'
					]
				}]
			},
			server: '.tmp'
		},

		// Add vendor prefixed styles
		autoprefixer: {
			options: {
				browsers: ['last 1 version']
			},
			server: {
				options: {
					map: true,
				},
				files: [{
					expand: true,
					cwd: '.tmp/styles/',
					src: '{,*/}*.css',
					dest: '.tmp/styles/'
				}]
			},
			dist: {
				files: [{
					expand: true,
					cwd: '.tmp/styles/',
					src: '{,*/}*.css',
					dest: '.tmp/styles/'
				}]
			}
		},

		// Automatically inject Bower components into the app
		wiredep: {
			app: {
				src: ['<%= config.app %>/index.html'],
				ignorePath: /\.\.\//
			},
			less: {
				src: ['<%= config.styles %>/**/*.less'],
				ignorePath: /(\.\.\/){1,2}bower_components\//
			}
		},

		less: {
			// less map files are taking over a minute to build - use nomap for quicker dev
			nomap: {
				options: {
					yuicompress: false,
					sourceMap: false
				},
				files: {
					'.tmp/styles/main.css': '<%= config.styles %>/less/_order.less'
				}
			},
			main: {
				options: {
					yuicompress: false,
					sourceMap: true,
					sourceMapFilename: '<%= config.dist %>/<%= config.styles %>/main.css.map',
					sourceMapURL: 'main.css.map',
					sourceMapRootpath: '/'
				},
				files: {
					'.tmp/styles/main.css': '<%= config.styles %>/less/_order.less'
				}
			}
		},

		// Renames files for browser caching purposes
		filerev: {
			dist: {
				src: [
					'<%= config.dist %>/<%= config.scripts %>/{,*/}*.js',
					'<%= config.dist %>/<%= config.styles %>/{,*/}*.css',
					'<%= config.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
					'<%= config.dist %>/<%= config.styles %>/fonts/*'
				]
			}
		},

		// Reads HTML for usemin blocks to enable smart builds that automatically
		// concat, minify and revision files. Creates configurations in memory so
		// additional tasks can operate on them
		useminPrepare: {
			html: '<%= config.app %>/index.html',
			options: {
				dest: '<%= config.dist %>',
				flow: {
					html: {
						steps: {
							js: ['concat', 'uglifyjs'],
							css: ['cssmin']
						},
						post: {}
					}
				}
			}
		},

		// Performs rewrites based on filerev and the useminPrepare configuration
		usemin: {
			html: ['<%= config.dist %>/{,*/}*.html'],
			css: ['<%= config.dist %>/<%= config.styles %>/{,*/}*.css'],
			options: {
				assetsDirs: [
					'<%= config.dist %>',
					'<%= config.dist %>/images',
					'<%= config.dist %>/<%= config.styles %>'
				]
			}
		},

		// The following *-min tasks will produce minified files in the dist folder
		// By default, your `index.html`'s <!-- Usemin block --> will take care of
		// minification. These next options are pre-configured if you do not wish
		// to use the Usemin blocks.
		// cssmin: {
		//   dist: {
		//     files: {
		//       '<%= config.dist %>/styles/main.css': [
		//         '.tmp/styles/{,*/}*.css'
		//       ]
		//     }
		//   }
		// },
		// uglify: {
		//   dist: {
		//     files: {
		//       '<%= config.dist %>/<%= config.scripts %>/scripts.js': [
		//         '<%= config.dist %>/<%= config.scripts %>/scripts.js'
		//       ]
		//     }
		//   }
		// },
		// concat: {
		//   dist: {}
		// },

		imagemin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= config.app %>/images',
					src: '{,*/}*.{png,jpg,jpeg,gif}',
					dest: '<%= config.dist %>/images'
				}]
			}
		},

		svgmin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= config.app %>/images',
					src: '{,*/}*.svg',
					dest: '<%= config.dist %>/images'
				}]
			}
		},

		htmlmin: {
			dist: {
				options: {
					collapseWhitespace: true,
					conservativeCollapse: true,
					collapseBooleanAttributes: true,
					removeCommentsFromCDATA: true,
					removeOptionalTags: true
				},
				files: [{
					expand: true,
					cwd: '<%= config.dist %>',
					src: ['*.html', 'views/{,*/}*.html', 'partials/{,*/}*.html'],
					dest: '<%= config.dist %>'
				}]
			}
		},

		// ng-annotate tries to make the code safe for minification automatically
		// by using the Angular long form for dependency injection.
		ngAnnotate: {
			dist: {
				files: [{
					expand: true,
					cwd: '.tmp/concat/scripts',
					src: '*.js',
					dest: '.tmp/concat/scripts'
				}]
			}
		},

		// Replace Google CDN references
		cdnify: {
			dist: {
				html: ['<%= config.dist %>/*.html']
			}
		},

		// Copies remaining files to places other tasks can use
		copy: {
			dist: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= config.app %>',
					dest: '<%= config.dist %>',
					src: [
						'*.{ico,png,txt}',
						'.htaccess',
						'*.html',
						'views/{,*/}*.html',
						'partials/{,*/}*.html',
						'images/{,*/}*.{webp}',
						'<%= config.styles %>/fonts/{,*/}*.*'
					]
				}, {
					expand: true,
					cwd: '.tmp/images',
					dest: '<%= config.dist %>/images',
					src: ['generated/*']
				}]
			},
			styles: {
				expand: true,
				cwd: '<%= config.styles %>',
				dest: '.tmp/styles/',
				src: '{,*/}*.css'
			},
			deploy: {
				files: [{
					expand: true,
					cwd: '<%= config.dist %>/',
					src: ['**'],
					dest: '<%= grunt.option(\'dest\') %>'
				}]
			}
		},

		// Run some tasks in parallel to speed up the build process
		concurrent: {
			server: [
				'less:nomap'
			],
			dist: [
				'less:nomap',
				'imagemin',
				'svgmin'
			]
		},
		modernizr: {
			dist: {
				'devFile': '<%= config.bower %>/modernizr/modernizr.js',
				'outputFile': '<%= config.dist %>/<%= config.scripts %>/modernizr.js',
				'parseFiles': true,
				'files': {
					'src': [
						'<%= config.dist %>/<%= config.scripts %>/*.js',
						'<%= config.dist %>/<%= config.styles %>/*.css'
					]
				},
				'extra': {
					'shiv': true,
					'printshiv': false,
					'load': true,
					'mq': false,
					'cssclasses': true
				},
				'extensibility': {
					'addtest': false,
					'prefixed': false,
					'teststyles': false,
					'testprops': false,
					'testallprops': false,
					'hasevents': false,
					'prefixes': false,
					'domprefixes': false
				}
			}
		}
	});


	grunt.registerTask('serve', 'Compile then start a connect web server', function(target) {
		if (target === 'dist') {
			return grunt.task.run(['build', 'connect:dist:keepalive']);
		}

		grunt.task.run([
			'clean:server',
			'wiredep',
			'modernizr',
			'concurrent:server',
			'autoprefixer:server',
			'connect:livereload',
			'watch'
		]);
	});

	grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function(target) {
		grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
		grunt.task.run(['serve:' + target]);
	});

	grunt.registerTask('build', [
		'clean:dist',
		'wiredep',
		'useminPrepare',
		'concurrent:dist',
		'autoprefixer',
		'concat',
		'ngAnnotate',
		'copy:dist',
		'modernizr',
		'cdnify',
		'cssmin',
		'uglify',
		'filerev',
		'usemin',
		'htmlmin'
	]);

	grunt.registerTask('deploy', [
		'clean:dist',
		'wiredep',
		'useminPrepare',
		'concurrent:dist',
		'autoprefixer',
		'concat',
		'ngAnnotate',
		'copy:dist',
		'modernizr',
		'cdnify',
		'cssmin',
		'uglify',
		'filerev',
		'usemin',
		'htmlmin',
		'copy:deploy'
	]);

	grunt.registerTask('default', [
		'newer:jshint',
		'test',
		'build'
	]);
};