//images aren't loading in / need to figure out wha the issue is.
var TopDownGame = TopDownGame || {};
TopDownGame.Game = function(){};
//title screen
TopDownGame.Game.prototype = {
	create: function(){
		this.map = this.game.add.tilemap('level1');

		//first parameter is the tileset name as specified in Tiled second = key to the asset.
		this.map.addTilesetImage('tiles', 'gameTiles');

		//create layers as defined in Tile
		this.backgroundlayer = this.map.createLayer('backgroundLayer');
		this.blockedLayer = this.map.createLayer('blockedLayer');

		//create collision on blockedLayer
		this.map.setCollisionBetween(1, 2000, true, 'blockedLayer');

		//resizes world to be the same size as map
		this.backgroundlayer.resizeWorld();
		//generate the items
		this.createItems();
		//generate doors
		this.createDoors();

		//creating the player
		var result = this.findObjectsByType('playerStart', this.map, 'objectsLayer')
		console.log(result);
		//we know there is just one result

		this.player = this.game.add.sprite(result[0].x, result[0].y, 'player');
		this.game.physics.arcade.enable(this.player);

		//make the camera follow the player char around
		this.game.camera.follow(this.player);

		//move char around with cursor keys. 

		this.cursors = this.game.input.keyboard.createCursorKeys();
	},

	createItems: function(){
		//create items
		this.items = this.game.add.group();
		this.items.enableBody = true;
		var items;
		result = this.findObjectsByType('item', this.map, 'objectsLayer');
		result.forEach(function(element){
			this.createFromTiledObject(element,this.items);
		}, this);
	},

	//find objects in a tiled layer that contain a property called "type" equal to a certain value. (remake the bitmap and export)
	findObjectsByType: function(type,map,layer){
		var result = new Array();
		map.objects[layer].forEach(function(element){
			console.log(map.objects[layer]);
			console.log(element.properties.type);
			if(element.properties.type === type){
				//phaser uses top left, Tiled bottom left so we have to adjust the y position
				//keep in mind the cup images are bit smaller than the tile which are 16 by 16
				//so they might nit be placed in the exact pixel position as in the tilemap.
				element.y -= map.tileHeight;
				result.push(element);

			}
		});
		//we will get an array of objects as they are represented in assets/tilemaps/level1.json 
		return result; 
	},

	//create a sprite from an object
	createFromTiledObject: function(element,group){
		var sprite = group.create(element.x, element.y, element.properties.sprite);

		//copy all properties to the sprite
		Object.keys(element.properties).forEach(function(key){
			sprite[key] = element.properties[key];
		});
	},
	createDoors: function(){
		//create doors
		this.doors = this.game.add.group();
		this.doors.enableBody = true;
		//named the property brown door
		result = this.findObjectsByType('door', this.map, 'objectsLayer');
		console.log(result);
		result.forEach(function(element){
			this.createFromTiledObject(element,this.doors);
		}, this);
	},

	update: function(){
		//player movement
		this.player.body.velocity.y = 0;
		this.player.body.velocity.x = 0;
		//listen for if the up button is pressed
		if(this.cursors.up.isDown){
			this.player.body.velocity.y -= 50;

		} else if(this.cursors.down.isDown){
			this.player.body.velocity.y += 50;
		}
		if(this.cursors.left.isDown){
			this.player.body.velocity.x -= 50;
		} 
		else if(this.cursors.right.isDown){
			this.player.body.velocity.x += 50;
		}

		//collision
		this.game.physics.arcade.collide(this.player, this.blockedLayer);
		this.game.physics.arcade.overlap(this.player, this.items, this.collect, null, this);
		this.game.physics.arcade.overlap(this.player, this.doors, this.enterDoor, null, this);
	},
	collect: function(player,collectable){
		//confirm the item is grabbed
		console.log('yummy!');

		//remove the sprite
		collectable.destroy();
	},
	enterDoor: function(player, door){
		console.log('entering door that will take you to' + door.targetTilemap+'on x: ' + door.targetX + ' and y: ' + door.targetY);
	},
}










