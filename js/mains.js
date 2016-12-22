var personas;


$.ajax({
    url: 'http://api.open-notify.org/astros.json',
    success: function(res) {
        personas = res.people;
        console.log(personas);
        window.requestAnimationFrame(redraw);
    }
})










if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (function() {

        return window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(callback, element) {

                window.setTimeout(callback, 1000 / 60);

            };

    })();
}

var canvas = document.getElementById('scene');
var ctx = canvas.getContext('2d');
var w = canvas.width;
var h = canvas.height;

var circle = function(color, r) {
    ctx.fillStyle = color;

    ctx.beginPath();
    ctx.arc(0, 0, r, 0, 2 * Math.PI, true);
    ctx.closePath();

    ctx.fill();
}

var i = 0;
var redraw = function() {
    ctx.save();

    // paint bg
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, w, h);

    // set origin to center
    ctx.translate(w / 2, h / 2);

    // draw sun
    circle('#99CCFF', 80);

    // rotate + move along x
    ctx.rotate(i / 100);
    ctx.translate(100, 0);

    // draw planet
    circle('#BBBBBB', 5);

    for(var index=0; index < personas.length; index++){
     ctx.fillText(personas[index].name,0,index*10)
    }


    // ctx.fillText

    ctx.restore();

    i++;

    window.requestAnimationFrame(redraw);
};
