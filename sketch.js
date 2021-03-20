var boy;
var boyimage;
var coinimage;
var powerupimage;
var zombieimage;
var backgroundimage;
var ground;
var powerup;
var coins;
var obstacle;
var obstacle2,obstacle2image;
var obstacle3,obstacle3image;
var obstacle4,obstacle4image;
var bg2,bg2image;
var bg1, bg1image;
var score = 0;
var gamestate = "play";
var powerupgrp,obstaclegrp,coingrp;
var gameover,gameoverimage;
var boycollided;

function preload(){
boyimage = loadAnimation("images/BOY1.png","images/BOY2.PNG","images/BOY3.PNG","images/BOY4.PNG","images/BOY5.PNG","images/BOY6.PNG","images/BOY7.PNG"
,"images/BOY8.PNG");
boycollided = loadAnimation("images/BOY1.png");
obstacle2image = loadImage("images/obstacle2.png");
obstacle1image = loadImage("images/obstacle1.png");
obstacle3image = loadImage("images/obstacle3.png");
obstacle4image = loadImage("images/obstacle4.jpg");
coinimage = loadImage("images/coin.png");
powerupimage = loadImage("images/powerup.png");
zombieimage = loadAnimation("images/z1.png","images/z2.png","images/z3.png","images/z4.png","images/z5.png","images/z6.png","images/z7.png");
backgroundimage = loadImage("images/bg1.png");
bg2image = loadImage("images/bg2.png");
gameoverimage = loadImage("images/Gameover.png");
}

function setup() {
  createCanvas(600,400);

  bg = createSprite(800,200);
  bg.addImage("back", backgroundimage);
  bg.velocityX=-2;

  boy = createSprite(160,300);
  boy.addAnimation("boi",boyimage);
  boy.scale=0.1;
  boy.addAnimation("collide",boycollided);
  boy.setCollider("rectangle",0,0,100,150);

  zombie = createSprite(70,280);
  zombie.addAnimation("zombie",zombieimage);
  zombie.scale=0.32; 

 ground = createSprite(400,350,800,20);
 ground.visible = false;

 score = 0;

 powerupgrp = new Group();
 obstaclegrp = new Group();
  coingrp = new Group();
}

function draw() {
  background(0); 
     if(gamestate === "play"){
      if(keyDown('space')){
        boy.velocityY=-14;
      }
    
      boy.velocityY=boy.velocityY+0.8;
      boy.collide(ground);
  
      console.log(bg.x);
      if(bg.x<-120){
        bg.x=800;
      }

    if(coingrp.isTouching(boy)){
     score=score+1;
     coingrp.destroyEach();
  }

    spawnpowerup();
    spawncoins();
    spawnobstacle();
    
    if(obstaclegrp.isTouching(boy)){
      gamestate = "end";
    }
  }
  if(gamestate === "end"){
    gameover = createSprite(300,200);
    gameover.addImage("go", gameoverimage);
     gameover.scale=0.5; 
    boy.changeAnimation("collide",boycollided);
     coingrp.setVelocityXEach(0);
    obstaclegrp.setVelocityXEach(0);
    powerupgrp.setVelocityXEach(0);
    bg.velocityX=0;
    boy.velocityX=0;
     coingrp.setLifetimeEach(-1);
    powerupgrp.setLifetimeEach(-1);
    obstaclegrp.setLifetimeEach(-1);
    }

    
  drawSprites();

  

  stroke("black");
  textSize(20);
  fill("black");
  text("score:"+score,400,50);
}
  
function spawnpowerup(){
  if(frameCount%500===0){
    powerup = createSprite(810,100);
    powerup.scale=0.3;
    powerup.addImage(powerupimage);
    powerup.velocityX=-6;
    powerup.lifetime=130;
   powerup.y= Math.round(random(100,200));
   powerupgrp.add(powerup);
  }  
}

function spawncoins(){
  if(frameCount%150===0){
    coins = createSprite(810,100);
    coins.scale=0.2;
    coins.addImage(coinimage);
    coins.velocityX=-7;
    coins.lifetime=120;
    coins.y=Math.round(random(100,200));
    coingrp.add(coins);
  }
}
  
  function spawnobstacle(){
    if(frameCount%100===0){
      obstacle = createSprite(810,295);
      obstacle.scale=0.5;
      obstacle.velocityX=-8;
      obstacle.lifetime=100;
      obstacle.setCollider("rectangle",0,0,150,200);
      var option=Math.round(random(1,4));
      switch(option){
      case 1:  obstacle.addImage(obstacle1image);
      obstacle.scale=0.4;  
      break;
      case 2:  obstacle.addImage(obstacle2image); 
      obstacle.scale=0.3; 
      break;
      case 3:  obstacle.addImage(obstacle3image);
      obstacle.scale=0.3;
      break;
      case 4:  obstacle.addImage(obstacle4image);
      obstacle.scale=0.3;
      break;
      }
      obstaclegrp.add(obstacle);
      }
    }
  
    
  