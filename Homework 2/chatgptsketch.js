function setup() {
    createCanvas(400, 400);
    noLoop();
  }
  
  function draw() {
    background(220);
  
    // Bottom Bun
    fill(220, 180, 100);
    ellipse(200, 280, 150, 50);
  
    // Patty
    fill(120, 60, 30);
    rect(125, 260, 150, 20, 10);
  
    // Cheese
    fill(255, 204, 0);
    quad(130, 250, 270, 250, 260, 265, 140, 265);
  
    // Lettuce
    fill(50, 205, 50);
    ellipse(200, 240, 160, 30);
  
    // Tomato
    fill(255, 50, 50);
    ellipse(200, 230, 140, 25);
  
    // Top Bun
    fill(220, 180, 100);
    ellipse(200, 200, 150, 80);
  
    // Sesame Seeds
    fill(255);
    for (let i = 0; i < 10; i++) {
      let x = random(170, 230);
      let y = random(180, 210);
      ellipse(x, y, 8, 4);
    }
  }
  