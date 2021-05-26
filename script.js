var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");

var freqLabel = document.getElementById("freqLabel");
var freqSlider = document.getElementById("freqSlider");
freqSlider.oninput = function() {
    freqLabel.innerHTML = "Frequency: " + String(freqSlider.value) + "hz";
    freq = freqSlider.value;
}
var ampLabel = document.getElementById("ampLabel");
var ampSlider = document.getElementById("ampSlider");
ampSlider.oninput = function() {
    ampLabel.innerHTML = "Amp: " + String(ampSlider.value);
    amp = ampSlider.value;
}
canvas.width = 800;
canvas.height = 400;

var showWave = true;
var framerate = 60;
var x = 0;
var y = canvas.height/2;
var phase = 0;
var oldx = x;
var oldy = y;

var amp = 50;
var freq = 1;

var particleArray = [];

c.moveTo(x, y);

function harmonic (num) {
    return amp/Math.pow(2, num) * Math.sin(-this.x*freq*num + phase*num);
}
function animate() {
    if (showWave == true) {
        c.clearRect(0, 0, canvas.width, canvas.height);
        x = 0;
        y = Math.PI * amp * Math.sin(/*-canvas.width/2*/-x*Math.PI/canvas.width* 2 * freq + phase) + canvas.height/2;
        c.beginPath();
        c.moveTo(x, y);
        while (x < canvas.width) {
            x += 1;
            y = Math.PI * amp * Math.sin(/*-canvas.width/2*/-x*Math.PI/canvas.width* 2 * freq + phase) + canvas.height/2;
            c.lineWidth = 1;
            c.lineTo(x, y);
            oldx = x;
            oldy = y;
        }
        
        c.lineWidth = 3;
        c.strokeStyle = "#ffffff";
        c.stroke();
        c.closePath();
        phase += canvas.width/360 * (1000/framerate/canvas.width * freq * 2);
        
        }
    
}

setInterval(animate, 1000/framerate);
