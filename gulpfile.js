var gulp = require('gulp');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var sequence = require('run-sequence');
var autoprefixer = require('gulp-autoprefixer');
var spawn = require('child_process').spawn;
var browserSync = require('browser-sync');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

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

gulp.task('_assets',function(){

	return gulp.src('./src/assets/*')
		.pipe(gulp.dest('./static/assets'))

});

gulp.task('_scss',function() {

    return gulp.src('./src/scss/styles.scss')
		.pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer('last 1 version', '> 5%', 'ie 8'))
		.pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./static/css'))
	    .pipe(browserSync.reload({stream:true}));

});

gulp.task('_js',function(){

	return gulp.src('./src/js/**/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('./static/js'))
});

gulp.task('_static',function(cb){

    sequence('_assets','_js','_scss','_inject',cb);

});

gulp.task('_inject',function(){

    return gulp.src('./static/**/*',{ base: './' })
        .pipe(gulp.dest('./_site'));

});

gulp.task('_content',function(cb){

	sequence('_jekyll','_inject',cb);

});

gulp.task('build',function(cb){

    sequence('_jekyll','_static',cb);

});

gulp.task('dev',['build','_connect'],function(){

    // now watching static files
    gulp.watch([
        './src/**/*'
    ],['_static']);

    // now watching html files
	gulp.watch([

		// all html and markdown files
		'./**/*.html',
		'./**/*.md',

		// exclude these
        '!./node_modules/**/*',
        '!./_site/**/*'

	],['_content', browserSync.reload]);

});