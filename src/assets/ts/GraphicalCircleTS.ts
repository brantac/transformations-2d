import Circle from "./CircleTS";
import GraphicalPoint from "./GraphicalPointTS";

// Because Vue's ref and reactive remove native private fields ('#'),
// GraphicalCircle properties are now public.

export default class GraphicalCircle extends Circle {
    name: string;
    color: string;

    constructor (xc: number, yc: number, radius: number,
        color = "black", name = "circle") {
        super(radius, xc, yc);
        this.color = color;
        this.name = name;
    }

    get getName () {
        return this.name;
    }

    get getColor () {
        return this.color;
    }

    draw (ctx: CanvasRenderingContext2D) {
        GraphicalCircle.drawCircleNotOptimized(ctx, super.getRadius,
            super.getCenter, this.color);
    }

    static drawCircleNotOptimized (ctx: CanvasRenderingContext2D,
        radius: number, center: number[], color: string) {
        let x,y,alfa;
        let centerX,centerY;
        [centerX,centerY] = center;
        for (let i=0; i<=359;i++) {
            alfa = Circle.degreesToRadians(i);
            x = centerX + radius * Math.sin(alfa);
            y = centerY + radius * Math.cos(alfa);
            GraphicalPoint.staticDraw(ctx,x,y,color);
        }
    }

    erase (ctx: CanvasRenderingContext2D, color: string = "white") {
        GraphicalCircle.drawCircleNotOptimized(ctx, super.getRadius,
            super.getCenter, color);
        GraphicalCircle.drawCircleNotOptimized(ctx, super.getRadius,
            super.getCenter, color);
        GraphicalCircle.drawCircleNotOptimized(ctx, super.getRadius,
            super.getCenter, color);
    }

    static computeRadius (center: number[], p: number[]) {
        let [a,b] = center;
        let [px,py] = p;
        let radius = Math.sqrt(Math.pow(px-a,2) + Math.pow(py-b,2));
        return radius;
    }
}