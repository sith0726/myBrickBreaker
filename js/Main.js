//Stage
var stage;

//Screen data
var screen_width = 500;
var screen_height = 600;

//Speed Value
var default_circle_speed = 2;
var max_speed = 3;

var speed_x_circle = default_circle_speed;
var speed_y_circle = default_circle_speed;
var speed_x_rect = 0;

//Shape
var circle;
var rect;
var blocks;

//Shape data
var circle_radius = 15;
var rect_width = 100;
var rect_height = 10;
var block_width = 100;
var block_height = 50;

//Number of blocks
var block_per_row = 50;
var block_per_col = 4;
var number_of_blocks = block_per_row*block_per_col;

//Pictures
var Trump1;
var Trump2;
var press_to_continue;

//Audio:
var audio_wrong;

//Win - Lose
var win;
var lose;

//Preloader
var preloader;

//File Storage
var manifest;

//Document Manipulation
document.onkeydown = handleKeyDown;
document.onkeyup = handleKeyUp;
document.onmousedown = reset

var key_left_down = false;
var key_right_down = false;

//Control var
var startGame = false;
var pause;
var pausing = false;
var end = false;

function init(){
    
    stage = new createjs.Stage("PongStage");
    
        
    manifest = [
        {src:"resources/bg.png", id:"bg"},
        {src:"resources/brick.png", id:"brick"},
        {src:"resources/start2.png", id:"start"},
        {src:"resources/paddle.png", id:"rect"},
        {src:"resources/ball.png", id:"circle"},
        {src:"resources/press_to_continue.png", id:"press_to_continue"},
        {src:"resources/pause.png", id:"pause"},
        {src:"resources/Trump1.png", id:"Trump1"},
        {src:"resources/Trump2.png", id:"Trump2"},
        {src:"resources/win.png", id:"win"},
        {src:"resources/lose.png", id:"lose"}
    ];

    preloader = new createjs.LoadQueue(false);
    preloader.addEventListener("complete", handleComplete);
    preloader.loadManifest(manifest, true, "./");

    
    createjs.Ticker.addEventListener("tick", tick);
    createjs.Ticker.setInterval(10);
    
    function tick(){
        play();
    }
}

function play(){
    if(pausing)
        return;
    if(!startGame)
        return;
    updateCircle(circle);
    updateRect(rect);
    hitTest(stage, circle, rect, blocks);
    stage.update();
}

function handleComplete() {
    var bg_scale = new createjs.Matrix2D();
    bg_scale.scale(4, 7);
    bg = new createjs.Shape();
    bg.graphics.beginBitmapFill(preloader.getResult("bg"), "no-repeat", bg_scale).drawRect(0,0,500,600);
    stage.addChild(bg);

    var start_button = new createjs.Bitmap(preloader.getResult("start"));
    start_button.addEventListener("click", handleClick);
    function handleClick(event) { 
        stage.removeChild(start_button)
        stage.update()
        loading();
    }

    start_button.scaleX = 0.5;
    start_button.scaleY = 0.5;
    start_button.x = 50;
    start_button.y = 400;

    stage.addChild(start_button);
    stage.update();
}


function loading() {
    startGame = false;


    
    var press_scale = new createjs.Matrix2D();
    press_scale.scale(0.48, 0.5);
    press_to_continue = new createjs.Shape();
    press_to_continue.graphics.beginBitmapFill(preloader.getResult("press_to_continue"), "no-repeat", press_scale).drawRect(0,0,500,600);
    press_to_continue.y = 300
    stage.addChild(press_to_continue);
    stage.update();

    var pause_scale = new createjs.Matrix2D();
    pause_scale.scale(2, 0.5);
    pause = new createjs.Shape();
    pause.graphics.beginBitmapFill(preloader.getResult("pause"), "no-repeat", pause_scale).drawRect(0,0,500,600);
    pause.y = 300

    var Trump1_scale = new createjs.Matrix2D();
    Trump1_scale.scale(0.5, 0.47);
    Trump1 = new createjs.Shape();
    Trump1.graphics.beginBitmapFill(preloader.getResult("Trump1"), "no-repeat", Trump1_scale).drawRect(0,0,300,200);
    Trump1.x = 100;
    Trump1.y = 0;
    stage.addChild(Trump1);
    stage.update();
         
    var circle_scale = new createjs.Matrix2D();
    circle_scale.scale(0.10, 0.10);
    circle = new createjs.Shape();
    circle.graphics.beginBitmapFill(preloader.getResult("circle"), "no-repeat", circle_scale).drawCircle(0,0, circle_radius);
    circle.x = screen_width/2;
    circle.y = screen_height - rect_height - circle_radius - 10;
    stage.addChild(circle);
    stage.update();
    
    rect = new createjs.Shape();
    rect.graphics.beginBitmapFill(preloader.getResult("rect")).drawRoundRect(0,0,rect_width,rect_height,3);
    rect.x = (screen_width - rect_width)/2;
    rect.y = screen_height - rect_height - 10;
    stage.addChild(rect);
    stage.update();

    var block_scale = new createjs.Matrix2D();
    block_scale.scale(1, 0.49);
    blocks = [];
    for(var i = 0; i < number_of_blocks; i++){
        var brick = new createjs.Shape();
        brick.graphics.beginBitmapFill(preloader.getResult("brick"),"no-repeat", block_scale).drawRoundRect(0,0,block_width,block_height,10);
        brick.x = block_width*(i%block_per_row);
        brick.y = block_height*Math.floor(i/block_per_row);
        blocks.push(brick);
        stage.addChild(brick);
        stage.update();
    }

    audio_wrong = new Audio('resources/wrong1.mp3');
}

function updateCircle(circle){
    if(circle.x >= screen_width - circle_radius || circle.x <= circle_radius){
        speed_x_circle = -speed_x_circle;
        if(circle.x >= screen_width - circle_radius)
            circle.x = screen_width - circle_radius;
        else
            circle.x = circle_radius;
    }
    if(circle.y >= screen_height - circle_radius || circle.y <= circle_radius){
        speed_y_circle = -speed_y_circle;
        if (circle.y >= screen_height - circle_radius)
            circle.y = screen_height - circle_radius;
        else
            circle.y <= circle_radius;
    }
    circle.x += speed_x_circle;
    circle.y += speed_y_circle;
}

function updateRect(rect){
    if (key_left_down) {
        speed_x_rect = -4;
    } else if (key_right_down) {
        speed_x_rect = 4;
    } else {
        speed_x_rect = 0;
    }

    virtualPos = rect.x + speed_x_rect;
    if(virtualPos > screen_width - rect_width || virtualPos < 0){
        speed_x_rect = 0;
    }
    rect.x += speed_x_rect;
}

function hitTest(stage, circle, rect, blocks){
    if(circle.y > rect.y){
        lose_stage();
    }
    if(circle.x >= rect.x && circle.x <= rect.x+rect_width){
        if(rect.y -circle.y <= circle_radius){
            speed_y_circle = -speed_y_circle;
            speed_x_circle += speed_x_rect/3;
            if(speed_x_circle > max_speed)
                speed_x_circle = max_speed;
            circle.y = rect.y - circle_radius;
        }
    }
    else if(circle.y > rect.y && circle.y <rect.y + rect_height){
        if((rect.x <= circle.x + circle_radius && rect.x > circle.x) || (rect.x + rect_width < circle.x && rect.x + rect_width >= circle.x - circle_radius)){
            speed_x_circle += speed_x_rect/2;
            if(speed_x_circle > max_speed)
                speed_x_circle = max_speed;
        }
    }
    testHitBlock(stage, circle, blocks);
    if(blocks.length == 0){
        win_stage();
    }
}

function lose_stage(){
    var lose_scale = new createjs.Matrix2D();
    lose_scale.scale(1.2,1.35);
    lose = new createjs.Shape();
    lose.graphics.beginBitmapFill(preloader.getResult("lose"), "no-repeat", lose_scale).drawRect(0,0,500,600);
    stage.addChild(lose);
    stage.update();
    end = true;
}

function win_stage(){
    var win_scale = new createjs.Matrix2D();
    win_scale.scale(1.3,1.55);
    win = new createjs.Shape();
    win.graphics.beginBitmapFill(preloader.getResult("win"), "no-repeat", win_scale).drawRect(0,0,500,600);
    stage.addChild(win);
    stage.update();
    end = true;
}

function reset(){
    if(!end)
        return;
    stage.removeAllChildren();
    loading();
    speed_x_circle = default_circle_speed;
    speed_y_circle = default_circle_speed;
    end = false;
}

function testHitBlock(stage, circle, blocks){
    for(var i = 0; i < blocks.length; i++){
        if(circle.x >= blocks[i].x && circle.x <= blocks[i].x+block_width){
            if((blocks[i].y -circle.y >= -(circle_radius+block_height) && blocks[i].y -circle.y < -circle_radius && speed_y_circle < 0) 
                    || (blocks[i].y -circle.y <= circle_radius && blocks[i].y -circle.y > 0 && speed_y_circle > 0)){
                audio_wrong.play();
                speed_y_circle = -speed_y_circle;
                stage.removeChild(blocks[i]);
                stage.update();
                blocks.splice(i,1);

                return;
            }
        }
        if(circle.y >= blocks[i].y && circle.y <= blocks[i].y+block_height){
            if((blocks[i].x -circle.x >= -(block_width + circle_radius) && blocks[i].x -circle.x < -circle_radius && speed_x_circle < 0) 
                    || (blocks[i].x -circle.x <= circle_radius && blocks[i].x -circle.x > 0 && speed_x_circle > 0)){
                audio_wrong.play();
                speed_x_circle = -speed_x_circle;
                stage.removeChild(blocks[i]);
                stage.update();
                blocks.splice(i,1);
                return;
            }
        }
    }
}

function handleKeyDown(e) {
    if (!e) {
        var e = window.event;
    }
    switch(e.keyCode) {
        //left arrow key
        case 37:
        case 65:
            key_left_down = true;
            key_right_down = false;
            break;
        //right arrow key
        case 39:
        case 68:
            key_left_down = false;
            key_right_down = true;
            break;
        case 80:
            if(pausing){
                stage.removeChild(pause);
                stage.update();
                pausing = false;
            }
            else{
                stage.addChild(pause);
                stage.update();
                pausing = true;
            }
            break;
        default:
            if(!startGame){
                startGame = true;
                stage.removeChild(press_to_continue);
            }
    }
}

function handleKeyUp(e) {
        if (!e) {
        var e = window.event;
    }
    switch(e.keyCode) {
        //left arrow key
        case 37:
        case 65:
            key_left_down = false;
            break;
        //right arrow key
        case 39:
        case 68:
            key_right_down = false;
            break;
    }
}