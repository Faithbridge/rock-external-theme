var gulp = require('gulp'),
	sass = require('gulp-sass'),
	sassGlob = require('gulp-sass-glob'),
	sourcemaps = require('gulp-sourcemaps'),
	plumber = require('gulp-plumber'),
	server = require('gulp-server-livereload');

var stylesSrc = 'src/scss/**/[^_]*.scss'
var stylesDest = 'dest/css/'

gulp.task('default', ['styles', 'webserver']);

// Styles Task
gulp.task('styles', function () {
	gulp.src(stylesSrc)
		.pipe(plumber())
		.pipe(sassGlob())
	    .pipe(sass({outputStyle: 'compressed'}))
	    .pipe(sourcemaps.write())
	    .pipe(gulp.dest(stylesDest));
});

// Watch Styles Task
gulp.task('watch', function(){
	gulp.watch('src/scss/**/*.scss', ['styles']);
});
 
// Web Server Task
gulp.task('webserver', ['watch'], function() {
  gulp.src('./')
    .pipe(server({
    	defaultFile: 'index.html',
    	livereload: true,
    	directoryListing: false,
    	open: true
    }));
});