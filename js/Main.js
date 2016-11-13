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
var block_per_row = 5;
var block_per_col = 4;
var number_of_blocks = block_per_row*block_per_col;

//Pictures
var Trump1;
var Trump3;
var press_to_continue;

//Audio:
var audio_wrong;
var audio_America_Great_Again;
var audio_mix;

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


var three;
var two;
var one;
var go;

//Control var
var startGame = false;
var pause;
var pausing = false;
var end = false;

function init(){
    
    stage = new createjs.Stage("PongStage");

    //for debug only, turn true if you want to load the resources on your local computer
    var debug_localResources = true;
    if (debug_localResources) {
        manifest = [
        {src:"resources/bg.png", id:"bg"},
        {src:"resources/brick.png", id:"brick"},
        {src:"resources/start2.png", id:"start"},
        {src:"resources/paddle.png", id:"rect"},
        {src:"resources/ball.png", id:"circle"},
        {src:"resources/press_to_continue.png", id:"press_to_continue"},
        {src:"resources/pause.png", id:"pause"},
        {src:"resources/Trump1.png", id:"Trump1"},
        {src:"resources/Trump3.png", id:"Trump3"},
        {src:"resources/win.png", id:"win"},
        {src:"resources/lose.png", id:"lose"},
        {src:"resources/1.png", id:"one"},
        {src:"resources/2.png", id:"two"},
        {src:"resources/3.png", id:"three"},
        {src:"resources/go.png", id:"go"}
    ];
    } else {
        manifest = [
        {src:"http://" + serverAddress + "/resources/bg.png", id:"bg"},
        {src:"http://" + serverAddress + "/resources/brick.png", id:"brick"},
        {src:"http://" + serverAddress + "/resources/start2.png", id:"start"},
        {src:"http://" + serverAddress + "/resources/paddle.png", id:"rect"},
        {src:"http://" + serverAddress + "/resources/ball.png", id:"circle"},
        {src:"http://" + serverAddress + "/resources/press_to_continue.png", id:"press_to_continue"},
        {src:"http://" + serverAddress + "/resources/pause.png", id:"pause"},
        {src:"http://" + serverAddress + "/resources/Trump1.png", id:"Trump1"},
        {src:"http://" + serverAddress + "/resources/Trump3.png", id:"Trump3"},
        {src:"http://" + serverAddress + "/resources/win.png", id:"win"},
        {src:"http://" + serverAddress + "/resources/lose.png", id:"lose"},
        {src:"http://" + serverAddress + "/resources/1.png", id:"one"},
        {src:"http://" + serverAddress + "/resources/2.png", id:"two"},
        {src:"http://" + serverAddress + "/resources/3.png", id:"three"},
        {src:"http://" + serverAddress + "/resources/go.png", id:"go"}
    ];
    }

    preloader = new createjs.LoadQueue(false);
    preloader.addEventListener("complete", handleComplete);
    preloader.loadManifest(manifest, true, "./");

    Ticker = createjs.Ticker;
    Ticker.addEventListener("tick", tick);
    Ticker.setInterval(10);
    
    function tick(){
        if(Ticker.getTicks() - startTick == 1){
            var three_scale = new createjs.Matrix2D();
            three_scale.scale(1, 1);
            three = new createjs.Shape();
            three.graphics.beginBitmapFill(preloader.getResult("three"), "no-repeat", three_scale).drawRect(0,0,100,300);
            three.x=200;
            three.y=250;
            stage.addChild(three);
            stage.update();
        }
        if(Ticker.getTicks() - startTick == 100){
            stage.removeChild(three);
            var two_scale = new createjs.Matrix2D();
            two_scale.scale(1, 1);
            two = new createjs.Shape();
            two.graphics.beginBitmapFill(preloader.getResult("two"), "no-repeat", two_scale).drawRect(0,0,500,600);
            two.x=200;
            two.y=250;
            stage.addChild(two);
            stage.update();
        }
        if(Ticker.getTicks() - startTick == 200){
            stage.removeChild(two);
            var one_scale = new createjs.Matrix2D();
            one_scale.scale(1, 1);
            one = new createjs.Shape();
            one.graphics.beginBitmapFill(preloader.getResult("one"), "no-repeat", one_scale).drawRect(0,0,500,600);
            one.x=200;
            one.y=250;
            stage.addChild(one); 
            stage.update();

        }
        if(Ticker.getTicks() - startTick == 300){
            stage.removeChild(one);
            var go_scale = new createjs.Matrix2D();
            go_scale.scale(1, 1);
            go = new createjs.Shape();
            go.graphics.beginBitmapFill(preloader.getResult("go"), "no-repeat", go_scale).drawRect(0,0,500,600);
            go.x=200;
            go.y=250;
            stage.addChild(go);
            stage.update();
        }
        if(Ticker.getTicks() - startTick == 350){
            stage.removeChild(go);
            startGame = true;
            stage.update();
        }
        play();
    }
}

function play(){
    if(pausing)
        return;
    if(!startGame || end)
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

    var Trump3_scale = new createjs.Matrix2D();
    Trump3_scale.scale(0.77, 0.85);
    Trump3 = new createjs.Shape();
    Trump3.graphics.beginBitmapFill(preloader.getResult("Trump3"), "no-repeat", Trump3_scale).drawRect(0,0,500,600);
    Trump3.y = 100
    stage.addChild(Trump3);

    var start_button = new createjs.Bitmap(preloader.getResult("start"));
    start_button.addEventListener("click", handleClick);
    function handleClick(event) { 
        stage.removeChild(start_button)
        stage.removeChild(bg)
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

    var bg_scale = new createjs.Matrix2D();
    bg_scale.scale(4, 7);
    bg = new createjs.Shape();
    bg.graphics.beginBitmapFill(preloader.getResult("bg"), "no-repeat", bg_scale).drawRect(0,0,500,600);
    stage.addChild(bg);

    var press_scale = new createjs.Matrix2D();
    press_scale.scale(0.48, 0.5);
    press_to_continue = new createjs.Shape();
    press_to_continue.graphics.beginBitmapFill(preloader.getResult("press_to_continue"), "no-repeat", press_scale).drawRect(0,0,500,600);
    press_to_continue.y = 300
    stage.addChild(press_to_continue);

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
         
    var circle_scale = new createjs.Matrix2D();
    circle_scale.scale(0.10, 0.10);
    circle = new createjs.Shape();
    circle.graphics.beginBitmapFill(preloader.getResult("circle"), "no-repeat", circle_scale).drawCircle(0,0, circle_radius);
    circle.x = screen_width/2;
    circle.y = screen_height - rect_height - circle_radius - 10;
    stage.addChild(circle);
    
    rect = new createjs.Shape();
    rect.graphics.beginBitmapFill(preloader.getResult("rect")).drawRoundRect(0,0,rect_width,rect_height,3);
    rect.x = (screen_width - rect_width)/2;
    rect.y = screen_height - rect_height - 10;
    stage.addChild(rect);

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
    }
    stage.update();
    
    
    audio_wrong = new Audio('resources/wrong.mp3');
    audio_America_Great_Again = new Audio('resources/AmericaGreatAgain.mp3');

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
    audio_America_Great_Again.play();
    stage.removeAllChildren();
    var lose_scale = new createjs.Matrix2D();
    lose_scale.scale(1.2,1.35);
    lose = new createjs.Shape();
    lose.graphics.beginBitmapFill(preloader.getResult("lose"), "no-repeat", lose_scale).drawRect(0,0,500,600);
    stage.addChild(lose);
    stage.update();
    end = true;
}

function win_stage(){
    stage.removeAllChildren();
    var win_scale = new createjs.Matrix2D();
    win_scale.scale(1.2,1.35);
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

var startTick;


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
                stage.removeChild(press_to_continue);
                startTick = Ticker.getTicks();
                stage.update();
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

/**
 * Client networking
 */
/*
Client to Server Signal list:
"joinGameRequest" : this singal is sent by player when he pressed multiplayer button.
                    The server will try to match or create a lobby.
"disconnect" :  sent by player when disconnect.
                If player is in lobby, remove that player in lobby.
                If player is in game, change the player's side to wall.
"ready" :   sent by player when he/she is ready in lobby.
            When both players are ready, the game starts.
"move" : Sent when player moves. Contains the new position of paddle.

Server to Client Signal list:
"lobbyInfo" : Contains the info of lobby. Sent when updating lobby info.
"playerDisconnect" : Notify that players leaves the game.
"mapUpdate" : Contains the new position of paddles of both players.
"serverShutDown" : server shut down.
""
*/
//the server address (change to your IP address when debug)
var serverAddress = "10.142.76.157:3000";
//single mode: true if single player, false if multiplayer
var singleMode; // = ?
//the socket
var socket;

//connect to the server and bind the signal functions
function connectServer() {
    socket = io(serverAddress);
    socket.on('lobbyInfo', handleLobbyInfo);
    socket.on('playerDisconnect', handlePlayerDisconnect);
    socket.ong('mapUpdate', handleMapUpdate);
    socket.on('serverShutDown', handleServerShutDown);
}

//handleLobby
function handleLobbyInfo(message) {

}

//handlePlayerDisconnect
function handlePlayerDisconnect(message) {

}

//handle mapUpdate
function handleMapUpdate(message) {

}

//handle serverShutDown
function handleServerShutDown(message) {

}