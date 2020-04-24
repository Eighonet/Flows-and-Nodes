window.onload = function() {
    $("body").fadeOut(0);
    $("body").fadeIn(1000);

    let buttonClick = document.getElementsByClassName('start');
    buttonClick[0].onclick = function() {
        $("body").fadeOut(1000);
        setTimeout('location.href = "main.html"', 1200);
    };
    buttonClick = document.getElementsByClassName('about');
    buttonClick[0].onclick = function() {
        $("body").fadeOut(1000);
        setTimeout('location.href = "about.html"', 1200);
    };
    buttonClick = document.getElementsByClassName('records');
    buttonClick[0].onclick = function() {
        $("body").fadeOut(1000);
        setTimeout('location.href = "records.html"', 1200);
    };
    buttonClick = document.getElementsByClassName('exit');
    buttonClick[0].onclick = function() {
        window.close();
    };

  };