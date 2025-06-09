
class Team {
  constructor(x,y, w, h, color) {
    this.name = color
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.color = color
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x,this.y, this.w, this.h);
  }
}

const balls = [];
let team_red = new Team(0, height/2 - 50, 30, 100, "red")
let team_blue = new Team(width - 30, height/2 - 50, 30, 100, "blue")


function start(){
  for (let i = 0; i < team_red.balls_count; i++) {
    const size = random(10, 20);
    const ball_red = new Ball(
      // ball position always drawn at least one ball width
      // away from the edge of the canvas, to avoid drawing errors
      random(0 + size, width - size),
      random(0 + size, height - size),
      random(1,20),
      random(-7, 7),
      "red",
      size
    );
    balls.push(ball_red);
  }
  for (let i = 0; i < team_blue.balls_count; i++)  {
    const size = random(10, 20);
    const ball_blue = new Ball(
      // ball position always drawn at least one ball width
      // away from the edge of the canvas, to avoid drawing errors
      random(0 + size, width - size),
      random(0 + size, height - size),
      random(1,20),
      random(-7, 7),
      "blue",
      size
    );
    balls.push(ball_blue);
  }
  
}




function loop() {
  ctx.fillStyle = "rgba(101, 250, 100, 0.25)";
  ctx.fillRect(0, 0, width, height);

  team_red.draw()
  
  team_blue.draw()

  for (const ball of balls) {
    ball.draw();
    ball.update();
    ball.collisionDetect(team_red, team_blue);
  }

  requestAnimationFrame(loop);
}

loop();
