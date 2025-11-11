// Floating Pastel Pottery (Multiple Objects Per Click)
// by ChatGPT

let pottery = [];
let colors = [];

function setup() {
  createCanvas(800, 600);
  noStroke();

  // Expanded pastel palette
  colors = [
    color(255, 179, 186, 120),
    color(255, 223, 186, 120),
    color(255, 255, 186, 120),
    color(186, 255, 201, 120),
    color(186, 225, 255, 120),
    color(201, 186, 255, 120),
    color(255, 200, 220, 120),
    color(200, 255, 255, 120),
    color(255, 230, 200, 120)
  ];
}

function draw() {
  background(245, 245, 250);

  for (let p of pottery) {
    p.update();
    p.display();
  }
}

// ---------------- CLICK TO ADD MULTIPLE POTTERY ----------------
function mousePressed() {
  let numObjects = int(random(2, 6)); // 2 to 5 objects per click

  for (let i = 0; i < numObjects; i++) {
    let type = random(["mug", "plate", "pot", "vase"]);
    let size = random(180, 350);
    let c = random(colors);

    // Add some random offset around mouse for natural spread
    let offsetX = random(-50, 50);
    let offsetY = random(-50, 50);

    pottery.push(new Pottery(mouseX + offsetX, mouseY + offsetY, size, type, c));
  }
}

class Pottery {
  constructor(x, y, size, type, c) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.type = type;
    this.c = c;
    this.vx = random(-0.5, 0.5);
    this.vy = random(-0.5, 0.5);
    this.angle = random(TWO_PI);
    this.spinSpeed = random(0.0001, 0.0005);
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;

    this.angle += this.spinSpeed;
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    fill(this.c);

    switch (this.type) {
      case "plate":
        ellipse(0, 0, this.size, this.size * 0.2);
        break;
      case "mug":
        rectMode(CENTER);
        rect(0, 0, this.size * 0.5, this.size, 30, 30, 15, 15);
        ellipse(this.size * 0.25, 0, this.size * 0.25, this.size * 0.6); // handle
        break;
      case "pot":
        ellipse(0, 0, this.size, this.size * 0.7);
        rectMode(CENTER);
        rect(0, -this.size * 0.35, this.size * 0.9, this.size * 0.15, 15); // rim
        break;
      case "vase":
        beginShape();
        vertex(-this.size*0.4, this.size*0.7);
        vertex(-this.size*0.3, -this.size*0.7);
        vertex(this.size*0.3, -this.size*0.7);
        vertex(this.size*0.4, this.size*0.7);
        endShape(CLOSE);
        break;
    }

    pop();
  }
}
