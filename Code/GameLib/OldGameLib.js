var canvasMade = 0
var canvasW = 0
var canvasH = 0
var sprites = {}
var spriteNames = []
var canvasVar = ""
var name = "?"
var X = "?"
var Y = "?"
var timer = 0
var renderTime = 0
var mouseDown = 0

function makeCanvas(W,H) {
	if (canvasMade == 0) {
		document.write(`<canvas id="myCanvas" width=` + '"' + W + '" ' + `height=` + '"' + H + '" ' + `
		style="border:1px solid #d3d3d3;">
		Sorry your browser does not seem to support the canvas element.
		</canvas>`)
		var canvas = document.getElementById("myCanvas");
		canvasVar = canvas.getContext("2d");
		console.log("Created canvas")
		console.log("W: " + W)
		console.log("H: " + H)
		canvasW = W
		canvasH = H
		canvasMade = 1
	}
}

//Key Presses
var keyPresses = {}
var keys = []
var key = ""

function keyUp(Key) {
	key = ""
	keyPresses[Key.keyCode] = false
	//var i = 0
	//while(i < keys.length) {
	//	var keyID = keys[i]
	//	if (Key.keyCode == keyID) {
	//		keyPresses[keyID] = False
	//	}
	//	var i = i + 1
	//}
}

function keyDown(Key) {
	key = Key.keyCode
	keyPresses[Key.keyCode] = true
	//var i = 0
	//while(i < keys.length) {
	//	var keyID = keys[i]
	//	if (Key.keyCode == keyID) {
	//		keyPresses[keyID] = True
	//	}
	//	var i = i + 1
	//}
}

function keyPressed() {
	return key
}

function keysDown() {
	var down = []
	var i = 0 
	while(i < keys.length) {
		if (keyPresses[keys[i]]) {
			down[down.length] = keys[i]
		}
		i = i + 1
	}
	return down
}

function newKey(ID) {
	keys[keys.length] = ID
}

function setCos(cos) {
	if (canvasMade == 1) {
		sprites[name]["cos"] = cos
		sprites[name]["cosSet"] = true
	}
}

function setWidth(w) {
	if (canvasMade == 1) {
		sprites[name]["w"] = w
	}
}


function setHeight(h) {
	if (canvasMade == 1) {
		sprites[name]["h"] = h
	}
}

function newSprite(name) {
	if (canvasMade == 1) {
		sprites[name] = {}
		sprites[name]["x"] = 0
		sprites[name]["y"] = 0
		sprites[name]["life"] = 0
		sprites[name]["scripts"] = []
		sprites[name]["cos"] = "?"
		sprites[name]["cosSet"] = false
		sprites[name]["w"] = 100
		sprites[name]["h"] = 100
		spriteNames[spriteNames.length] = name
	}
}



function scripts() {
	var i = 0
	while(i < Object.keys(sprites).length) {
		name = spriteNames[i]
		X = sprites[name]["x"]
		Y = sprites[name]["y"]
		var script = 0
		while(script < Object.keys(sprites[name]["scripts"]).length) {
			eval(sprites[name]["scripts"][script])
			var script = script + 1
		}
		sprites[name]["x"] = X
		sprites[name]["y"] = Y
		sprites[name]["life"] = sprites[name]["life"] + 1
		var i = i + 1
		
	}
	name = "?"
	X = "?"
	Y = "?"
}

function newScript(Sprite, Script) {
	sprites[Sprite]["scripts"][Object.keys(sprites[Sprite]["scripts"]).length] = Script
}

function runCode(sprite,Code) {
	if (sprite != undefined) {
		name = sprite
		eval(Code)
		name = "?"
	}
}

function setX(xPos) {
	if (canvasMade == 1) {
		sprites[name]["x"] = xPos
		X = xPos
	}
}

function setY(yPos) {
	if (canvasMade == 1) {
		sprites[name]["y"] = yPos
		Y = yPos
	}
}

function changeX(num) {
	if (canvasMade == 1) {
		sprites[name]["x"] = X + num
		X = X + num
	}
}

function changeY(num) {
	if (canvasMade == 1) {
		sprites[name]["y"] = Y + num
		Y = Y + num
	}
}

function centre() {
	if (canvasMade == 1) {
		sprites[name]["x"] = sprites[name]["x"] - sprites[name]["w"]/2
		sprites[name]["y"] = sprites[name]["y"] - sprites[name]["h"]/2
	}
}

function centreX() {
	if (canvasMade == 1) {
		sprites[name]["x"] = sprites[name]["x"] - sprites[name]["w"]/2
	}
}

function centreY() {
	if (canvasMade == 1) {
		sprites[name]["y"] = sprites[name]["y"] - sprites[name]["h"]/2
	}
}

function update() {
	timer = 0
	var i = 0
	canvasVar.clearRect(0, 0, canvasW, canvasH)
	while(i < Object.keys(sprites).length) {
		name = spriteNames[i]
		if (sprites[name]["cosSet"]) {
			var img = new Image()
			img.src = sprites[name]["cos"]
			var data = sprites[name]
			canvasVar.drawImage(img, data["x"], data["y"], data["w"], data["h"])
		}
		var i = i + 1
		name = "?"
	}
	renderTime = timer
}

function loop() {
	scripts()
	update()
}

function tick() {
	timer = timer + 10/1000
}

function keyPressed(Key) {
	return keysDown().indexOf(Key) > -1
}

document.addEventListener("keyup", keyUp, false)
document.addEventListener("keydown", keyDown, false)
setInterval(loop, 30)
setInterval(tick, 10)