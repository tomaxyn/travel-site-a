var gulp = require('gulp');
var webpacke = require('webpack');


gulp.task('scripts',['modernizr'], function(callback) {
	webpacke(require('../../webpack.config.js'), function(err, stats) {
		if (err) {
			console.log(err.toString());
		}
		console.log(stats.toString());
			callback();
	});
});


