song_1="";
song_2="";
song1="false";
song2="false";
leftWrist_x=0;
rightWrist_x=0;
leftWrist_y=0;
rightWrist_y=0
song_name="";
scoreLeftWrist=0;
scoreRightWrist=0;


function preload(){
song_1=loadSound("music.mp3");
song_2=loadSound("music2.mp3");
}

function setup(){
canvas=createCanvas(600,600);
canvas.center()
camera=createCapture(VIDEO);
camera.hide();

posenet=ml5.poseNet(camera,modalLoaded);
posenet.on('pose',gotPoses);
}

function modalLoaded(){
console.log("posenet is initialized");
}

function gotPoses(results){
    if(results.length>0){
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        console.log("score is "+scoreLeftWrist);
        scoreRightWrist=results[0].pose.keypoints[10].score;
        console.log("score is "+scoreRightWrist);


console.log(results);
leftWrist_x=results[0].pose.leftWrist.x;
leftWrist_y=results[0].pose.leftWrist.y;
console.log("the coordinates of left wrist is "+leftWrist_x+", "+leftWrist_y);
rightWrist_x=results[0].pose.rightWrist.x;
rightWrist_y=results[0].pose.rightWrist.y;
console.log("the coordinates of right wrist is "+rightWrist_x+", "+rightWrist_y);

}
}

function draw(){
image(camera,0,0,600,600);

if(scoreLeftWrist>0.2){
    fill("red");
    stroke("white");
    circle(leftWrist_x,leftWrist_y,20);
    song_2.stop();
    song2="false";
    if(song1=="false"){
        song_1.play();
        song1="true"
        document.getElementById("song_name").innerHTML="Harry Potter theme song";

    }
}

if(scoreRightWrist>0.2){
    fill("red");
    stroke("white");
    circle(rightWrist_x,rightWrist_y,20);
    song_1.stop();
    song1="false";
    if(song2=="false"){
        song_2.play();
        song2="true"
        document.getElementById("song_name").innerHTML="Peter Pan theme song";


    }
}

}



