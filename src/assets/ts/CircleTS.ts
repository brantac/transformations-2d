import Point from "./PointTS";

// Because Vue's ref and reactive remove native private fields ('#'),
// Circle properties are now public.

export default class Circle {
    radius: number;
    center: Point;

    constructor(radius: number, xc: number, yc: number) {
        this.radius = radius;
        this.center = new Point(xc, yc);
    }

    get getRadius() {
        return this.radius;
    }

    get getCenterX () {
        return this.center.getX;
    }

    get getCenterY () {
        return this.center.getY;
    }

    get getCenter () {
        return [this.center.getX, this.center.getY];
    }

    set setRadius (r: number) {
        this.radius = r;
    }

    static degreesToRadians(degrees: number) {
        const pi = Math.PI;
        return degrees * (pi/180);
    }
}