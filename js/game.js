/*
FORK: https://github.com/lostdecade/simple_canvas_game
DEMO: http://www.lostdecadegames.com/demos/simple_canvas_game/
BLOG: http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/
*/
//I. CANVAS
let 
//create a canvas element
canvas = document.createElement("canvas"),
//get reference to canvas's context
ctx = canvas.getContext("2d"),
monstersCaught = 0;

//set canvas's dimensions
canvas.width = 512;
canvas.height = 480;

//add canvas to document so that it'll appear in the page
document.body.appendChild(canvas);

//II. INCLUDE IMAGES
let bgReady = false,
bgImage = new Image();
bgImage.onload = () => {
  bgReady = true;
};
bgImage.src = "assets/images/background.png";

let heroReady = false,
heroImage = new Image();
heroImage.onload = () => {
  heroReady = true;
};
heroImage.src = "assets/images/hero.png";

let monsterReady = false,
monsterImage = new Image();
monsterImage.onload = () => {
  monsterReady = true;
};
monsterImage.src = "assets/images/monster.png";

//III. GAME (GLOBAL) OBJECTS
let hero = {
  //movement in px/s
  speed: 256,
  //coordinates
  x: 0,
  y: 0
},
monster = {
  //coordinates
  x: 0,
  y: 0
},
monsterCaught = 0;

//IV. PLAYER INPUT
let keysDown = {};

/*
  store the user input for later, instead of acting on it immediately
  If a key code is in the object, the user is currently pressing that
  key.*/
addEventListener("keydown", (e) => {
  keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", (e) => {
  delete keysDown[e.keyCode];
}, false);

//V. NEW GAME
/*
 Reset the game when the player catches a monster
 This fn. is called to begin a new game/level. It places the hero(player) 
 in the center of the screen and the monster somewhere randomly.
*/
let reset = () => {
  hero.x = canvas.width / 2;
  hero.y = canvas.height / 2;

  //Throw the monster somewhere on the screen randomly
  monster.x = 32 + (Math.random() * (canvas.width - 64));
  monster.y = 32 + (Math.random() * (canvas.height - 64));
};

//VI: UPDATE OBJECTS (*what objs?)
/*
 @function
 Update(modifier)
  check the up, down, left and right arrow keys, and move hero in correspon-
  ding direction.
  the function gets called so rapidly that the modifier value will typical-
  y be very low, but using this pattern will ensure that the hero will mov-
  e the same speed no matter how fast (or rather slowly) the script is run-
  ing.

 @params
  modifier: later referenced in main().
  modifier is a number, time based on 1. If exactly one second has passed, 
  the value will be 1 and the hero's speed will be multiplied by 1, meaning
  they will have moved 256 pixels in that second. If one and a half second 
  has passed, the value will be 0.5 and the hero will have moved half of h-
  is speed in that amount of time. And so forth.  
*/
let update = (modifier) => {
 /*
  KEYCODES
  38: ARROW_UP
  40: ARROW_DOWN
  37: ARROW_LEFT
  39: ARROW_RIGHT
 */
 //inverted controls?
 if(38 in keysDown) {
  hero.y -= hero.speed * modifier;
 }
 if(40 in keysDown) {
  hero.y += hero.speed * modifier;
 }
 if(37 in keysDown) {
  hero.x -= hero.speed * modifier;
 }
 if(39 in keysDown) {
  hero.x += hero.speed * modifier;
 }
 
 //are they touching?
 if(hero.x <= (monster.x + 32) 
	&& monster.x <= (hero.x + 32)
    && hero.y <= (monster.y + 32) 
	&& monster.y <= (hero.y + 32)) {
  ++monstersCaught;
  reset();
 }
};

//RENDER OBJECTS
/*
  @function
  draw everything
*/
let render = () => {
  bgReady ? ctx.drawImage(bgImage, 0, 0) : console.log("rendering bgImage...");
  heroReady ? ctx.drawImage(heroImage, hero.x, hero.y) : console.log("rendering heroImage...");
  monsterReady ? ctx.drawImage(monsterImage, monster.x, monster.y) : console.log("rendering monsterImage...");

  ctx.fillStyle = "rgb(250, 250, 250)";
  ctx.font = "24px Helvetica";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("Monsters caught: " + monstersCaught, 32, 32);
  /*
  ctx: {
  "prop": "desc",
  "fillStyle": "",
  "font": "",
  "textAlign": "",
  "textBaseline": "",
  "fillText": ""
  }
  */
};

//MAIN GAME LOOP
/*
  @function
  Get the current timestamp so as to calculate the delta (how many milliseconds have passed 
  since the last interval). Get the modifier to send to update (@function) by dividing 1000
  (no of milliseconds in one second). Call render and record the timestamp.
*/
let main = () => {
  let now = Date.now(),
  delta = now - then;

  update(delta / 1000);
  render();

  then = now;

  //request to do this again ASAP
  requestAnimationFrame(main);
}


//PLAY
let then = Date.now();
reset();
main();




























