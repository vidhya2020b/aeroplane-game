class Game {
    constructor() {
  
    }

    
    getState() {
      var gameStateRef = database.ref('gameState');
      gameStateRef.on("value", function (data) {
        gameState = data.val();
      })
  
    }
  

    update(state) {
      database.ref('/').update({
        gameState: state
      });
    }


    async start() {
      if (gameState === 0) {
        player = new Player();
        var playerCountRef = await database.ref('playerCount').once("value");
        if (playerCountRef.exists()) {
          playerCount = playerCountRef.val();
          player.getCount();
        }
        form = new Form()
        form.display();
      }

    //  invisibleGround=createSprite(displayWidth - 600,displayHeight-40,1200,10)
      //invisibleGround2=createSprite(14200,displayHeight-40,1000,10)
      
      player1 = createSprite(200, 800);
      player1.addImage("player1", player_img);
  
      player2 = createSprite(800, 800);
      player2.addImage("player2", player_img);
      players = [player1, player2];

      player1.collide(invisibleGround);
      player1.collide(invisibleGround2);
      player2.collide(invisibleGround);
      player2.collide(invisibleGround2);
    
    }

  
    play() {
  
      form.hide();
  
      Player.getPlayerInfo();
      background(0);
      image(back_img, displayWidth-1800,0,displayWidth*10, displayHeight);
      
      var x = 100;
      var y = 200;
      var index = 0;
      drawSprites();
      textSize(32);

          for (var plr in allPlayers) {
          if (plr == "player1" || plr === "player2") {
  
          index = index + 1;
          x = 500 - allPlayers[plr].distance;
          y = 760 + allPlayers[plr].distance1;
      
  
          players[index - 1].x = x;
          players[index - 1].y = y;

  
          if (index === player.index) {
            // to display player name on the Airoplane
            stroke("yellow");
            textSize(15);
            fill("yellow");
            text(allPlayers[plr].name ,x-25,y+25);

          // code for camera
          camera.position.x = players[index-1].x;
          camera.position.y = displayHeight/2;

        
  
          }
          stroke("RED");
          textSize(25);
          fill("RED");
          text("Passengers"+":"+allPlayers[plr].score,players[index-1].x-700, index * 50);
         
          stroke("RED");
          textSize(25);
          fill("RED");
          text("Fuel"+":"+allPlayers[plr].score1,players[index-1].x-700, index * 75);
         
         
       }
      }

     if (player1.isTouching(birdsGroup)){
        birdsGroup.destroyEach();
     
 
      }
      if (player2.isTouching(birdsGroup)){
        birdsGroup.destroyEach();
      
      }
  

      if (gameState === 1) {
        player.distance -= 8
        player.update();
      }
      if (keyDown(RIGHT_ARROW) && player.index !== null) {
        player.distance -= 10
        player.update();
      }
    
      if (keyDown(UP_ARROW) && player.index !== null) {
        player.distance1 -= 10
        player.update();
      }

      if (keyDown(DOWN_ARROW) && player.index !== null) {
        player.distance1 += 10
        player.update();
      }

  
      if (frameCount % 50 === 0) {
        passengers = createSprite(random(1000,13000),random(30,displayHeight-30) , 100, 100);
        passengers.velocityX = -10;
        passengers.addImage("passenger", passenger_img);
        passengersGroup.push(passengers);
  
      }
    

      if (frameCount % 50 === 0) {
        fuels = createSprite(random(1000,13000),random(30,displayHeight-30) , 100, 100);
        fuels.velocityX = -10;
        fuels.addImage("fuel", fuel_img);
        fuelsGroup.push(fuels);
      }

      if (frameCount % 105 === 0) {
        birds = createSprite(random(1000,13000),random(30,displayHeight-30) , 100, 100);
        birds.velocityX = -10;
        birds.addImage("bird", bird_img);
        birdsGroup.push(birds);
      }

  
      if (player.index !== null) {

          for (let i = 0; i < passengersGroup.length; i++) {
          if (passengersGroup[i].isTouching(players[player.index - 1])) {
            player.score++;
            player.update();
            passengersGroup[i].destroy();
            passengersGroup.splice(i, 1);
          }
  
        }

  
        for (let i = 0; i < fuelsGroup.length; i++) {
          if (fuelsGroup[i].isTouching(players[player.index - 1])) {
            player.score1++;
            player.update();
            fuelsGroup[i].destroy();
            fuelsGroup.splice(i, 1);
          }
        }
      }
   }
  
    end() {
      console.log("Game Ended");
    }


  }