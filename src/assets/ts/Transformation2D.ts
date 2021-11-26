import Point from "./PointTS";
import multiplyMatrix from "./Matrix2D";
import Circle from "@/assets/ts/CircleTS";

type matrix2d = number[][];

export default class Transformation2D {
    point: Point;
 
    constructor (p: Point) {
        this.point = p;
    }

    setPoint (newPoint: Point): Transformation2D {
        this.point = newPoint;
        return this;
    }

    // set setPoint (newPoint: Point) {
    //     this.point = newPoint;
    // }

    set setX (newX: number) {
        this.point.setX = newX;
    }
    
    set setY (newY: number) {
        this.point.setY = newY;
    }

    get getPoint () {
        return this.point;
    }

    pointMatrix(referenceX: number, referenceY: number): matrix2d {
        let x = this.point.getX, y = this.point.getY;
        return Array.of([x - referenceX], [y - referenceY], [1]);
    }

    translate (tx: number, ty: number,
        referenceX: number = 0, referenceY: number = 0): Transformation2D {
        let translationMatrix: matrix2d, result: matrix2d = [];
        let newX: number, newY: number;

        translationMatrix = Transformation2D.buildTranslationMatrix(tx, ty);
        result = multiplyMatrix(translationMatrix,
            this.pointMatrix(referenceX, referenceY));
        [newX, newY] = [result[0][0],result[1][0]];
        this.setX = newX;
        this.setY = newY;

        return this;
    }

    scale (sx: number, sy: number,
        referenceX: number = 0, referenceY: number = 0): Transformation2D {
        let scaleMatrix: matrix2d, result: matrix2d = [];
        let newX: number, newY: number;

        scaleMatrix = Transformation2D.buildScaleMatrix(sx, sy);
        result = multiplyMatrix(scaleMatrix,
            this.pointMatrix(0, 0));
        [newX, newY] = [result[0][0] + referenceX * (1 - sx),
            result[1][0] + referenceY * (1 - sy)];
        this.setX = newX;
        this.setY = newY;

        return this;
    }

    rotate (angle: number,
        referenceX: number = 0,
        referenceY: number = 0): Transformation2D {
        let rotationMatrix: matrix2d, result: matrix2d = [];
        let newX: number, newY: number;
        let radians = Circle.degreesToRadians(angle);

        rotationMatrix = Transformation2D.buildRotationMatrix(radians);
        result = multiplyMatrix(rotationMatrix,
            this.pointMatrix(referenceX, referenceY));
        [newX, newY] = [result[0][0] + referenceX,result[1][0] + referenceY];
        this.setX = newX;
        this.setY = newY;

        return this;
    }

    static buildTranslationMatrix(tx = 0, ty = 0): matrix2d {
        let l1: number[] = [], l2: number[] = [], l3: number[] = [];
        let tm: number[][] = [];
        l1 = Array.of(1,0,tx);
        l2 = Array.of(0,1,ty);
        l3 = Array.of(0,0,1);
        tm = Array.of(l1,l2,l3);
        return tm;
    }

    static buildScaleMatrix(sx = 0, sy = 0): matrix2d {
        let l1: number[] = [], l2: number[] = [], l3: number[] = [];
        let tm: number[][] = [];
        l1 = Array.of(sx,0,0);
        l2 = Array.of(0,sy,0);
        l3 = Array.of(0,0,1);
        tm = Array.of(l1,l2,l3);
        return tm;
    }

    static buildRotationMatrix(radians: number): matrix2d {
        let l1: number[] = [], l2: number[] = [], l3: number[] = [];
        let tm: number[][] = [];
        l1 = Array.of(Math.cos(radians),-Math.sin(radians),0);
        l2 = Array.of(Math.sin(radians),Math.cos(radians),0);
        l3 = Array.of(0,0,1);
        tm = Array.of(l1,l2,l3);
        return tm;
    }
}