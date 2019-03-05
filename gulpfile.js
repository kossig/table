/* 2019-03-01 */
/* global require exports */

const
gulp = require('gulp'),
sass = require('gulp-sass'),
cache = require('gulp-cache'),
babel = require('gulp-babel'),
rename = require("gulp-rename"),
rigger = require('gulp-rigger'),
concat = require('gulp-concat'),
uglify = require('gulp-uglify'),
plumber = require("gulp-plumber"),
htmlmin = require("gulp-htmlmin"),
imagemin = require('gulp-imagemin'),
cleanCSS = require('gulp-clean-css'),
sourcemaps = require('gulp-sourcemaps'),
autoprefixer = require('gulp-autoprefixer'),
gcmq = require('gulp-group-css-media-queries'),
del = require('del'),
pump = require('pump'),
smartgrid = require('smart-grid'),
server = require('browser-sync').create();

const path = {
  src: {
    html: ['src/**/*.html', '!src/components/**'],
    style: './src/style/+(main|mainNoCalc).*',
    js: ['src/libs/**/*.js', 'src/js/main.js'],
    img: 'src/img/**/*.*',
    font: 'src/fonts/**/*.*'
  },
  build: {
    html: 'build/',
    style: 'build/style/',
    js: 'build/js/',
    img: 'build/img/',
    font: 'build/fonts/'
  },
  watch: {
    html: 'src/**/*.html',
    style: 'src/style/**/*.*',
    js: 'src/**/*.js',
    img: 'src/img/**/*.*',
    font: 'src/fonts/**/*.*'
  }
}

const gridCnfg = {
  filename: '_grid',  
  outputStyle: 'scss',
  columns: 12,
  offset: '3rem',
  mobileFirst: false,
  container: {
    maxWidth: '1170',
    fields: '30px'
  },
  breakPoints: {
    lg: { width: '1170px'},
    md: { width: '960px' },
    sm: { width: '780px' },
    xs: { width: '560px' }
  },
  mixinNames: {
    container: "wrapper",
    row: "row-flex",
    rowFloat: "row-float",
    rowInlineBlock: "row-ib",
    rowOffsets: "row-offsets",
    column: "col",
    size: "size",
    columnFloat: "col-float",
    columnInlineBlock: "col-ib",
    columnPadding: "col-padding",
    columnOffsets: "col-offsets",
    shift: "shift",
    from: "from",
    to: "to",
    fromTo: "from-to",
    reset: "reset",
    clearfix: "clearfix",
    debug: "debug",
    uRowFlex: "u-row-flex",
    uColumn: "u-col",
    uSize: "u-size"
  },
  tab: "  ",
  defaultMediaDevice: "screen",
  detailedCalc: false
}

function grid(cb){
  smartgrid('./src/style', gridCnfg);
  cb();
}

function html(){
  return pump([
    gulp.src(path.src.html),
    rigger(),
    htmlmin({
      collapseWhitespace: true,
      ignoreCustomFragments: [/<br>\s/gi]
    }),
    gulp.dest(path.build.html),
    server.reload({ stream: true })
    ])
}

function css(){
  return pump([
    gulp.src(path.src.style, { sourcemaps: true }),
    sourcemaps.init(),
    plumber(),
    sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError),
    rename({ suffix: '.min' }),
    gcmq(),
    autoprefixer({
      browsers: ['> 0.1%'],
      cascade: false
    }),
    cleanCSS({ level: 2 }),
    sourcemaps.write(),
    gulp.dest(path.build.style),
    server.reload({ stream: true })
    ])
}

function js(){
  return pump([
    gulp.src(path.src.js, { sourcemaps: true }),
    sourcemaps.init(),
    plumber(),
    rigger(),
    babel({
      presets: ['@babel/env']
    }),
    concat('main.min.js'),
    uglify(),
    sourcemaps.write(),
    gulp.dest(path.build.js),
    server.reload({ stream: true })
    ]);
}

function img(){
  return pump([
    gulp.src(path.src.img),
    cache(imagemin([
      imagemin.optipng({ optimizationLevel: 3 }),
      imagemin.jpegtran({ progressive: true }),
      imagemin.svgo()
      ])),
    gulp.dest(path.build.img),
    server.reload({ stream: true })
    ])
}

function font(){
  return pump([
    gulp.src(path.src.font),
    gulp.dest(path.build.font),
    server.reload({ stream: true })
    ])
}

function browser(){
  server.init({
    server: { baseDir: path.build.html },
    notify: false
  })
}

function watch(){
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.style, css);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.img, img);
  gulp.watch(path.watch.font, font);
}

const clean = () => del([path.build.html]);

exports.js = js;
exports.img = img;
exports.css = css;
exports.html = html;
exports.font = font;
exports.grid = grid;
exports.clean = clean;
exports.build = gulp.series(clean, gulp.parallel(img, font, html, css, js, browser, watch));
exports.default = gulp.parallel(browser, watch);
