var gulpo = require('gulp');
var svgSprite = require('gulp-svg-sprite');

var config = {
	mode: {
		css:{
			render:{
				css: {
					template: './gulp/templates/sprite.css'
				}
			}
		}
	}
}
gulpo.task('createSprite', function(){
	return gulpo.src('./app/assets/images/icons/**/*.svg')
		.pipe(svgSprite(config))
		.pipe(gulpo.dest('./app/temp/sprite/'));

});


