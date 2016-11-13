var gulpo = require('gulp');
var svgSprite = require('gulp-svg-sprite');
var grename = require('gulp-rename');
var deletion = require('del');

var config = {
	mode: {
		css:{
			sprite: 'sprite.svg',
			render:{
				css: {
					template: './gulp/templates/sprite.css'
				}
			}
		}
	}
}


gulpo.task('beginClean', function(){
	return deletion(['.app/temp/sprite', './app/assets/images/sprites']);
});

gulpo.task('createSprite', ['beginClean'], function(){
	return gulpo.src('./app/assets/images/icons/**/*.svg')
		.pipe(svgSprite(config))
		.pipe(gulpo.dest('./app/temp/sprite/'));
});

gulpo.task('copySpriteGraphic', ['createSprite'], function() {
	return gulpo.src('./app/temp/sprite/css/**/*.svg')
			.pipe(gulpo.dest('./app/assets/images/sprites'));
});

gulpo.task('copySpriteCSS', ['createSprite'], function(){
	return gulpo.src('./app/temp/sprite/css/*.css')
		.pipe(grename('_sprites.css'))
		.pipe(gulpo.dest('./app/assets/styles/modules'));
});

gulpo.task('endClean', ['copySpriteGraphic', 'copySpriteCSS'], function(){
	return deletion('./app/temp/sprite');
});

gulpo.task('icons', ['beginClean', 'createSprite', 'copySpriteGraphic', 'copySpriteCSS', 'endClean']);

