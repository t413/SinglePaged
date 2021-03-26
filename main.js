function clickListener(e){
	e.preventDefault(); // Cancel the native event
	
	alertify.alert("Importante!","<img src='img/rose.jpg'></img>",function(e){e.preventDefault()}).set('closable', false).set('label', '¡Lea!'); ;
	setTimeout(()=>(window.location.href = e.target.href), 5000);
	alertify.notify('Procesando...', 'success',10)
}

// Se encarga de completar los links de los botones si se resuelve bien el captcha
function correctLink(idx, elem){
	const group = elem.href.match('j/(.+)')
	if (group){
		// Dado que no es un link, supongo que es un cacho de url de join
		elem.href = "http://t.me/joinchat/" + group[1];
		elem.addEventListener("click", clickListener, false); 
	}
}

// TO DO: Falta el captcha
correct = false;
function testHuman(){
	alertify.prompt(
		"Test de humanidad",
		"Para saber que no eres un bot, responde: ¿2x3?", "escriba aquí",
		function(evt, value){ //completado
			let ans = String(value).toLowerCase().trim();
			correct = ['seis', '6', 'llueve', 'lluvia'].includes(ans);
			if(correct){
				$(".btn > a").each(correctLink);
				alertify.notify("Bienvenidu, amigou",'success',3);
			}else{
				alertify.alert(
					"Respuesta incorrecta",
					"La respuesta ingresada: '"+value+"' no es válida.",
					()=>(setTimeout(cancelWarn,500))
				).set('closable', false);
			}
		},
		()=>(setTimeout(cancelWarn,500))
	).set('closable', false);
}

function cancelWarn(){
	alertify.confirm(
		"Mala onda",
		"No podemos dejarte ver los links si no eres humano. ¿Quieres intentar otra vez?",
		function(){ //si
			setTimeout(testHuman, 500);
		},
		function(){ //tomarse el palo
			window.location.href = "https://www.youtube.com/watch?v=uwyHOnPUFGI";
		}
	).set('closable', false);
}

testHuman();