# DataViz - Frontend

DataViz is a Java web application that retrieves financial data from financial API sources and displays those data using ChartJs.

### The technologies used are:

  - [JavaScript]
  - [Node.js] as the deployment server
  - [AngularJS] as a front-end web application framework
  - [Chart.js] as JavaScript charting library
  - [Jasmine] as a testing framework for JavaScript
  - [Karma 1.0] to run Jasmine tests on several browsers
  - [Yeoman] & [AngularJS generator] to generate our Frontend website
  - [Grunt] a Task Runner to run, build, test our application
  - [Gzippo], [Morgan], and [Express]

Deployed on:

 - [Heroku] with a pipeline that serves the Reviewing, Staging and Production phases

Continous Integration:

 - [Codeship]

## How to create an AngularJS App and deploy it on Heroku?

Heroku doesn't allow developpers to deploy static web pages, so in order to publish your frontend application, it should be running on a server. In our case, we're gonna be using Node.js

### What do you need?

Make sure to have installed on your machine:

 - Node.js
 - Yeoman
 - Yeoman Anglar Generator
 - GruntJS
 - Git
 - Heroku CLI

### Generate an AngularJS App using Yeoman:

The following code launch a script that creates your application.
``` sh
$ yo angular [app-name]
```
PS: The app name parameter is optional.

You will be asked to choose the modules you want to install, just follow the instructions and add the features that fit your needs.

Once the application is created, you can deploy it on a server by running this command:
``` sh
$ grunt serve
```

Grunt offers you the ability to reload the pages when saving any changes, so you can see your modifications in realtime without the need of refreshing the page manually.

### Launch Karma runner using Grunt

In order to run your Jasmine tests using karma, you have to:

Install the `grunt-karma` plugin

```sh
$ npm install grunt-karma --save-dev
```
Add the following configuration in the `Gruntfile.js`

``` JavaSciprt
grunt.initConfig({
  // Some configurations...
  karma: {
    unit: {
      configFile: 'test/karma.conf.js',
      options: {
        frameworks: ['jasmine'],
        singleRun: true,
        browsers: ['PhantomJS']
      }
    }
  },
  // Other configurations...
});
```

And in the end of the script - inside the `module.exports = function (grunt)` block - you have to register the newly created configuration as a task:

``` JavaSciprt
grunt.registerTask('test', [
  'clean:server',
  'wiredep',
  'concurrent:test',
  'postcss',
  'connect:test',
  'karma'
]);
```

After this step, you should be able to run the following command to run your tests:

``` sh
$ grunt test
```

If you have not installed karma and it's plugins, run the following script:

``` sh
$ npm install karma
$ npm install karma-jasmine karma-phantomjs-launcher jasmine-core
$ npm install grunt-karma
```

### Add a Server to your application

The server’s dependencies include Gzippo, Morgan, and Express.

To install these dependencies run:

``` sh
$ npm install gzippo express morgan --save
```

#### Create a script that init your server

The `web.js` file will be in the root directory of the app and it should contain the following code:

``` JavaScript
var gzippo = require('gzippo');
var express = require('express');
var morgan = require('morgan');
var app = express();

app.use(morgan('dev'));
app.use(gzippo.staticGzip("" + __dirname + "/dist"));
app.listen(process.env.PORT || 5000);
```
As you can see, the `web.js` file loads the application from the `/dist` directory. In order do get this folder we should build the application using grunt:

```sh
$ grunt build
```

By default, the `/dist` directory is added in the `.gitignore` file by Yeoman, and since Heroku will be reading the app from this folder, you have to remove the path from the `.gitignore` file.

### Create the Heroku Procfile:

The `Procfile` is a simple text file which contains the command that should be called by Heroku to launch your application. Learn more about Heroku Procfile [here](https://devcenter.heroku.com/articles/procfile).

Add this command in the `Procfile` using a text editor:

```
web: node web.js
```

### Make the project folder a Git repository and link it to GitHub:

To link the project to GitHub, we have to [create a new repository](https://help.github.com/articles/creating-a-new-repository/) online, then init the project folder as a Git repo.
Go ahead and launch a command line in your application directory and run the following commands:

```sh
$ git init
$ git add .
$ git commit -m "Commit Message"
$ git remote add origin <github-repo-url>
$ git push origin master
```

To always push to master run this command

```sh
$ git push --set-upstream origin master
```

### Create Heroku Application
After creating an account on Heroku and installed the Heroku CLI, open the command line in the application directory and run the following Heroku command:

```sh
# Login if it's the first time running a heroku command
$ heroku login
$ heroku create YourAppName
```

PS: The application name should be unique on Heroku

#### Connecting Heroku App to the GitHub repo

If the application was created successfully:

 - Open the Heroku dashboard and select the newly created app
 - In the “Deploy” tab you can connect your application to a GitHub
	 - Select "Connect to GitHub" in the "Deployment method" section
	 - Follow the instructions then search for your repo by its name
	 - When you see the repo, click on the connect button
 - Click the “Enable Automatic Deploys” button in the "Automatic deploys" section

Finally, you can click on “Deploy Branch” button in the "Manual deploy" section and your application will be published online.

#### Create a deployment Pipeline

A pipeline is a group of Heroku apps that share the same codebase. Each app in a pipeline represents one of the following steps in a [continuous delivery workflow](http://en.wikipedia.org/wiki/Continuous_delivery):

 - Review
 - Development
 - Staging
 - Production

A common Heroku continuous delivery workflow has the following steps:

 1. A developer creates a pull request to make a change to the codebase.
 2. Heroku automatically creates a review app for the pull request, allowing developers to test the change.
 3. When the change is ready, it’s merged into the codebase’s master branch.
 4. The master branch is automatically deployed to staging for further testing.
 5. When it’s ready, the staging app is promoted to production, where the change is available to end users of the app.

Learn More about Heroku Pipeline [here](https://devcenter.heroku.com/articles/pipelines).

Here you can find a simple and quick video that explains how to create a Heroku pipeline and add the continuous delivery approach to your project.

[Continuous Delivery with Heroku and GitHub](https://youtu.be/_tiecDrW6yY?t=179)

### Add Continuous Integration to your app

> *Continuous Integration (CI) is a development practice that requires developers to integrate code into a shared repository several times a day. Each check-in is then verified by an automated build, allowing teams to detect problems early.* [\[source\]](https://www.thoughtworks.com/continuous-integration)

In this example, we will be using [Codeship.com](https://codeship.com/) as a Continuous Integration service in the cloud.

The main profit to gain when adding a CI service is that the Unit-Tests will be automatically executed on each push, so if the test fails, the person responsible will be notified and the commited code will not be published online.

#### Add your project to Codeship

After creating an account on Codeship:

 - Create a new Project in the projects section
 - Connect it to the GitHub repo
 - Select Codeship Basic
 - Keep "I want to create my own custom commands" in the "Select your technology to prepopulate basic commands" dropdown list
 - In the "Setup Commands" text, add the following commands:
``` sh
$ npm install
$ npm install karma
$ npm install karma-jasmine karma-phantomjs-launcher jasmine-core
$ npm install grunt-karma
$ npm install -g grunt
$ npm install jit-grunt
$ npm install --global bower
$ bower install
```
  - Now in the "Test Commands" section simply add the following commang
``` sh
$ grunt test
```


#### Configure Codeship project with Heroku App

##### **Heroku:**

 - Go to Heroku pipeline dashboard
 - For the staging app, click the top right button to see more options
 - Select the "Configure automatic deployment..." option
 - Check that "Wait for CI to pass before deploy" checkbox is selected

##### **Codeship:**

Follow the steps in [this link](https://documentation.codeship.com/basic/continuous-deployment/deployment-to-heroku/) to configure Codeship with your heroku app.

Now you can test your CI by pushing changes to your repo.


### Accessing `process.env.*` variables localy and on the server in Angular

#### Installing the Plugin

To acheave this part you have to install the following grunt plugin:

``` sh
$ npm install grunt-ng-constant --save-dev
```

#### Modifying the Grunt File

Now you have to configure the plugin in `Gruntfile.js` as follow:

``` JSON
ngconstant: {
  // Options for all targets
  options: {
    space: '  ',
    wrap: '"use strict";\n\n {\%= __ngModule %}',
    name: 'config',
  },
  // Environment targets
  development: {
    options: {
      dest: '<%= yeoman.app %>/scripts/config.js'
    },
    constants: {
      ENV: {
        name: 'development',
        DOMAIN_URL: process.env.DOMAIN_URL
      }
    }
  },
  production: {
    options: {
      dest: '<%= yeoman.dist %>/scripts/config.js'
    },
    constants: {
      ENV: {
        name: 'production',
        DOMAIN_URL: process.env.DOMAIN_URL
      }
    }
  }
}
```

The `ENV` object will be injected into the application and will be used just like the `$scope` object. So for example in this case, we are setting the `ENV.DOMAIN_URL` variable to the `process.env.DOMAIN_URL` value.

After adding the configuration, we should modify the registered tasks:

Adding `'ngconstant:development'` after the `'clean:server',` in the serve task

``` JSON
grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
  if (target === 'dist') {
    return grunt.task.run(['build', 'connect:dist:keepalive']);
  }

  grunt.task.run([
    'clean:server',
    'ngconstant:development',	// ADD THIS LINE
    'wiredep',
    'concurrent:server',
    'postcss:server',
    'connect:livereload',
    'watch'
  ]);
});
```

I also added this line in the `build` task:

``` JSON
grunt.registerTask('build', [
  'clean:dist',
  'ngconstant:production',	// ADD THIS LINE
  'wiredep',
  'useminPrepare',
  'concurrent:dist',
  'postcss',
  'ngtemplates',
  'concat',
  'ngAnnotate',
  'copy:dist',
  'cdnify',
  'cssmin',
  'uglify',
  'filerev',
  'usemin',
  'htmlmin'
]);
```

#### Generating the `config.js` file

When Grunt runs the task, a config file is generated, with your defined constants:

``` JavaScript
"use strict";

angular.module('config', [])
.constant('ENV', 
	{
		name:'development',
		DOMAIN_URL:'https://data-viz-v1.herokuapp.com/'
	}
);
```
#### Using the config file in your Angular App

Add the script source in the `index.html` file:

``` XML
 <!-- build:js({.tmp,app}) scripts/scripts.js -->
 <script src="scripts/app.js"></script>
 <script src="scripts/controllers/main.js"></script>
 <script src="scripts/controllers/about.js"></script>
 <script src="scripts/controllers/quandl_time_series.js"></script>
 <!-- endbuild -->

 <script src="scripts/config.js"></script>
```
PS: Make sure to add the source outside the comment block:
``` XML
<!-- build:js({.tmp,app}) scripts/scripts.js -->
...
<!-- endbuild -->
<script src="scripts/config.js"></script>
```

Next, you have to inject it into the `scripts/app.js` file:

``` JavaScript
'use strict';

angular
  .module('myFirstAppApp', [
    'ngTouch',	// Other parameters
    'config'	// ADD THIS LINE
  ])
  .config(function ($routeProvider) {
	//Some Config...
  });
```

Now in your controller you can the `ENV` object like the `$scope` or `$http` objects:

``` JavaScript
angular.module('myFirstAppApp')
    .controller('MainCtrl', function ($scope, ENV) { // ENV is injected
        $scope.DOMAIN_URL = ENV.DOMAIN_URL;
    });
```

When running/bulding your app, make sure to have your enviroment variable and double check it in the `scripts/config.js` file. [*(source)*](https://mindthecode.com/how-to-use-environment-variables-in-your-angular-application/)

[//]: # (Links)

   [AngularJS]: <http://angularjs.org>
   [Jasmine]: <https://jasmine.github.io>
   [Chart.js]: <http://www.chartjs.org>
   [Karma 1.0]: <https://karma-runner.github.io/1.0/index.html>
   [Heroku]: <https://www.heroku.com>
   [Codeship]: <https://codeship.com>
   [JavaScript]: <https://developer.mozilla.org/fr/docs/Web/JavaScript>
   [Yeoman]: <http://yeoman.io/>
   [Grunt]: <https://gruntjs.com/>
   [Morgan]: <https://www.npmjs.com/package/morgan>
   [Express]: <https://www.npmjs.com/package/express>
   [Gzippo]: <https://www.npmjs.com/package/gzippo>
   [AngularJS generator]: <https://github.com/yeoman/generator-angular>
   [Node.js]: <https://nodejs.org/en/>


----------
