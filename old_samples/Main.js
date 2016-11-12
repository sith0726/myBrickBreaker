var stage = new createjs.Stage("demoCanvas");
var circle;
var text;
var data;
var animation;

function init() {
    circleThing();
    textThing();
    spriteThing();
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", tick);
}

function circleThing() {
    circle = new createjs.Shape();
    circle.graphics.beginFill("Blue").drawCircle(0, 0, 50);
    circle.x = 100;
    circle.y = 100;
    
    stage.addChild(circle);
    stage.update();
    createjs.Tween.get(circle, {loop: true})
        .to({x: 400}, 800, createjs.Ease.getPowInOut(2))
        .to({x: 100}, 800, createjs.Ease.getPowInOut(2));
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", stage);
}

function textThing() {
    text = new createjs.Text("Hello World", "20px Arial", "#ff7700");
    text.x = 20;
    text.y = 20;
    text.textBaseline = "alphabetic";
    stage.addChild(text);
    stage.update();
}

function spriteThing() {
    data = new createjs.SpriteSheet({
        framerate: 5,
        "images" : ["playerSprite.png"],
        "frames" : {"regX": 0, "height": 320, "count": 2, "regY": 0, "width": 320},
        "animations": {"walk": [0, 1]}
    });
    animation = new createjs.Sprite(data, "walk");
    stage.addChild(animation);
}

function tick() {
    animation.x += 1;
}