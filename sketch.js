var ball;
var database;
var position;

function setup(){
    // connected to firebase
    database=firebase.database()
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    var LOC=database.ref("ball/position") //ref=refference //position for connecting the ball
    LOC.on("value",readPosition,showerror) //listen to position of the ball from the database (firebase)
//showerror will work only if readPosition will have error
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
    //ball.x = ball.x + x;
    //ball.y = ball.y + y;
    database.ref("ball/position").set({
        "x":position.x+x,
        "y":position.y+y,
    })//nested function 
}

function readPosition(data){//the data is storing the "value" (Line12)
    position=data.val() //val will fetch the value from the data
    console.log(position.x)
    ball.x=position.x;
    ball.y=position.y;

}

function showerror(){
    console.log("ReadPosition has an Error")

}