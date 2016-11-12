var stage;

var screen_width = 500;
var screen_height = 600;

var default_circle_speed = 2;
var max_speed = 3;

var speed_x_circle = default_circle_speed;
var speed_y_circle = default_circle_speed;
var speed_x_rect = 5;

var circle;
var rect;
var blocks;

var circle_radius = 10;
var rect_width = 100;
var rect_height = 10;
var block_width = 50;
var block_height = 50;

var block_per_row = 10;
var block_per_col = 4;
var number_of_blocks = block_per_row*block_per_col;

var Trump1;
var Trump2;

var win;
var lose;

var preloader;

function init(){
    
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
        {src:"resources/lose.png", id:"lose"},
        {src:"hit.mp3|hit.ogg", id:"hit"},
        {src:"wall.mp3|wall.ogg", id:"wall"}
    ];
    
    preloader = new createjs.LoadQueue(false);
    preloader.addEventListener("complete", handleComplete);
    preloader.loadManifest(manifest, true, "./");

    
    createjs.Ticker.addEventListener("tick", tick);
    createjs.Ticker.setInterval(10);
    this.slow_down = 1;
    function tick(){

        if(this.slow_down%500 === 0){
            speed_x_circle = speed_x_circle*9/10;
            this.slow_down = 0;
        }
        this.slow_down+=1;
        updateCircle(circle);
        updateRect(rect);
        hitTest(stage, circle, rect, blocks);
        stage.update();
    }
    

}
 
function handleComplete() {
    var matrix1 = new createjs.Matrix2D();
    matrix1.scale(4, 7);


    bg = new createjs.Shape();
    bg.graphics.beginBitmapFill(preloader.getResult("bg"), "no-repeat", matrix1).drawRect(0,0,500,600);
    stage.addChild(bg);
    stage.update();
    

    var matrix2 = new createjs.Matrix2D();
    matrix2.scale(0.5, 0.5);

    Trump1 = new createjs.Shape();
    Trump1.graphics.beginBitmapFill(preloader.getResult("Trump1"), "no-repeat", matrix2).drawRect(0,0,300,200);
    Trump1.x = 100;
    Trump1.y = 0;
    stage.addChild(Trump1);
    stage.update();
         
    
    circle = new createjs.Shape();
    circle.graphics.beginBitmapFill(preloader.getResult("circle")).drawCircle(0,0,circle_radius);
    circle.x = screen_width/2;
    circle.y = screen_height/2;
    stage.addChild(circle);
    stage.update();
    
    rect = new createjs.Shape();
    rect.graphics.beginBitmapFill(preloader.getResult("rect")).drawRoundRect(0,0,rect_width,rect_height,3);
    rect.x = (rect_width+screen_width)/2;
    rect.y = screen_height - rect_height - 10;
    stage.addChild(rect);
    stage.update();
    blocks = [];
    for(var i = 0; i < number_of_blocks; i++){
        var brick = new createjs.Shape();
        brick.graphics.beginBitmapFill(preloader.getResult("brick")).drawRoundRect(0,0,block_width,block_height,5);
        brick.x = block_width*(i%block_per_row);
        brick.y = block_height*Math.floor(i/block_per_row);
        blocks.push(brick);
        stage.addChild(brick);
        stage.update();
    }
}


   

function updateCircle(circle){
    if(circle.x >= screen_width - circle_radius || circle.x <= circle_radius){
        speed_x_circle = -speed_x_circle;
    }
    if(circle.y >= screen_height - circle_radius || circle.y <= circle_radius){
        speed_y_circle = -speed_y_circle;
    }
    circle.x += speed_x_circle;
    circle.y += speed_y_circle;
}

function updateRect(rect){
    if(rect.x >= screen_width - rect_width || rect.x <= 0){
        speed_x_rect = -speed_x_rect;
    }
    rect.x += speed_x_rect;
}

function hitTest(stage, circle, rect, blocks){
    if(circle.y > rect.y){
        lose();
    }
    if(circle.x >= rect.x && circle.x <= rect.x+rect_width){
        if(rect.y -circle.y <= circle_radius){
            speed_y_circle = -speed_y_circle;
            speed_x_circle += speed_x_rect/4;
            if(speed_x_circle > max_speed)
                speed_x_circle = max_speed;
        }
    }
    testHitBlock(stage, circle, blocks);
    if(blocks.length == 0){
        win();
    }
}

function lose(){
    //alert("LOSER!!!");
    //reset();
}

function win(){
    win = new createjs.Shape();
    win.graphics.beginBitmapFill(preloader.getResult("win")).drawRect(0,0,500,600);
    stage.addChild(win);
    stage.update();
    alert("WINNER, refresh to reset.");
}

function reset(){
    circle.x = screen_width/2;
    circle.y = screen_height/2;
    speed_x_circle = default_circle_speed;
    speed_y_circle = default_circle_speed;
}

function testHitBlock(stage, circle, blocks){
    for(var i = 0; i < blocks.length; i++){
        if(circle.x >= blocks[i].x && circle.x <= blocks[i].x+block_width){
            if((blocks[i].y -circle.y >= -(circle_radius+block_height) && blocks[i].y -circle.y < -circle_radius && speed_y_circle < 0) 
                    || (blocks[i].y -circle.y <= circle_radius && blocks[i].y -circle.y > 0 && speed_y_circle > 0)){
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
                speed_x_circle = -speed_x_circle;
                stage.removeChild(blocks[i]);
                stage.update();
                blocks.splice(i,1);
                return;
            }
        }
    }
}