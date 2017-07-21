/* Things done in front-end stage: parse scss to css, finish javascripts(concat & minifying) */

var gulp = require('gulp');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var concatCss = require('gulp-concat-css');
var uglify = require('gulp-uglify');
var foreach = require('gulp-foreach');
var changed = require('gulp-changed');

var resourceSrc = '_includes/';
var vmSrc = 'vm/';
var dist = 'dist/';

//Delete Existing dist folder, then re-create it
gulp.task('init', function() {
    console.log('gulo init');
    return gulp.src('dist', { read: false })
        .pipe(clean())
        .dist('dist');
});

// Concatenate & Minify JS -> Compare if changed -> Move to Dist Folder
gulp.task('scripts', function() {
    console.log('gulp - script task');
    return gulp.src(src + 'js/*.js')
        .pipe(concat('main.js'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        //.changed(dest + resourceSrc + 'javascript', { hasChanged: changed.compareContent }) Compare
        .pipe(gulp.dest(dest + resourceSrc + 'javascript'));
});

// Compress CSS Files to One File (include pattern lab css and project css)
gulp.task('css', function() {
    console.log('gulp - css task');
    return gulp.src(src + 'css/*.css')
        .pipe(concatCss('style.css'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(dest + resourceSrc + 'css'));
});

// Cache Images
gulp.task('images', function() {
    console.log('gulp - image task');
    return gulp.src(src + 'images/**/*')
        .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
        .pipe(gulp.dest(dest + resourceSrc + 'images'));
});

//Cache Fonts?

//Parse Templates to Velocity

//Parse Templates to Data Definition XML


gulp.task('default', gulp.series('init', 'scripts', 'css', 'images'));