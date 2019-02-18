(function() {
    var del = require('del');
    var autoprefixer = require('autoprefixer-core');
    var gulp = require('gulp');
    var less = require('gulp-less');
    var postcss = require('gulp-postcss');
    var sass = require('gulp-sass');
    var sourcemaps = require('gulp-sourcemaps');

    var browserSync = require('browser-sync').create();

    var processors = [
        autoprefixer({ browsers: ['last 1 version'] })
    ];

    gulp.task('build:less', [], function() {
        return gulp.src('less/main.less')
            .pipe(sourcemaps.init())
                .pipe(less())
                .pipe(postcss(processors))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest('./dest'))
            .pipe(browserSync.stream());
    });

    gulp.task('build:scss', [], function() {
        return gulp.src('scss/main.scss')
            .pipe(sourcemaps.init())
                .pipe(sass())
                .pipe(postcss(processors))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest('./dest'))
            .pipe(browserSync.stream());
    });

    gulp.task('serve', ['build'], function () {
        browserSync.init({
            server: {
                baseDir: './'
            }
        });

        gulp.watch('scss/*.scss', ['build']);
        gulp.watch('less/*.less', ['build']);
    });

    // Uncomment the pre-processor of choice.
    gulp.task('build', ['build:scss']);
    // gulp.task('build', ['build:less']);

    gulp.task('default', ['serve']);
})();