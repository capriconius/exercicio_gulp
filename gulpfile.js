const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg').default; 
const imageminPngquant = require('imagemin-pngquant').default;


function comprimeImagens() {
    return gulp.src('./source/images/**/*.{jpg,jpeg,png}')
        .pipe(imagemin([
            imageminMozjpeg({ quality: 75, progressive: true }),
            imageminPngquant({ quality: [0.6, 0.8] })
        ], {
            verbose: true
        }))
        .pipe(gulp.dest('./build/images'));
}


function comprimeJavaScript() {
    return gulp.src('./source/scripts/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./build/scripts'));
}


function compilaSass() {
    return gulp.src('./source/styles/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./build/styles'));
}


exports.default = function() {
    gulp.watch('./source/styles/**/*.scss', { ignoreInitial: false }, gulp.series(compilaSass));
    gulp.watch('./source/scripts/*.js', { ignoreInitial: false }, gulp.series(comprimeJavaScript));
    gulp.watch('./source/images/**/*.{jpg,jpeg,png}', { ignoreInitial: false }, gulp.series(comprimeImagens));
};


exports.images = comprimeImagens;
exports.comprimeJavaScript = comprimeJavaScript;
exports.compilaSass = compilaSass;
