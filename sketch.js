var database;
var back_img;
var gameState =0;
var playerCount = 0;
var allPlayers;
var ground2,ground3
var player, form,game;
var player1,player2;
var players;
var passengers;
var passengersGroup;
var fuels;
var fuelGroup;
var bird_img;
var birds;
var birdsGroup;
var passenger_img, fuel_img
var player_img;
var invisibleGround;
var invisibleGround2;

function preload(){
  back_img = loadImage("images/sky.png");
  player_img = loadImage("images/airplane.png");
  passenger_img = loadImage("images/passenger.png");
  fuel_img = loadImage("images/fuel.png");
  bird_img= loadImage("images/bird.png");

  passengersGroup = new Group();
  fuelsGroup = new Group();
  birdsGroup = new Group();
}
function setup() {
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
 
  database = firebase.database();
  
  game = new Game();
  game.getState();
  game.start();

  

 
}

function draw() {
 
  
   if (playerCount === 2) {
     game.update(1);
   }
   if (gameState === 1) {
     clear(); 
     game.play();
   }
   if (gameState === 2) {
    
     game.end();
   }

}