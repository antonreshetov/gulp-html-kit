var gulp        = require('gulp');
var sass        = require('gulp-sass');
var browserSync = require('browser-sync');

gulp.task('browser-sync', ['sass'], function() {
    browserSync({
        server: {
            baseDir: 'app'
        }
    });
});

gulp.task('sass', function () {
  return gulp.src('src/css/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(browserSync.reload({stream:true}))
    .pipe(gulp.dest('app/css'));
});

gulp.task('js', function(){
  return gulp.src('src/js/*.js')
    .pipe(browserSync.reload({stream:true}))
    .pipe(gulp.dest('app/js'));
});

gulp.task('build', function () {
	gulp.src('src/*.html')
    .pipe(browserSync.reload({stream:true}))
		.pipe(gulp.dest('app'));
});

gulp.task('watch', function () {
  gulp.watch('src/css/*.scss', ['sass', 'build', 'js']);
  gulp.watch('src/*.html', ['build']);
  gulp.watch('src/js/*.js', ['build']);
});

gulp.task('app', ['build', 'js' , 'sass']);
gulp.task('default', ['browser-sync', 'watch', 'build', 'js']);
