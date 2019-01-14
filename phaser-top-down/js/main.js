//this js page is for controlling how all the pages get loaded along with Phaser, make sure you have this.
var TopDownGame = TopDownGame || {};

TopDownGame.game = new Phaser.Game(160, 160, Phaser.AUTO, '')

TopDownGame.game.state.add('Boot', TopDownGame.Boot);
TopDownGame.game.state.add('Preload', TopDownGame.Preload);
TopDownGame.game.state.add('Game',TopDownGame.Game);

TopDownGame.game.state.start('Boot');