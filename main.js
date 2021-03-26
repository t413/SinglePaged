function clickListener(e){
	e.preventDefault(); // Cancel the native event
	
	const timeout = 5000;
	let time_finished = false;
	
	setTimeout(()=>(time_finished = true), timeout)
	
	let cbConfirm = function(closeEvent){
		if (!time_finished){
			closeEvent.cancel = true ;
		}else{
			window.location.href = e.target.href
		}
	}
	
	const rose = alertify.confirm("Importante!","<img src='img/rose.jpg'></img>", cbConfirm, function(){}).autoOk(timeout/1000).setting({
		'closable': false
	});
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

function grantAccess(){
	$(".btn > a").each(correctLink);
	alertify.notify("Bienvenidu, amigou",'success',3);
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

// TO DO: Falta el captcha
let correct = false;
function testHuman(cbTrue, cbFalse){
	if(getCookie("soyHumano")==="true"){
		cbTrue();
		return;
	}
	
	alertify.prompt(
		"Test de humanidad",
		"Para saber que no eres un bot, responde: ¿2x3?", "",
		function(evt, value){ //completado
			let ans = String(value).toLowerCase().trim();
			correct = ['seis', '6', 'llueve', 'lluvia'].includes(ans);
			if(correct){
				setCookie("soyHumano","true",5);
				cbTrue();
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
			cbFalse();
		}
	).set('closable', false);
}

testHuman(function(){ //ok
	grantAccess();
}, function(){ //no ok
	window.location.href = "https://www.youtube.com/watch?v=uwyHOnPUFGI";
});
