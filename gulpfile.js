var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var react = require('gulp-react');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var merged = require('merge-stream');

var browserify = require("browserify");
var source = require("vinyl-source-stream");
var babelify = require("babelify");

gulp.task('sass', function () {
    gulp.src('./src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest('./public/css'));
});

gulp.task('js', function () {
    return browserify('./src/js/index.jsx')
        .transform(babelify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./public/js'));
});

gulp.task('img', function () {
    gulp.src('./src/imgs/**/**')
        .pipe(gulp.dest('./public/imgs'));
});

gulp.task('lib', function () {
    return merged(
        gulp.src(
            ['./src/lib/*.js', './src/lib/*.css']
        )
        .pipe(gulp.dest('./public/lib')),

        gulp.src('./src/lib/fonts/**')
            .pipe(gulp.dest('./public/lib/fonts'))
    );
});

gulp.task('pages', function () {
    return gulp.src('./src/pages/**')
        .pipe(gulp.dest('./views'));
});

gulp.task('server', ['sass', 'js', 'img', 'lib', 'pages']);

gulp.task('watch', function () {
    gulp.watch('./src/**/*', ['server']);
});

gulp.task('default', ['server', 'watch']);
