const del = require("del");
const gulp = require("gulp");
const webpack = require("webpack");
const webpack_stream = require("webpack-stream");
const eslint = require("gulp-eslint");

/**
 * Define public tasks of gulp
 */

/**
 * A public task to build a package in production mode
 */
exports.build = gulp.series(clean, gulp.parallel(eslintJS, buildJS));

/**
 * End public tasks' definition
 */

/**
 * Define private tasks of gulp
 */

/**
 * A private task to clean old files before building new ones
 */
function clean() {
    return del(["./dist/*"]);
}

/**
 * A private task to run eslint check for JS code
 */
function eslintJS() {
    return gulp
        .src("./src/**/*.js", { base: "src" })
        .pipe(
            eslint({
                configFile: "./.eslintrc.js"
            })
        )
        .pipe(eslint.format());
}

/**
 * A private code to build JS code
 */
function buildJS() {
    let output_dir = "./dist/";
    let webpack_config = require("./webpack.config.js");

    return gulp
        .src("./src/**/*.js", { base: "src" })
        .pipe(webpack_stream(webpack_config, webpack))
        .pipe(gulp.dest(output_dir))
        .on("error", error => log(error));
}

/**
 * End private tasks' definition
 */

// Wrapper of process.stdout.write.
function log(d) {
    process.stdout.write(d + "\n");
}
