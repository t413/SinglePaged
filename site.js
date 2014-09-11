

var scrollToOffset = 120;
var disableScrollFn = false;

$(document).ready(function (){
	$('nav li a').on('click', function(event){
		event.preventDefault();
		scrollToID( $(this).attr("href"), 300);
	});


    var sections = {}, navs = {};
    $('.section').each(function(){
        sections[this.id] = $(this).offset().top;
    });
    $('nav a').each(function(){
        navs[ $(this).attr('href').substring(1) ] = this.parentNode;
    });

    $(document).scroll(function(){
        if (disableScrollFn) { return; }
        var page_height = $(window).height();
        var pos = $(this).scrollTop();
        for (i in sections) {
            if ((pos + scrollToOffset >= sections[i]) && sections[i] < pos + page_height){
                $("nav li").removeClass('active');
                $(navs[i]).addClass('active');
            }
        }
    });

});




function scrollToID(id, speed){
	var targetOffset = $(id).offset().top - scrollToOffset;
    disableScrollFn = true;
    $("nav li").removeClass('active');
	$('html,body').animate({scrollTop: targetOffset}, speed, "linear", function(){
        disableScrollFn = false;
        console.log("animateion completed.");
    });
}
if (typeof console === "undefined") {
    console = {
        log: function() { }
    };
}
