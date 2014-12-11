---
layout: post
title: Gulpin SASS to CSS
tags:
- Tutorial
- JavaScript
- Node
- Gulp
- SASS
---
Writing maintainable CSS can be a tough cookie. CSS has this tendency to quickly spiral out of control, before you know it you find yourself between managing way too many specific selectors and hundreds of deprecated vendor prefixes. Technologies like SASS and AutoPrefixer can help you get out of this uncomfortable situation, but to get there, you'll have to jump some hoops.

We'll start by setting up NodeJS, it allows us to run JavaScript outside of the browser.

## Setting up NodeJS

- Install [NodeJS](http://nodejs.org/), it's very easy as it is packaged as a nice installer.
- Open a Terminal window. 
I can imagine you might be uncomfortable using the Terminal, if so, just take your time, you'll get the hang of it. To get started, read [introduction to the Terminal by Jim Hoskins](http://blog.teamtreehouse.com/introduction-to-the-mac-os-x-command-line).
- Now, navigate to your project directory. If you don't know how to do this, no worries, the article I mentioned in the previous step will explain further.
- Run <kbd>npm init</kbd>, this will create a "package.json" file. This file contains the name of your project, the description, version, dependencies, license and some other stuff. If you're lazy just jab your return key like a madman and it will use defaults for everything.

Now, about that "npm" command. NPM stands for Node Package Manager, it's used to install node packages from [npmjs.org](http://www.npmjs.org), this we'll be doing in a couple of seconds.

We've now setup Node and are ready to install Gulp and some of it's tasks. Good stuff!


## Getting ready to Gulp

Gulp is there to take commands. You just give it a list of things to do and in what order to do them and it will just handle it all like a pro and report back to you on it's progress.

- Type <kbd>npm install --global gulp</kbd> to install the Gulp CLI. This makes it possible to run your future gulp files using the "gulp" command (CLI stands for Command Line Interface, so there you go).

If you run into any errors, you might have to execute this command as administrator. Just prepend <kbd>sudo</kbd> and run again. <kbd>sudo npm install --global gulp</kbd>.

In any case, you don't have to do this for each project, once you've installed Gulp CLI you're all set for happy times.

- Now we've got our CLI setup, lets add Gulp to your project. Type <kbd>npm install --save-dev gulp</kbd> to get this over with. We need this to use the Gulp API in your gulp file. 

Notice that the *package.json* file has been updated and Gulp has been added as a *devDependency* (that's because of the --save-dev command). Also, a *node_modules* directory has appeared out of thin air. This directory will contain all installed node modules for this project (better stay out of there).

- Next we'll have to setup that gulp file we keep talking about. Create a new file in your poject root called "gulpfile.js". Yes, Gulp is that literal.

Use your copy paste skills to move the following code to the newly created file.

{% highlight javascript %}
var gulp = require('gulp');

gulp.task('default', function() {
  console.log('Hello World');
});
{% endhighlight %}

You can now execute this file by running Gulp from your terminal. Give it a go, open your terminal, navigate to your project folder (if you're not already there) and run the <kbd>gulp</kbd> command.

Gulp will look for a "gulpfile.js" in the same directory and run it. Within a couple nanoseconds your terminal should read <samp>Hello World</samp>.


## Adding tasks like there's no tomorrow

Now for the good stuff, we're going to add all the CSS related tasks we need Gulp to run for us.


### Setting up SASS

SASS, a way to use variables in your CSS, nest selectors, write mixins, loops and use all that other over-the-top tech you always dreamed of. But, with great power comes great responsiblablabla. Seriously though, this stuff is like [cocaine](http://www.heydonworks.com/article/reinventing-the-hyperlink), so take it easy.

Okay, focus, run <kbd>npm install --save-dev gulp-sass</kbd> to add the SASS task to your project.

Now let's alter our "gulpfile.js" a bit. Time to use those Kung Fu copy paste skills once more.

{% highlight javascript %}
var gulp = require('gulp');

// we're loading the SASS module
// and we're assigning it to the sass variable
var sass = require('gulp-sass');

gulp.task('default',function(){

  // we're loading the scss file in 'static/scss'
  // sending it to the sass task (with the pipe command)
  // and then save it to the 'static/css' directory
  return gulp.src('./static/scss/styles.scss')
    .pipe(sass())
    .pipe(gulp.dest('./static/css'));
});
{% endhighlight %}

Run the <kbd>gulp</kbd> command again and you'll see a *styles.css* file has been created in the */static/css* directory. Excellent.


### Getting rid of those prefixes

Still things could be better, we've got our SASS magic, which is great and all, but AutoPrefixer that's where things really start moving in the right direction.

Run <kbd>npm install --save-dev gulp-autoprefixer</kbd> to add the AutoPrefixer task to your project. Adding modules really is this simple, I can't get enough of it. View the small code changes to the gulp file below.

{% highlight javascript %}
var gulp = require('gulp');
var sass = require('gulp-sass');

// lets load the autoprefixer module
var autoprefixer = require('gulp-autoprefixer');

gulp.task('default',function(){
  return gulp.src('./static/scss/styles.scss')
    .pipe(sass())

    // send the sass results to autoprefixer
    // have autoprefixer add prefixes for browsers matching
    // - the latest version
    // - or at least 5% usages
    // - or is ie8
    .pipe(autoprefixer('last 1 version', '> 5%', 'ie 8'))
    .pipe(gulp.dest('./static/css'));
});
{% endhighlight %}

Same trick as last time, run <kbd>gulp</kbd> and presto, vendor prefixes are now automatically added to *styles.css*.


### Automating the build

Now, we don't want to have to run the "gulp" command each time we've changed one of our ".scss" files. So let's automate this whole process.

{% highlight javascript %}
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

// we've renamed the task from 'default' to 'sass'
gulp.task('sass',function(){
  return gulp.src('./static/scss/styles.scss')
    .pipe(sass())
    .pipe(autoprefixer('last 1 version', '> 5%', 'ie 8'))
    .pipe(gulp.dest('./static/css'));
});

// note the ['sass'] statement below
// this tells gulp to run the sass task 
// before running the default task
gulp.task('default',['sass'],function(){

  // watch the files in the following directories
  // and on changes run the 'sass' task
  gulp.watch('./static/scss/**/*',['sass']);

});
{% endhighlight %}

Run <kbd>gulp</kbd> and start developing. Gulp will keep running allowing you to relax, grab coffee, and write some truly awesome CSS without the maintenance nightmare!

If you ever want to stop that Gulp task, just jab <kbd class="key">Ctrl</kbd>+<kbd class="key">C</kbd>

We've done it! We've written a simple [GulpJS](http://gulpjs.com/) script and are now running a [SASS](http://sass-lang.com/), [AutoPrefixer](https://github.com/metrime/gulp-autoprefixer) and watch task. It's the perfect stepping stone to start adding more tasks which will make developing websites even easier.

You can view the [gulp file example code on GitHub](https://github.com/rikschennink/gulpin-sass-to-css).
