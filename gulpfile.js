const gulp = require("gulp");
const gulpif = require("gulp-if");
const jeditor = require("gulp-json-editor");
const zip = require("gulp-zip");

const manifest = require("./src/manifest.json");

const paths = {
    src: "./src/",
    dist: "./dist/"
  };

function buildString() {
    var build = "";
    if (process.env.MANIFEST_VERSION) {
      build = `-mv${process.env.MANIFEST_VERSION}`;
    }
    return build;
  }
  
  function distFileName(browserName, ext) {
    return `dist-${browserName}${buildString()}.${ext}`;
  }

function dist(browserName, manifest) {
    return gulp
      .src(paths.src + "**/*")
      .pipe(gulpif("manifest.json", jeditor(manifest)))
      .pipe(zip(distFileName(browserName, "zip")))
      .pipe(gulp.dest(paths.dist));
  }
  
  function distFirefox() {
    return dist("firefox", (manifest) => {
        // @TODO - Handle MV2 support
      return manifest;
    });
  }
  
  function distOpera() {
    return dist("opera", (manifest) => {
        // @TODO - Handle MV2 support
      return manifest;
    });
  }
  
  function distChrome() {
    return dist("chrome", (manifest) => {
        // @TODO - Handle MV2 support
      return manifest;
    });
  }
  
  function distEdge() {
    return dist("edge", (manifest) => {
        // @TODO - Handle MV2 support
      return manifest;
    });
  }
  exports["dist:firefox"] = distFirefox;
  exports["dist:chrome"] = distChrome;
  exports["dist:opera"] = distOpera;
  exports["dist:edge"] = distEdge;
  exports.dist = gulp.parallel(distFirefox, distChrome, distOpera, distEdge);