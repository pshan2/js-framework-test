/* Things done in front-end stage: parse scss to css, finish javascripts(concat & minifying) */

/**
 * Node modules
 */
var mkdirp = require('mkdirp');
var gulp = require('gulp');
var clean = require('gulp-clean');
var cache = require('gulp-cache');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var concatCss = require('gulp-concat-css');
var uglify = require('gulp-uglify');
var foreach = require('gulp-foreach');
var imagemin = require('gulp-imagemin');
var changed = require('gulp-changed');
var dir = require('node-dir');
/**
 * Constants
 */
var baseSrc = 'src/';
var resourceSrc = baseSrc + '_includes/';
var vmSrc = baseSrc + '_cms/';
var dest = 'dest/';
var hostname = 'qa.cascade.emory.edu';
var username = 'pshan2';
var password = 'Spy62710@';
var siteName = 'PengyinTest';

/**
 * Local modules
 */
var index = require('./index.js');

/**
 * Local File Process
 */

//Delete Existing dist folder, then re-create it
gulp.task('local:init', function() {
    mkdirp('./' + dest.substring(0, dest.length - 1), function(err) {
        if (err)
            return false;
        else {
            gulp.src(dest.substring(0, dest.length - 1) + '/**/*', { read: false })
                .pipe(clean());
        }
    });

});

// Concatenate & Minify JS -> Compare if changed -> Move to Dist Folder
gulp.task('local:scripts', ['local:init'], function() {
    console.log(dest + resourceSrc + 'javascript');
    return gulp.src(resourceSrc + 'js/*.js')
        .pipe(concat('main.js'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        //.changed(dest + resourceSrc + 'javascript', { hasChanged: changed.compareContent }) Compare
        .pipe(gulp.dest(dest + resourceSrc.replace(baseSrc, '') + 'js'));
});

// Compress CSS Files to One File (include pattern lab css and project css)
gulp.task('local:css', function() {
    return gulp.src(resourceSrc + 'css/*.css')
        .pipe(concatCss('style.css'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(dest + resourceSrc.replace(baseSrc, '') + 'css'));
});

// Cache Images
gulp.task('local:images', function() {
    return gulp.src(resourceSrc + 'images/**/*')
        .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
        .pipe(gulp.dest(dest + resourceSrc.replace(baseSrc, '') + 'images'));
});

//Cache Fonts?

//Parse Templates to Velocity. Currently just test file uploading
gulp.task('local:vm', function() {
    return gulp.src(baseSrc + 'vm/**/*')
        .pipe(gulp.dest(dest + vmSrc.replace(baseSrc, '') + 'vm'));
});


//Parse Templates to Data Definition XML


/**
 * Cacade API Uploading Process
 */

gulp.task('default', ['local:init',
    'local:scripts',
    'local:css',
    'local:images',
    'local:vm'
], function() {
    //var cascadeFolder = index.initFolderAPI('qa.cascade.emory.edu', 'pshan2', 'Spy62710@');
    var cascadeFile = index.initFileAPI(hostname, username, password);
    var cascadeFolder = index.initFolderAPI(hostname, username, password);

    //Read Folder and Delete Folders that is in dest folder remotely
    //cascadeFolder.folder.read('CPA - Framework', 'js').then(function(data) { console.log(data); }, function(error) { console.log(error); });
    //cascadeFolder.folder.delete('PengyinTest', 'Test').then(function(data) { console.log(data); }, function(error) { console.log(error); });
    //cascadeFolder.folder.write()

    /*
    dir.paths(dest.substring(0, dest.length - 1),
        function(err, subdirs) {
            if (err) throw err;
            console.log(subdirs);
            subdirs.dirs.forEach(function(dir) {
                var d = dir.substring(dir.indexOf(dest) + dest.length);
                console.log('begin to remove ' + d + ' on server...');
                cascadeFolder.folder.delete(siteName, d);
            });
            subdirs.files.forEach(function(file) {
                console.log(Object.keys[file]);
            });
        });
        */

    //Write File
    dir.readFiles(dest.substring(0, dest.length - 1), { exclude: /^\./, recursive: true }, function(error, content, filename, next) {
        //file callback
        if (error) { console.log('error when looping inside dest folder: ') + error; return; };
        var filepath = filename.substring(filename.indexOf(dest) + dest.length);
        console.log(filepath + ' process begin...');

        //write file
        cascadeFile.file.write(siteName, filepath, content).then(function(data) {}, function(error) { console.log(error); });
        next();
    }, function(err, files) {
        if (err) throw err;
        console.log('finished reading files:', files);
    });


});