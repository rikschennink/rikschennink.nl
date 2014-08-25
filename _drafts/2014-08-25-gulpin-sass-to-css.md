---
layout: post
title: Gulpin SASS to CSS
tags:
- Development
- Frontend
- JavaScript
- Gulp
- SASS
---
Writing maintainable CSS can be a though cookie. CSS tends to  quickly spiral out of control and before you know it you find yourself between managing way too specific selectors and hundreds of deprecated vendor prefixes. Technologies like SASS and autoprefixer can help you get out of this uncomfortable situation, but first, you'll have to jump some hoops.

We're going to write a simple [GulpJS](http://gulpjs.com/) script so we can run a [SASS](http://sass-lang.com/), [autoprefix](https://github.com/metrime/gulp-autoprefixer) and watch task for quick stylesheet development.


## Setting up NodeJS

- Install [NodeJS](http://nodejs.org/), it's easy like clickety-clack.
- Open a Terminal window. If you're uncomfortable using the Terminal, quickly read this [introduction article by Jim Hoskins](http://blog.teamtreehouse.com/introduction-to-the-mac-os-x-command-line).
- Navigate to your project directory. (The article above explains how to do this).
- Run `npm init`, this will create a `package.json` file. This file contains your projects name, description, version, dependencies and some other details. If you're lazy just jab your return key like a madman and it will use defaults for everything.

NPM stands for Node Package Manager, it's used to install node packages which we'll be doing in a minute or so.

We've now setup Node and are ready to install Gulp and it's tasks.


## Getting ready to Gulp

- Type `npm install --global gulp` to install the Gulp CLI. This makes it possible to run your Gulp file with the `gulp` command.

If you run into any errors, you have to execute this command as administrator. Just prepend `sudo` and run again. `sudo npm install --global gulp`.

- Run `npm install --save-dev gulp` to add Gulp to your project. We need this to use the Gulp API in your Gulp file.

- Now lets setup that Gulp file we keep talking about. Create a new file in your poject root called `gulpfile.js`.

Put the following code snippet in the file.

{% highlight javascript %}
var gulp = require('gulp');

gulp.task('default', function() {
  console.log('Hello World');
});
{% endhighlight %}

You can now execute this file by running `gulp` from your terminal. Give it a go, open your terminal, navigate to your project folder (if you're not already there) and run `gulp`.

It should echo `Hello World` to the terminal.


## Adding tasks like there's no tomorrow

Now for the good stuff, we're going to add all the CSS related tasks we need Gulp to run for us.


### Setting up SASS

Run `npm install --save-dev gulp-sass` to add the SASS task to your project.

Now let's expand our `gulpfile.js`. Alter it to match the following code snippet.

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

Run the `gulp` command again and you'll see a styles.css file has been created in the `/static/css` directory.


### Getting rid of those prefixes

Run `npm install --save-dev gulp-autoprefixer` to add the AutoPrefixer task to your project.

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

### Automating the build

Now, we don't want to have to run the gulp command each time we've changed one of our .scss files. So let's automate this.

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


Now, go forth, and unwind!

You can view the [gulpfile example code on GitHub](https://github.com/rikschennink/gulpin-sass-to-css).
