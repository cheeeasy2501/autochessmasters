var gulp = require('gulp'); // сборщик
var sass = require('gulp-sass'); // сборщик в файл sass
var autoprefixer = require('gulp-autoprefixer');//автопрефиксы (даже для IE)
var csso = require('gulp-csso');// оптимизирует и сжимает css
var concat = require('gulp-concat'); // клеим файлы
var browserSync = require('browser-sync').create();

gulp.task('sass', async function(){
 gulp.src('./css/*.scss')
     .on('error', function (err) {
         console.error('Error!', err.message);
     })
 .pipe(sass())
 .pipe(concat('styles.css'))
 .pipe(autoprefixer(
 {
	   overrideBrowserslist: [ 'Android 2.3',
      'Android >= 4',
      'Chrome >= 20',
      'Firefox >= 24', // Firefox 24 is the latest ESR
      'Explorer >= 8',
      'iOS >= 6',
      'Opera >= 12',
      'Safari >= 6'],
	   grid: ['autoplace'] //включает grid для IE
 }
 ))
  /*.pipe(csso())*/
 .pipe(gulp.dest('./css')) //отправляет в папку css
     .pipe(browserSync.stream());
});

gulp.task('sass:watch', async function() // пишем в cmd npm gulp sass:watch  и работаем
{
	gulp.watch(['./css/*.scss'],gulp.parallel('sass'));
}
);
