const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');

function comprimeJavaScript(){
    return gulp.src('./source/scripts/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./build/styles'));
}

// Função para compilar SASS
function compilaSass() {
    return gulp.src('./source/styles/main.scss') // Onde estão seus arquivos .scss
    .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError)) // Compila e trata erros
        .pipe(sourcemaps.write('.maps'))
        .pipe(gulp.dest('./build/styles')); // Onde salvar o CSS
}

// Função para observar mudanças
function watchFiles() {
    gulp.watch('./source/styles/*.scss', compilaSass);
}

// Exporta as funções para o Gulp
exports.default = gulp.series(compilaSass, watchFiles);
exports.watch = watchFiles;
gulp.task('sass', compilaSass);
exports.watch = function () {
    gulp.watch('./source/styles/*.scss',gulp.series(compilaSass));
}

exports.javascript = comprimeJavaScript;
