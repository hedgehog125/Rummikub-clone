// TODO:
//  End turn buttons. (In red, green and orange) - Done
//  Changing tile pick up bug. - Fixed.
//  End game button. - Done.
//  Rack. - Done.
//  Tile placing. - Done.
//  Tile rearranging. - Done.
//  Tile groups. - Done.
//  Turn window. - Done.
//  Pattern recognition. - Done. 
//  Starting 30. - Done.
//  Fix pick up whole set/run bug. - Done.
//  Make end turn and end game buttons work. - Done for now.
//  Sort tile button. - Done.
//  Stop non active players from changing the board. 
//  Config options.
//  Music.
//  Winner announcement.

canvasVar.imageSmoothingQuality = "high"
document.bgColor = "#cc0000"
path = "Code/GameLib/" + path
ScrollLib.newText("Banner")
var banners = ["It's a game!","Banner","Rummikub","It's Dutch!","Enjoy!"]


var imgs = {}

imgs.Menu1 = new Image()
imgs.Menu1.src = getImg("Main_Menu.png")
imgs.Multi = new Image()
imgs.Multi.src = getImg("Multiplayer.png")
imgs["2p"] = new Image()
imgs["2p"].src = getImg("2 Players.png")
imgs["3p"] = new Image()
imgs["3p"].src = getImg("3 Players.png")
imgs["4p"] = new Image()
imgs["4p"].src = getImg("4 Players.png")
imgs["Tile"] = new Image()
imgs["Tile"].src = getImg("Tile.png")
imgs["RJoker"] = new Image()
imgs["RJoker"].src = getImg("Logo.png")
imgs["BJoker"] = new Image()
imgs["BJoker"].src = getImg("Black Joker.png")
imgs["EndG"] = new Image()
imgs["EndG"].src = getImg("EndTurnGreen.png")
imgs["EndO"] = new Image()
imgs["EndO"].src = getImg("EndTurnOrange.png")
imgs["EndR"] = new Image()
imgs["EndR"].src = getImg("EndTurnRed.png")
imgs["EndGame"] = new Image()
imgs["EndGame"].src = getImg("EndGame.png")
imgs["LArrow"] = new Image()
imgs["LArrow"].src = getImg("LeftArrow.png")
imgs["RArrow"] = new Image()
imgs["RArrow"].src = getImg("RightArrow.png")
imgs["EndNo"] = new Image()
imgs["EndNo"].src = getImg("EndTurnNo.png")
imgs["Sort"] = new Image()
imgs["Sort"].src = getImg("SortRack.png")
imgs["Settings"] = new Image()
imgs["Settings"].src = getImg("Settings.png")
imgs["Back"] = new Image()
imgs["Back"].src = getImg("Back.png")
imgs["SwitchOn"] = new Image()
imgs["SwitchOn"].src = getImg("SwitchOn.png")
imgs["SwitchOff"] = new Image()
imgs["SwitchOff"].src = getImg("SwitchOff.png")
imgs["AlwaysWin"] = new Image()
imgs["AlwaysWin"].src = getImg("AlwaysWin.png")
imgs["ChangeImage"] = new Image()
imgs["ChangeImage"].src = getImg("ChangeImage.png")
imgs["Name"] = new Image()
imgs["Name"].src = getImg("Name.png")
imgs["Trophy"] = new Image()
imgs["Trophy"].src = getImg("Trophy.png")


var soundsIDs = []
if (! ogg) {
	console.warn("Your browser doesn't support ogg files, switching to mp3s.")
}
function addSound(id,src) {
	soundsIDs[soundsIDs.length] = [id,src]
}

function range(num) { 
	return Array.apply(null, Array(num)).map(function (_, i) {return i})
}



addSound("Snap","Snap")
addSound("Music","Rummikub Music Original")
addSound("PickTile", "Pick Tile")


function loadSounds() {
	var i = 0
	var cache = soundsIDs.slice()
	soundIDs = {}
	for (i in range(cache.length)) {
		if (ogg) {
			soundsIDs[cache[i][0]] = "Code/Sounds/" + cache[i][1] + ".ogg"
		}
		else {
			soundsIDs[cache[i][0]] = "Code/Sounds/" + cache[i][1] + ".mp3"
		}
	}
}

loadSounds()



var cooldown = false
var players = 0
var fade = 0
var fadeDir = 0
var fadeSpeed = 0
var fadeCode = ""
var fadeCodeMode = 0
var bag = []
var playerTiles = []
var tilesLeft = 106
var tileCount = 14
var colours = {"Red":"#FF0000","Black":"#000000","Blue":"#0000FF","Orange":"#FFA000"}
var colourIndex = Object.keys(colours)
var board = []
var barSize = 150
var waitWindow = 0
var tileView = 9
var tileScroll = 0
var doneSomething = false
var tilesOk = true
var holding = -1
var boardHolding = -1
var playerTilesLeft = []
var laidTiles = 0
var turns = 0
var time = 60
var start30 = 0
var activePlayers = []
var turnActive = []
var message = ""
var extraTime = false
var confirmExitMessage = false
var configTab = ""
var wideView = false
var defaultIcon = new Image()
defaultIcon.src = "Code/IMGs/Black Joker.png"
var selected = 0
var keyIds = {"Left":37,"Right":39,"Up":38,"Down":40,"Space":32}
var keycooldown = false
var selectedPlayer = 0
var soundConfig = {"Effects":true,"Music":true}
var winAnimation = false
var animationTick = 0
var podium = false
var playerConfig = [
{"Name":"P1","AlwaysWins":false,"Icon":defaultIcon},
{"Name":"P2","AlwaysWins":false,"Icon":defaultIcon},
{"Name":"P3","AlwaysWins":false,"Icon":defaultIcon},
{"Name":"P4","AlwaysWins":false,"Icon":defaultIcon}
]

// Colours:
// Red => 0
// Black => 1
// Blue => 2
// Orange => 3

function getImg(file) {
	return "Code/IMGs/" + file
}

function banner() {
	var x = ScrollLib.getText(ScrollLib.i).x
	if (x >= ScrollLib.getText(ScrollLib.i).canvas.width - 5) {
		ScrollLib.getText(ScrollLib.i).text = banners[random(0,banners.length-1)]
	}
}
ScrollLib.getText("Banner").code = banner
ScrollLib.getText("Banner").colour = "Yellow"
ScrollLib.getText("Banner").text = banners[random(0,banners.length-1)]
Status = "Menu"
mouseHover = false
makeCanvas(1000,850)
newSprite("Engine")
newResetScript("Engine",Reset)

function fadeIn(speed,afterCode) {
	if (speed === undefined) {
		fadeSpeed = 2
	}
	else {
		fadeSpeed = speed
	}
	fadeDir = -1
	fadeCode = afterCode
	if (afterCode === undefined) {
		fadeCode = function() {}
	}
}

function fileUpload(code) { // Based off https://stackoverflow.com/questions/10906734/how-to-upload-image-into-html5-canvas.
	document.getElementById("FileUpload").innerHTML = '<input type="file" id="imageLoader" name="imageLoader"/>'
	uploadCode = code

	imageLoader = document.getElementById('imageLoader')


	handleImage = function(e) {
  	 	uploadReader = new FileReader()
		uploadReader.onload = function(event) {
			uploadImg = new Image()
			uploadImg.onload = function() {
				uploadCode()
				uploadCode = ""
				imageLoader = undefined
				document.getElementById("FileUpload").innerHTML = ""
				uploadImg = undefined
				handleImage = undefined
				uploadReader = undefined
			}
			uploadImg.src = event.target.result   
		}
		uploadReader.readAsDataURL(e.target.files[0])
	}
	
	imageLoader.addEventListener('change', handleImage, false)
}

function cancelUpload() {
	uploadCode = ""
	imageLoader = undefined
	document.getElementById("FileUpload").innerHTML = ""
	uploadImg = undefined
}

function fadeOut(speed,afterCode) {
	if (speed === undefined) {
		fadeSpeed = 2
	}
	else {
		fadeSpeed = speed
	}
	fadeDir = 1
	fadeCode = afterCode
	if (afterCode === undefined) {
		fadeCode = function() {}
	}
}

function drawTile(x,y,number,colour,scale) {
	var realScale = scale
	if (scale === undefined) {
		var realScale = 1
	}
	draw("Tile",x,y,imgs["Tile"].width*realScale,imgs["Tile"].height*realScale)
	if (number === 0) {
		if (colour === 0) {
			draw("RJoker",x+(1*realScale),y-(12*realScale),(imgs["RJoker"].width/4)*realScale,(imgs["RJoker"].height/4)*realScale)
		}
		else {
			draw("BJoker",x+(1*realScale),y-(12*realScale),(imgs["RJoker"].width/4)*realScale,(imgs["RJoker"].height/4)*realScale)
		}
	}
	else {
		canvasVar.fillStyle = colours[colourIndex[colour]]
		text(x,y-(12*realScale),number,30*realScale,true)
	}
}

function pickTile() {
	if (bag.length > 0) {
		var tile = random(0,tilesLeft-1)
		var tileData = cloneOb(bag[tile])
		bag[tile] = undefined
		var bagCache = []
		var i = 0
		for (i in bag) {
			if (bag[i] !== undefined) {
				bagCache[bagCache.length] = bag[i]
			}
		}
		bag = bagCache
		tilesLeft--
		return [tileData,tile] // Return the picked tile.
	}
}

function doFade(afterCode,codeMode) {
	if (codeMode === 0) {
		fadeOut(4,function() { setTimeout(function() { fadeIn(4,afterCode) },1000)},codeMode)
	}
	else {
		fadeOut(4,function() { afterCode(); setTimeout(function() { fadeIn(4) },1000)},codeMode)
	}
}

function Reset() {
	Status = "Menu"
	tileBarY = canvasH-barSize
	autoHide = true
	showBar()
}

function playSound(sound,loop) {
	if (loop) {
		play(soundsIDs[sound],0,true,0,0)
	}
	else {
		play(soundsIDs[sound],0,false,0,0)
	}
}

function updateScript() {
	if (running) {
		if (sounds[0] === undefined) {
			playSound("Music",true)
		}
		else {
			if (soundConfig["Music"]) {
				sounds[0].volume = 1 
			}
			else {
				sounds[0].volume = 0 
			}
		}
		if (currentKeyPressed() == "") {
			keycooldown = false
		}
		if (Status === "Menu") {
			menu()
		}
		else {
			if (Status === "Setup") {
				setup()
			}
			else {
				if (Status === "Config") {
					config()
				}
				else {
					if (winAnimation) {
						if (podium) {
							doPodium()
						}
						else {
							doWinAnimation()
						}
					}
					else {
						game()
					}
				}
			}
			if (Status != "Game" | (Status === "Game" & podium)) {
				draw("Back",25,canvasH-25)
				if (touchingMouse(25,canvasH-25,"Back")) {
					if (leftMouseDown()) {
						cooldown = true
						autoHide = true
						if (Status != "Game") {
							doFade(function() {Status = "Menu"})
						}
						else {
							doFade(exit)
						}
					}
				}
			}
		}
		if (fadeDir != 0) { // Screen fading.
			fade = fade + (fadeSpeed*fadeDir)
			if (fadeDir < 0) {
				if (fade <= 0) {
					fade = 0
					fadeDir = 0
					fadeSpeed = 0
					fadeCode()
				}
			}
			else {
				if (fade >= 100) {
					fade = 100
					fadeDir = 0
					fadeSpeed = 0
					fadeCode()
				}
			}
		}
		if (fade > 0) {
			canvasVar.fillStyle = "rgba(0,0,0," + fade/100 + ")"
			canvasVar.fillRect(0,0,canvasW,canvasH)
		}
		if (! leftMouseDown()) {
			cooldown = false
		}
		if (winAnimation & (animationTick*2 < (canvasW/2)-100)) {
			draw("Trophy",canvasW/2,canvasH-300)
		}
	}
}

function doPodium() {
	canvasVar.fillStyle = "#B28337"
	canvasVar.fillRect((canvasW/2)-100,canvasH-50,canvasW,50)
	if (playerOrder.indexOf(4) > -1) {
		canvasVar.drawImage(playerConfig[winInfo[1][3]]["Icon"],(canvasW/2)-100,canvasH-90,40,40)
		text((canvasW/2)-100,canvasH-120,winInfo[0][3] + " \n 4th",20,true)
	}
	canvasVar.fillRect(canvasW/2,canvasH-100,canvasW-150,50)
	if (playerOrder.indexOf(3) > -1) {
		canvasVar.drawImage(playerConfig[winInfo[1][2]]["Icon"],(canvasW/2),canvasH-140,40,40)
		text((canvasW/2),canvasH-170,winInfo[0][2] + " \n 3rd",20,true)
	}
	canvasVar.fillRect((canvasW/2)+100,canvasH-150,canvasW-250,50)
	canvasVar.drawImage(playerConfig[winInfo[1][1]]["Icon"],(canvasW/2)+140,canvasH-190,40,40)
	text((canvasW/2)+140,canvasH-220,winInfo[0][1] + " \n 2nd",20,true)
	canvasVar.fillRect((canvasW/2)+200,canvasH-200,canvasW-300,50)
	canvasVar.drawImage(playerConfig[winInfo[1][0]]["Icon"],(canvasW/2)+300,canvasH-240,40,40)
	text((canvasW/2)+300,canvasH-270,winInfo[0][0] + " \n 1st",20,true)
}

function draw(img,x,y,w,h) {
	if (w != undefined) {
		canvasVar.drawImage(imgs[img],x-(w/2),y-(h/2),w,h)
	}
	else {
		canvasVar.drawImage(imgs[img],x-(imgs[img].width/2),y-(imgs[img].height/2))
	}
}

function touchingMouse(x,y,img) {
	var xpos = x - (imgs[img].width/2)
	var ypos = y - (imgs[img].height/2)
	if (mouseX >= xpos & mouseX <= xpos + imgs[img].width) {
		if (mouseY >= ypos & mouseY <= ypos + imgs[img].height) {
			return true
		}
	}
	return false
}

function text(x,y,Text,size,customColours) {
	var DrawText = Text
	if (typeof Text !== "string") {
		var DrawText = Text.toString()
	}
	var actualText = DrawText.split(" \n ")
	canvasVar.textBaseline = "middle"	
	canvasVar.textAlign = "center"
	if (! customColours) {
		canvasVar.fillStyle = "Black"
	}
	canvasVar.font = size + "px Gloria"
	var i = 0
	for (i in actualText) {
		if (i != 0) {
			canvasVar.fillText(actualText[i],x,y+(size+10))
		}
		else {
			canvasVar.fillText(actualText[i],x,y)
		}
	}
}

function doWinAnimation() {
	//canvasVar.drawImage(playerConfig[winInfo[1][0]]["Icon"],animationTick,canvasH-300,40,40)
	canvasVar.fillStyle = "#000000"
	canvasVar.fillRect(0,canvasH-200,canvasW,canvasH)
	if (animationTick*2 < (canvasW/2)-100) {
		fade = 90
		canvasVar.fillRect(canvasW-(animationTick*2),canvasH-240,40,40)
	}
	else {
		if (((canvasW-(animationTick*2) < 0) & (canvasW-(animationTick*2))+3 > 0)) {
			doFade(function() {podium = true})
		}
		else {
			if ((canvasW-(animationTick*2))+3 > 0) {
				fade = 0
			}
		}
		canvasVar.drawImage(playerConfig[winInfo[1][0]]["Icon"],canvasW-(animationTick*2),canvasH-240,40,40)
		draw("Trophy",(canvasW-(animationTick*2))+20,canvasH-350)
	}
	animationTick++
}

function menu() {
	draw("Menu1",canvasW/2,canvasH/2,canvasW,canvasH)
	if (mouseHover) {
		draw("Multi",(canvasW/2)-14,canvasH/2,imgs["Multi"].width+5,imgs["Multi"].height+5)
	}
	else {
		draw("Multi",(canvasW/2)-14,canvasH/2)
	}
	if (touchingMouse(canvasW/2,(canvasH/2)+60,"Settings") & (! cooldown)) {
		draw("Settings",(canvasW/2)-12,(canvasH/2)+60,imgs["Settings"].width+5,imgs["Settings"].height+5)
		if (leftMouseDown() & (! cooldown)) {
			configTab = "Players"
			autoHide = false
			setBarY(-30)
			doFade(function() {Status = "Config"})
		}
	}
	else {
		draw("Settings",(canvasW/2)-12,(canvasH/2)+60,imgs["Settings"].width,imgs["Settings"].height)
	}
	mouseHover = false
	if (touchingMouse(canvasW/2,canvasH/2,"Multi") & (! cooldown)) {
		mouseHover = true
		if (leftMouseDown()) {
			cooldown = true
			doFade(function() {Status = "Setup"})
		}
	}
}

function setup() {
	draw("Menu1",canvasW/2,canvasH/2,canvasW,canvasH)
	text(canvasW/2,50,"How many players?",100)
	draw("2p",(canvasW/2)-100,canvasH/2)
	draw("3p",canvasW/2,canvasH/2)
	draw("4p",(canvasW/2)+100,canvasH/2)
	if (leftMouseDown() & ! (cooldown)) {
		if (touchingMouse((canvasW/2)-100,canvasH/2,"2p")) {
			players = 2
			startGame()
		}
		else {
			if (touchingMouse(canvasW/2,canvasH/2,"3p")) {
				players = 3
				startGame()
			}
			else {
				if (touchingMouse((canvasW/2)+100,canvasH/2,"4p")) {
					players = 4
					startGame()
				}
			}
		}
	}
	if (! leftMouseDown()) {
		cooldown = false
	}
}

function config() {
	draw("Menu1",canvasW/2,canvasH/2,canvasW,canvasH)
	canvasVar.fillStyle = "#3366FF"
	canvasVar.fillRect((canvasW/2)-50,75,100,50)
	text(canvasW/2,100,configTab,30)
	if (configTab === "Players") {
		var i = 0
		var drawnTrophy = false
		for (i in playerConfig) {
			text(canvasW/2,(i*40)+250,"P" + (JSON.parse(i)+1) + " AKA " + playerConfig[i]["Name"],40)
			canvasVar.drawImage(playerConfig[i]["Icon"],canvasW/2-((("P" + JSON.parse(i)+1 + " AKA " + playerConfig[i]["Name"]).length/2)*40),((i*40)+250)-20,40,40)
			if (selected == i) {
				canvasVar.lineWidth = 5
				canvasVar.beginPath()
				canvasVar.strokeStyle = "#FF0000"
				canvasVar.rect(canvasW/2-((("P" + JSON.parse(i)+1 + " AKA " + playerConfig[i]["Name"]).length/2)*40),(i*40)+225,((("P" + (JSON.parse(i)+1) + " AKA " + playerConfig[i]["Name"]).length/2)*40)+125,50)
				canvasVar.stroke()
			}
			if (playerConfig[i]["AlwaysWins"] & (! drawnTrophy)) {
				draw("AlwaysWin",((canvasW/2)+((("P" + JSON.parse(i)+1 + " AKA " + playerConfig[i]["Name"]).length/2)*40))-50,(i*40)+225,75,100)
				var drawnTrophy = true
			}
			
		}
		canvasVar.beginPath()
		canvasVar.strokeStyle = "#00FF00"
		canvasVar.rect(canvasW/2-((("P" + JSON.parse(i)+1 + " AKA " + playerConfig[i]["Name"]).length/2)*40),(selectedPlayer*40)+225,((("P" + (JSON.parse(i)+1) + " AKA " + playerConfig[i]["Name"]).length/2)*40)+125,50)
		canvasVar.stroke()
		
		if (playerConfig[selectedPlayer]["AlwaysWins"]) {
			draw("AlwaysWin",(canvasW/2)-100,(canvasH/2)+50,75,100)
		}
		else {
			draw("AlwaysWin",(canvasW/2)-100,(canvasH/2)+50,75,100)
			canvasVar.beginPath()
			canvasVar.strokeStyle = "#FF0000"
			canvasVar.lineWidth = 5
			canvasVar.lineCap = "round"
    	  	canvasVar.moveTo(((canvasW/2)-100)-(125/2), ((canvasH/2)+50)-50)
      		canvasVar.lineTo(((canvasW/2)-100)+(125/2), ((canvasH/2)+50)+50)
     		canvasVar.stroke()
		}
		if (selected === 4) {
			canvasVar.beginPath()
			canvasVar.strokeStyle = "#FF0000"
			canvasVar.rect(((canvasW/2)-100)-(125/2),((canvasH/2)+50)-50,110,110)
			canvasVar.stroke()
			if (currentKeyPressed() == keyIds["Space"] & (! keycooldown)) {
				keycooldown = true
				if (playerConfig[selectedPlayer]["AlwaysWins"]) {
					playerConfig[selectedPlayer]["AlwaysWins"] = false
				}
				else {
					if (! drawnTrophy) {
						playerConfig[selectedPlayer]["AlwaysWins"] = true
					}
				}
			}
		}
		
		draw("ChangeImage",canvasW/2,(canvasH/2)+50,50,50)
		
		if (selected === 5) {
			canvasVar.beginPath()
			canvasVar.strokeStyle = "#FF0000"
			canvasVar.rect((canvasW/2)-25,(canvasH/2)+25,50,50)
			canvasVar.stroke()
			if (currentKeyPressed() == keyIds["Space"] & (! keycooldown)) {
				keycooldown = true
				fileUpload(function(){
					playerConfig[selectedPlayer]["Icon"] = uploadImg
				})
			}
		}
		
		draw("Name",(canvasW/2)+100,(canvasH/2)+50,50,50)
		
		
		if (selected === 6) {
			canvasVar.beginPath()
			canvasVar.strokeStyle = "#FF0000"
			canvasVar.rect((canvasW/2)+75,(canvasH/2)+25,50,50)
			canvasVar.stroke()
			if (currentKeyPressed() == keyIds["Space"] & (! keycooldown)) {
				keycooldown = true
				playerConfig[selectedPlayer]["Name"] = prompt("Enter a name...")
			}
		}
		
		if (currentKeyPressed() == keyIds["Down"] & (! keycooldown)) {
			selected++
			if (selected > 6) {
				selected = 0
			}
			keycooldown = true
		}
		
		if (currentKeyPressed() == keyIds["Up"] & (! keycooldown)) {
			selected--
			if (selected < 0) {
				selected = 6
			}
			keycooldown = true
		}
		
		if (currentKeyPressed() == keyIds["Space"] & (! keycooldown)) {
			selectedPlayer = selected
			keycooldown = true
		}
		
		if (currentKeyPressed() == keyIds["Left"] & (! keycooldown)) {
			configTab = "Sounds"
			keycooldown = true
			selected = 0
			selectedPlayer = 0
		}
		
		if (currentKeyPressed() == keyIds["Right"] & (! keycooldown)) {
			configTab = "Sounds"
			keycooldown = true
			selected = 0
			selectedPlayer = 0
		}
	}
	else {
		if (soundConfig["Effects"]) {
			text(canvasW/2,300,"Effects: On",20)
		}
		else {
			text(canvasW/2,300,"Effects: Off",20)
		}
		if (selected === 0) {
			canvasVar.beginPath()
			canvasVar.lineWidth = 5
			canvasVar.strokeStyle = "#FF0000"
			canvasVar.rect((canvasW/2)-(("Effects: On".length/2)*10),290,("Effects: On".length/2)*20,20)
			canvasVar.stroke()
			if ((currentKeyPressed() == keyIds["Up"] | currentKeyPressed() == keyIds["Down"]) & (! keycooldown)) {
				keycooldown = true
				selected = 1
			}
			if (currentKeyPressed() == keyIds["Space"] & (! keycooldown)) {
				keycooldown = true
				if (soundConfig["Effects"]) {
					soundConfig["Effects"] = false
				}
				else {
					soundConfig["Effects"] = true
				}
			}
		}
		
		if (soundConfig["Music"]) {
			text(canvasW/2,320,"Music: On",20)
		}
		else {
			text(canvasW/2,320,"Music: Off",20)
		}
		
		if (selected === 1) {
			canvasVar.beginPath()
			canvasVar.lineWidth = 5
			canvasVar.strokeStyle = "#FF0000"
			canvasVar.rect((canvasW/2)-(("Music: On".length/2)*10),310,("Music: On".length/2)*20,20)
			canvasVar.stroke()
			if ((currentKeyPressed() == keyIds["Up"] | currentKeyPressed() == keyIds["Down"]) & (! keycooldown)) {
				keycooldown = true
				selected = 0
			}
			if (currentKeyPressed() == keyIds["Space"] & (! keycooldown)) {
				keycooldown = true
				if (soundConfig["Music"]) {
					soundConfig["Music"] = false
				}
				else {
					soundConfig["Music"] = true
				}
			}
		}
		if ((currentKeyPressed() == keyIds["Left"] | currentKeyPressed() == keyIds["Right"]) & (! keycooldown)) {
			keycooldown = true
			selected = 0
			configTab = "Players"
		}
	}
}

function fillBag() {
	for (c in range(2)) {
		for (colour in range(4)) {
			i = 0
			for (i in range(13)) {
				bag[bag.length] = [(JSON.parse(i)+1).toString(),colour]
			}
		}
	}
	bag[bag.length] = [0,0] // Red joker.
	bag[bag.length] = [0,1] // Black joker.
}

function startGame() {
	cooldown = true
	doFade(function() { Status = "Game"; loadGame()})
}

function loadGame() {
	fillBag()
	chooseStarter()
	pickTiles()
	waitWindow = 1
	autoHide = false
	hideBar()
	if (soundConfig["Effects"]) {
		playSound("PickTile")
	}
}

function chooseStarter() {
	playerOrder = []
	playerOrder[0] = random(0,players-1)+1
	for (i in range(players)) {
		if (JSON.parse(i)+1 != playerOrder[0]) {
			playerOrder[playerOrder.length] = JSON.parse(i)+1
		}
	}
	currentTurn = playerOrder[0]-1
}

function pickTiles() {
	var i = 0
	for (i in range(playerOrder.length)) {
		i = JSON.parse(i)
		playerTiles[i] = []
		activePlayers[activePlayers.length] = false
		turnActive[turnActive.length] = 0
		var Tile = 0
		for (Tile in range(tileCount)) {
			playerTiles[i][playerTiles[i].length] = pickTile()
		}
		playerTilesLeft[i] = tileCount
	}
}

function newTile(number,colour,x,y) {
	board[board.length] = {}
	board[board.length-1]["x"] = x
	board[board.length-1]["y"] = y
	board[board.length-1]["number"] = number
	board[board.length-1]["colour"] = colour
	board[board.length-1]["row"] = -1
	board[board.length-1]["child"] = -1
	board[board.length-1]["turnPlaced"] = turns
}

function game() {
	//console.log("Actual game comming soon...")
	if (waitWindow === 0) {
		time = time - 0.03
	}
	doneSomething = laidTiles > 0
	canvasVar.fillStyle = "#663300"
	canvasVar.fillRect(0,0,canvasW,canvasH)
	canvasVar.imageSmoothingQuality = "high"
	var i = 0
	for (i in range(board.length)) {
		if (board[i] != undefined) {
			if (boardHolding === i) {
				drawTile(mouseX,mouseY,board[i]["number"],board[i]["colour"])
			}
			else {
				if (board[i]["row"] !=  -1) {
					if (boardHolding === board[i]["row"]) {
						board[i]["x"] = mouseX + (50*1)
						board[i]["y"] = mouseY
					}
					else {
						board[i]["x"] = board[board[i]["row"]]["x"] + (50*1)
						board[i]["y"] = board[board[i]["row"]]["y"]
					}
				}
				drawTile(board[i]["x"],board[i]["y"],board[i]["number"],board[i]["colour"])
				if (board[i]["row"] ===  -1) {
					if (board[i]["child"] != -1 & board[board[i]["child"]] != undefined) {
						if (board[board[i]["child"]]["row"] != i) {
							board[i]["child"] = -1
						}
					}
				}
			}
			if (leftMouseDown() & (! cooldown)) {
				if (boardHolding === -1) {
					if (touchingMouse(board[i]["x"],board[i]["y"],"Tile")) {
						if (activePlayers[currentTurn] | board[i]["turnPlaced"] == turns) { // If it's my tile or I've placed 30.
							boardHolding = i
							cooldown = true
						}
					}
				}
				else {
					board[boardHolding]["x"] = mouseX
					board[boardHolding]["y"] = mouseY
					// Tile clicking
					var clickTile = -1
					var c = 0
					for (c in range(board.length)) {
						if (board[c] != undefined) {
							if (board[boardHolding]["x"] >= board[c]["x"]+20) {
								if (board[boardHolding]["x"]-5 <= board[c]["x"]+70) {
									if ((board[boardHolding]["y"]-5)+72 >= board[c]["y"]) {
										if (board[boardHolding]["y"]-5 <= board[c]["y"]+77) {
											if (soundConfig["Effects"]) {
												playSound("Snap")
											}
											var clickTile = c 
										}
									}
								}
							}
						}
					}
					if (clickTile !== -1) {
						if (board[clickTile]["row"] === boardHolding) {
							board[boardHolding]["row"] = -1
						}
						else {
							board[boardHolding]["row"] = clickTile.toString()
							board[clickTile.toString()]["child"] = boardHolding
						}
					}
					else {
						if (! (mouseY > canvasH - barSize)) {
							if (board[boardHolding]["row"] != -1) {
								board[board[boardHolding]["row"]]["child"] = -1
								board[boardHolding]["row"] = -1
							}
						}
					}
					if (mouseY > canvasH - barSize) { // Putting tiles back in your rack.
						if (board[boardHolding]["turnPlaced"] === turns) {
							if (board[boardHolding]["child"] === -1) {
								holding = findLastTile(currentTurn)
								playerTiles[currentTurn][holding] = []
								playerTiles[currentTurn][holding][0] = [board[boardHolding]["number"],board[boardHolding]["colour"]]
								start30 = start30 - JSON.parse(board[boardHolding]["number"])
								playerTiles[currentTurn][holding][1] = -1
								if (board[boardHolding]["row"] != -1) {
									board[board[boardHolding]["row"]]["child"] = -1
								}
								board[boardHolding] = undefined
								boardHolding = -1
								laidTiles--
							}
						}
					}
					boardHolding = -1
					cooldown = true
					checkBoard()
				}
			}
			if (cooldown & (! leftMouseDown())) {
				cooldown = false
			}
		}
	}
	if (running & waitWindow === 0) {
		if (mouseY >= canvasH-barSize) {
			if (tileBarY > canvasH-barSize) {
				tileBarY = tileBarY - 4
			}
		}
		else {
			if (tileBarY < canvasH) {
				tileBarY = tileBarY + 4
			}
		}
	}
	if (tileBarY < canvasH) {  // Show bar.
		canvasVar.fillStyle = "#E6E6E6"
		canvasVar.fillRect(0,tileBarY,canvasW,barSize)
		canvasVar.strokeStyle = "Black"
		canvasVar.lineWidth = "5"
		canvasVar.beginPath()
		canvasVar.rect(2.5,tileBarY-2.5,canvasW-5,barSize)
		canvasVar.stroke()
		canvasVar.beginPath()
		canvasVar.rect(2.5,tileBarY-2.5,800,barSize)
		canvasVar.stroke()
		message = ""
		if (touchingMouse(900,tileBarY+25,"EndO")) {
			if (doneSomething) {
				if (tilesOk) {
					if (activePlayers[currentTurn]) {
						draw("EndG",900,tileBarY+25,imgs["EndO"].width*2.1,imgs["EndO"].height*2.1)
						message = "The board's fine you can end your turn..."
						if (leftMouseDown()) {
							endTurn(1)
						}
					}
					else {
						if (start30 >= 30) {
							draw("EndG",900,tileBarY+25,imgs["EndO"].width*2.1,imgs["EndO"].height*2.1)
							message = "It's fine you can end your turn..."
							if (leftMouseDown()) {
								endTurn(1)
							}
						}
						else {
							draw("EndNo",900,tileBarY+25,imgs["EndO"].width*2.1,imgs["EndO"].height*2.1)
							message = "Doesn't add up to 30."
						}
					}
				}
				else {
					draw("EndR",900,tileBarY+25,imgs["EndO"].width*2.1,imgs["EndO"].height*2.1)
					message = "The board isn't ok, you can't end your turn."
					if (leftMouseDown()) {
						endTurn(2)
					}
				}
			}
			else {
				draw("EndO",900,tileBarY+25,imgs["EndO"].width*2.1,imgs["EndO"].height*2.1)
				message = "You can end your turn but you need to pick up a tile."
				if (leftMouseDown()) {
					endTurn(0)
				}
			}
		}
		else {
			if (doneSomething) {
				if (tilesOk) {
					if (activePlayers[currentTurn]) {
						draw("EndG",900,tileBarY+25,imgs["EndO"].width*2,imgs["EndO"].height*2)
					}
					else {
						if (start30 >= 30) {
							draw("EndG",900,tileBarY+25,imgs["EndO"].width*2,imgs["EndO"].height*2)
						}
						else {
							draw("EndNo",900,tileBarY+25,imgs["EndO"].width*2,imgs["EndO"].height*2)
						}
					}
				}
				else {
					draw("EndR",900,tileBarY+25,imgs["EndO"].width*2,imgs["EndO"].height*2)
				}
			}
			else {
				draw("EndO",900,tileBarY+25,imgs["EndO"].width*2,imgs["EndO"].height*2)
			}
		}
		
		
		if (touchingMouse(900,tileBarY+120,"EndGame")) {
			draw("EndGame",900,tileBarY+120,imgs["EndGame"].width*2,imgs["EndGame"].height*2)
			if (leftMouseDown() & (! cooldown)) {
				if (confirmExitMessage) {
					doFade(exit)
				}
				else {
					doFade(confirmExit)
				}
				cooldown = true
			}
		}
		else {
			draw("EndGame",900,tileBarY+120,imgs["EndGame"].width*1.9,imgs["EndGame"].height*1.9)
		}
		
		if (touchingMouse(900,tileBarY+70,"Sort")) {
			draw("Sort",900,tileBarY+70,imgs["Sort"].width*1.1,imgs["Sort"].height*1.1)
			if (leftMouseDown() & (! cooldown)) {
				sortRack(currentTurn)
			}
		}
		else {
			draw("Sort",900,tileBarY+70,imgs["Sort"].width,imgs["Sort"].height)
		}
		// Rack.
		
		// Arrows.
		if (touchingMouse(25,tileBarY+75,"LArrow")) {
			draw("LArrow",25,tileBarY+75,imgs["LArrow"].width*1.1,imgs["LArrow"].height*1.1)
			if (leftMouseDown() & (! cooldown)) {
				tileScroll--
				cooldown = true
			}
			else {
				if (! leftMouseDown()) {
					cooldown = false
				}
			}
		}
		else {
			draw("LArrow",25,tileBarY+75)
		}
		
		if (touchingMouse(780,tileBarY+75,"RArrow")) {
			draw("RArrow",780,tileBarY+75,imgs["RArrow"].width*1.1,imgs["RArrow"].height*1.1)
			if (leftMouseDown() & (! cooldown)) {
				tileScroll++
				cooldown = true
			}
			else {
				if (! leftMouseDown()) {
					cooldown = false
				}
			}
		}
		else {
			draw("RArrow",780,tileBarY+75)
		}
		
		// Wide view switch.
		text(40,tileBarY+100,"Wide View",15)
		if (wideView) {
			draw("SwitchOn",40,tileBarY+130,imgs["SwitchOn"].width/2,imgs["SwitchOn"].height/2)
		}
		else {
			draw("SwitchOff",40,tileBarY+130,imgs["SwitchOn"].width/2,imgs["SwitchOn"].height/2)
		}
		if (touchingMouse(40,tileBarY+130,"SwitchOn")) {
			if (leftMouseDown() & (! cooldown)) {
				if (wideView) {
					wideView = false
				}
				else {
					wideView = true
				}
				cooldown = true
			}
		}
		
		// Tiles.
		if (! wideView) {
			var i = 0
			var drawn = false
			for (i in range(tileView)) {
				var c = JSON.parse(i)+tileScroll
				if (playerTiles[currentTurn][c] != undefined) {
					if (holding == c.toString()) { // Check if tile is picked up.
						drawTile(mouseX,mouseY,playerTiles[currentTurn][c][0][0],playerTiles[currentTurn][c][0][1])
						var drawn = true
					}
					else {
						drawTile(100+(i*75),tileBarY+75,playerTiles[currentTurn][c][0][0],playerTiles[currentTurn][c][0][1])
					}
					// Pickup tile.
					if (leftMouseDown() & touchingMouse(100+(i*75),tileBarY+75,"Tile") & holding === -1 & (! cooldown)) {
						holding = c.toString()
						cooldown = true
					}
					else {
						if (! leftMouseDown()) {
							cooldown = false
						}
					}
				}
			}
		}
		else {
			var i = 0
			var y = tileBarY+25
			var x = 75
			for (i in range(playerTiles[currentTurn].length-tileScroll)) {
				var c = JSON.parse(i)+tileScroll
				if (playerTiles[currentTurn][c] !== undefined) {
					drawTile(x,y,playerTiles[currentTurn][c][0][0],playerTiles[currentTurn][c][0][1],0.5)
					x+=25
				}
				if (x > canvasW-250)  {
					x = 75
					y+=30
				}
			}
		}
		// Buttons.
		
	}
	if (holding != -1) {
		if (! drawn) {
			var c = JSON.parse(holding)
			drawTile(mouseX,mouseY,playerTiles[currentTurn][c][0][0],playerTiles[currentTurn][c][0][1])
			if (! leftMouseDown()) {
				cooldown = false
			}
		}
		else {
			drawTile(mouseX,mouseY,playerTiles[currentTurn][holding][0][0],playerTiles[currentTurn][holding][0][1])
		}
	}
	if (holding != -1) { // Placing tiles.
		if (! cooldown) {
			if (leftMouseDown()) {
				if (mouseY < canvasH - barSize) {  // Check to see if the mouse is higher than the bar.
					newTile(playerTiles[currentTurn][holding][0][0],playerTiles[currentTurn][holding][0][1],mouseX,mouseY)
					start30 = start30 + JSON.parse(playerTiles[currentTurn][holding][0][0])
					playerTiles[currentTurn][holding] = undefined // Delete the tile in the rack.
					holding = -1
					playerTilesLeft[currentTurn]--
					cooldown = true
					laidTiles++
					checkBoard()
				}
				else {
					if (mouseX > 75 & mouseX < 725) {
						var i = 0
						var clickedTile = false
						var wouldBeClicked = false
						for (i in range(tileView)) {
							var c = JSON.parse(i) + tileScroll
							if (playerTiles[currentTurn][c] != undefined) {
								if (touchingMouse(100+(i*75),tileBarY+75,"Tile") & c != holding) {
									clickedTile = c
								}
							}
							else {
								if (touchingMouse(100+(i*75),tileBarY+75,"Tile")) {
									wouldBeClicked = c
								}
							}
						}
						if (clickedTile != false) {
							if (playerTiles[currentTurn][clickedTile] != undefined) {
								var cache = playerTiles[currentTurn][clickedTile].slice()
								playerTiles[currentTurn][clickedTile] = playerTiles[currentTurn][holding]
								playerTiles[currentTurn][holding] = cache
								holding = -1
							}
						}
						if (clickedTile === false) {
							if (wouldBeClicked !== false) {
								if (wouldBeClicked > -1) {
									playerTiles[currentTurn][wouldBeClicked] = cloneOb(playerTiles[currentTurn][holding])
									playerTiles[currentTurn][holding] = undefined
								}
							}
							holding = -1
							cooldown = true
						}
					}
				}
			}
		}
	}
	if (confirmExitMessage) {
		message = "Are you sure you want to exit? \n Click again to continue..."
	}
	else {
		if (extraTime) {
			message = "You have one more minute."
		}
	}
	text(canvasW/2,30,playerConfig[currentTurn]["Name"],60)
	if (start30 >= 30) {
		activePlayers[currentTurn] = true
		turnActive[currentTurn] = turns+1
	}
	if (! activePlayers[currentTurn]) {
		text(canvasW/2,75,start30 + " of 30 placed.",30)
	}
	else {
		if (turnActive[currentTurn] == turns+1) {
			if (start30 < 30) {
				activePlayers[currentTurn] = false
				turnActive[currentTurn] = 0
			}
			else {
				text(canvasW/2,75,"30 has been placed.",30)
			}
		}
	}
	if (waitWindow === 1) { // Wait for player to receive turn.
		tileBarY = canvasH+barSize
		canvasVar.fillStyle = "#E6E6E6"
		canvasVar.fillRect((canvasW/2)-200,(canvasH/2)-200,400,400)
		text(canvasW/2,canvasH/2,"Click to begin turn...",30)
		if (leftMouseDown() & (! cooldown)) {
			waitWindow = 0
		}
	}
	if (message != "") {
		text(canvasW/2,(canvasH/2)-100,message,20)
	}
	
	if (time <= 10) {
		if (Math.ceil(time) < 0) {
			if (tilesOk) {
				if (doneSomething) {
					if (start30 >= 30) {
						endTurn(1)
					}
					else {
						time = 60
						extraTime = true
					}
				}
				else {
					endTurn(0)
				}
			}
			else {
				if (extraTime) {
					endTurn(2)
				}
				else {
					time = 60
					extraTime = true
				}
			}
		}
		else {
			text(canvasW/2,150,Math.ceil(time),30)
		}
	}
	if (! leftMouseDown()) {
		cooldown = false
	}
}

function checkBoard(checkAll) {
	var i = 0
	tilesOk = true
	var notOk = []
	for (i in range(board.length)) {
		if (board[i] != undefined) {
			if (board[i]["child"] != -1 & board[i]["row"] === -1) {
				var child = board[i]["child"]
				var run = [i]
				while (child != -1) {
					run[run.length] = child
					if (board[child] != undefined) {
						child = board[child]["child"]
					}
				}
				if (run.length > 2) { // Make sure the run/set has at least 3 tiles.
					if (board[run[0]]["number"] == 0 & board[run[1]]["number"] == 0) { // Two jokers.
						var tile = 0
						if (run.length > 3) {
							if (board[run[2]]["colour"] === board[run[3]]["colour"]) {
								for (tile in run) {
									if (tile > 2) {
										if (JSON.parse(board[run[tile]]["number"]) !== JSON.parse(board[run[tile-1]]["number"])+1 | board[run[tile]]["colour"] != board[run[tile-1]]["colour"]) {
											tilesOk = false
											if (! checkAll) {
												return
											}
											else {
												var c = 0
												for (c in run) {
													if (board[run[c]] != undefined) {
														notOk[notOk.length] = board[run[c]]
													}
												}
											}
										}
									}
								}
							}
						}
						if (board[run[1]]["colour"] !== board[run[2]]["colour"]) {
							var tile = 0
							for (tile in range(run.length-3)) {
								var tile = JSON.parse(tile)+2 
								if (! board[run[tile]]["number"] === board[run[tile+1]]["number"]) {
									tilesOk = false
									if (! checkAll) {
										return
									}
									else {
										var c = 0
										for (c in run) {
											if (board[run[c]] != undefined) {
												notOk[notOk.length] = board[run[c]]
											}
										}
									}
								}
							}
						}
					}
					else {
						if (board[run[0]]["number"] == board[run[1]]["number"]) {
							// It's a set.
							var tile = 0
							var colours = []
							for (tile in range(run.length)) {
								if (board[run[tile]]["number"] == 0) { // Joker.
									if (run.length > 4) {
										tilesOk = false
										if (! checkAll) {
											return
										}
										else {
											var c = 0
											for (c in run) {
												if (board[run[c]] != undefined) {
													notOk[notOk.length] = board[run[c]]
												}
											}
										}
									}
								}
								else {
									if (tile > 0) {
										if (board[run[tile-1]]["number"] !== board[run[tile]]["number"] | colours.indexOf(board[run[tile]]["colour"]) !== -1) {
											tilesOk = false
											if (! checkAll) {
												return
											}
											else {
												var c = 0
												for (c in run) {
													if (board[run[c]] != undefined) {
														notOk[notOk.length] = board[run[c]]
													}
												}
											}
										}
									colours[colours.length] = board[run[tile]]["colour"]
									}
								}
							}
						}
						else {
							// It's a run.
							var tile = 0
							for (tile in range(run.length)) {
								if (board[run[tile]]["number"] == 0) { // Joker.
									if (tile === 0) {
										if (board[run[tile+1]]["number"] <= 0) {
											tilesOk = false
											if (! checkAll) {
												return
											}
											else {
												var c = 0
												for (c in run) {
													if (board[run[c]] != undefined) {
														notOk[notOk.length] = board[run[c]]
													}
												}
											}	
										}
									}
									else {
										if (board[run[tile-1]]["number"] == 13) {
											tilesOk = false
											if (! checkAll) {
												return
											}
											else {
												var c = 0
												for (c in run) {
													if (board[run[c]] != undefined) {
														notOk[notOk.length] = board[run[c]]
													}
												}
											}
										}
									}
								}
								else {
									if (tile > 0) {
										if (board[run[tile-1]]["colour"] != board[run[tile]]["colour"] | JSON.parse(board[run[tile-1]]["number"])+1 != board[run[tile]]["number"]) {
											tilesOk = false
											if (! checkAll) {
												return
											}
											else {
												var c = 0
												for (c in run) {
													if (board[run[c]] != undefined) {
														notOk[notOk.length] = board[run[c]]
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
				else {
					tilesOk = false
					if (! checkAll) {
						return
					}
					else {
						var c = 0
						for (c in run) {
							if (board[run[c]] != undefined) {
								notOk[notOk.length] = board[run[c]] 
							}
						}
					}
				}
			}
			else {
				if (board[i]["row"] === -1) {
					tilesOk = false
					if (! checkAll) {
						return
					}
					else {
						var c = 0
						if (board[i] != undefined) {
							notOk[notOk.length] = board[i]
						}
					}
				}
			}
		}
	}
	
	if (checkAll) {
		return notOk
	}
}

function win() {
	var alwaysWinPlayer = false
	var playerPlaces = []
	var scores = []
	var i = 0
	for (i in playerTilesLeft) {
		if (playerConfig[i]["AlwaysWin"]) {
			var alwaysWinPlayer = i
			scores[scores.length] = -0.001
			playerPlaces[playerPlaces.length] = i 
		}
		else {
			scores[scores.length] = playerTilesLeft[i]
			playerPlaces[playerPlaces.length] = i
		}
	}
	var c = 0
	for (c in range(scores.length-1)) {
		var i = 0
		for (i in scores) {
			if (scores[i] < scores[c]) {
				var cache = cloneOb(scores[c])
				scores[c] = scores[i]
				scores[i] = cache
				var cache = cloneOb(playerPlaces[c])
				playerPlaces[c] = playerPlaces[i]
				playerPlaces[i] = cache
			}
		}
	}
	winInfo = [scores,playerPlaces]
	winAnimation = true
}

function endTurn(mode) {
	confirmExitMessage = false
	if (mode === 0) {
		playerTiles[currentTurn][findLastTile(currentTurn)] = pickTile()
		if (soundConfig["Effects"]) {
			playSound("PickTile")
		}
	}
	else {
		if (mode === 2) {
			var badTiles = checkBoard(true)
			var i = 0
			for (i in badTiles) {
				playerTiles[currentTurn][findLastTile(currentTurn)] = [[board[i]["number"],board[i]["colour"]]]
				laidTiles = laidTiles - 1
				start30 = start30 - board[i]["number"]
				if (start30 < 30 & turnActive[currentTurn] === turns) {
					activePlayers[currentTurn] = false
				}
				board[i] = undefined
			}
			var i = 0
			for (i in range(3)) {
				playerTiles[currentTurn][findLastTile(currentTurn)] = pickTile()
			}
			checkBoard()
		}
	}
	start30 = 0
	time = 60
	waitWindow = 1
	tileBarY = 1000
	tileScroll = 0
	extraTime = false
	cooldown = true
	message = ""
	laidTiles = 0
	holding = -1
	boardHolding = -1
	if (playerTilesLeft[currentTurn] < 1) {
		win()
	}
	turns++
	currentTurn = playerOrder[playerOrder.indexOf(currentTurn+1)]
	if (currentTurn > playerOrder.length-1 | isNaN(currentTurn)) {
		currentTurn = 0
	}
}

function cloneOb(Ob) {
	return JSON.parse(JSON.stringify(Ob))
}

function findLastTile(player) {
	var i = 0
	var lastTile = -1
	for (i in range(playerTiles[player].length)) {
		if (playerTiles[player][i] != undefined) {
			lastTile = i
		}
	}
	if (lastTile != -1) {
		return JSON.parse(lastTile) + 1
	}
	else {
		return 0
	}
}

function exit() {
	endTurn(1)
	board = []
	playerTiles = []
	tilesLeft = 106
	activePlayers = []
	turnActive = []
	turns = 0
	Status = "Menu"
	cooldown = true
	confirmExitMessage = false
	autoHide = true
	showBar()
}

function confirmExit() {
	confirmExitMessage = true
}

function sortRack(player) {
	var cache = []
	var num = 0
	var col = 0
	for (col in range(4)) {
		var num = 0
		for (num in range(14)) {
			var i = 0
			for (i in playerTiles[player]) {
				i = playerTiles[player][i]
				if (i !== undefined) {
					if (i[0][0] == num & i[0][1] == col) {
						cache[cache.length] = i
					}
				}
			}
		}
	}
	playerTiles[player] = cache
}
newUpdateScript(updateScript)