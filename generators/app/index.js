'use strict';

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var generators = yeoman.generators;

module.exports = yeoman.generators.Base.extend({

    constructor: function() {
        // arguments and options should be
        // defined in the constructor.
        generators.Base.apply(this, arguments);

        this.argument('appName', {
            type: String,
            required: false
        });
    },

    welcome: function() {
        this.log(yosay(
            'Welcome to the ' + chalk.red('BB AngularJS generator!')
        ));
    },

    prompting: function() {
        // If we passed in the app name, don't prompt the user for it
        if (this.appName) {
            return;
        }

        var done = this.async();

        var prompts = [{
            type: 'input',
            name: 'appName',
            message: 'What would you like to name the app?',
            default: this.determineAppname()
        }];

        this.prompt(prompts, function(answers) {
            this.appName = answers.appName;
            this.appName = this.appName || this.determineAppname();
            done();
        }.bind(this));
		
		this.destinationRoot(this.destinationRoot() + '/html');
			
    },

    displayName: function() {
        this.log('Creating ' + this.appName + ' app based on BB Prototype App');
    },

    writing: {
        app: function() {
            this.fs.copyTpl(
                this.templatePath('_package.json'),
                this.destinationPath('package.json'),
				{
					appName: this.appName
				}
            );
            this.fs.copyTpl(
                this.templatePath('_bower.json'),
                this.destinationPath('bower.json'),
				{
					appName: this.appName
				}
            );
            this.fs.copy(
                this.templatePath('_gruntfile.js'),
                this.destinationPath('Gruntfile.js')
            );
        },

        projectfiles: function() {
            this.fs.copy(
                this.templatePath('editorconfig'),
                this.destinationPath('.editorconfig')
            );
            this.fs.copy(
                this.templatePath('jshintrc'),
                this.destinationPath('.jshintrc')
            );
            this.fs.copy(
                this.templatePath('styles'),
                this.destinationPath('styles')
            );
            this.fs.copy(
                this.templatePath('images'),
                this.destinationPath('images')
            );
        }
    },

    install: function() {
        this.installDependencies();
    }
});