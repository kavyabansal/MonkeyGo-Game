
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score=0;
var ground;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  stonesImage = loadImage("obstacle.png");
  monkeImage = loadImage("sprite_1.png");
 
}



function setup() {
  createCanvas (400,400);
  
  ground = createSprite(0,370,400,5);
  ground.velocityX=-3;
  ground.scale=2;
  
  monkey = createSprite(100,340,20,20);
  monkey.addAnimation ("monkey_running",monkey_running);
  monkey.scale=0.1;
  
  foodGroup = createGroup();
  obstacleGroup = createGroup();
  
}


function draw() {
background("lightgreen");
  
    if (gameState===PLAY) {
  
      ground.velocityX=0;
      
  if(keyDown("space") && monkey.y >= 270) {
     monkey.velocityY = -12;
 }
  monkey.velocityY=monkey.velocityY+0.8;  
      survivalTime = Math.ceil(frameCount/frameRate());
  banana(); 
  obstacles();
     
      
      if (obstacleGroup.isTouching(monkey)) {
        gameState=END;
      }
      
  }else if (gameState===END) {
    
    monkey.addImage(monkeImage);
    stroke("darkgreen");
    textSize(20);
    fill("white");
    text("Game Over",50,100);
    
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
    
  }
  
  if (ground.x<0) {
    ground.x=200;
  }
  
  monkey.collide(ground);
  
   drawSprites();
  stroke("darkgreen");
  textSize(20);
  fill("white");
  
  text ("SurvivalTime = "+survivalTime,50,50);
  
  
  
}

function banana() {
  
  if (frameCount%80===0) {
    var bananas=createSprite(400,200,10,10);
    bananas.addImage("b",bananaImage);
    bananas.scale=0.09;
    bananas.velocityX=-5; 
    bananas.lifetime=80;
    var rand = Math.round (random(180,250));
    bananas.y=rand;
    foodGroup.add(bananas);
  }
}

function obstacles() {
  
  if (frameCount%300===0) {
    var stones=createSprite(400,346,10,10);
    stones.addImage("obstacle",stonesImage);
    stones.scale=0.1;
    stones.velocityX=-5;
    stones.lifetime=80;
    obstacleGroup.add(stones);
  }
  
}




