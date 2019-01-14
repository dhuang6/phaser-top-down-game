var TopDownGame = TopDownGame || {};

//loading the game assets.
TopDownGame.Preload = function(){};

TopDownGame.Preload.prototype = {
	preload: function(){
		//show loading screen
		this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadbar');
		this.preloadBar.anchor.setTo(0.5);
		this.load.setPreloadSprite(this.preloadBar);

		//load game assets starting with the tilemap we previously created.
		this.load.tilemap('level1', 'assets/tilemaps/level1.json', null, Phaser.Tilemap.TILED_JSON);
		//individually load in all the other assets from images after. if the images don't show correctly return here.
		//the first one defines that the tiles we are grabbing are from
		this.load.image('greencup', 'assets/images/greencup.png')
		this.load.image('gameTiles', 'assets/images/tiles.png');
		this.load.image('bluecup', 'assets/images/bluecup.png');
		this.load.image('player', 'assets/images/player.png');
		//changing this to be browndoor fixed the issue.
		this.load.image('browndoor', 'assets/images/browndoor.png');

	},
	create: function(){//after all the stuff is loaded in start the game
		this.state.start('Game');
	},
};