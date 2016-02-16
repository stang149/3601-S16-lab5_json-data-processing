# CSCI 3601 Lab #5 - Processing JSON data from Mongo

During this lab you will complete a small project for a hypothetical customer, using all of the tools you have learned in
other labs. The new thing being introduced in this lab is the Yeoman generator. You will use it to manage laying out your project's basic directory structure and boilerplate details such as routing.

There is no "LABTASKS.md" for this lab, as you will be expected to follow the same agile practices that you will be using on
your final project.

## Setup
- Fork this repository (so that it is easy for us to keep track of your work).
- Use the generator to generate your project (see below).
- Make sure your application is called "studentsApp".
- Move the ``seed.js`` file into your config directory, overwriting the default one. 
- **Make sure that your .gitignore contains the .idea, /server/config/environment/production.js, etc. Use past .gitignore for reference.**
- Once you have checked your .gitignore, add all the appropriate generated files to the repsoitory and commit. 
- You will be using a local test database (like in Lab 4). You will also be given read-only access to the customer's database for testing.

## Using the generator to create your project
We are using yeoman generator: http://yeoman.io/generators/
Specifically, the angular-fullstack generator: https://github.com/DaftMonk/generator-angular-fullstack

This generator will set up a new project for you with a directory structure quite similar to the one you've been using
in previous labs, and will make it easier to manage adding new things to your project.

Run: ``yo angular-fullstack studentsApp`` in your project's main directory...
- Choose Scripting Language: ``Babel``
- Choose markup Language: ``HTML``
- Choose Stylesheet Language: ``CSS``
- Choose Router: ``uiRouter``
- Use Bootstrap = ``yes``
- Include UI Bootstrap = ``yes``
- Use mongoDB with Mongoose = ``yes``
- Scaffold authentication boilerplate = ``yes``
- Additional oAuth strategies (none, just hit enter)
- Use Socket.io = ``yes``

> Protip: After generating a large project like this, Webstorm will take quite some time to index all the files.
This process is indicated by the progress bar at the bottom of the screen, and you should wait until it is done to try doing any actual work.

#### Using generators to add routes to your project
Do not add routes (i.e. html and Javascript files) by hand. Use the documentation for the angular-fullstack generator to see how you can add a route to your project. 

## Sample data
You are provided with sample data that can be used to initialize your test database (located in seed.js). Place this file into the/server/config/environment directory, and it will be used to seed your local test database.

## User Stories
You should be keeping track of these throughout the course of the lab (an _iteration_, if you will). Before tearing into completing these stories for the customer, you should _weight_ these stories as a group. That is, you should assign these stories relative values indicating approximately how difficult you feel they will be or how much effort it will take to complete them. Your predictions don't have to be perfect, nor are they expected to be; however, put some real thought into this.

To keep track of progress on the stories throughout the course of the lab, you will use a _burndown chart_. Basically, this is a two-dimensional graph with time on the x-axis and work-remaining on the y-axis. The height of the y-axis will be determined by the total weight of your stories. (ie - if you have 65 points/units of work, your y-axis should probably go up to at least 65.) The x-axis range will correspond to the time you have for the lab; one way to do this is to show the number of days you have to work on it. Both scales should increase by even amounts (they should be linear). The idea behind the burndown chart is that you are able to view your progress as the lab progresses. At the start of the lab *cough* iteration *cough*, your chart will be at the top left. As each unit of time passes (days, class periods, lab periods, whatever), you mark how much remaining weight there is to finish. By the end of the lab, your burndown chart will have a y-value of 0 (no more weight remaining). You and your group can decide how you would like to make this; it could be through Google sheets, a hand-drawn graph, Excel, etc., but you need to be able to turn it in at the end of lab.

>Protip: **DO NOT** wait until the end of the lab to do this. One of the main purposes of a burndown chart is to allow you to see your own progress. We may come around to see interim burndown charts to ensure they are being made properly.

>Protip: Pick a way that works best for your entire team to have access to the burndown chart.

>Protip: Using some basic Mathematics, _shudder_, overall weight divided by overall time can tell you approximately how fast you need to work. The total points that a team feels they can get done when it comes to a regular iteration is referred to as their _velocity_. For this lab, stories are picked such that you are expected to get them all done. When the actual project begins, you and your customer will be deciding what to work on, and you will have to pick up stories with a weight that can be accomplished with what you feel your team's velocity is.

>Protip: Here's a pretty good example of a burndown chart (taken from quora.com): ![Pretty Nifty Example!](https://qph.is.quoracdn.net/main-qimg-350fed6a66aa0879e896d7715eb929f6?convert_to_webp=true)

#### Finally, the stories:

- As an administrator I would like to display a list of all students, ordered alphabetically by last name, first name.

- As an administrator I would like to display a list of all students, ordered by date of birth.

- As an administrator, I would like to display a list of all students, ordered by the number of credits that they have successfully completed (i.e. excluding the in-progress credits and grade F courses). 

- As an administrator I would like to view a list of students based on their major(s).

- As an administrator I would like to view detailed information for an individual student. 

- As an administrator, i would like to view all courses that a student has taken or is taking, with grades, including failed courses.

- As an administrator, I would like to display a list of students with their GPA. 

- As an administrator, I would like to display students' status based on their completed courses (freshman, sophomore, junior, senior) and sort/search by these parameters. 

- As an administrator, I would like to search student records based on courses that they are taking or have taken. 

## Switching to production mode with a remote database
The files that need to be modified: 

- server-side app.js: change the line 
```javascript
serveClient: (config.env === 'production') ? false : true,
```
to
```javascript
serveClient: true,
```
- add the following new task to Gruntfile.js, after the other registered tasks:
```javascipt
  grunt.registerTask('serveProd', function (target) {
    grunt.task.run([
      'clean:server',
      'env:prod',
      'concurrent:server',
      'injector',
      'wiredep',
      'autoprefixer',
      'express:dev',
      'wait',
      'open',
      'watch'
    ]);
  });
```
This will adda  new task `serveProd` to your grunt tasks, so you will be able to run it from the grunt menu, just like `serve`. 
- change express.js as follows:
in the `if` statement
```javascript 
if ('production' === env)
```
replace the lines
```javascript 
    app.use(favicon(path.join(config.root, 'public', 'favicon.ico')));
    app.use(express.static(path.join(config.root, 'public')));
    app.set('appPath', config.root + '/public');
    app.use(morgan('dev'));
```
with
```javascript 
    app.use(require('connect-livereload')());
    app.use(express.static(path.join(config.root, '.tmp')));
    app.use(express.static(path.join(config.root, 'client')));
    app.set('appPath', 'client');
    app.use(morgan('dev'));
    app.use(errorHandler()); // Error handler - has to be last
```
- change the file production.js in `/server/config/environment` to look as follows (but note that the password will be different from `passwordToBeProvided`, it will be provided to you at the beginning of the lab)
```javascript 
'use strict';

// Production specific configuration
// =================================
module.exports = {
  //// Server IP
  //ip:       process.env.OPENSHIFT_NODEJS_IP ||
  //          process.env.IP ||
  //          undefined,
  //
  //// Server port
  //port:     process.env.OPENSHIFT_NODEJS_PORT ||
  //          process.env.PORT ||
  //          8080,

  // MongoDB connection options
  mongo: {
    uri: 'mongodb://3601Lab:passwordToBeProvided@acrylic/softwareDev/?authSource=admin'
  }
};
```
**Make sure that your production.js is in .gitignore before entering the actual password.**

Once you have made all the changes, you should be able to run the production version by double-clicking on `serveProd` in the list of grunt tasks. **Important:** make sure to stop the `serve` task before starting the `serveProd` task. Note that you can alternate between the development task (with the test database) and the production task (with the remote database). The advantage of the test database is that you can change data in it to test for specific cases.   
