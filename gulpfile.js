var gulp = require('gulp');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var sequence = require('run-sequence');
var autoprefixer = require('gulp-autoprefixer');
var spawn = require('child_process').spawn;
var browserSync = require('browser-sync');

gulp.task('_connect', function() {

    browserSync({
        open:false,
        port:4000,
        server:{
            baseDir:'./_site'
        }
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

gulp.task('_scss',function() {

    return gulp.src('./static/scss/styles.scss')
        .pipe(sass({errLogToConsole:true}))
        .pipe(autoprefixer('last 1 version', '> 5%', 'ie 8'))

        // one for 'gh_pages'
        .pipe(gulp.dest('./static/css'))

        // reload browser
        .pipe(browserSync.reload({stream:true}));


});

gulp.task('_static',function(cb){

    sequence('_scss','_inject',cb);

});

gulp.task('_inject',function(){

    return gulp.src('./static/**/*',{ base: './' })
        .pipe(gulp.dest('./_site'));

});

gulp.task('_content',function(cb){

    // build new jekyll site, than inject static files
	sequence('_jekyll','_inject',cb);

});

gulp.task('build',function(cb){

    sequence('_jekyll','_static',cb);

});

gulp.task('dev',['build','_connect'],function(){

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

	],['_content', browserSync.reload]);

});