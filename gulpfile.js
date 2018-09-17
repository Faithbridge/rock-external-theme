var gulp = require('gulp'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	jsImport = require('gulp-js-import'),
	sourcemaps = require('gulp-sourcemaps'),
	less = require('gulp-less'),
	path = require('path'),
	cleanCSS = require('gulp-clean-css'),
	plumber = require('gulp-plumber'),
	server = require('gulp-server-livereload'),
	browserSync = require('browser-sync'),
	nunjucksRender = require('gulp-nunjucks-render');

var lessSrc = 'src/less/[^_]*.less',
	lessDest = 'dest/css/',
	scriptsSrc = 'src/js/**/*.js',
  scriptsDest = 'dest/js';

gulp.task('default', ['jsImport', 'scripts', 'less', 'minify-css', 'nunjucks', 'webserver']);

// JS Import
gulp.task('jsImport', function() {
  return gulp.src('src/js/main.js')
        .pipe(jsImport({hideConsole: true}))
        .pipe(gulp.dest(scriptsDest));
});

// Scripts Task
gulp.task('scripts', function() {
    return gulp.src('dest/js/main.js')
    	.pipe(plumber())
        .pipe(concat('scripts.js'))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(scriptsDest))
		.pipe(browserSync.reload({
			stream: true
	    }));
});

// LESS Task
gulp.task('less', function () {
	gulp.src(lessSrc)
    	.pipe(plumber())
    	.pipe(sourcemaps.init())
    	.pipe(less({
    		paths: [ path.join(__dirname, 'less', 'includes') ]
    	}))
    	.pipe(sourcemaps.write())
    	.pipe(gulp.dest(lessDest))
    	.pipe(browserSync.reload({
      		stream: true
    	}));
});

// Minify CSS
gulp.task('minify-css', () => {
  return gulp.src('./dest/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./dest/css/'));
});

// Watch Styles Task
gulp.task('watch', function(){
	gulp.watch('src/less/**/*.less', ['less','minify-css']);
	gulp.watch(scriptsSrc, ['jsImport', 'scripts']);
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
	.pipe(gulp.dest('./dest/'))

	// reload browser
	.pipe(browserSync.reload({
		stream: true
    }));
});

// Browser Sync
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
    	baseDir: './dest/'
    },
  })
})
 
// Web Server Task
gulp.task('webserver', ['watch'], function() {
  gulp.src('./dest/')
    .pipe(server({
    	defaultFile: 'index.html',
    	livereload: true,
    	directoryListing: false,
    	open: true
    }));
});