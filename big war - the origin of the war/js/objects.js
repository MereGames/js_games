//@ objects.js for Big War: The origin of the war
//@ Author - Mere Games or Rodion Kraynov
//@ Site - http://meregames.ru


var buildsGame = [{name: "none"}];

//other objs
var objectsGame = [];

//Baze
var objBaze = {
	x: 64*9,
	y: 64*7,
	radius: 64*3,
	name: "baze",
	timeOut: 0,
	_timeOut: 50,
	num: 0,
	health: 1000,
	_health: 1000,
	type: "player",
	canFaer: false,

	draw: function() {
		if(this.x - this.radius - movAddX <= WIDTH + viewDis && this.x - this.radius - movAddX >= -viewDis && this.y - this.radius - movAddY <= HEIGHT + viewDis && this.y - this.radius - movAddY >= -viewDis) {
		    ctx.drawImage(objectImages[0], this.x - this.radius - movAddX, this.y - this.radius - movAddY);
		    ctx.save();
		    ctx.font = "20px cursive";
		    ctx.textAlign = "center";
		    if(this.num > 0) {
		    	ctx.strokeStyle = "#fff";
		        ctx.fillText(this.num, this.x - this.radius - movAddX + 34, this.y - this.radius - movAddY + 40);
		        ctx.fillStyle = "blue";
		        ctx.fillRect(this.x - this.radius - movAddX + 5, this.y - this.radius - movAddY + 64, this.timeOut, 5);
		        ctx.strokeRect(this.x - this.radius - movAddX + 5, this.y - this.radius - movAddY + 64, this._timeOut, 5);
		        if(this.timeOut < this._timeOut && stopGame == false) {
		        	this.timeOut += 0.5;
		        }else if(this.timeOut >= this._timeOut) {
		        	this.num -= 1;
		        	this.timeOut = 0;
		        	objectsGame.push(new gameObject("robot", objectImages[1], "player", "bliz", this.x + 64, this.y, idMap, 2, 50, 10, 80));
		        }
		    }
		    ctx.restore();

		    ctx.save();
		    ctx.fillStyle = "#0AAC2B";
		    ctx.strokeStyle = "#fff";
		    ctx.fillRect(this.x - this.radius - movAddX + 5, this.y - this.radius - movAddY + 74, this.health/15, 5);
		    ctx.strokeRect(this.x - this.radius - movAddX + 5, this.y - this.radius - movAddY + 74, this._health/15, 5);
		    ctx.restore();
	    }
		if(gameConfig[0].position == "free") {
			for(let i = 0; i < mapsGame[idMap].map.length; i++) {
				for(let j = 0; j < mapsGame[idMap].map.length; j++) {
						if(this.x - 64 - movAddX >= 64 * i - movAddX && this.x - 64 - movAddX <= 64 * i - movAddX + 64 + this.radius &&  this.y - 64 - movAddY >= 64 * j - movAddY && this.y - 64 - movAddY <= 64 * j - movAddY + 64 + this.radius) {
						    mapsGame[idMap].map[i][j].tum = false;
					    }
				}
			}
		}else if(gameConfig[0].position == "level") {
			for(let i = 0; i < levelsPar[select_level].size; i++) {
				for(let j = 0; j < levelsPar[select_level].size; j++) {
						if(this.x - 64 - movAddX >= 64 * i - movAddX && this.x - 64 - movAddX <= 64 * i - movAddX + 64 + this.radius &&  this.y - 64 - movAddY >= 64 * j - movAddY && this.y - 64 - movAddY <= 64 * j - movAddY + 64 + this.radius) {
						    levelsMaps[select_level].map[0].map[i][j].tum = false;
					    }
				}
			}
		}
	}
}

//Baze enemy
var objBazeEnemy = {
	x: 64*20,
	y: 64*20,
	name: "bazeEnemy",
	timeOut: 0,
	_timeOut: 50,
	num: 0,
	health: 1000,
	_health: 1000,
	type: "enemy",
	canFaer: true,
	reload: 30,
	_reload: 30,
	drawBol: true,
	ataca: 5,

	draw: function() {
		if(this.x - movAddX <= WIDTH + viewDis && this.x - movAddX >= -viewDis && this.y - movAddY <= HEIGHT + viewDis && this.y - movAddY >= -viewDis && this.drawBol == true) {
		    ctx.drawImage(objectImages[0], this.x - movAddX, this.y - movAddY);

		    ctx.save();
		    ctx.fillStyle = "red";
		    ctx.strokeStyle = "#fff";
		    ctx.fillRect(this.x - movAddX + 5, this.y - movAddY + 74, this.health/15, 5);
		    ctx.strokeRect(this.x - movAddX + 5, this.y - movAddY + 74, this._health/15, 5);
		    ctx.restore();
	    }

	    if(this.canFaer == true && stopGame == false) {
		    	if(this.reload >= this._reload) {
		    	    objBull.push(new bullet(this.x + 64, this.y + 32, 0, this.type, this.name));
		    	    objBull.push(new bullet(this.x, this.y + 32, 128, this.type, this.name, this.map));
		    	    objBull.push(new bullet(this.x + 32, this.y + 64, 64, this.type, this.name));
		    	    objBull.push(new bullet(this.x + 32, this.y, 192, this.type, this.name));

		    	    this.reload = 0;
		        }
		    }

		    if(this.reload < this._reload && stopGame == false) {
		    	this.reload += 1;
		    }

		    if(gameConfig[0].position == "free" && this.type == "enemy"){
			for(let i = 0; i < mapsGame[idMap].map.length; i++) {
				for(let j = 0; j < mapsGame[idMap].map.length; j++) {
						if(this.x >= 64 * i && this.x <= 64 * i + 64 &&  this.y >= 64 * j && this.y <= 64 * j + 64) {
						    if(mapsGame[idMap].map[i][j].tum == true) {
						    	this.drawBol = false;
						    }else {
						    	this.drawBol = true;
						    }
					    }
				}
			}
		}
	}
}

