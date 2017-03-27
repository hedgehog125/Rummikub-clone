var date = new Date()
document.cookie = document.cookie + "; expires=Mon, 1 Feb " + date.getFullYear() + 1 + "12:00:00 UTC; path=/" // Stop the cookie expiring.

function clearCookies() {
	document.cookie = "[{}]; expires=Mon, 1 Feb " + date.getFullYear() + 1 + "12:00:00 UTC; path=/"
}

if (document.cookie === "") {
	clearCookies()
}

var loaded = false

if (document.cookie != "") {
	function setCookie(name,value) {
		var save = []
		save[0] = eval(document.cookie)[0]
		save[0][name] = value
		document.cookie = JSON.stringify(save) + "; expires=Mon, 1 Feb " + date.getFullYear() + 1 + "12:00:00 UTC; path=/"
	}
	
	function getCookie(name) {
		return eval(document.cookie)[0][name]
	}
	
	function getAllCookies() {
		return eval(document.cookie)[0]
	}
	
	function cookieExists(name) {
		if (document.cookie != "") {
			if (eval(document.cookie)[0][name] != undefined) {
				return true
			}
		}
		return false
	}
	var loaded = true
}
else {
	console.log("Error: Cookies are not functioning properly please run on a server.")
}