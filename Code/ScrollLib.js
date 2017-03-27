ScrollLib = {}
ScrollLib.text = {}
ScrollLib.newText = function(id) {
	document.write("<canvas width='1650' height='30' id='#ScrollLib_" + id + "'></canvas>")
	ScrollLib.text[id] = {}
	ScrollLib.text[id]["code"] = ""
	ScrollLib.text[id]["speed"] = 2
	ScrollLib.text[id]["x"] = 0-(("Some Text!".length)*15)
	ScrollLib.text[id]["y"] = 15
	ScrollLib.text[id]["size"] = 30
	ScrollLib.text[id]["text"] = "Some Text!"
	ScrollLib.text[id]["dir"] = "Right"
	ScrollLib.text[id]["canvas"] = document.getElementById("#ScrollLib_" + id)
	ScrollLib.text[id]["ctx"] = ScrollLib.text[id]["canvas"].getContext("2d")
	ScrollLib.text[id]["ctx"].textBaseline = "middle"
	ScrollLib.text[id]["colour"] = "#000000"
	ScrollLib.text[id]["fontName"] = "Gloria"
	ScrollLib.text[id]["ctx"].font = ScrollLib.text[id]["size"] + "px " + ScrollLib.text[id]["fontName"]
	ScrollLib.text[id]["ctx"].fillStyle = ScrollLib.text[id]["colour"]
}

ScrollLib.getText = function(id) {
	return ScrollLib.text[id]
}
	
ScrollLib.init = function() {
	for (ScrollLib.i in ScrollLib.text) {
		var i = ScrollLib.text[ScrollLib.i]
		i.font = i["size"] + "px " + i["fontName"]
		var ctx = i["ctx"]
		ctx.font = i.font
		ctx.fillStyle = i["colour"]
		ctx.clearRect(0,0,i["canvas"].width,i["canvas"].height)
		ctx.fillText(i["text"],i["x"],i["y"])
		if (i["dir"] === "Right") {
			i["x"] = i["x"] + i["speed"]
			if (i["x"] >= i["canvas"].width) {
				i["x"] = 0-(i["text"].length*(i["size"]/2))
			}
		}
		else {
			if (i["dir"] === "Left") {
				i["x"] = i["x"] - i["speed"]
				if (i["x"] <= 0) {
					i["x"] = i["canvas"].width
				}
			}
			else {
				if (i["dir"] === "Up") {
					i["y"] = i["y"] - i["speed"]
					if (i["y"] <= 0) {
						i["y"] = i["canvas"].height
					}
				}
				else {
					if (i["dir"] === "Down") {
						i["y"] = i["y"] + i["speed"]
						if (i["y"] >= i["canvas"].height) {
							i["y"] = 0
						}
					}
				}
			}
		}
		i["code"]()
		
	}
}

setInterval(ScrollLib.init, 30)