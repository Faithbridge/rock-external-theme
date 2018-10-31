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

var lessSrc = './Styles/[^_]*.less',
    lessDest = './Styles/',
    scriptsSrc = './Assets/Scripts/[^_]*.js',
    scriptsDest = './Assets/Scripts/compiled/';

gulp.task('default', ['scripts', 'styles', 'nunjucks', 'watch']);

// Scripts Task
gulp.task('scripts', function() {
  return gulp.src(scriptsSrc)
    .pipe(plumber())
    // Import Plugin Files
    .pipe(jsImport({hideConsole: true}))
    // Minify
    .pipe(uglify())
    // Export
    .pipe(gulp.dest(scriptsDest))
    .pipe(gulp.dest('./templates/compiled/scripts'))
    // Reload Browser
    .pipe(browserSync.reload({
      stream: true
    }));
});

// Styles Task
gulp.task('styles', function () {
	gulp.src(lessSrc)
  	.pipe(plumber())
  	.pipe(sourcemaps.init())
  	.pipe(less({
  		paths: [ path.join(__dirname, 'less', 'includes') ]
  	}))
  	.pipe(sourcemaps.write())
    .pipe(cleanCSS({compatibility: 'ie8'}))
  	.pipe(gulp.dest(lessDest))
    .pipe(gulp.dest('./templates/compiled/'))
  	.pipe(browserSync.reload({
    		stream: true
  	}));
});

// Compile Nunjucks Task
gulp.task('nunjucks', ['browserSync'], function() {

  // Gets .html and .nunjucks files in pages
  gulp.src('./templates/pages/**/*.+(html|nunjucks)')
  	.pipe(plumber())

  	// Renders template with nunjucks
	.pipe(nunjucksRender({
		path: ['templates']
  }))

	// output files in app folder
	.pipe(gulp.dest('./templates/compiled/'))

  .pipe(browserSync.reload({
    stream: true
  }));

});

// Browser Sync
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
    	baseDir: './templates/compiled/'
    },
  })
})

// Watch Styles Task
gulp.task('watch', function(){
  gulp.watch('./Styles/*.less', ['styles']);
  gulp.watch('./Assets/Scripts/*.js', ['scripts']);
  gulp.watch('./templates/*.html', ['nunjucks']);
  gulp.watch('./templates/pages/*.html', ['nunjucks']);
  gulp.watch('./templates/partials/*.html', ['nunjucks']);
});
 
// Web Server Task
gulp.task('webserver', ['watch'], function() {
  gulp.src('./templates/compiled/')
    .pipe(server({
    	defaultFile: 'index.html',
    	livereload: true,
    	directoryListing: false,
    	open: true
    }));
});