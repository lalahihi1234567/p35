var ball;
var database;
var position;
var bg, balloon;

function preload(){
	bg=loadImage("bg.png");
	balloon=loadImage("balllooon.png");
}

function setup(){
    // connecting with database
    database=firebase.database();

    createCanvas(displayWidth,displayHeight-150);
	ball = createSprite(350,350,100,100);
	ball.addImage("balllooon",balloon);
    ball.shapeColor = "red";

    // refer to the location that we want to access
    var ballref=database.ref('ball/position');
    // creating listener using on function which will listen to the changes,
    // if there is change in database, readPosition function will be called
    // if there is error in reading the position showError function will be called
    ballref.on("value",readPosition,showError);
}

function draw(){
    background(bg);
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

// function to write position of ball to the database
function writePosition(x,y){
    database.ref('ball/position').set({
        'x':position.x+x,
        'y':position.y+y
    })
}

// function to read position of ball from database
function readPosition(data){
    position=data.val(); // storing value of data in position variable
    ball.x=position.x;
    ball.y=position.y;
}

function showError(){
    console.log("error");
}