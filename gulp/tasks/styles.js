var gulp = require('gulp'),postex = require('gulp-postcss'), prefixer = require('autoprefixer')
	varicss = require('postcss-simple-vars'), nestnow = require('postcss-nested'),
	importx = require('postcss-import'), mezclas = require('postcss-mixins'),
	colorcomb = require('postcss-hexrgba');
	


gulp.task('styles', function(){
	return gulp.src('./app/assets/styles/style.css')
	.pipe(postex([importx, mezclas, varicss, nestnow, colorcomb, prefixer]))
	.on('error', function(errorInfo){
		console.log(errorInfo.toString());
		this.emit('end');
	})
	.pipe(gulp.dest('./app/temp/styles'));
});