var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');

var APP_DIR = 'app';
var SCSS_DIR = INDEX_DIR + '/stylesheets';

// Compile SCSS files into /dist/css
gulp.task('styles', function() {
	gulp.src('' + SCSS_DIR + '/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(gulp.dest('./' + INDEX_DIR + '/dist/css/'))
		.pipe(browserSync.stream());
});

// Static Server + watching scss/html files
gulp.task('serve', ['styles'], function() {

	browserSync.init({
		server: "./" + APP_DIR + ""
	});

	gulp.watch('' + SCSS_DIR + '/*.scss', ['styles']);
	gulp.watch('' + APP_DIR + '/*.html').on('change', browserSync.reload);
});

// Watch task
gulp.task('default', ['serve']);