/*funkcija za phone rezoluciju bara*/
$('.navTrigger').click(function () {
    $(this).toggleClass('active');
    console.log("Clicked menu");
    $("#mainListDiv").toggleClass("show_list");
    $("#mainListDiv").fadeIn();
});

/*funkicja za stikovanje bara*/
$(window).scroll(function() {
    if ($(document).scrollTop() > 50) {
        $('.nav').addClass('affix');
        console.log("OK");
    } else {
        $('.nav').removeClass('affix');
    }
});
/*
$(window).scroll(function() {
    if ($(document).scrollBottom() > 50) {
        $('.footer-pocetna').addClass('affix');
        console.log("OK");
    } else {
        $('.footer-pocetna').removeClass('affix');
    }
});
*/

/*funkcija za prikazivanje forme klikom na dugme*/
$(".dugme").click(function(){
    $("#forma1").slideDown();
});

/*uputstva-kartice*/
var swiper = new Swiper('.blog-slider', {
    spaceBetween: 30,
    effect: 'fade',
    loop: true,
    mousewheel: {
      invert: false,
    },
    // autoHeight: true,
    pagination: {
      el: '.blog-slider_pagination',
      clickable: true,
    }
});