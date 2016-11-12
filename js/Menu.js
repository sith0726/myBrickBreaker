var stage;

var start_button;

var preloader;


function init() {
    stage = new createjs.Stage("PongStage");

    manifest = [
        {src:"resources/bg.png", id:"bg"},
        {src:"resources/brick.png", id:"brick"},
        {src:"resources/start.png", id:"start"},
        {src:"resources/paddle.png", id:"rect"},
        {src:"resources/ball.png", id:"circle"},
        {src:"resources/Trump1.png", id:"Trump1"},
        {src:"resources/Trump2.png", id:"Trump2"},
        {src:"resources/win.png", id:"win"},
        {src:"resources/lose.png", id:"lose"}
    ];

    preloader = new createjs.LoadQueue(false);
    preloader.addEventListener("complete", handleComplete);
    preloader.loadManifest(manifest);

}

function handleComplete() {
    start_button = new createjs.Bitmap(preloader.getResult("start"));
    start_button.addEventListener("click", handleClick);
    function handleClick(event) { 
        alert("clicked");
    }

    start_button.scaleX = 0.5;
    start_button.scaleY = 0.5;
    start_button.x = 50;
    start_button.y = 400;

    stage.addChild(start_button);
    stage.update();
}