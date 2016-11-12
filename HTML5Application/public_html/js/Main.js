//var canvas;
//var stage;
//// Graphics
////[Background]
// 
//var bg; //The background graphic
// 
////[Title View]
//  
// 
//var main; //The Main Background
//var startB; //The Start button in the main menu
//var creditsB; //The credits button in the main menu
// 
////[Credits]
// 
// 
//var credits; //The Credits screen
// 
////[Game View]
// 
// 
//var player; //The player paddle graphic
//var ball; //The ball graphic
//var cpu; //The CPU paddle
//var win; //The winning popup
//var lose; //The losing popup
////[Score]
// 
//var playerScore; //The main player score
//var cpuScore; //The CPU score
//var cpuSpeed=6; //The speed of the CPU paddle; the faster it is the harder the game is
//// Variables
// 
document.getElementById("PongStage").style.background = 'Gainsboro';

var speed_x_circle = 1;
var speed_y_circle = 1;
var speed_x_rect = 1;

//var tkr = new Object;
////preloader
//var preloader;
//var manifest;
//var totalLoaded = 0;
//var TitleView = new Container();

function init(){
    
    var stage = new createjs.Stage("PongStage");
    var circle = new createjs.Shape();
    
    circle.graphics.beginFill("DeepSkyBlue").drawCircle(0,0,10);
    circle.x = 50;
    circle.y = 100;
    stage.addChild(circle);
    stage.update();
    
    var rect = new createjs.Shape();
    rect.graphics.beginFill("Black").drawRoundRect(200,470,100,10,3);
    stage.addChild(rect);
    stage.update();
    
    createjs.Ticker.addEventListener("tick", tick);
    createjs.Ticker.setInterval(10);
    function tick(){
        updateCircle(circle);
        updateRect(rect);
        stage.update();
    }
    
    
    
//    manifest = [
//            {src:"resources/bg.png", id:"bg"},
//            {src:"resources/brick.png", id:"brick"},
//            {src:"resources/start.png", id:"start"},
//            {src:"resources/paddle.png", id:"player"},
//            {src:"resources/ball.png", id:"ball"},
//            {src:"resources/win.png", id:"win"},
//            {src:"resources/lose.png", id:"lose"},
//            {src:"hit.mp3|hit.ogg", id:"hit"},
//            {src:"wall.mp3|wall.ogg", id:"wall"}
//    ];
//    
//    preloader = new PreloadJS();
//    preloader.installPlugin(SoundJS);
//    preloader.onProgress = handleProgress;
//    preloader.onComplete = handleComplete;
//    preloader.onFileLoad = handleFileLoad;
//    preloader.loadManifest(manifest);
// 
//    /* Ticker */
    
}

function addTitleView(){
    
}

function updateCircle(circle){
    if(circle.x >= 492 || circle.x <= 8){
        speed_x_circle = -speed_x_circle;
    }
    if(circle.y >= 498 || circle.y <= 8){
        speed_y_circle = -speed_y_circle;
    }
    circle.x += speed_x_circle;
    circle.y += speed_y_circle;
}

function updateRect(rect){
    if(rect.x >= 400 || rect.x <= 10){
        speed_x_rect = -speed_x_rect;
    }
    rect.x += speed_x_rect;
}