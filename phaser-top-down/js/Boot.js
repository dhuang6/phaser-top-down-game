//in main.js we will set the max size to be 160 by 160
//creating a unique variable to store our game, checks if the game is created otherwise make it.

var TopDownGame = TopDownGame || {};

TopDownGame.Boot = function(){};
//setting the game config and loading the assets for the loading screen.
TopDownGame.Boot.prototype = {
	preload: function(){
		//assets we will use in the loading screen.
		this.load.image('preloadbar', 'assets/images/preloader-bar.png');

	},
	create: function(){
		//loading screen will have a white background.
		this.game.state.backgroundColor = '#fff';

		//scaling options
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;


		//have the game centered horizontally.
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;

		//physics system - you will need to learn more advance ones to resolve the pixel issues with overlap
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		//load this next phase.
		this.state.start('Preload');
	},
}