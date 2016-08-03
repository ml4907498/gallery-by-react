var gulp = require('gulp'),
    connect = require('gulp-connect'),
    concat = require('gulp-concat'),
    browserify = require('gulp-browserify'),
    port = process.env.port || 5000;

gulp.task('browserify', function() {
    gulp.src('./app/js/main.js')
        .pipe(browserify({
            transform: 'reactify',
        }))
        .pipe(gulp.dest('./dist/js'))
});

gulp.task('connect', function() {
    connect.server({
        port: port,
        livereload: true,
    })
});


gulp.task('js', function() {
    gulp.src('./dist/**/*.js')
        .pipe(connect.reload())
});


gulp.task('html', function() {
    gulp.src('./dist/**/*.html')
        .pipe(connect.reload())
});


gulp.task('watch', function() {
    gulp.watch('./dist/**/*.js', ['js']);
    gulp.watch('./app/**/*.html', ['html']);
    gulp.watch('./app/js/**/*.js', ['browserify']);
    gulp.watch('./app/css/*.css', ['browserify']);
})

gulp.task('default', ['browserify']);

gulp.task('serve', ['browserify', 'connect', 'watch']);
