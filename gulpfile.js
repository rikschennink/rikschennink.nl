var gulp = require('gulp');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var sequence = require('run-sequence');
var autoprefixer = require('gulp-autoprefixer');
var livereload = require('gulp-livereload');
var spawn = require('child_process').spawn;

gulp.task('_connect', function() {

	connect.server({
		root:'./_site',
		port:4000
	});

});

gulp.task('_jekyll',function(cb){

	var ls = spawn('jekyll',['build','--config','_config.yml,_local.yml']);

	ls.stdout.on('data', function (data) {
		console.log('jekyll: ' + data);
	});

	ls.stderr.on('data', function (data) {
		console.log('jekyll: ' + data);
	});

	ls.on('close', function (code) {
		console.log('jekyll: finished (' + code + ')');
		cb();
	});

});

gulp.task('_static',function(){

	return gulp.src('./static/scss/styles.scss')
		.pipe(sass())
		.pipe(autoprefixer('last 1 version', '> 5%', 'ie 8'))

        // one for 'gh_pages'
		.pipe(gulp.dest('./static/css'))

        // one for '_site'
		.pipe(gulp.dest('./_site/static/css'));

});

gulp.task('_inject',function(){

    return gulp.src('./static/**/*',{ base: './' })
        .pipe(gulp.dest('./_site'));

});

gulp.task('_content',function(cb){

    // build new jekyll site, than inject static files
	sequence(['_jekyll'],'_inject',cb);

});

gulp.task('build',function(cb){

    sequence(['_jekyll','_static'],'_inject',cb);

});

gulp.task('dev',['build','_connect'],function(){

    // start live reload server
    livereload.listen();

    // now watching static files
    gulp.watch([

        // all static files
        './static/**/*'

    ],['_static']);

    // now watching html files
	gulp.watch([

		// all html and markdown files
		'./**/*.html',
		'./**/*.md',

		// exclude these files
        '!./node_modules/**/*',
        '!./_site/**/*'

	],['_content']);

    // wait for site to be rebuild
    gulp.watch([

        './_site/static/**/*'

    ]).on('change', livereload.changed);

});