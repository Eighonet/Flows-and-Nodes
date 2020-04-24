
window.onload = function() {
    $(".eighonetAerta").fadeOut(0);
    $(".eighonetAerta").fadeIn(2000);

    setTimeout("$('.eighonetAerta').fadeOut(2000)",3000);

    var options = {
        classname: 'progressBar'
    };

    let i = 5;

    var nanobar = new Nanobar( options );
    $(".progressBar").fadeOut(0);
    setTimeout('$(".progressBar").fadeIn(1000)', 1500);

    nanobar.go( 35);

    setTimeout(
        function () {
            nanobar.go( 80);
        }, 1800);


    setTimeout(
        function () {
            nanobar.go( 99);
        }, 1800);


    setTimeout(
        function () {
            window.location.href ="menu.html";
        }, 5000);
};