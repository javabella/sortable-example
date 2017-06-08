'use strict';

// Зависимости проекта
var gulp = require('gulp');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');
var cleanCSS = require('gulp-clean-css');
var eol = require('gulp-eol');
var autoprefixer = require('gulp-autoprefixer');
var size = require('gulp-size');
var ghPages = require('gulp-gh-pages');
var browserSync = require('browser-sync').create();
var del = require('del');

// Сборка HTML
gulp.task('html', function() {
  return gulp.src('src/*.html')
		.pipe(useref())
		//.pipe(gulpif('*.js', uglify()))
		//.pipe(gulpif('*.css', cleanCSS()))
		.pipe(eol('\r\n'))
		.pipe(gulp.dest('build'));
});

// Компиляция CSS в build
gulp.task('build:css', function () {
  return gulp.src('build/css/*.css')
    .pipe(autoprefixer({
			"browsers": ["last 30 versions", "ie 9"],
			"cascade": true,
			"remove": true
		}))
    .pipe(size({
      title: 'Размер',
      showFiles: true,
      showTotal: false,
    }))
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.stream());
});

// Копирование изображений
gulp.task('img', function (done) {
	gulp.src('src/images/**/*')
    .pipe(gulp.dest('build/images'));
  done();
});

// Очистка папки сборки
gulp.task('clean', function () {
  return del([
    'build/**/*',
    '!build/readme.md'
  ]);
});

// Отправка в GH pages (ветку gh-pages репозитория)
gulp.task('deploy', function() {
  console.log('---------- Публикация ./build/ на GH pages');
  console.log('---------- http://javabella.github.io/sortable-example');
  return gulp.src('./build/**/*')
    .pipe(ghPages());
});

// Перезагрузка в браузере
function reloader(done) {
  browserSync.reload();
  done();
}

// Сборка всего
gulp.task('build', gulp.series('clean', 'html', 'build:css', 'img'));

// Локальный сервер, слежение
gulp.task('serve', gulp.series('build', function() {
  browserSync.init({
    server: 'build',
    port: 3000,
    open: false
  });
  gulp.watch([
    'src/*.html'
  ], gulp.series('html', 'img', reloader));
  gulp.watch(['src/css/**/*'], gulp.series('html', 'build:css'));
  gulp.watch('src/images/**/*', gulp.series('img', reloader));
  gulp.watch('src/js/*.js', gulp.series('html', reloader));
}));

// Задача по умолчанию
gulp.task('default', gulp.series('serve'));