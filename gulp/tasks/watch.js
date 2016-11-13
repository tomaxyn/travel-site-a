var gulp = require('gulp'), watcha = require('gulp-watch'),
			browserSync = require('browser-sync').create();

gulp.task('watch', function(){

	browserSync.init({
		notify: false,
		server: {
			baseDir: 'app'
		}
	});
	watcha('./app/index.html', function(){		
		browserSync.reload();
	});
	watcha('./app/assets/styles/**/*.css', function(){
		gulp.start('cssInject')
	});
	watcha('./app/assets/scripts/**/*.js', function() {
		gulp.start('scriptsRefresh');
	});	
});

gulp.task('cssInject', ['styles'], function() {
	gulp.src('./app/temp/styles/style.css')
	.pipe(browserSync.stream());
});

gulp.task('scriptsRefresh', ['scripts'], function() {
	browserSync.reload();
})

