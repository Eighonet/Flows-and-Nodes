window.onload = function() {
    $("body").fadeOut(0);
    $("body").fadeIn(1000);

    let buttonClick = document.getElementsByClassName('backButton');
    buttonClick[0].onclick = function() {
        $("body").fadeOut(1000);
        setTimeout('location.href = "menu.html"', 1200);
    };

};