var gulp = require('gulp'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	jsImport = require('gulp-js-import'),
	sass = require('gulp-sass'),
	sassGlob = require('gulp-sass-glob'),
	sourcemaps = require('gulp-sourcemaps'),
	plumber = require('gulp-plumber'),
	server = require('gulp-server-livereload'),
	browserSync = require('browser-sync'),
	nunjucksRender = require('gulp-nunjucks-render');

var stylesSrc = 'src/scss/**/[^_]*.scss',
	stylesDest = 'dest/css/',
	scriptsSrc = 'src/js/**/*.js',
    scriptsDest = 'dest/js';

gulp.task('default', ['jsImport', 'scripts', 'styles', 'nunjucks', 'webserver']);

// JS Import
gulp.task('jsImport', function() {
  return gulp.src('src/js/main.js')
        .pipe(jsImport({hideConsole: true}))
        .pipe(gulp.dest(scriptsDest));
});

// Scripts Task
gulp.task('scripts', function() {
    return gulp.src('dest/js/main.js')
        .pipe(concat('scripts.js'))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(scriptsDest))
		.pipe(browserSync.reload({
			stream: true
	    }));
});

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
gulp.task('watch', function(){
	gulp.watch(scriptsSrc, ['jsImport', 'scripts'])
	gulp.watch(stylesSrc, ['styles']);
	gulp.watch('pages/**/*.html', ['nunjucks']);
	gulp.watch('templates/**/*.html', ['nunjucks']);
});


// Compile Nunjucks Task
gulp.task('nunjucks', ['browserSync'], function() {

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