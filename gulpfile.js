var gulp = require('gulp');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var sequence = require('run-sequence');
var autoprefixer = require('gulp-autoprefixer');
var spawn = require('child_process').spawn;


gulp.task('_connect', function() {

	connect.server({
		root:'./_site',
		port:4000
	});

});

gulp.task('_jekyll',function(cb){

	var ls = spawn('jekyll',['build']);

	ls.stdout.on('data', function (data) {
		console.log('jekyll: ' + data);
	});

	ls.stderr.on('data', function (data) {
		console.log('jekyll: ' + data);
	});

	ls.on('close', function (code) {
		console.log('jekyll: finished ' + code);
		cb();
	});

});

gulp.task('_scss',function(){

	return gulp.src('./static/scss/styles.scss')
		.pipe(sass({errLogToConsole: true}))
		.pipe(autoprefixer('last 1 version', '> 5%', 'ie 8'))
		.pipe(gulp.dest('./static/css'));

});

gulp.task('build',function(cb){

	sequence(['_scss'],'_jekyll',cb);

});

gulp.task('dev',['build','_connect'],function(){

	gulp.watch([

		// all static files
		'./static/**/*',

		// all html and markdown files
		'./**/*.html',
		'./**/*.md',

		// exclude these files
		'!./static/css/*',
		'!./_site/**/*',
		'!./node_modules/**/*'

	],['build']);

});