//npm init
//npm install --save-dev gulp gulp-sass gulp-clean-css gulp-rename gulp-uglify gulp-concat sass gulp-autoprefixer gulp-babel @babel/core @babel/preset-env browser-sync

// GULP
const gulp = require('gulp');
const browserSync = require("browser-sync").create();

// STYLES
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');

//JS
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const babel = require('gulp-babel');

// CONFIG
const bases = {
  src: './',
  dist: '../assets'
}

const paths = {
  styles: ['styles/*.scss', 'styles/**/*.scss'],
  jsGlobal: ['js/global/*.js'] // , 'js/**/*.js', 'js/*.js']
}

// STYLES
gulp.task('style', async function() {
  gulp.src(`${bases.src}${paths.styles[0]}`)
      .pipe(sass.sync().on('error', sass.logError))
      .pipe(autoprefixer(/* { cascade: false } */))
      // .pipe(rename('main.css'))
      .pipe(cleanCSS())
      .pipe(gulp.dest(`${bases.dist}/css`))
      .pipe(browserSync.stream());
});

// JS
gulp.task('jsGlobal', async function() {
  gulp.src(`${bases.src}${paths.jsGlobal[0]}`)
      .pipe(concat('main.js'))
      .pipe(babel({ presets: ['@babel/env'] }))
      .pipe(uglify())
      .pipe(gulp.dest(`${bases.dist}/js`))
      .pipe(browserSync.stream());
});

// WATCHS
gulp.task('watch', function () {
  gulp.watch(`${bases.src}${paths.styles[1]}`, gulp.series('style'));
  gulp.watch(`${bases.src}${paths.jsGlobal[0]}`, gulp.series('jsGlobal'));
});

gulp.task('default',  gulp.parallel('style', 'jsGlobal'));
gulp.task('start', gulp.parallel('style', 'jsGlobal', 'watch'));