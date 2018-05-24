var gulp = require('gulp'),
	sass = require('gulp-sass'),
	sassGlob = require('gulp-sass-glob'),
	sourcemaps = require('gulp-sourcemaps'),
	plumber = require('gulp-plumber'),
	server = require('gulp-server-livereload'),
	browserSync = require('browser-sync'),
	nunjucksRender = require('gulp-nunjucks-render');

var stylesSrc = 'src/scss/**/[^_]*.scss'
var stylesDest = 'dest/css/'

gulp.task('default', ['styles', 'nunjucks', 'webserver']);

// Styles Task
gulp.task('styles', function () {
	gulp.src(stylesSrc)
		.pipe(plumber())
		.pipe(sassGlob())
	    .pipe(sass({outputStyle: 'compressed'}))
	    .pipe(sourcemaps.write())
	    .pipe(gulp.dest(stylesDest))
	    .pipe(browserSync.reload({
      		stream: true
    	}));
});


// Watch Styles Task
gulp.task('watch', ['browserSync'], function(){
	gulp.watch('src/scss/**/*.scss', ['styles']);
	gulp.watch('pages/**/*.html', ['nunjucks']);
	gulp.watch('templates/**/*.html', ['nunjucks']);
});


// Compile Nunjucks Task
gulp.task('nunjucks', function() {

  // Gets .html and .nunjucks files in pages
  gulp.src('pages/**/*.+(html|nunjucks)')
  	.pipe(plumber())

  	// Renders template with nunjucks
	.pipe(nunjucksRender({
		path: ['templates']
    }))

	// output files in app folder
	.pipe(gulp.dest('./'))

	// reload browser
	.pipe(browserSync.reload({
		stream: true
    }));
});

// Browser Sync
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
    	baseDir: './'
    },
  })
})
 
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