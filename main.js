game = GameCanvas('game');

const cieling = 0
const floor = 750
const lwall = 0
const rwall = 1050

var dx = lwall
var dy = floor
var tallness = 40
var longness = 50
var sprite_left = document.getElementById("sprite_left");
var sprite_right = document.getElementById("sprite_right");
var sprite_grass = document.getElementById('sprite_grass')
var sprite_dead = document.getElementById('sprite_dead')
var background = document.getElementById('background')
var wood_sprite = document.getElementById('wood')
var trophy_sprite = document.getElementById('trophy')
var x_vel = 0
var y_vel = 0
var pre_sprite = sprite_right
var floorstate = true
var ceilingstate = false
var lwallstate = false
var rwallstate = false
var dead = false
var seconds_track
var time = 0
var win = false
var lava_sprite =document.getElementById('lava')
var restart = false;

function displayAbout() {
  var x = document.getElementById("about");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function draw_scenery ({ctx}) {
  ctx.drawImage(background,0,0,rwall+50,floor+50)
}


function kill() {
  dead = true
}

function draw_timer({ctx,elapsed}) {
  
  if (restart == true) {
    time = 0
    restart = false
  }
  
  if (win==false){
    ctx.stokestyle = 'pink'
    const seconds = Math.floor(time/.6)/100
    seconds_track = seconds
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.font = "Bold 48px serif";
    ctx.fillText(seconds, 800, 100);
    }
  else {
    ctx.font = "Bold 48px serif";
    ctx.fillText(seconds_track, 800, 100);
  }
  
}




class Block {
    constructor(x, y,length,height) {
      this.x = x;
      this.y = y;
      this.length = length;
      this.height = height;
      this.tl = x,y;
      this.tr = x+length,y;
      this.bl = x,y+height;
      this.br = x+length,y+height
      this.lava = false;
      this.trophy = false;
    }
  
    draw ({ctx}) {
      if (this.lava == false) {
        ctx.strokeStyle = 'white';
      }
      else {
        ctx.strokeStyle = 'red';
      }
      ctx.beginPath();
      for (let i =0; i<10;i+=10){
        ctx.drawImage(wood_sprite,this.x,this.y,this.length,this.height);
        ctx.rect(this.x,this.y,this.length,this.height)
      }
      ctx.stroke()
    }
  
  check_floor(){
    if ((dy>this.y-this.height-tallness-6 && dy<this.y-this.height-tallness+8)&&
        (dx>this.x-50 && dx<this.x+this.length)){
      floorstate = true
      dy = this.y-this.height-tallness;
      if (this.lava == true) {
            kill()
          }
      else if (this.trophy == true) {
          win = true
        }
    }
  }
  check_ceiling(){
    if (((dy>this.y+2 && dy<this.y+8)&&
        (dx>this.x-50 && dx<this.x+this.length))&&Math.sign(y_vel)!=-1){
      ceilingstate = true;
      dy = this.y+9
      if (this.lava == true) {
            kill()
          }
    }
  }
  
  check_lwall(){
    if (dy<this.y+4&&dy>this.y-this.height-tallness-5){
      if(dx>this.x-4-longness&&dx<this.x+4-longness&&x_vel>0){
        lwallstate = true
        dx = this.x-5-longness
        if (this.lava == true) {
            kill()
          }
        else if (this.trophy == true) {
          win = true
        }
      }
    }
  }
    
  check_rwall(){
    if (dy<this.y+4&&dy>this.y-this.height-tallness-5){
      if(dx<this.x+this.length+4&&dx>this.x+this.length-4&&x_vel<0){
          rwallstate = true
          dx = this.x+this.length+5
          if (this.lava == true) {
            kill()
          }
        } 
    }
  }
  
  
  check_collisons () {
    this.check_floor();
    this.check_ceiling();
    this.check_lwall();
    this.check_rwall();
  } 
}

class Lava extends Block {
  constructor (...args) {
    super(...args);
    this.lava = true;
    }
  draw({ctx}) {
    if (this.lava == false) {
        ctx.strokeStyle = 'white';
      }
      else {
        ctx.strokeStyle = 'red';
      }
      ctx.beginPath();
      for (let i =0; i<10;i+=10){
        ctx.drawImage(lava_sprite,this.x,this.y,this.length,this.height);
        ctx.rect(this.x,this.y,this.length,this.height)
      }
      ctx.stroke()
  }
}

class Trophy extends Block {
  constructor (...args) {
    super(...args);
    this.trophy = true
  }
  draw({ctx}) {
    if (this.lava == false) {
        ctx.strokeStyle = 'white';
      }
      else {
        ctx.strokeStyle = 'red';
      }
      ctx.beginPath();
      for (let i =0; i<10;i+=10){
        ctx.drawImage(trophy_sprite,this.x,this.y,this.length,this.height+50);
      }
      ctx.stroke()
  }
  check_collisons() {
    super.check_lwall()
    super.check_floor()
  }
}

blocks = [
  block = new Block(300,700,200,10),
  block2 = new Block(250,650,100,10),
  block3 = new Lava(500,700,60,10),
  block4 = new Block(0,700,100,10),
  block5 = new Lava(500,710,10,10),
  block5 = new Lava(500,720,10,10),
  block5 = new Lava(500,730,10,10),
  block5 = new Lava(500,740,10,10),
  block5 = new Lava(500,750,10,10),
  block5 = new Lava(500,760,10,10),
  block5 = new Lava(500,770,10,10),
  block5 = new Lava(500,780,10,10),
  block5 = new Lava(500,790,10,10),
  block6 = new Block(700,700,100,10),
  block7 = new Block(rwall,730,50,10),
  block8 = new Block(rwall-50,350,100,10),
  block9 = new Block(rwall-200,270,10,10),
  block9 = new Block(rwall-200,280,10,10),
  block9 = new Block(rwall-200,290,10,10),
  block9 = new Block(rwall-200,300,10,10),
  block9 = new Block(rwall-200,310,10,10),
  block9 = new Block(rwall-200,320,10,10),
  block9 = new Block(rwall-200,330,10,10),
  block9 = new Block(rwall-200,340,10,10),
  block9 = new Block(rwall-200,350,10,10),
  block9 = new Block(rwall-200,300,10,10),
  block9 = new Block(rwall-200,410,10,10),
  block9 = new Block(rwall-200,420,10,10),
  block9 = new Block(rwall-200,430,10,10),
  block9 = new Block(rwall-200,440,10,10),
  block9 = new Block(rwall-200,450,10,10),
  block9 = new Block(rwall-200,460,10,10),
  block9 = new Block(rwall-200,470,10,10),
  block9 = new Block(rwall-200,480,10,10),
  block9 = new Block(rwall-200,490,10,10),
  block9 = new Block(rwall-200,500,10,10),
  block9 = new Block(rwall-200,510,10,10),
  block9 = new Block(rwall-200,520,10,10),
  block10 = new Block(700,450,150,10),
  block11 = new Block(rwall-270,180,320,10),
  block12 = new Block(300,450,10,10),
  block13 = new Block(600,450,10,10),
  block14 = new Block(150,450,10,10),
  block15 = new Block(450,450,10,10),
  block16 = new Block(0,360,50,10),
  block17 = new Block(450,250,50,10),
  block18 = new Lava(rwall-150,170,200,10),
  block19 = new Block(rwall-160,0,10,10),
  block19 = new Block(rwall-160,10,10,10),
  block19 = new Block(rwall-160,20,10,10),
  block19 = new Block(rwall-160,30,10,10),
  block19 = new Block(rwall-160,40,10,10),
  block19 = new Block(rwall-160,50,10,10),
  block19 = new Block(rwall-160,60,10,10),
  block19 = new Block(rwall-160,70,10,10),
  block19 = new Block(rwall-160,80,10,10),
  block19 = new Block(rwall-160,90,10,10),
  block19 = new Block(rwall-160,100,10,10),
  block19 = new Block(rwall-160,110,10,10),
  block19 = new Block(rwall-160,120,10,10),
  block19 = new Block(rwall-160,130,10,10),
  block19 = new Block(rwall-160,140,10,10),
  block19 = new Block(rwall-160,150,10,10),
  block19 = new Block(rwall-160,160,10,10),
  block19 = new Block(rwall-160,170,10,10),
  block19 = new Block(rwall-160,180,10,10),
  block20 = new Block(rwall-300,200,30,10),
  block21 = new Trophy(rwall-250,130,30,10),
  block22 = new Block(lwall,490,200,10)
]




var w_state=false
var d_state=false
var a_state=false

game.addDrawing(function ({ctx,elapsed}) {
  time ++
 draw_scenery({ctx})
 draw_timer({ctx,elapsed})
  
  
  for (var i = 0; i<blocks.length; i++) {
    blocks[i].draw({ctx}) 
  }
  
  
  //collision checkers
  for (var i = 0; i<blocks.length; i++) {
          blocks[i].check_collisons() 
        }
  if (dy>floor-10){
    floorstate = true
    for (var i = 0; i<blocks.length; i++) {
          blocks[i].check_collisons() 
        }
  }
  else {floorstate=false;
       for (var i = 0; i<blocks.length; i++) {
          blocks[i].check_collisons() 
        }}
  
  //velocity increasers
  if (w_state == true && floorstate==true) {
    y_vel += 10
    w_state = false
  }
  //right velocity
  if (d_state == true && floorstate==true) {
    x_vel += 4
  }
  else if (d_state == true && x_vel < 8) {
    x_vel +=.5
  }
  //left velocity
  if (a_state == true && floorstate==true) {
    x_vel -= 4
  }
  else if (a_state == true && x_vel > -8) {
    x_vel -=.5
  }
  
  
  //applies the velocity changes
  if (dead != true && win != true) {
    if (y_vel < -10) {
      y_vel = -10
    }
    dx += x_vel
    dy -= y_vel
  }
  
  if (dy>floor-10) {
    floorstate = true
  }
  else {
    floorstate=false;
    for (var i = 0; i<blocks.length; i++) {
          blocks[i].check_collisons() 
        }
  }
  
  // friction/gravity
  if (floorstate!=true) {
    y_vel -= .5
    x_vel -= Math.sign(x_vel)*.1}
  else {
    y_vel =0; 
    x_vel -= x_vel/1.1;
    if (dy>floor-10) {
      dy = floor
    }
  }
  
 
  // wall jump!
  if (dx <lwall-2 || lwallstate == true) {
    if (w_state == true) {
      x_vel = -x_vel
      y_vel += 10
      w_state = false
    }
    if (dx <lwall-2){
      dx = lwall
    }
    lwallstate = false
  }
  else if (dx > rwall-2 || rwallstate == true) {
    if (w_state == true) {
      x_vel = -x_vel
      y_vel += 10
      w_state = false
    }
    if (dx > rwall-2){
        dx = rwall
    }
    rwallstate = false
  }
  //ceiling
  if (dy < -2|| ceilingstate==true) {
    y_vel = 0
    ceilingstate = false 
    if (dy < -2){
      dy=cieling
    }
  }
  
  //draw image and which way to face
  if (x_vel > .1 && dead!=true) {
    ctx.drawImage(sprite_right, dx, dy,50,50);
    pre_sprite = sprite_right
  }
  else if (x_vel <-.1 && dead!=true) {
    ctx.drawImage(sprite_left, dx, dy,50,50)
    pre_sprite = sprite_left
  }
  else if (dead == true) {
    ctx.drawImage(sprite_dead,dx,dy,50,50);
  }
  else {
    ctx.drawImage(pre_sprite,dx,dy,50,50)
  }
  
  
  
});





game.addHandler('keydown', function ({event})
{
  if (event.key == 'd') {
    d_state=true
  }
  if (event.key == 'a') {
   a_state=true
  }
})

game.addHandler('keyup', function ({event,elapsed})
{ 
  if (event.key == 'd') {
    d_state=false
  }
  if (event.key == 'a') {
    a_state=false
  }
  if ((event.key == 'w' || event.key == ' ')) {
     w_state = false;
   }
  if ((event.key == 'r')) {
    dead = false
    dx = lwall
    dy = floor
    win = false
    elapsed = 0
    restart = true
  }
})

game.addHandler('keypress', function ({event}) {
  if ((event.key == 'w' || event.key == ' ')) {
     w_state = true;
   }   
})

game.run();
