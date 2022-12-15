// import functions from gulp
const { src, dest, watch, series } = require('gulp');
// import compiler
const sass = require('gulp-sass')(require('sass'));
const purgecss = require('gulp-purgecss');


function buildStyles() {
    // "*" means anything that ends with the following
    // "**" means subfolders as well
    return src('sass/**/*.scss') // indicate source file
        .pipe(sass()) // run sass function to compile scss to css file
        .pipe(purgecss({ content: ['public/**/*.html'] })) // find all files that end with .html to see which css are used 
        .pipe(dest('public')); // set output css folder
}

// automatically compile scss to css
function watchTask() {
    watch(['sass/**/*.scss', 'public/**/*.html'], buildStyles); // pass in array of files we want to watch, can watch also html files
}

// run functions in order when executed
exports.default = series(buildStyles, watchTask);