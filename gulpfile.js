const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const babel = require("gulp-babel");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const sourcemaps = require("gulp-sourcemaps");
const imagemin = require("gulp-imagemin");
const htmlmin = require("gulp-htmlmin");
const browsersync = require("browser-sync");
const clean = require("gulp-clean");
const fs = require("fs");
const rename = require('gulp-rename');
const fileinclude = require("gulp-file-include");

const paths = {
  styles: {
    src: {
      scss: "./src/styles/**/*.scss",
      css: "./src/styles/**/*.css",
    },
    dest: "./docs/css",
  },
  scripts: {
    src: "./src/scripts/**/*.js",
    dest: "./docs/js/",
  },
  images: {
    src: "./src/images/**/*",
    dest: "./docs/images/",
  },
  htmls: {
    index: "./src/index.html",
    src: "./src/**/*.html",
    dest: "./docs/",
  },
};

function cleanDist(done) {
  if (fs.existsSync("./docs/") == false) {
    return done();
  }
  return gulp.src("./docs/", { read: false }).pipe(clean());
}

function scss() {
  return gulp
    .src(paths.styles.src.scss)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(
      cleanCSS({
        level: 2,
      })
    )
    .pipe(concat("main.min.css"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browsersync.stream());
}

function css() {
  return gulp
    .src(paths.styles.src.css)
    .pipe(sourcemaps.init())
    .pipe(
      cleanCSS({
        level: 2,
      })
    )
    .pipe(rename(path => path.extname = '.min.css'))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browsersync.stream());
}

function scripts() {
  return gulp
    .src(paths.scripts.src)
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(uglify())
    .pipe(concat("main.min.js"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(browsersync.stream());
}

function images() {
  return gulp
    .src(paths.images.src, { encoding: false })
    .pipe(
      imagemin({
        verbose: true,
      })
    )
    .pipe(gulp.dest(paths.images.dest))
    .pipe(browsersync.stream());
}

function htmls() {
  return gulp
    .src(paths.htmls.index)
    .pipe(fileinclude({
      prefix: '@@',
    }))
    .pipe(
      htmlmin({
        collapseWhitespace: true,
      })
    )
    .pipe(gulp.dest(paths.htmls.dest))
    .pipe(browsersync.stream());
}

function watch() {
  browsersync.init({
    server: {
      baseDir: "./docs/",
    },
  });
  gulp.watch(paths.htmls.dest).on("change", browsersync.reload);
  gulp.watch(paths.htmls.src, htmls);
  gulp.watch(paths.styles.src.scss, scss);
  gulp.watch(paths.styles.src.css, css);
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.images.src, images);
}

const build = gulp.series(
  cleanDist,
  gulp.parallel(htmls, scss, css, scripts, images),
  watch
);

exports.clean = cleanDist;
exports.build = build;
exports.watch = watch;
