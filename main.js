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
	
	RVerify.action(function(res){
		switch(res){
			case 2:
				alertify.confirm(
					"Test cancelado",
					"No podré dejarte pasar a menos que completes el test para demostrar tu humanidad. ¿Lo quieres intentar?",
					init,
					cbFalse
				).set('closable', false);
			break;
			
			case 1:
				setCookie("soyHumano","true",5);
				cbTrue();
			break;
			
			default:
				alertify.confirm(
					"Test fallado",
					"Haz fallado desastrozamente el test, no podré dejarte pasar a menos que lo completes. ¿Intentas otra vez?",
					function(){},
					cbFalse
				).set('closable', false);
		}
	});
}


function init(){
	testHuman(function(){ //ok
		grantAccess();
	}, function(){ //no ok
		window.location.href = "https://www.youtube.com/watch?v=uwyHOnPUFGI";
	});
}

//Rverify
RVerify.configure({
  title: 'Anti Bots',
  text: 'Dejá la imagen derechita',
  tolerance: 10,
  zIndex: 999999,
  maskClosable: false,
  album: [
	'/img/rverify/1.png',
	'/img/rverify/2.jpg',
	'/img/rverify/3.jpg',
	'/img/rverify/4.gif'
  ]
});

init();