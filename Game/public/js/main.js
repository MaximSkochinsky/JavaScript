var cnv = document.getElementById('screen');
var ctx = cnv.getContext('2d');
ctx.font = "15px Verdana";

var cnvW = cnv.width;
var cnvH = cnv.height; 

var dt = 0;//deltaTime
var lt = 0;//lastTime
var attackFrame = 0;

var timer = 0;
var score = 0;
var frame = 0;

var shot = new Audio('audio/выстрел.mp3');
shot.playbackRate = 3.5;

var heroimg = new Image();
heroimg.src = 'img/Hero.png';

var elfimg = new Image();
elfimg.src = '/img/opponents/DarkElf.png' 

var princessimg = new Image();
princessimg.src = '/img/opponents/princess.png';


var assasinimg = new Image();
assasinimg.src = '/img/opponents/Assasin.png';
 
var terimg = new Image();
terimg.src = 'img/Terrain.png';


var  arrowimg = new Image();
arrowimg.src = 'img/Arrow.png';

var camera = {x : 0, y: 0};
var shotImg = [];


var swordAttackFrames = {
    'right' : 15,
    'down'  : 14,
    'left'  : 13,
    'up'    : 16,
    'frames': 5
}


var bowAttackFrames = {
      'right' : 19,
      'down'  : 18,
      'left'  : 17,
      'up'    : 16,
      'frames': 5
}

var walkFrames = 
      {
          'right' : 11,
          'down'  : 10,
          'left'  : 9,
          'up'    : 8,
      };


var arrowFrames = {
       'right': 3,
       'left' : 1,
       'up'   : 0,
       'down' : 2,
}   

var directions = {
    1 : 'right',
    2 : 'left',
    3 : 'up',
    4 : 'down'
}

var terrain = {
    1 : {
        name : "Grass",
        dx : 88,
        dy : 2064,
        sizeX : 30,
        sizeY : 30,
    },
    2 : {
        name :"Pine",
        dx : 0,
        dy : 0,
        sizeX : 64,
        sizeY : 64,
    },
    3 : {
        name : "Fir-tree",
        dx : 0,
        dy : 126,
        sizeX : 64,
        sizeY : 60,
    },
    4 : {
        name : "Water",
        dx : 14,
        dy : 3376,
        sizeX : 60,
        sizeY : 60
    },
    5 : {
        name : "Ground",
        dx : 102,
        dy : 2316,
        sizeX : 60,
        sizeY : 60, 
    },
    6 : {
        name : "Grass rock",
        dx : 16,
        dy : 4629,
        sizeX : 56,
        sizeY: 46,
    },
    7 : {
        name : "Bush",
        dx : 92,
        dy : 11841,
        sizeX : 79,
        sizeY : 77,
    }
};




function chooseHero () {
      var choice = prompt("Your Hero: 1) Princess 2) Knight 3) Dark Elf 4) Assasin");
      var img;
      switch(choice) {
        case "1" : img = princessimg; break;
        case "2" : img = heroimg; break;
        case "3" : img = elfimg; break;
        case "4" : img = assasinimg; break;
      }
      var plName = prompt("Name: ");
      return new Hero(img, 50, 50, 200, 700, plName);
}



function chooseOpp() {
      
      var opp = prompt(`Choose  enemy : 1) Princess 2) Knight 3) Dark Elf 4) Assasin`);
      var img;
      switch(opp) {
        case "1" : 
          img = princessimg;
          name = "Princess";
          break;
        case "2" : 
          img = heroimg;
          name = "Knight";
          break;
        case "3" : 
          img = elfimg;
          name = "Dark elf";
          break;
        case "4" : 
          img = assasinimg;
          name = "Assasin";
          break;
      }

      return new Opponent(img, 50, 50, 300 + Math.floor(Math.random() * 200), 300 + Math.floor(Math.random() * 300), name);
}




function draw(object, role) {//рисуем оппонента или героя в зав-ти от роли
      if (!object.death) { // если персонаж не погиб
         var delay = (role == "hero")? 5 : 5;
         if (object.attack) {
                switch(object.weapon) {
                     case "bow": 
                     ctx.drawImage(
                      object.img,
                      0 + 64 * object.attackFrame, 0 + 64 * bowAttackFrames[object.direct] ,
                      64, 64,
                      object.x, object.y,
                      object.width, object.height
                      );// рисуем кадр анимации
                      object.attackFrame++; // смещаем на новый кадр
                      if (object.attackFrame > bowAttackFrames.frames) object.attackFrame = 5;
                      break;
                      default : break;
                }
         }
         else {
          ctx.drawImage(
            object.img,
            0 + 64 * object.walkFrame, 0 + 64 * walkFrames[object.direct] ,
            64, 64,
            object.x, object.y,
            object.width, object.height
            );
         }
      }
      else {
        ctx.drawImage(
            object.img,
            0 + 64 * frame, 0 + 64 * 20,
            64, 64,
            object.x, object.y,
            object.width, object.height
          );
        if (frame <= 5) setTimeout(function() {frame++}, 800);
        else {
            if (role != "hero") opponents.splice(opponents.indexOf(object), 1);
            hero.stats.score++;
            hero.exp += 10;
            frame = 0;
        }  
      }
};







class World {
    constructor(img) {
       this.map = [
        [4, 4, 4, 4, 4, 4, 4, 6, 6, 4, 4, 4, 4, 4, 4],
        [4, 1, 1, 1, 1, 1, 1, 7, 7, 1, 1, 1, 1, 4, 4],
        [4, 1, 1, 1, 1, 1, 1, 5, 5, 1, 1, 1, 1, 4, 4],
        [4, 1, 1, 1, 1, 1, 1, 5, 5, 1, 1, 1, 1, 4, 4],
        [4, 1, 1, 1, 1, 1, 1, 5, 5, 1, 1, 1, 1, 4, 4],
        [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4],
        [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4],
        [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4],
        [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4],
        [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4],
        [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4],
        [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4],
        [4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4],
        [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
];
       this.img = img;
}

    drawWorld = function(ctx) {
      ctx.clearRect(0, 0, cnvW, cnvH);  
      var size = 64;
      var buffer = document.createElement("canvas").getContext('2d');
      buffer.width = ctx.width;
      buffer.height = ctx.height;
      for (let i = 0; i < this.map.length; i++) {
          for (let j = 0; j < this.map.length; j++) {
              this.drawTerrain(i, j, size);
          }
      }
    }



    drawTerrain(i, j, size) {
          var num = this.map[i][j];
          ctx.drawImage(this.img,
            3 + terrain[num].dx, 3 + terrain[num].dy,
            terrain[num].sizeX - 5, terrain[num].sizeY - 5,
            0 + size * j, 0 + size * i,
            size, size 
          );
    }


    checkCollisions(opponents, hero, shots) {
          shots.forEach(shot => {
                opponents.forEach(opp => {
                     if (shot.x >= opp.x && shot.x <= opp.x + opp.width / 2 && shot.y >= opp.y
                       && shot.y <= opp.y + opp.height / 2 ) {
                         shots.splice(shots.indexOf(shot), 1);
                         if (opp.stats.armour > 0 ) opp.stats.armour-=5;
                         else opp.stats.HP -= 10;
                         if (opp.stats.HP <= 0) {
                            opp.death = true;
                            opp.dx = 0;
                            opp.dy = 0;
                         }

                      }
                });
                if (shot.x >= hero.x && shot.x <= hero.x + hero.width / 2 && shot.y >= hero.y 
                  && shot.y <= hero.y + hero.height / 2) {
                     shots.splice(shots.indexOf(shot), 1);
                     if (hero.stats.armour > 0 ) hero.stats.armour--;
                     else hero.stats.HP -= 10;
                }
          });  


  }

    checkHeroOut(hero) {
        if (hero.dx + hero.x > world.width || hero.dy + hero.y > world.height || hero.dy + hero.y <= 0 || hero.dx + hero.dx <= 0) {
            hero.dx = 0;
            hero.dy = 0;
        }
    }

  }


class Shot {
      constructor(hero) {
           this.direct = hero.direct;
           this.image = arrowimg;
           switch(this.direct) {
              case 'up' : 
                this.x = hero.x + hero.width / 4;
                this.y = hero.y;
                this.dy = -50;
                this.dx = 0;
                break;
              case 'down' :
                this.x = hero.x + hero.width / 4;
                this.y = hero.y + hero.height;
                this.dy = 50;
                this.dx = 0;
                break;
              case 'left' :
                this.x = hero.x;
                this.y = hero.y + hero.height / 4;
                this.dy = 0;
                this.dx = -50;
                break;
              case 'right':
                this.x = hero.x + hero.width;
                this.y = hero.y + hero.height / 4;
                this.dx = 50;
                this.dy = 0;
                break; 
              default :
                break;      
           }
      }


      draw = function(ctx) {
           ctx.drawImage(
             this.image,
             0 + arrowFrames[this.direct] * 112, 0, 
             112, 112,
             this.x, this.y, 
             25, 25  
            );

           }

      update = function(dt) {
          this.x += this.dx * dt;
          this.y += this.dy * dt;
      }

      

      checkOut(world) {
          return (this.x >= world.x || this.x < 0  || this.y >= world.y || this.y < 0);
      }

      
}







class Hero {
      constructor(img, width, height, x, y, name) {
          this.name = name;
          this.x = x;
          this.y = y;
          this.dx = 0;
          this.dy = -10;
          this.width = width;
          this.height = height;
          this.img = img;
          this.direct = `${directions[Math.floor(Math.random() * 3) + 1]}`;
          this.walkFrame = 0;
          this.attackFrame = 0;
          this.weapon = 'bow';
          this.attack = false;
          this.death = false;
          this.stats = {
               MaxHP: 100,
               MaxArmour : 20,
               HP : 100,
               armour : 20,
               exp : 0,
               lvl : 1,
               score : 0
          }
      }

      drawHero = function(ctx, role) {
        this.drawStat(ctx);
        this.drawHP(ctx);
        this.drawArmour(ctx);
        draw(this, role);
      }

      update(dt) {
          this.x += this.dx * dt;
          this.y += this.dy * dt;
          this.walkFrame++;
          if (this.walkFrame > 8) this.walkFrame = 0;
      }

      drawHP(ctx) {
        if (this.stats.HP >= 0) {
            let coef = this.stats.HP / this.stats.MaxHP;
            let sizeX = this.width;
            let sizeY = 5;
            ctx.fillStyle = "Green";
            ctx.fillRect(this.x, this.y - (sizeY + 5),sizeX * coef, sizeY);
            ctx.fillStyle = "Red";
            ctx.fillRect(this.x + sizeX * coef, this.y - (sizeY + 5), sizeX * (1 - coef), sizeY);
        }
        else return;
      } 


      drawStat(ctx) {
          ctx.fillStyle = "#00F";
          ctx.fillText(this.stats.lvl, this.x, this.y - 10);
          if (this == hero) ctx.fillStyle = "#FF0000";
          else ctx.fillStyle = "Yellow";
          ctx.fillText(this.name, this.x + 10, this.y - 10);
      }


      drawArmour(ctx) {
          if(this.stats.armour >= 0) {
            let coef = this.stats.armour / this.stats.MaxArmour;
            let sizeX = this.width;
            let sizeY = 5;
            ctx.fillStyle = "Gray";
            ctx.fillRect(this.x, this.y -  5,sizeX * coef, sizeY);
            ctx.fillStyle = "Black";
            ctx.fillRect(this.x + sizeX * coef, this.y - + 5, sizeX * (1 - coef), sizeY);
          }
      }

      moveHero = function(key, dt) {
          switch(key) {
          case 's' :
            this.setDirection(0, 10, "down");
            if(this.checkLet(world.map)) this.setDirection(0, 0, "down");
            break;
          case 'w' : 
            this.setDirection(0, -10, "up");
            if(this.checkLet(world.map)) this.setDirection(0, 0, "up");
            break;
          case 'a' : 
            this.setDirection(-10, 0, "left");
            if(this.checkLet(world.map)) this.setDirection(0, 0, "left");
            break;
          case 'd' : 
            this.setDirection(10, 0, "right");
            if(this.checkLet(world.map)) this.setDirection(0, 0, "right");
            break;
          case 'W' : 
            this.setDirection(0, -30, "up");
            if(this.checkLet(world.map)) this.setDirection(0, 0, "up");
            break;
          case 'A' : 
            this.setDirection(-30, 0, "left");
            if(this.checkLet(world.map)) this.setDirection(0, 0, "left");
            break;
          case 'S' : 
            this.setDirection(0, 30, "down");
            if(this.checkLet(world.map)) this.setDirection(0, 0, "down");
            break;
          case 'D' : 
            this.setDirection(30, 0, "right");
            if(this.checkLet(world.map)) this.setDirection(0, 0, "right");
            break; 
          case '1' : 
            this.weapon = "bow";
            break;
          case '2' : 
            this.weapon = "sword";
            break;  
          default: 
            break;
          }
      }


      checkOut = function() {
            return (this.x + this.width >= cnvW || this.x - this.width <= 0 || this.y + this.height > cnvH || 
              this.y - this.height <= 0);
      }


      checkLet = function(map) {
           let size = 64;
           let j = Math.round((this.dy / 2 + this.y) / size);
           let i = Math.round((this.dx / 2 + this.x) / size);
           var col = false;
           if (map[j][i] != undefined)  {
              if (map[j][i] == 2 || map[j][i] == 3 || map[j][i] == 4  || map[j][i] == 6 || map[j][i] == 7) {
                 col = true;
              }
            }  
            else {
              switch(this.direct) {
                case 'left' : this.setDirection(5, 0, "right"); break;
                case 'right' : this.setDirection(-5, 0, "left"); break;
                case 'up' : this.setDirection(0, 5, "down"); break;
                case 'down' : this.setDirection(0, -5, "up"); break;
              }  
            } 
           return col;
      }

      
     attackGoal = function(direction) {
          this.direct = direction;
          this.attack = true;
          this.dx = 0;
          this.dy = 0;
      }

      setDirection = function(speedX, speedY, direction) {
          this.attack = false;
          this.dx = speedX;
          this.dy = speedY;
          this.direct = direction;
      }
      
      updateAnim = function () {
        if(this.attack && this.attackFrame == bowAttackFrames.frames) {
            this.attackFrame = 0;
            shotImg.push(new Shot(this));
            //shot.play();
        } 
        else {
            this.walkFrame++;
            if (this.walkFrame > 8) this.walkFrame = 0;
        }


      }


   
        


}



class Opponent extends Hero {

  drawOpp = function(ctx) {
        this.updateOpp(hero);
        this.drawHero(ctx, "opp");
  }
  
  
  updateOpp(goal) {
    if (!this.death) {
       var distX = goal.x - this.x;
       var distY = goal.y - this.y;
       this.updateAnim();
       switch(this.weapon) {
            case 'bow' : 
            this.avoidCol(opponents);
            if (this.checkLet(world.map)) {
              switch(this.direct) {
                    case 'left' : this.setDirection(5, 0, "right"); break;
                    case 'right' : this.setDirection(-5, 0, "left"); break;
                    case 'up' : this.setDirection(0, 5, "down"); break;
                    case 'down' : this.setDirection(0, -5, "up"); break;
              }
            }
            if (this.checkOut()) {
                if (this.x + this.width >= cnvW) {
                    this.setDirection(-5, 0, "left");
                }
                else if (this.x <= 0) {
                    this.setDirection(5, 0, "right");
                }
                else if (this.y <= 0) {
                    this.setDirection(0, 5, "down");
                }
                else if (this.y + this.height >= cnvH) {
                    this.setDirection(0, -5, "up");
                } 
            }
            else if (Math.abs(distX) < 200 && Math.abs(distY)  < 200 && !this.checkLet(world.map)) {
                  if (Math.abs(distX) < goal.width / 4  || Math.abs(distY) < goal.height / 4 ) {
                      if (Math.abs(distX) < goal.width / 4 && distY > goal.height / 4) {
                          if(!this.avoidHit(opponents)) this.attackGoal("down"); 
                      }
                      else if (Math.abs(distX) < goal.width / 4 && distY < -goal.height / 4) {
                          if(!this.avoidHit(opponents))  this.attackGoal("up"); 
                      }
                      else if (Math.abs(distY) < goal.height / 4 && distX < -goal.width / 4) {
                          if(!this.avoidHit(opponents))  this.attackGoal("left");
                      }
                      else if (Math.abs(distY) < goal.height / 4 && distX > goal.width / 4) {
                          if(!this.avoidHit(opponents))   this.attackGoal("right");
                      }
                      return;
                  }
                  else if (Math.abs(distX) < Math.abs(distY)) {
                          if (distX < 0) {
                            this.setDirection(-8, 0, "left"); 
                          }
                          else if (distX > 0) {
                            this.setDirection(8, 0, "right");
                          }
                  }
                  else if (Math.abs(distY) <= Math.abs(distX)) {
                          if (distY < 0) {
                              this.setDirection(0, -8, "up");
                          }
                          else if (distY > 0) {
                              this.setDirection(0, 8, "down");
                          }
                  }
            }  
            else {
                switch(this.direct) {
                     case "right" : this.setDirection(5, 0, "right"); break;
                     case "left" : this.setDirection(-5, 0, "left"); break;
                     case "up" : this.setDirection(0, -5, "up"); break;
                     case "down" : this.setDirection(0, 5, "down"); break;
                }
            }
            this.avoidFire(shotImg);
                  break;
            default : 
                  break;      
       }
       this.x += this.dx * dt;
       this.y += this.dy * dt;
      }
      else {
         this.dx = 0;
         this.dy = 0;
      }
  }

  


  

  avoidCol = function(opponents) {
     opponents.forEach(opp => {
         if (opp == this) return;
          
         var oppX = opp.x + opp.dx;
         var oppY = opp.y + opp.dy;

         var thisX = this.x + this.dx;
         var thisY = this.y + this.dy;

          if (Math.abs(thisX - oppX) < this.width / 2  && Math.abs(thisY - oppY) < this.height / 2) {
              switch(this.direct) {
                case 'left' : this.setDirection(-this.dx, this.dy, "right"); break;
                case 'right' : this.setDirection(-this.dx, this.dy, "left"); break;
                case 'up' : this.setDirection(this.dx, -this.dy, "down"); break;
                case 'down' : this.setDirection(this.dx, -this.dy, "up"); break;
              }           
          } 
    });


  }


    avoidHit(opp) {
      var friendIsNear = false;
      for (let i in opp) {
          
           switch(this.direct) {
                 case "right": 
                      if (this.x < opp[i].x && this.y >= opp[i].y - opp[i].height / 3 && this.y <= opp[i].y + opp[i].height / 3) {
                        friendIsNear  = true;
                      } 
                      break;
                 case "left":
                      if (this.x > opp[i].x && this.y >= opp[i].y - opp[i].height / 3 && this.y <= opp[i].y + opp[i].height / 3) {
                        friendIsNear  = true;
                      }  
                      break; 
                 case "down":
                      if (this.y < opp[i].y && this.x >= opp[i].x - opp[i].width / 3 && this.x <= opp[i].x + opp[i].width / 3) {
                        friendIsNear  = true;
                      }   
                      break; 
                 case "up":
                      if (this.y > opp[i].y && this.x >= opp[i].x - opp[i].width / 3 && this.y <= opp[i].x + opp[i].width / 3) {
                        friendIsNear  = true;
                      }  
                      break; 
                default : break;      
           }  
           if (friendIsNear) break;
      }
      
      return friendIsNear;
    }  



    avoidFire(shots) {
         var directChanged = false;
         for(let i in shots) {
            let dx = (this.x - shots[i].x);
            let dy = (this.y - shots[i].y);
            if (Math.abs(dx) < 40 && Math.abs(dy) < 40) {
                directChanged = true;
                switch(shots[i].direct) {
                    case "up" : 
                      if (dy < 0 && dx > 0 && (this.direct == "up" || this.direct == "down")) this.setDirection(8, 0, "right");
                      else if (dy < 0 && dx < 0 && (this.direct == "up" || this.direct == "down")) this.setDirection(-8, 0, "right");
                      else this.setDirection(this.dx * 3, this.dy * 3, this.direct);
                      break;
                    case "down" : 
                      if (dy > 0 && dx > 0 && (this.direct == "up" || this.direct == "down")) this.setDirection(8, 0, "right");
                      else if (dy > 0 && dx < 0 && (this.direct == "up" || this.direct == "down")) this.setDirection(-8, 0, "left");
                      else this.setDirection(this.dx * 3, this.dy * 3, this.direct);
                      break;
                    case "left" : 
                      if (dx < 0 && dy > 0 && (this.direct == "left" || this.direct == "right")) this.setDirection(0, 8, "down");
                      else if (dx < 0 && dy < 0 && (this.direct == "left" || this.direct == "right")) this.setDirection(0, -8, "up");
                      else this.setDirection(this.dx * 3, this.dy * 3, this.direct);
                      break;
                    case "right" : 
                      if (dx > 0 && dy < 0 && (this.direct == "left" || this.direct == "right")) this.setDirection(0, -8, "up");
                      else if (dx > 0 &&  dy > 0 && (this.direct == "left" || this.direct == "right")) this.setDirection(0, 8, "down");
                      else this.setDirection(this.dx * 3, this.dy * 3, this.direct);
                      break;
                    default :
                      break;         
                }
            }   
            if (directChanged) break;
         }
    }

}


document.addEventListener("mousedown", event => {//кнопка мыши нажата
  console.log(event);
  if (!hero.attack) hero.attack = true;// если нажата левая кнопка мыши - герой атакует 
});



document.addEventListener("mouseup", event => {// кнопка мыши отжата
  if(hero.weapon == 'bow' && hero.attackFrame == bowAttackFrames.frames) { // если у героя есть лук и анимация выстрела последняя
    //shot.play();
    shotImg.push(new Shot(hero));// прозводим выстрел - добавлям объект класса Shot в массив выстрелов
  }
  hero.attack = false;// теперь герой не атакует
  hero.attackFrame = 0;
  hero.walkFrame = 0;
})


document.addEventListener("keydown", event => {
    hero.moveHero(event.key, dt);// если нажата кнопка на клавиатуре - двигаем героя
    hero.update(dt);// обновляем его позицию
});


document.addEventListener("keyup", event => {
    hero.dx = 0;
    hero.dy = 0;
});






function SpawnOpp(opp, count) {
  for (let i = 0; i < count; i++) {
    opp.push(chooseOpp());
  }

}


function StartNewLvl() {
    if (opponents.length == 0) {
       SpawnOpp(opponents, count);
       count++;
       hero.stats.MaxHP += 10;
       hero.stats.HP = hero.stats.MaxHP;
       hero.stats.MaxArmour += 10;
       hero.stats.armour = hero.stats.MaxArmour;
       hero.stats.lvl++;
    }
}


var hero = chooseHero();
var world = new World(terimg);
var opponents = [];
var count = 1;




function gameOver() {
  alert(`Game over! You killed ${hero.stats.score} enemy.  Your level: ${hero.stats.lvl}`);
  var buf = document.createElement('canvas').getContext('2d');
  buf.width = cnvW;
  buf.height = cnvH;
  buf.clearRect(0, 0, cnvW, cnvH);
  buf.font = "20px Courier";
  buf.fillStyle = "Black";
  buf.textAlign = "left";
  buf.textBaseline = "top";
  ctx.drawImage(buf.canvas, 0, 0, buf.width, buf.height);
}

function CheckTimer() {
    if (timer >= 100) timer = 0;
}



var gameReq;
function game(t) {
    dt = (t - lt) / 100;// получение промежутка времени между вызовами requestAnimFrame
    world.drawWorld(ctx);// отрисовка мира
    StartNewLvl();// создание нового уровня
    hero.drawHero(ctx, "hero");// отрисовка персонажа
    if (hero.stats.HP <= 0) { // условие конца игры
      gameOver();
      return;
    }
    opponents.forEach(opp => { 
        opp.drawOpp(ctx); // отрисовка всех врагов
    });
    for (let i in shotImg) { // отрисовка и обновление всех выстрелов из масив(объекты Shot)
        shotImg[i].draw(ctx);
        shotImg[i].update(dt);
        if (shotImg[i].checkOut(world)) shotImg.splice(i, 1);
    }
    world.checkCollisions(opponents, hero, shotImg);// проверка столкновений в мире
    gameReq = requestAnimationFrame(game);// вызов функции game 
    lt = t;
}



window.addEventListener("load", event => {
  game(0);
});




