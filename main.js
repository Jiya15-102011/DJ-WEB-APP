song="";
rightWristx=0;
rightWristy=0;
leftWristx=0;
leftWristy=0;
rightWristscore=0;
leftWristscore=0;
function preload(){
    song=loadSound("music.mp3");
}
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    y=ml5.poseNet(video,loaded);
    y.on('pose',poseparts);
}
function loaded(){
    console.log("poseNet is initilized");
}
function poseparts(answer){
if(answer.length>0){
    console.log(answer);
leftWristx=answer[0].pose.leftWrist.x;
leftWristy=answer[0].pose.leftWrist.y;
rightWristx=answer[0].pose.rightWrist.x;
rightWristy=answer[0].pose.rightWrist.y;
rightWristscore=answer[0].pose.keypoints[10].score;
leftWristscore=answer[0].pose.keypoints[9].score;
console.log("left Wrist x is :"+leftWristx);
console.log("left Wrist y is :"+leftWristy);
console.log("right Wrist x is :"+rightWristx);
console.log("right Wrist y is:"+rightWristy);
console.log("right Wrist score is :"+rightWristscore);
console.log("left Wrist score is:"+leftWristscore);
}
}

function draw(){
    image(video,0,0,600,500);
    fill("green");
    stroke("red");
    if(rightWristscore>0.2){
        circle(rightWristx,rightWristy,30);
        if(rightWristy>0 && rightWristy<=100){
        song.rate(0.5);
        document.getElementById("d").innerHTML="speed=0.5 x";
        }
else if(rightWristy>100 && rightWristy<=200){
song.rate(1);
document.getElementById("d").innerHTML="speed=1 x";
}
else if(rightWristy>200 && rightWristy<=300){
song.rate(1.5);
document.getElementById("d").innerHTML="speed=1.5 x";
}
else if(rightWristy>300 && rightWristy<=400){
song.rate(2);
document.getElementById("d").innerHTML="speed=2 x";
}
else if(rightWristy>400){
song.rate(2.5);
document.getElementById("d").innerHTML="speed=3 x";
}
    }
    if(leftWristscore>0.2){
    circle(leftWristx,leftWristy,30);
    y=Number(leftWristy);
    e=Math.floor(y);
    t=e/500;
    doocument.getElementById("g").innerHTML="volume ="+t;
    song.setVolume(t);
    }
}
function y(){
    song.play();
    song.rate(1);
    song.setVolume(1);
}