var player, playerImg;
var hole, holeImg;
var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6, obstacle7, obstacleImg, obstacleGroup;
var space, spaceImg;
var invisibleWall
var book1, book2, book3, bookImg1, bookImg2, bookImg3, bookGroup;

var restart, gameOver, restartimg, gameOverImg;

var gameState = PLAY;
var PLAY = 1;
var END = 0;
var score;



function preload(){
  
  score = 0;
}

function setup(){
  createCanvas(1000,300);
  
  //jugador
  player = createSprite(300,150,10,10)
  player.shapeColor = "white";

  //agujero negro
  hole = createSprite(20,150,10,10);
  hole.visible = false;

  //fondo
  space = createSprite(500,150,10,10)
  space.visible = false;
  

  //restart y fin del juego
  restart = createSprite(500,150,10,10);
  restart.visible = false;

  gameOver = createSprite(500,200,10,10);
  gameOver.visible = false;

  //obstaculos
  obstacle1 = createSprite(1000,20,10,10);
  obstacle2 = createSprite(2000,100,10,10);
  obstacle3 = createSprite(2500,150,10,10);
  obstacle4 = createSprite(3000,200,10,10);
  obstacle5 = createSprite(3500,300,10,10);
  obstacle6 = createSprite(1000,200,10,10);
  obstacle7 = createSprite(4000,150,10,10);

  obstacle1.velocityX = -2;
  obstacle2.velocityX = -4;
  obstacle3.velocityX = -6;
  obstacle4.velocityX = -8;
  obstacle5.velocityX = -12;
  obstacle6,velocityX = -4;
  obstacle7.velocityX = -15;

  obstacle1.setCollider("rectangle",0,0,30,30)
  obstacle2.setCollider("rectangle",0,0,30,30)
  obstacle3.setCollider("rectangle",0,0,30,30)
  obstacle4.setCollider("rectangle",0,0,30,30)
  obstacle5.setCollider("rectangle",0,0,30,30)
  obstacle6.setCollider("rectangle",0,0,30,30)
  obstacle7.setCollider("rectangle",0,0,30,30)

  //obstacle1.debug = true;
  //obstacle2.debug = true;
  //obstacle3.debug = true;
  //obstacle4.debug = true;
  //obstacle5.debug = true;
  //obstacle6.debug = true;
  //obstacle7.debug = true;
  
  //pared invisible
  invisibleWall = createSprite(30,1,5,1000)
  invisibleWall.visible = false;

  //grupos
  obstacleGroup = new Group();
  bookGroup = new Group();

  //libro
  book1 = createSprite(4000,150,10,10);
  book1.velocityX = -4;
  book1.shapeColor = "red";

  book2 = createSprite(6000,150,10,10);
  book2.velocityX = -4;
  book2.shapeColor = "yellow";

  book3 = createSprite(8000,150,10,10);
  book3.velocityX = -4;
  book3.shapeColor = "green";

  book1.setCollider("rectangle",0,0,20,20);
  book2.setCollider("rectangle",0,0,20,20);
  book3.setCollider("rectangle",0,0,20,20);
  
}

function draw(){
  background(0);
  //score
  text("Score: "+ score,500,270);

  if(obstacle1.isTouching(invisibleWall)){
    obstacle1.x = 1000
    obstacle1.y = Math.round(random(395,350));
  }
  if(obstacle2.isTouching(invisibleWall)){
    obstacle2.x = 1000;
    obstacle2.y = Math.round(random(350,200));
  }
  if(obstacle3.isTouching(invisibleWall)){
    obstacle3.x = 1000;
    obstacle3.y = Math.round(random(200,150));
  }
  if(obstacle4.isTouching(invisibleWall)){
    obstacle4.x = 1000;
    obstacle4.y = Math.round(random(150,50));
  }
  if(obstacle5.isTouching(invisibleWall)){
    obstacle5.x = 1000;
    obstacle5.y = Math.round(random(395,20));
  }
  if(obstacle6.isTouching(invisibleWall)){
    obstacle6.x = 1000;
    obstacle6 = Math.round(random(290,10));
  }

  obstacleGroup.add(obstacle1)
  obstacleGroup.add(obstacle2)
  obstacleGroup.add(obstacle3)
  obstacleGroup.add(obstacle4)
  obstacleGroup.add(obstacle5)

  if(keyDown("a")){
    gameState = PLAY;
  }

  if(gameState === PLAY){

    //score
    score = score + Math.round(getFrameRate()/60);

    console.log(obstacle1.x);

    
    //controles del jugador
    if(keyDown("w")){
      player.y = player.y -3;
    }
  
    if(keyDown("s")){
      player.y = player.y +3;
    }
  
    if(keyDown("a")){
      player.x = player.x +5;
    }

    player.velocityX = -1;

    //score book
    scoreBook();


    player.velocityX = -3;

    if(obstacleGroup.isTouching(player)){
      player.velocityX = -20;
    }

    if(player.isTouching(invisibleWall)){
      gameState = END
    }
  }
  else if(gameState === END){
    
    //restart.visible = true;
    //gameOver.visible = true;

    text("Presiona R para reiniciar",500,150)

    if(keyDown("r")){
      reset();
    }
  }

  drawSprites();
}

function reset(){

  gameState = PLAY

  gameOver.visible = false;
  restart.visible = false;

  player.x = 500;
  player.y = 150;

  score = 0;

}
    
function scoreBook(){

 if(book1.isTouching(invisibleWall)){
    book1.x = 4000
    book1.y = Math.round(random(280,20))
  }
 if(book2.isTouching(invisibleWall)){
    book2.x = 5000
    book2.y = Math.round(random(280,20))
  }
 if(book3.isTouching(invisibleWall)){
      book3.x = 7000
      book3.y = Math.round(random(280,20))
  }

  if(book1.isTouching(player)){
    book1.x = 5000;
    score = score +1000;
  }
  if(book2.isTouching(player)){
    book2.x = 8000;
    score = score +2000;
  }
  if(book3.isTouching(player)){
    book3.x = 10000
    score = score +3000
  }
  
  bookGroup.add(book1);
  bookGroup.add(book2);
  bookGroup.add(book3);
 
}