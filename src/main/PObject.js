class PObject {
    constructor(x = 0, y = 0, radius = 1, density = 1, fixed = false) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.density = density;
        this.fixed = fixed;
        this.velocity = createVector(0, 0, 0);
        this.force = createVector(0, 0, 0);
    }

    update() {
        if (!this.fixed) {
            this.velocity.add(this.force)
            this.x = (this.x + this.velocity.x); //% WIDTH;
            this.y = (this.y + this.velocity.y); //% HEIGHT;
        }
    }

    draw() {
        stroke(255);
        fill(255);
        ellipse(this.x, this.y, this.radius * 2);
    }

    addForce(force) {
        this.force.add(force);
    }

    resetForce() {
        this.force = createVector(0, 0, 0);
    }

    get mass() {
        return PI * this.radius * this.radius * this.density;
    }
}