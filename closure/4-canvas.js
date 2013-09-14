canvas = document.getElementById("myCanvas");
context = canvas.getContext('2d');

centerX = canvas.width / 2;
centerY = canvas.height / 2;

paint = false;
erasure = false;

dots = [];

canvas.onmousemove = function (e) {
    if ( paint ) {
        malen(e.clientX-canvas.offsetLeft, e.clientY-canvas.offsetTop);
    }
};

canvas.onmousedown = function (e) {
    paint = true;
};

canvas.onmouseup = function (e) {
    paint = false;
};

function erase(mausX, mausY) {
    context.beginPath();
    context.arc(mausX, mausY, 20, 0, Math.PI * 2);
    context.fillStyle = 'white';
    context.fill();
    context.closePath();
}
function draw(mausX, mausY) {
    context.beginPath();
    context.arc(mausX, mausY, 5, 0, Math.PI * 2);
    context.fillStyle = 'black';
    context.fill();
    context.closePath();
}
function malen(mausX, mausY) {
    dots.push({
        x: mausX,
        y: mausY,
        erase: erasure
    });
    if (erasure) {
        erase(mausX, mausY);
    } else {
        draw(mausX, mausY);
    }
}

function toggle() {
    erasure = !erasure;
    var toggleButton = document.getElementById("toggle");
    toggleButton.innerHTML = erasure ? "Malen" : "Radiergummi" ;
}

function clear() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

// Objekte sind mutable, daher greift die Closures hier immer nur auf den letzten Wert von dot zu
// und es wird immer nur dergleiche Punkte gemalt
function replay() {
    clear();
    for (var i = 0; i < dots.length; i++) {
        var dot = dots[i];
        window.setTimeout(function() {
            if (dot.erase) {
                erase(dot.x, dot.y);
            } else {
                draw(dot.x, dot.y);
            }
        }, 0);
    }
}
