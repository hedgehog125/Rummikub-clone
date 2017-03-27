


//TODO:
//  + Text. - Done.
//  + Documentation. - Done for now.
//  + Box touching. And at some point a better touching thing. - Done. - Advanced not working.
//  + Clones. - Done.
//  + Hiding and showing. - Done.
//  + Loops and delays. - Doing now.
//  + Fullscreen.
//  + Global and local vars.
//  + Turtle pen functions. - Half done. - Make it more efficient. - Will do this another time.
//  + Command list.


var canvasMade = 0
var canvasW = 0
var canvasH = 0
var sprites = {}
var spriteNames = []
var canvasVar = "?"
var name = "?"
var X = "?"
var Y = "?"
var Dir = "?"
var mouseX = "?"
var mouseY = "?"
var timer = 0
var renderTime = 0
var click = 0
var draw = []
var text = []
var textNames = []
var font = "Gloria"
var centred = false
var data = ""
var loadName = ""
var imageID = ""
var img = ""
var pen = []
var penColour = "#FF0000"
var bgColour = "#FFFFFF"
var penSize = 1
var clearLines = false
var controls = true
var running = false
var controlList = []
var runs = 0
var controlsY = 0
var debug = false
var autoHide = true
var hideSpeed = 2
var stoped = ""
var loadList = {"touch":[]}
var loadIndex = {"touch":[]}
var touchList = {}
var hitboxes = false
var setName = ""
var canvas = ""
var textColour = "#000000"
var id = "?"
var Mode = "?"
var fullscreen = false
var lastW = ""
var lastH = ""
var updateScripts = []
var title = "GameLib.js Game"

document.write(`<p style="text-align: center;" id="Load">Loading... 0%<br></p>`)

function addControl(img,w,h,xpos,ypos,code) {
	controlList[Object.keys(controlList).length] = []
	controlList[Object.keys(controlList).length-1]["img"] = new Image()
	controlList[Object.keys(controlList).length-1]["img"].src = img
	controlList[Object.keys(controlList).length-1]["w"] = w
	controlList[Object.keys(controlList).length-1]["h"] = h
	controlList[Object.keys(controlList).length-1]["x"] = xpos
	controlList[Object.keys(controlList).length-1]["y"] = ypos
	controlList[Object.keys(controlList).length-1]["cos"] = img
	controlList[Object.keys(controlList).length-1]["code"] = code
	controlList[Object.keys(controlList).length-1]["click"] = 0
	
}
// Load the controls.
var path = "SYS Files/"
function loadControls() {
	var Code = function() { if (leftMouseDown()) {
			if ((mouseX >= X & mouseX <= X + W) | (runs === 0 & (mouseX >= 0 & mouseX <= canvasW))) {
				if (((mouseY >= Y & mouseY <= Y + H) & (mouseX >= X & mouseX <= X + W)) | (runs === 0 & (mouseY >= 20 & mouseY <= canvasH))) {
					if (controlList[i]["click"] == 0) {
						stoped = ""
						var counter = 0
						while(counter < soundsPlaying) {
							if (soundData[counter] != undefined) {
								stop(counter)
							}
							var counter = counter + 1
						}
						var counter = 0
						while(counter < Object.keys(sprites).length) {
							var name = spriteNames[counter]
							sprites[name]["life"] = 0
							var id = 0
							sprites[name]["clones"] = []
							sprites[name]["cloneCount"] = 0
							var counter = counter + 1
						}
						var name = ""
						running = true
						reset()
						controlList[3]["img"] = undefined
						controlList[3]["img"] = new Image()
						controlList[3]["img"].src = path + "Pause.png"
						controlList[3]["cos"] = path + "Pause.png"
						runs = runs + 1
						controlList[i]["click"] = 1
					}
				}
		
			}
		}
		if (leftMouseDown() == false) {
			controlList[i]["click"] = 0
		}
	}
	addControl(path + "Bar.png",0,305,-10,-2,function() {})
	addControl(path + "Flag.png",15,20,5,2,Code)
	var Code = function() { 
		if (leftMouseDown()) {
			if (mouseX >= X & mouseX <= X + W) {
				if (mouseY >= Y & mouseY <= Y + H) {
					if (controlList[i]["click"] == 0) {
						running = false	
						controlList[3]["img"] = undefined
						controlList[3]["img"] = new Image()
						controlList[3]["img"].src = path + "Resume.png"
						controlList[3]["cos"] = path + "Resume.png"
						stoped = "stoped"
						var counter = 0
						while(counter < soundsPlaying) {
							if (soundData[counter] != undefined) {
								stop(counter)
								
							}
							var counter = counter + 1
						}
						controlList[i]["click"] = 1
					}
				}
			}
		}
		if (leftMouseDown() == false) {
			controlList[i]["click"] = 0
		}
	}
	addControl(path + "Stop.png",20,20,0,2,Code)
	var Code = function () { if (leftMouseDown()) {
		if (controlList[i]["click"] == 0) {
			if (mouseX >= X & mouseX <= X + W) {
				if (mouseY >= Y & mouseY <= Y + H) {
					controlList[i]["click"] = 1
					if (stoped == "") {
						if (controlList[i]["cos"] == path + "Resume.png") {
							running = true
							controlList[i]["img"] = undefined
							controlList[i]["img"] = new Image()
							controlList[i]["img"].src = path + "Pause.png"
							controlList[i]["cos"] = path + "Pause.png"
							stoped = ""
							if (runs == 0) {
								reset()
							}
							var counter = 0
							while(counter < soundsPlaying) {
								if (soundData[counter] != undefined) {
									resume(counter)
								}
								var counter = counter + 1
							}
					
						}
						else {
							running = false
							controlList[i]["img"] = undefined
							controlList[i]["img"] = new Image()
							controlList[i]["img"].src = path + "Resume.png"
							controlList[i]["cos"] = path + "Resume.png"
							stoped = ""
							var counter = 0
							while(counter < soundsPlaying) {
								if (soundData[counter] != undefined) {
									pause(counter)
								}
								var counter = counter + 1
							}
						}
						if (runs == 0) {
							runs = 1
						}
					}
				}
		
			}
		}
	}
	if (leftMouseDown() == false) {
		controlList[i]["click"] = 0
	}
	}
	addControl(path + "Resume.png",25,25,0,0,Code)
}
// Keep track of the sounds playing and other info.
var soundsPlaying = 0
var sounds = []
var delay = []
var delayRestart = []
var delays = []
var looping = []
var files = []
var delayRestartPos = []
var soundData = []
var sounds = []
// A few other vars
var ID
var delayTime



function makeCanvas(W,H) {
	if (canvasMade == 0) {
		document.write(`<p style="text-align: center;"><canvas id="myCanvas" width=` + '"' + W + '" ' + `height=` + '"' + H + '" ' + `
		>
		Sorry, your browser does not seem to support the HTML5 canvas element. <br>
		You may need to update your browser. <br>
		Internet Explorer users: <br>
		You need at least version 8. <br>
		</canvas></p>`)
		canvas = document.getElementById("myCanvas")
		canvasVar = canvas.getContext("2d")
		if (debug) {
			console.log("Created canvas")
			console.log("W: " + W)
			console.log("H: " + H)
		}
		canvasW = W
		canvasH = H
		canvasVar.imageSmoothingQuality = "high"
		loadControls()
		controlList[0]["w"] = W+20
		controlList[2]["x"] = W-30
		controlList[3]["x"] = (W/2)-20
		window.onload = load
		canvasMade = 1
		document.write("<head><title>" + title + "</title></head>")
	}
}


//Key Presses
var keyPresses = {}
var keys = []
var key = ""

function keyUp(Key) {
	key = ""
	keyPresses[Key.keyCode] = false
	//i = 0
	//while(i < keys.length) {
	//	var keyID = keys[i]
	//	if (Key.keyCode == keyID) {
	//		keyPresses[keyID] = False
	//	}
	//	i++
	//}
}

function keyDown(Key) {
	key = Key.keyCode
	keyPresses[Key.keyCode] = true
	//i = 0
	//while(i < keys.length) {
	//	var keyID = keys[i]
	//	if (Key.keyCode == keyID) {
	//		keyPresses[keyID] = True
	//	}
	//	i++
	//}
}

function currentKeyPressed() {
	return key
}

function keysDown() {
	var down = []
	i = 0 
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
		if (id === -1) {
			sprites[name]["cos"] = cos
			sprites[name]["cosSet"] = true
			sprites[name]["img"] = new Image()
			sprites[name]["img"].src = cos
		}
		else {
			sprites[name]["clones"][id]["cos"] = cos
			sprites[name]["clones"][id]["cosSet"] = true
			sprites[name]["clones"][id]["img"] = new Image()
			sprites[name]["clones"][id]["img"].src = cos	
		}
	}
}

function DegToRadian(D) {
	return (D * Math.PI)/180
}

function drawRotated(IMG, deg, x, y, w, h, style) {
	if (style === 0) {
		if (deg === 0) {
			canvasVar.drawImage(IMG, x-(w/2), y-(h/2), w, h)
		}
		else {
			rad = DegToRadian(deg)
			canvasVar.save()
			canvasVar.translate(x,y)
			canvasVar.rotate(rad)
			canvasVar.drawImage(IMG, 0-(w/2), 0-(h/2), w, h)
			canvasVar.restore()
		}
	}
	else {
		if (style === 1) {
			canvasVar.save()
			if (deg >= 180) {
				canvasVar.translate(w,0)
				canvasVar.scale(-1,1)
				canvasVar.drawImage(IMG, 0-(x-(w/2)), y-(h/2), w, h)
			}
			else {
				canvasVar.drawImage(IMG, x-(w/2), y-(h/2), w, h)
			}
			canvasVar.restore()
		}
		else {
			canvasVar.drawImage(IMG,  x-(w/2),  y-(h/2), w, h)
		}
	}
}

function setWidth(w) {
	if (canvasMade == 1) {
		if (id === -1) {
			sprites[name]["w"] = w
		}
		else {
			sprites[name]["clones"][id]["w"] = w
		}
	}
}

function changeWidth(w) {
	if (canvasMade == 1) {
		if (id === -1) {
			setWidth(sprites[name]["w"] + w)
		}
		else {
			setWidth(sprites[name]["clones"][id]["w"] + w)
		}
	}
}

function changeHeight(h) {
	if (canvasMade == 1) {
		if (id === -1) {
			setHeight(sprites[name]["h"] + h)
		}
		else {
			setHeight(sprites[name]["clones"][id]["h"] + h)
		}
	}
}

function setHeight(h) {
	if (canvasMade == 1) {
		if (id === -1) {
			sprites[name]["h"] = h
		}
		else {
			sprites[name]["clones"][id]["h"] = h
		}
	}
}

function penDown() {
	console.log("Pen comming soon.")
	//sprites[name]["penDown"] = true
}

function penUp() {
	console.log("Pen comming soon.")
	//sprites[name]["line"] = []
	//sprites[name]["penDown"] = false
}

function isPenDown() {
	console.log("Pen comming soon.")
	//return sprites[name]["penDown"]
}

function clearPen() {
	console.log("Pen comming soon.")
	//pen = []
	//clearLines = true
}

function setPenSize(PenSize) {
	console.log("Pen comming soon.")
	//penSize = PenSize
}

function turtle_init() {
	if (sprites[name]["penDown"] & ~ clearLines) {
		draw = sprites[name]["line"]
		if (draw.length == 0) {
			draw[0] = X + sprites[name]["w"]/2
			draw[1] = Y + sprites[name]["h"]/2
		}
		else {
			draw[2] = X + sprites[name]["w"]/2
			draw[3] = Y + sprites[name]["h"]/2
		}
		if (draw.length >= 4) {
			pen[pen.length-1]["x2"] = draw[2]
			pen[pen.length-1]["y2"] = draw[3]
			if (draw[4] == undefined) {
				draw[4] = X
				draw[5] = Y
				draw[6] = 0
				draw[7] = true
			}
			var X1 = draw[2] - draw[0]
			var Y1 = draw[3] - draw[1]
			var slope = convertNum(X1/Y1)
			if (draw[7]) {
				draw[6] = slope
				draw[7] = false
				draw[8] = [X1,Y1]
			}
			var endline = false
			if (~ (draw[8][0] == 0|draw[8][1] == 0)) {
				if (draw[6] =! slope) {
					var endline = true
				}	
			}
			
			if (endline) {
				draw = []
				draw[draw.length] = X + sprites[name]["w"]/2
				draw[draw.length] = Y + sprites[name]["h"]/2
				pen[pen.length] = []
				pen[pen.length-1]["x1"] = draw[0]
				pen[pen.length-1]["y1"] = draw[1]
				pen[pen.length-1]["x2"] = draw[2]
				pen[pen.length-1]["y2"] = draw[3]
				pen[pen.length-1]["colour"] = penColour
				pen[pen.length-1]["size"] = penSize
			}
			else {
				pen[pen.length-1]["x2"] = draw[2]
				pen[pen.length-1]["y2"] = draw[3]
			}
		}
		else {
			pen[pen.length] = []
			pen[pen.length-1]["x1"] = draw[0]
			pen[pen.length-1]["y1"] = draw[1]
			pen[pen.length-1]["x2"] = draw[0]
			pen[pen.length-1]["y2"] = draw[1]
			pen[pen.length-1]["colour"] = penColour
			pen[pen.length-1]["size"] = penSize
		}
		sprites[name]["line"] = draw
		draw = undefined
	}
}


function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}

function newSprite(name) {
	if (canvasMade == 1) {
		sprites[name] = {}
		sprites[name]["x"] = 0
		sprites[name]["y"] = 0
		sprites[name]["dir"] = 0
		sprites[name]["rotStyle"] = 0
		sprites[name]["penDown"] = false
		sprites[name]["line"] = []
		sprites[name]["life"] = 0
		sprites[name]["scripts"] = []
		sprites[name]["reset"] = []
		sprites[name]["cos"] = "?"
		sprites[name]["cosSet"] = false
		sprites[name]["w"] = 100
		sprites[name]["h"] = 100
		sprites[name]["clones"] = []
		sprites[name]["cloneCount"] = 0
		sprites[name]["show"] = true
		sprites[name]["effects"] = {"ghost":0}
		sprites[name]["loops"] = []
		sprites[name]["future"] = []
		spriteNames[spriteNames.length] = name
		var img = new Image()
		sprites[name]["img"] = img
	}
}

function getMyImageData() {
	//console.log(name)
	//var img = new Image()
	//img.src = sprites[name]["cos"]
	//loadName = name
	//imageID = img.crossOrigin
	//img.onload = function() {
	//	img.crossOrigin = "Anonymous"
	//	data =  canvasVar.getImageData(0,0,sprites[loadName]["w"],sprites[loadName]["h"]).data
	//	canvasVar.clearRect(0, 0, canvasW, canvasH)
	//	img = ""
	//	//imageID = ""
	//	loadName = ""
		
	//}
}

function newLoop(Code,count,AfterCode) {
	if (Mode === "Sprite") {
		getSpriteData(name,"loops",id)[getSpriteData(name,"loops",id).length] = [Code,AfterCode,count]
	}
}

function future(Code,delay) {
	if (Mode === "Sprite") {
		getSpriteData(name,"future",id)[getSpriteData(name,"future",id).length] = [Code,(delay*30)]
	}
}


function scripts() {
	i = 0
	var cleared = 0
	if (running) {
		while(i < Object.keys(sprites).length) {
			name = spriteNames[i]
			X = sprites[name]["x"]
			Y = sprites[name]["y"]
			Dir = sprites[name]["dir"]
			Mode = "Sprite"
			if (clearLines) {
				sprites[name]["line"] = []
				cleared++
			}
			id = -1
			var script = 0
			while(script < Object.keys(sprites[name]["scripts"]).length) {
				sprites[name]["scripts"][script]()
				var script = script + 1
			}
			
			var script = 0
			while(script < Object.keys(sprites[name]["loops"]).length) {
				if (sprites[name]["loops"][script] != undefined) {
					sprites[name]["loops"][script][0]()
					sprites[name]["loops"][script][2]--
					if (sprites[name]["loops"][script][2] < 1) {
						sprites[name]["loops"][script][1]()
						if (sprites[name]["loops"].length === 1) {
							sprites[name]["loops"] = []
						}
						else {
							delete sprites[name]["loops"][script]
						}
					}
				}
				script++
			}
			var script = 0
			while(script < Object.keys(sprites[name]["future"]).length) {
				if (sprites[name]["future"][script] != undefined) {
					sprites[name]["future"][script][1]--
					if (sprites[name]["future"][script][1] < 1) {
						sprites[name]["future"][script][0]()
						if (sprites[name]["future"].length === 1) {
							sprites[name]["future"] = []
						}
						else {
							delete sprites[name]["future"][script]
						}
					}
				}
				script++
			}
			
			id = 0
			sprites[name]["x"] = X
			sprites[name]["y"] = Y
			sprites[name]["dir"] = Dir
			sprites[name]["life"] = sprites[name]["life"] + 1
			while(id < cloneCountDev(name)) {
				if (sprites[name]["clones"][id] !== undefined) {
					X = sprites[name]["clones"][id]["x"]
					Y = sprites[name]["clones"][id]["y"]
					Dir = sprites[name]["clones"][id]["dir"]
					var script = 0
					while(script < Object.keys(sprites[name]["scripts"]).length) {
						sprites[name]["scripts"][script]()
						var script = script + 1
					}
					if (sprites[name]["clones"][id] !== undefined) {
						sprites[name]["clones"][id]["life"] = sprites[name]["clones"][id]["life"] + 1
					}
				}
				id = id + 1
			}
			i++
		
		}
		id = "?"
		name = "?"
		X = "?"
		Y = "?"
		Dir = "?"
		Mode = "Text"
		i = 0
		while(i < Object.keys(text).length) {
			name = textNames[i]
			X = text[name]["x"]
			Y = text[name]["y"]
			var script = 0
			while(script < Object.keys(text[name]["scripts"]).length) {
				text[name]["scripts"][script]()
				var script = script + 1
				text[name]["x"] = X
				text[name]["y"] = Y
				text[name]["life"] = text[name]["life"] + 1
			}
			i++
		}
		name = "?"
		X = "?"
		Y = "?"
		if (clearLines) {
			if (cleared == Object.keys(sprites).length) {
				clearLines = false
			}
		}
	}
	if (controls) {
		i = 0
		while(i < Object.keys(controlList).length) {
			W = controlList[i]["w"]
			H = controlList[i]["h"]
			X = controlList[i]["x"]
			Y = controlList[i]["y"]
			controlList[i]["code"]()
			i++
		}
	}
	X = "?"
	Y = "?"
	W = "?"
	H = "?"
	if (autoHide & runs > 0) {
		barThing()
	}
}

function reset() {
	i = 0
	var X1 = X
	var Y1 = Y
	Mode = "Sprite"
	while(i < Object.keys(sprites).length) {
		name = spriteNames[i]
		X = sprites[name]["x"]
		Y = sprites[name]["y"]
		Dir = sprites[name]["dir"]
		id = -1
		var script = 0
		while(script < sprites[name]["reset"].length) {
			sprites[name]["reset"][script]()
			var script = script + 1
		}
		i++
		name = "?"
		Dir = "?"
	}
	i = 0
	Mode = "Text"
	while(i < Object.keys(text).length) {
		name = textNames[i]
		X = text[name]["x"]
		Y = text[name]["y"]
		var script = 0
		while(script < text[name]["reset"].length) {
			text[name]["reset"][script]()
			var script = script + 1
		}
		i++
		
	}
	X = X1
	Y = Y1
	id = "?"
}

function newScript(Sprite, Script) {
	sprites[Sprite]["scripts"][Object.keys(sprites[Sprite]["scripts"]).length] = Script
}

function newTextScript(Text, Script) {
	text[Text]["scripts"][Object.keys(text[Text]["scripts"]).length] = Script
}

function getSpriteData(Sprite, Data, id) {
	if (id === undefined | id === -1) {
		return sprites[Sprite][Data]
	}
	else {
		if (sprites[Sprite]["clones"][id] != undefined) {
			return sprites[Sprite]["clones"][id][Data]
		}
	}
}

function newResetScript(sprite,Code) {
	if (sprite != undefined) {
		name = sprite
		sprites[name]["reset"][sprites[name]["reset"].length] = Code
	}
}

function newTextResetScript(Text,Code) {
	if (Text != undefined) {
		text[Text]["reset"][text[Text]["reset"].length] = Code
	}
}

function setX(xPos) {
	if (canvasMade == 1) {
		if (id === -1) {
			sprites[name]["x"] = xPos
			X = xPos
			turtle_init()
		}
		else {
			if (Mode !== "Text") {
				sprites[name]["clones"][id]["x"] = xPos
				X = xPos
				turtle_init()
			}
			else {
				text[name]["x"] = xPos
			}
		}
	}
}

function setText(Text) {
	if (canvasMade == 1) {
		text[name]["text"] = Text
	}
}

function setY(yPos) {
	if (canvasMade == 1) {
		if (id === -1) {
			sprites[name]["y"] = yPos
			Y = yPos
			turtle_init()
		}
		else {
			if (Mode !== "Text") {
				sprites[name]["clones"][id]["y"] = yPos
				Y = yPos
				turtle_init()
			}
			else {
				text[name]["y"] = yPos
				Y = yPos
			}
		}
	}
}

function setDir(Direction) {
	if (canvasMade == 1) {
		if (id === -1) {
			sprites[name]["dir"] = Direction
			Dir = Direction
			Dir = Dir % 360
		}
		else {
			sprites[name]["clones"][id]["dir"] = Direction
			Dir = Direction
			Dir = Dir % 360	
		}
	}
}

function turn(Deg) {
	if (canvasMade == 1) {
		if (id === -1) {
			sprites[name]["dir"] = Dir + Deg
			Dir = Dir + Deg
			Dir = Dir % 360
		}
		else {
			sprites[name]["clones"][id]["dir"] = Dir + Deg
			Dir = Dir + Deg
			Dir = Dir % 360
		}
	}
}

function move(Pix) {
	if (canvasMade == 1) {
		Rad = convertNum(DegToRadian(Dir))
		var moveAmount = convertNum(Pix * Math.cos(Rad))
		changeX(moveAmount)
		var moveAmount = convertNum(Pix * Math.sin(Rad))
		changeY(moveAmount)
	}
}

function distanceTo(xpos,ypos) {
	return convertNum(Math.abs(xpos - X)) + convertNum(Math.abs(ypos - Y))
}

function scale(Percent) {
	var multiply = Percent/100
	setWidth(sprites[name]["w"] * multiply)
	setHeight(sprites[name]["h"] * multiply)
}

function pointXY(pointX, pointY) {
	if (canvasMade == 1) {
		setDir(Math.degrees(Math.atan(pointY - Y / pointX - X)))
	}
}

function changeX(num) {
	if (canvasMade == 1) {
		if (id === -1) {
			sprites[name]["x"] = X + num
			X = X + num
			turtle_init()
		}
		else {
			if (Mode !== "Text") {
				sprites[name]["clones"][id]["x"] = X + num
				X = X + num
				turtle_init()
			}
			else {
				text[name]["x"] = X + num
				X = X + num
			}
		}
	}
}

function changeY(num) {
	if (canvasMade == 1) {
		if (id === -1) {
			sprites[name]["y"] = Y + num
			Y = Y + num
			turtle_init()
		}
		else {
			if (Mode === "Text") {
				text[name]["y"] = Y + num
				Y = Y + num
			}
			else {
				sprites[name]["clones"][id]["y"] = Y + num
				Y = Y + num
				turtle_init()
			}
		}
	}
}

function convertNum(number) {
	if (isNaN(number)) {
		return 0
	}
	return number
}

function centre() {
	if (canvasMade == 1) {
		if (id === -1) {
			X = X - (sprites[name]["w"]/2)
			sprites[name]["x"] = X
			Y = Y - (sprites[name]["h"]/2)
			sprites[name]["y"] = Y
		}
		else {
			sprites["clones"][id][name]["x"] = sprites[name]["clones"][id]["x"] - sprites[name]["clones"][id]["w"]/2
			X = sprites[name]["clones"][id]["x"] - sprites[name]["clones"][id]["w"]/2
			sprites[name]["clones"][id]["y"] = sprites[name]["clones"][id]["y"] - sprites[name]["clones"][id]["h"]/2	
			Y = sprites[name]["clones"][id]["y"] - sprites[name]["clones"][id]["h"]/2
		}
	}
}

function centreX() {
	if (canvasMade == 1) {
		if (id === -1) {
			sprites[name]["x"] = sprites[name]["x"] - sprites[name]["w"]/2
			X = sprites[name]["x"] - sprites[name]["w"]/2
		}
		else {
			sprites[name]["clones"][id]["x"] = sprites[name]["clones"][id]["x"] - sprites[name]["clones"][id]["w"]/2
			X = sprites[name]["clones"][id]["x"] - sprites[name]["clones"][id]["w"]/2
		}
	}
}

function centreY() {
	if (canvasMade == 1) {
		if (id === -1) {
			sprites[name]["y"] = sprites[name]["y"] - sprites[name]["h"]/2
			Y = sprites[name]["y"] - sprites[name]["h"]/2
		}
		else {
			sprites[name]["clones"][id]["y"] = sprites[name]["clones"][id]["y"] - sprites[name]["clones"][id]["h"]/2
			Y = sprites[name]["clones"][id]["y"] - sprites[name]["clones"][id]["h"]/2
		}
	}
}

function newUpdateScript(Code) {
	updateScripts[updateScripts.length] = Code
}

function update() {
	if (canvasMade == 1) {
		timer = new Date()
		timer = timer.getMilliseconds()
		var realW = canvas.width
		var realH = canvas.height
		canvasVar.fillStyle = bgColour
		canvasVar.beginPath()
		canvasVar.rect(0, 0, canvas.width, canvas.height)
		canvasVar.fill()
		if (runs != 0) {
			var script = 0
			while(script < updateScripts.length) {
				updateScripts[script]()
				script++
			}
			i = 0
			while(i < Object.keys(sprites).length) {
				name = spriteNames[i]
				if (sprites[name]["cosSet"] & sprites[name]["show"]) {
					id = -1
					var img = sprites[name]["img"]
					img.src = sprites[name]["cos"]
					var data = sprites[name]
					drawRotated(img, data["dir"], ((data["x"] + (data["w"]/2))/canvasW)*realW, ((data["y"] + (data["h"]/2))/canvasH)*realH, (data["w"]/canvasW)*realW, (data["h"]/canvasH)*realH, data["rotStyle"])
					//canvasVar.drawImage(img, (data["x"]/canvasW)*realW,(data["y"]/canvasH)*realH, (data["w"]/canvasW)*realW, (data["h"]/canvasH)*realH)
					if (hitboxes) {
						canvasVar.strokeStyle = "#FF0000"
						canvasVar.beginPath()
						canvasVar.rect((data["x"]/canvasW)*realW, (data["y"]/canvasH)*realH, (data["w"]/canvasW)*realW, (data["h"]/canvasH)*realH)
						canvasVar.stroke()
						canvasVar.beginPath()
						canvasVar.rect((data["x"]/canvasW)*realW, (data["y"]/canvasH)*realH, 10, 10)
						canvasVar.stroke()
					}
				}
				id = 0
				while(id < Object.keys(sprites[name]["clones"]).length) {
					if (sprites[name]["clones"][id] !== undefined) {
                        if (sprites[name]["clones"][id]["cosSet"] & sprites[name]["clones"][id]["show"]) {
                        	var img = sprites[name]["clones"][id]["img"]
                            img.src = sprites[name]["clones"][id]["cos"]
                            var data = sprites[name]["clones"][id]
                            canvasVar.drawImage(img, (data["x"]/canvasW)*realW, (data["y"]/canvasH)*realH, (data["w"]/canvasW)*realW, (data["h"]/canvasH)*realH)
                            if (hitboxes) {
                            	canvasVar.strokeStyle = "#FF0000"
                                canvasVar.beginPath()
                                canvasVar.rect((data["x"]/canvasW)*realW, (data["y"]/canvasH)*realH, (data["w"]/canvasW)*realW, (data["h"]/canvasH)*realH)
                                canvasVar.stroke()
                                canvasVar.beginPath()
								canvasVar.rect((data["x"]/canvasW)*realW, (data["y"]/canvasH)*realH, 10, 10)
								canvasVar.stroke()
                            }
                        }
					}
					id = id + 1
				}
				i++
				name = "?"
				id = "?"
			}
			i = 0
			while(i < Object.keys(text).length) {
				name = textNames[i]
				canvasVar.textAlign = "start"
				canvasVar.strokeStyle = textColour
				if (text[name]["centre"]) {
					canvasVar.textAlign = "center"
				}
				canvasVar.font = text[name]["size"] + "px " + text[name]["font"]
				canvasVar.fillText(text[name]["text"], text[name]["x"], text[name]["y"])
				i++
				name = "?"
			}
			i = 0
			while(i < Object.keys(pen).length) {
				canvasVar.lineWidth = pen[i]["size"]
				canvasVar.strokeStyle = pen[i]["colour"]
				canvasVar.lineCap = "round"
				canvasVar.beginPath()
				canvasVar.moveTo(pen[i]["x1"],pen[i]["y1"])
				canvasVar.lineTo(pen[i]["x2"],pen[i]["y2"])
				canvasVar.stroke()
				i++
			}
		}
		if (controls) {
			i = 0
			while(i < Object.keys(controlList).length) {
				var data = controlList[i]
				var img = data["img"]
				canvasVar.drawImage(img, data["x"], data["y"] + controlsY, data["w"], data["h"])
				if (hitboxes) {
					canvasVar.strokeStyle = "#FF0000"
					canvasVar.beginPath()
					canvasVar.rect(data["x"], data["y"] + controlsY, data["w"], data["h"])
					canvasVar.stroke()
				}	
				i++
			}
			if (runs == 0) {
				canvasVar.fillStyle = "#000000"
				canvasVar.textAlign = "center"
				canvasVar.font = "30px Gloria"
				canvasVar.fillText("Click the flag to run.", canvas.width/2, (canvas.height/2) - 20)
				canvasVar.font = "15px Gloria"
				canvasVar.fillText("Powered by GameLib.", canvas.width/2, (canvas.height/2) + 20)
				canvasVar.font = "10px Gloria"
				canvasVar.fillText("Written in javascript.", canvas.width/2, (canvas.height/2) + 35)
				canvasVar.font = "15px Gloria"
				canvasVar.fillText("Or just click the canvas.", canvas.width/2, (canvas.height/2))
				
				
			}
		}
		beforeTime = timer
		timer = new Date()
		timer = timer.getMilliseconds()
		renderTime = (timer - beforeTime / 1000)
	}
}

function loop() {
	scripts()
	update()
	if (canvasMade === 1) {
		if (fullscreen) {
			if (window.innerWidth-25 != lastW | window.innerHeight-30 != lastH) {
				lastW = window.innerWidth-25
				lastH = window.innerHeight-30
				canvas.width = window.innerWidth-25
				canvas.height = window.innerHeight-30
			}
		}
		else {
			if (canvasW != lastW | lastH != lastH) {
				lastW = canvasW
				lastH = canvasH
				canvas.width = canvasW
				canvas.height = canvasH
			}
		}
		var W = canvas.width
		controlList[0]["w"] = W+20
		controlList[2]["x"] = W-30
		controlList[3]["x"] = (W/2)-20
	}
}

function keyPressed(Key) {
	return keysDown().indexOf(Key) > -1
}

function newText(Text, xPos, yPos, Size, ID) {
	text[ID] = []
	text[ID]["x"] = xPos
	text[ID]["y"] = yPos
	text[ID]["size"] = Size
	text[ID]["scripts"] = []
	text[ID]["life"] = 0
	text[ID]["text"] = Text
	text[ID]["reset"] = []
	if (centred) {
		text[ID]["centre"] = true
	}
	else {
		text[ID]["centre"] = false
	}
	textNames[textNames.length] = ID
	
}

function setFont(Font) {
	font = Font
}

function setTextCentre(Centre) {
	centred = Centre
}

function setColour(Colour) {
	canvasVar.fillStyle = Colour
}

function mouse(event) {
	if (canvasMade == 1) {
		mouseX = event.offsetX
		mouseY = event.offsetY
	}
}

function mouseDown(ev) {
    if(ev.which==1) {
        click = 1
    } else if(ev.which==3)  {
        click = 2
    } else {
        click = 3
    }
}

function mouseUp(e) {
	click = 0
}

function leftMouseDown() {
	if (click == 1) {
		return true
	}
	return false
}

function rightMouseDown() {
	if (click == 2) {
		return true
	}
	return false
}

function middleMouseDown() {
	if (click == 3) {
		return true
	}
	return false
}


function play(file,startPos,loop,delay, restartPos) {
	// Play the sound.
	soundsPlaying = soundsPlaying + 1
	sounds[sounds.length] = new Audio(file)
	sounds[sounds.length-1].currentTime = startPos
	sounds[sounds.length-1].play()
	looping[looping.length] = loop
	files[files.length] = file
	delayRestart[delayRestart.length] = delay
	delays[delays.length] = delay
	delayRestartPos[delayRestartPos.length] = restartPos
	soundData[Object.keys(soundData).length] = [false,false]
	
	// Set a future event to delete the item in the list when it's done.
	ID = sounds.length-1
	delayTime = sounds[sounds.length-1].duration
	delay[delay.length] = 0
}

function stop(ID) {
	if (debug) {
		console.log("Deleted " + ID + ".")
	}
	clearTimeout(delay[ID])
	sounds[ID].pause()
	sounds[ID] = undefined
	if (ID == soundsPlaying-1) {
		soundsPlaying = soundsPlaying - 1
	}
	if (soundsPlaying <= 0) {
		sounds = []
		looping = []
		files = []
		delayRestart = []
		delays = []
		delayRestartPos = []
		soundData = []
		delayTime = []
		delay = []
	}
}

function pause(ID) {
	sounds[ID].pause()
	soundData[ID][0] = true
}

function resume(ID) {
	soundData[ID][1] = true
	soundData[ID][0] = false
}

function getSoundTime(ID) {
	return sounds[ID].currentTime
}

function getID() {
	return sounds.length-1
}

function init() {
	i = 0
	while(i < sounds.length) {
		if (sounds[i] != undefined) {
			if (sounds[i].duration >= sounds[i].currentTime) {
				if (looping[i]) {
					if (sounds[i].currentTime === sounds[i].duration) {
						if (delayRestart[i] <= 0) {
							sounds[i].currentTime = delayRestartPos[i]
							sounds[i].play()
							delayRestart[i] = delays[i]
						}
						else {
							delayRestart[i] = delayRestart[i] -1
						}
					}
				}			
			}
			if (soundData[ID][1]) {
				var secsPos = sounds[i].currentTime
				sounds[i] = new Audio(files[i])
				sounds[i].currentTime = secsPos
				soundData[i][1] = false
				sounds[i].play()
				
			}
			if (~ sounds[i].duration >= sounds[i].currentTime) {
				if (~ soundsData[i][0]) {
					stop(i)
				}
			}
		}
		i = i + 1
	}
}

function showBar() {
	controls = true
}

function hideBar() {
	controls = false
}

function setBarY(num) {
	controlsY = num
}

function changeBarY(num) {
	controlsY = controlsY + num
}

function barThing() {
	if (mouseY < 30) {
		if (controlsY != 0) {
			changeBarY(hideSpeed)
			showBar()
		}
	}
	if (mouseY > 30) {
		if (controlsY != -30) {
			changeBarY(0 - hideSpeed)
		}
		else {
			if (running) {
				hideBar()
			}
		}
		
	}
}

function enableAutoBarHide() {
	autoHide = true
}

function disableAutoBarHide() {
	autoHide = false
}

function setHideSpeed(num) {
	hideSpeed = Math.abs(num)
}

function boxTouching(Sprite) {
	var W = getSpriteData(name,"w")/2
	var H = getSpriteData(name,"h")/2
	var X1 = X + (W/2)
	var Y1 = Y + (H/2)
	var X2 = getSpriteData(Sprite,"x") - (W/2)
	var Y2 = getSpriteData(Sprite,"y") - (H/2)
	var W2 = getSpriteData(Sprite,"w")/2
	var H2 = getSpriteData(Sprite,"h")/2
	var list = {"W":W,"H":H,"X":X1,"Y":Y1,"X2":X2,"Y2":Y2,"W2":W2,"H2":H2}
	//console.log(list)
	if (execute(Sprite,"showing()") & showing()) {
		if ((X1 - 1 - W <= X2 + W2) & (X1 + 1 >= X2 - W2)) {
			if ((Y1 - 1 - H <= Y2 + H2) & (Y2 - H2 <= Y1 + 1)) {
				return true
			}
		}
	}
	var counter = 0
	while(counter < cloneCountDev(Sprite)) {
		if (showing() & execute(Sprite,"showing()",counter)) {
			var W = getSpriteData(name,"w")/2
			var H = getSpriteData(name,"h")/2
			var X2 = getSpriteData(Sprite,"x", counter) - (W/2)
			var Y2 = getSpriteData(Sprite,"y", counter) - (H/2)
			var W2 = getSpriteData(Sprite,"w", counter)/2
			var H2 = getSpriteData(Sprite,"h", counter)/2
			if ((X1 - 1 - W <= X2 + W2) & (X1 + 1 >= X2 - W2)) {
				if ((Y1 - 1 - H <= Y2 + H2) & (Y2 - H2 <= Y1 + 1)) {
					return true
				}
			}
		}
		var counter = counter + 1
	}
	return false
}

function addTouching(Cos,Data) {
	if (Data === undefined) {
		var img = new Image()
		img.src = Cos
		img.onload = function() {
			loadList["touch"][Cos] = [img ,false]
		}
	}
	else {
		loadList["touch"][Cos] = [Data,true]
	}
	loadIndex["touch"][Object.keys(loadIndex["touch"]).length] = Cos
}

function load() {
	i = 0
	document.getElementById("Load").innerHTML="Loading... 0% <br>"
	while (i < Object.keys(loadIndex["touch"]).length) {
		var iname = loadIndex["touch"][i]
		var data = loadList["touch"][iname][0]
		var dataW = 25
		var dataH = dataW/2
		if (~ loadList["touch"][iname][1]) {
			// Get image data.
			canvasVar.clearRect(0, 0, canvasW, canvasH)
			canvasVar.drawImage(loadList["touch"][iname][0],0,0,dataW,dataH)
			var data = canvasVar.getImageData(0,0,dataW,dataH).data
		}
		// Process image data.
		var c = 0
		var capX = 0
		var capY = 0
		touchList[iname] = []
		var skip = 1
		while(c < Object.keys(data).length) {
			if (data[c+4] != 0) {
				touchList[iname][Object.keys(touchList[iname]).length] = [capX,capY]
			}
			var c = c + (4 * skip)
			var capX = capX + skip
			if (capX === dataW) {
				var capX = 0
				var capY = capY + 1
			}
		}
		i++
		document.getElementById("Load").innerHTML="Loading... <br>" + ((i/Object.keys(loadList["touch"]).length)*100).toString() + "%" 
		
	}
	document.getElementById("Load").innerHTML=""
	
}

function touching(Sprite) { //Not working.
	if (boxTouching(Sprite)) {
		i = 0
		var cos = getSpriteData(name, "cos")
		var cos2 = getSpriteData(Sprite, "cos")
		while(i < Object.keys(touchList[cos]).length) {
			var check = true
			if (touchList[cos][i] != undefined) {
				var X1 = touchList[cos][i][0] + X
				var X1 = (X1 / 25)* getSpriteData(name,"w") //Scale it.
				var Y1 = touchList[cos][i][1] + Y
				var Y1 = (Y1 / (25/2))* getSpriteData(name,"h") //Scale it.
			}
			else {
				var check = false
			}
			if (check & touchList[cos2][i] != undefined) {
				var X2 = touchList[cos2][i][0] + getSpriteData(Sprite,"x")
				var X2 = (X2 / 25)* getSpriteData(Sprite,"w") //Scale it.
				var Y2 = touchList[cos2][i][1] + getSpriteData(Sprite,"y")
				var Y2 = (Y2 / (25/2))* getSpriteData(Sprite,"h") //Scale it.
			}
			else {
				var check = false
			}
			if (check) {
				if (X2 >= X1-1 & X2 <= X1+1) {
					if (Y2 >= Y1-1 & Y2 <= Y1+1) {
						return true
					}
				}
			}
			i++
		}
	}
	return false
}

function rclick(ev) {
	if (ev.button === 2) {
		ev.preventDefault()
	}

}

function resize() {
	if (id === -1) {
		setWidth(sprites[name]["img"].width)
		setHeight(sprites[name]["img"].height)
	}
	else {
		setWidth(sprites[name]["clones"][id]["img"].width)
		setHeight(sprites[name]["clones"][id]["img"].height)	
	}
}

function scale(percent) {
	var dec = percent / 100
	if (id === -1) {
		setWidth(sprites[name]["img"].width * dec)
		setHeight(sprites[name]["img"].height * dec)
	}
	else {
	setWidth(sprites[name]["clones"][id]["img"].width * dec)
	setHeight(sprites[name]["clones"][id]["img"].height * dec)
	}
}

function setTextColour(Colour) {
	textColour = Colour
}

function clone(sprite) {
	if (sprite === undefined) {
		var clonesprite = name
	}
	else {
		var clonesprite = sprite
	}
	if (sprites[clonesprite]["clones"][0] === undefined) {
		var idpos = 0
	}
	else {
		var idpos = sprites[clonesprite]["clones"].length
	}
	sprites[clonesprite]["clones"][idpos] = {}
	sprites[clonesprite]["clones"][idpos]["x"] = sprites[clonesprite]["x"]
	sprites[clonesprite]["clones"][idpos]["y"] = sprites[clonesprite]["y"]
	sprites[clonesprite]["clones"][idpos]["dir"] = 0
	sprites[clonesprite]["clones"][idpos]["life"] = 0
	sprites[clonesprite]["clones"][idpos]["cos"] = sprites[clonesprite]["cos"]
	sprites[clonesprite]["clones"][idpos]["cosSet"] = sprites[clonesprite]["cosSet"]
	sprites[clonesprite]["clones"][idpos]["img"] = sprites[clonesprite]["img"]
	sprites[clonesprite]["clones"][idpos]["show"] = sprites[clonesprite]["show"]
	sprites[clonesprite]["clones"][idpos]["w"] = 100
	sprites[clonesprite]["clones"][idpos]["h"] = 100
	sprites[clonesprite]["cloneCount"] = sprites[clonesprite]["cloneCount"] + 1
}

function delClone(cloneid,Name) {
	if (cloneid === undefined) {
		var cid = id
	}
	else {
		var cid = cloneid
	}
	if (Name === undefined) {
		var n = name
	}
	else {
		var n = Name
	}
	if (cid > -1) {
		if (cid < cloneCountDev(n)) {
			sprites[n]["clones"][cid] = undefined
			sprites[n]["cloneCount"] = sprites[n]["cloneCount"] - 1
			if (sprites[n]["cloneCount"] === 0) {
				sprites[n]["clones"] = []
			}
			return
		}
		if (debug) {
			console.log("Error: Clone id " + cid + "does not exist.")
		}
	}
	if (debug) {
		console.log("Error: Clone id " + cid + "does not exist.")
	}
	
}

function cloneCountDev(sprite) {
	if (sprite === undefined) {
		var n = name
	}
	else {
		var n = sprite
	}
	return Object.keys(sprites[n]["clones"]).length
}

function cloneCount(sprite) {
	if (sprite === undefined) {
		var n = name
	}
	else {
		var n = sprite
	}
	return sprites[n]["cloneCount"]
}

function show() {
	if (id === -1) {
		sprites[name]["show"] = true
	}
	else {
		sprites[name]["clones"][id]["show"] = true
	}
}

function hide() {
	if (id === -1) {
		sprites[name]["show"] = false
	}
	else {
		sprites[name]["clones"][id]["show"] = false
	}
}

function showing() {
	if (id === -1) {
		return sprites[name]["show"]
	}
	else {
		if (sprites[name]["clones"][id] != undefined) {
			return sprites[name]["clones"][id]["show"]
		}
	}
}

function execute(Sprite,Code, Id) {
	if (Id === undefined) {
		var ID = -1
	}
	else {
		var ID = Id
	}
	var X1 = X
	var Y1 = Y
	var Dir1 = Dir
	var id1 = id
	var name1 = name
	var Mode1 = Mode
	X = getSpriteData(Sprite, "x", ID)
	Y = getSpriteData(Sprite, "y", ID)
	Dir = getSpriteData(Sprite, "dir", ID)
	id = ID
	name = Sprite
	Mode = "Sprite"
	var out = Code()
	X = X1
	Y = Y1
	Dir = Dir1
	id = id1
	name = name1
	Mode = Mode1
	return out
}

function boxTouchingEdge() {
	var W = getSpriteData(name,"w")
	var H = getSpriteData(name,"h")
	if (showing()) {
		if ((X <= 0) | (X + W >= canvasW)) {
			return true
		}
		else {
			if ((Y <= 0) | (Y + H >= canvasH)) {
				return true
			}
		}
		
	}
	return false
}

function random(min,max) {
	return Math.round(Math.random() * max) + min
}

document.addEventListener("keyup", keyUp, false)
document.addEventListener("keydown", keyDown, false)
document.addEventListener("mousemove", mouse, false)
document.addEventListener("mousedown", mouseDown, false)
document.addEventListener("mouseup", mouseUp, false)
document.addEventListener("contextmenu", rclick, false)
setInterval(loop, 30)
setInterval(init, 10)