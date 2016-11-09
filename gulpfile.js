var gulp = require('gulp'), watcha = require('gulp-watch'),
	postex = require('gulp-postcss'), prefixer = require('autoprefixer')
	varicss = require('postcss-simple-vars'), nestnow = require('postcss-nested'),
	importx = require('postcss-import');

gulp.task('default', function() {
  console.log('Hooray - you have created a Gulp Task ataskado');
});

gulp.task('html', function(){
	console.log('Imagine something beautiful being done to your HTML here');
});

gulp.task('styles', function(){
	return gulp.src('./app/assets/styles/style.css')
	.pipe(postex([importx, varicss, nestnow, prefixer]))
	.pipe(gulp.dest('./app/temp/styles'));
});

gulp.task('watch', function(){

	watcha('./app/index.html', function(){
		gulp.start('html');
	})
	watcha('./app/assets/styles/**/*.css', function(){
		gulp.start('styles')
	})
});