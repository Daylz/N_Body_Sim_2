let WIDTH = 512;
let HEIGHT = 512;

let dampening = 200

let objects = new Array(400);

let fpsCounter

function setup() {
    frameRate(60);
    createCanvas(WIDTH, HEIGHT);

    for (let i = 0; i < objects.length; i++) {
        objects[i] = new PObject(random() * WIDTH, random() * HEIGHT, 1, 0.1, false);
    }

    fpsCounter = new FPSCounter(10, 32, 32, 20);
}

function draw() {
    background(0);

    for (let i = 0; i < objects.length; i++) {
        objects[i].update();
        objects[i].draw();
        objects[i].resetForce();
    }

    for (let i = 0; i < objects.length; i++) {
        let objA = objects[i];
        let posA = createVector(objA.x, objA.y, 0)

        for (let j = i + 1; j < objects.length; j++) {
            let objB = objects[j];
            let posB = createVector(objB.x, objB.y, 0)
            
            let distance = posA.dist(posB);
            let direction = p5.Vector.sub(posB, posA);
            let force = (objA.mass * objB.mass) / (distance * distance + dampening * dampening) * 100;
            direction.normalize();
            force = p5.Vector.mult(direction, force);
            objA.addForce(force);
            objB.addForce(force.mult(-1));
        }
    }

    // Framerate
    fpsCounter.show();
}