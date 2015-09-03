var applicationContext = 'tomitribe-io';

var gulp = require('gulp');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var del = require('del');
var sprity = require('sprity');
var gulpif = require('gulp-if');
var gulpsync = require('gulp-sync')(gulp);
var watch = require('gulp-watch');

gulp.task('jade', function () {
    return gulp.src('./assets/**/*.jade')
        .pipe(jade({
            locals: {}
        }))
        .pipe(gulp.dest('../src/main/webapp/app/'))
});

gulp.task('css', gulpsync.sync(['sass', 'autoprefixer']));

gulp.task('sass', function () {
    return gulp.src('./assets/**/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('../src/main/webapp/app/'));
});

gulp.task('autoprefixer', function () {
    return gulp.src('../src/main/webapp/app/style/main.css')
        .pipe(autoprefixer({}))
        .pipe(gulp.dest('../src/main/webapp/app/style/'));
});

gulp.task('images', gulpsync.sync(['copy-images', 'sprites']));

gulp.task('copy-images', function () {
    return gulp.src(['./assets/**/*.png', './assets/**/*.jpg'])
        .pipe(gulp.dest('../src/main/webapp/app/'));
});

gulp.task('sprites', function () {
    return sprity.src({
        src: './assets/**/sprite_*.{png,jpg}',
        style: '../sprite.css',
        margin: 0
    }).pipe(gulpif('*.png', gulp.dest('../src/main/webapp/app/images'), gulp.dest('../src/main/webapp/app/style/')));
});

gulp.task('js', gulpsync.sync(['copy-js', 'uglify']));

gulp.task('copy-js', function () {
    return gulp.src('./assets/**/*.js')
        .pipe(gulp.dest('../src/main/webapp/app/'));
});

gulp.task('uglify', function () {
    return gulp.src('./assets/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('../src/main/webapp/app/'));
});

gulp.task('clean', function () {
    return del.sync(['../src/main/webapp/app/', '..target/apache-tomee/webapps/ROOT/app/'], {
        force: true
    });
});

gulp.task('copy-to-target', function () {
    return gulp.src('../src/main/webapp/app/**/*')
        .pipe(gulp.dest('../target/apache-tomee/webapps/' + applicationContext + '/app/'));
});

gulp.task('build', gulpsync.sync(['clean', 'jade', 'css', 'images', 'js', 'copy-to-target']));
gulp.task('default', ['build'], function () {
    gulp.watch('./assets/**/*', ['build']);
});
