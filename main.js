// Se encarga de completar los links de los botones si se resuelve bien el captcha
function correctLink(idx, elem){
	const group = elem.href.match('j/(.+)')
	if (group){
		// Dado que no es un link, supongo que es un cacho de url de join
		elem.href = "http://t.me/joinchat/" + group[1];
	}
}

// TO DO: Falta el captcha
$(".btn > a").each(correctLink);