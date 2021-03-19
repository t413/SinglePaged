// Se encarga de completar los links de los botones si se resuelve bien el captcha
function correctLink(idx, elem){
	const group = elem.href.match('j/(.+)')
	if (group){
		// Dado que no es un link, supongo que es un cacho de url de join
		elem.href = "http://t.me/joinchat/" + group[1];
	}
}

// TO DO: Falta el captcha
correct = false;
do{
	let ans = String(prompt("Responde: ¿2x3?")).toLowerCase().trim();
	correct = ['seis', '6', 'llueve', 'lluvia'].includes(ans);
	
	if (correct){
		$(".btn > a").each(correctLink);
	}else{
		if(!confirm("No podemos mostrarte los links a menos que seas humano.\n¿Otro intento?")){
			break;
		}
	window.location.href = "about:blank";
	}
}while(!correct);
