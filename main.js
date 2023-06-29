var Punhoesquerdox = 0
var Punhoesquerdoy = 0
var Punhodireitox = 0
var Punhodireitoy = 0
presicaopunhoesquerdo = 0
presicaopunhodireito = 0
function preload() {
    som = loadSound("music.mp3")
}
function setup() {
    canvas = createCanvas(500, 400); // cria um canvas de 800x600 pixels
    // outras configurações iniciais
    canvas.center()
    video = createCapture(VIDEO)
    video.hide()
    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on('pose',gotposes)
    
}

function draw() {
    background(220); // define a cor de fundo do canvas
    // outras operações de desenho e animação
    image(video, 0, 0, 500, 400)
    fill("black")
    if (presicaopunhoesquerdo > 0.2) {
        circle(Punhoesquerdox,Punhoesquerdoy,20)
        numint = floor(Number(Punhoesquerdoy));
        volume =numint/500
        som.setVolume(volume)
        document.getElementById("volume").innerHTML = "volume = " + volume
    console.log("volume = " + volume);
    }

    if (presicaopunhodireito > 0.2) {
        circle(Punhodireitox,Punhodireitoy,20)
        if (Punhodireitoy > 0  && Punhodireitoy <= 100) {
            document.getElementById("speed").innerHTML = "velocidade : 0.5"
            som.rate(0.5)
        }
        else if (Punhodireitoy > 100  && Punhodireitoy <= 200) {
            document.getElementById("speed").innerHTML = "velocidade : 1"
            som.rate(1)
        }
        else if (Punhodireitoy > 200 && Punhodireitoy <= 300) {
            document.getElementById("speed").innerHTML = "velocidade : 1.5"
            som.rate(1.5)
        }else if (Punhodireitoy > 300 && Punhodireitoy <= 400) {
            document.getElementById("speed").innerHTML = "velocidade : 2"
            som.rate(2)
        }
        else if (Punhodireitoy > 400) {
            document.getElementById("speed").innerHTML = "velocidade : 2.5"
            som.rate(2.5)
        }
    }
    
}
function modelLoaded() {
    console.log("modelocarregado")
}
function gotposes(results) {
if (results.length > 0) {
    console.log(results)
    Punhodireitox = results[0].pose.rightWrist.x
    Punhodireitoy = results[0].pose.rightWrist.y
    Punhoesrquerdox = results[0].pose.leftWrist.x
    Punhoesrquerdox = results[0].pose.leftWrist.y
    presicaopunhoesquerdo = results[0].pose.keypoints[10].score
    presicaopunhodireito = results[0].pose.keypoints[9].score
    console.log(presicaopunhodireito);
}
}
function play() {
    som.play()
}
function stop() {
    som.stop()
}