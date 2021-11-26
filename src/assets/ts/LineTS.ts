import Point from "./PointTS";

export default class Line {
    p1: Point;
    p2: Point;

    constructor(x1: number, y1: number, x2: number, y2: number) {
        this.p1 = new Point(x1,y1);
        this.p2 = new Point(x2,y2);
    }

    get getLine() {
        return [this.p1, this.p2];
    }

    get getP1() {
        return this.p1;
    }

    get getXP1 () {
        return this.p1.getX;
    }

    get getYP1 () {
        return this.p1.getY;
    }

    get getXP2 () {
        return this.p2.getX;
    }

    get getYP2 () {
        return this.p2.getY;
    }

    get getP2() {
        return this.p2;
    }

    setP1 (x: number, y: number) {
        this.p1.setX = x;
        this.p1.setY = y;
    }

    setP2 (x: number, y: number) {
        this.p2.setX = x;
        this.p2.setY = y;
    }
}