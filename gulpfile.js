const babelify = require("babelify");
const browserify = require("browserify");
const browserSync = require("browser-sync");

const { reload } = browserSync;
const source = require("vinyl-source-stream");

const gulp = require("gulp");
const autoprefixer = require("gulp-autoprefixer");
const buffer = require("gulp-buffer");
const cleancss = require("gulp-clean-css");
const concat = require("gulp-concat");
const fileinclude = require("gulp-file-include");
const gulpif = require("gulp-if");
const imagemin = require("gulp-imagemin");
const rename = require("gulp-rename");
const rimraf = require("gulp-rimraf");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const uglify = require("gulp-uglify");

/* --- Paths ---*/

const paths = {
  html: "./templates/**/*",
  images: "./assets/images/**/*",
  fonts: "./assets/fonts/**/*",
  css: {
    files: "./assets/sass/**/*",
    entry: "./assets/sass/site.scss",
    plain: "./assets/sass/css/**/*"
  },
  js: {
    site: "./assets/js/site/**/*",
    entry: "./assets/js/site/index.js",
    lib: "./assets/js/lib/**/*",
    plain: "./assets/js/plain/**/*"
  }
};

const siteDir = "./site/";
const buildDir = siteDir + "static/";

/* --- HTML (file includes) ---*/

gulp.task("html", () =>
  gulp
    .src(paths.html)
    .pipe(
      fileinclude({
        prefix: "@@",
        basepath: "@file"
      })
    )
    .pipe(gulp.dest(siteDir))
    .pipe(reload({ stream: true }))
);

/* --- CSS ---*/

gulp.task("css:site", () =>
  gulp
    .src(paths.css.entry)
    .pipe(
      sass({
        includePaths: ["./node_modules"]
      }).on("error", sass.logError)
    )
    .pipe(autoprefixer())
    .pipe(cleancss({ compatibility: "ie9" }))
    .pipe(rename("site.css"))
    .pipe(gulp.dest(buildDir + "css"))
    .pipe(reload({ stream: true }))
);

/* --- Plain CSS files that just need to be copied ---*/

gulp.task("css:plain", () =>
  gulp
    .src(paths.css.plain)
    .pipe(gulp.dest(buildDir + "css"))
    .pipe(reload({ stream: true }))
);

/* --- JS ---*/

gulp.task("scripts:site", () =>
  browserify({
    entries: paths.js.entry,
    debug: true
  })
    .transform(
      babelify.configure({
        presets: ["@babel/preset-env"],
        sourceMaps: true
      })
    )
    .bundle()
    .pipe(source("app.js"))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest(buildDir + "js"))
    .pipe(reload({ stream: true }))
);

/* --- JS (library files, concatenated) ---*/

gulp.task("scripts:lib", () =>
  gulp
    .src(paths.js.lib)
    .pipe(concat("lib.js"))
    .pipe(gulp.dest(buildDir + "js"))
);

/* --- Plain JS files that just need to be copied ---*/

gulp.task("scripts:plain", () =>
  gulp.src(paths.js.plain).pipe(gulp.dest(buildDir + "js"))
);

/* --- Images ---*/

gulp.task("images", () =>
  gulp
    .src(paths.images)
    .pipe(
      imagemin({
        optimizationLevel: 3,
        progressive: true,
        interlaced: true
      })
    )
    .pipe(gulp.dest(buildDir + "images"))
);

/* --- Fonts ---*/

gulp.task("fonts", () =>
  gulp.src(paths.fonts).pipe(gulp.dest(buildDir + "fonts"))
);

/* --- Watch ---*/

gulp.task("watch", ["default"], () => {
  gulp.watch(paths.html, ["html"]);
  gulp.watch(paths.css.files, ["css:site"]);
  gulp.watch(paths.css.plain, ["css:plain"]);
  gulp.watch(paths.js.plain, ["scripts:plain"]);
  gulp.watch(paths.js.site, ["scripts:site"]);
  gulp.watch(paths.js.lib, ["scripts:lib"]);
  gulp.watch(paths.images, ["images"]);
  browserSync.init({
    watch: true,
    server: siteDir
  });
});

/* --- Clean ---*/

gulp.task("clean", () => gulp.src(siteDir, { read: false }).pipe(rimraf()));

/* --- Default task ---*/

gulp.task("default", ["clean"], () => {
  gulp.start(
    "html",
    "css:site",
    "css:plain",
    "scripts:site",
    "scripts:lib",
    "scripts:plain",
    "images",
    "fonts",
    "watch"
  );
});
