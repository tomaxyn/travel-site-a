var gulpo = require('gulp');
var svgSprite = require('gulp-svg-sprite');
var grename = require('gulp-rename');
var deletion = require('del');
var svg2png = require('gulp-svg2png');


var config = {
	shape: {
		spacing: {
			padding: 1
		}
	},
	mode: {
		css:{
			variables: {
				replaceSvgWithPng: function() {
					return function(sprite, render) {
						return render(sprite).split('.svg').join('.png')
					}
				}
			},
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

gulpo.task('createPngCopy', ['createSprite'], function() {
    return gulpo.src('./app/temp/sprite/css/*.svg')
        .pipe(svg2png())
        .pipe(gulpo.dest('./app/temp/sprite/css'));
    
});

gulpo.task('copySpriteGraphic', ['createPngCopy'], function() {
	return gulpo.src('./app/temp/sprite/css/**/*.{svg,png}')
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

gulpo.task('icons', ['beginClean', 'createSprite', 'createPngCopy', 'copySpriteGraphic', 'copySpriteCSS', 'endClean']);

