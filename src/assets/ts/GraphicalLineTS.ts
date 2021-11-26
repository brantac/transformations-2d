import Line from './LineTS';
import GraphicalPoint from './GraphicalPointTS';

// Because Vue's ref and reactive remove native private fields ('#'),
// GraphicalLine properties are now public.

export default class GraphicalLine extends Line {
    color: string;
    name: string;

    constructor (x1: number, y1: number, x2: number, y2: number,
        name = "reta", color: string = "black") {
            super(x1,y1,x2,y2);
            this.color = color;
            this.name = name;
        }

    setColor (color: string): void {
        this.color = color;
    }

    setName (name: string): void {
        this.name = name;
    }

    getColor (): string {
        return this.color;
    }

    getName (): string {
        return this.name;
    }

    draw(ctx: CanvasRenderingContext2D) {
        GraphicalLine.drawNotOptimized(ctx,
            super.getXP1, super.getYP1, super.getXP2, super.getYP2,
            this.color);
    }

    // This method does not optimize the drawings.
    // It only uses the pure line formula
    static drawNotOptimized(ctx: CanvasRenderingContext2D,
        x1: number,y1: number,x2: number,y2: number,
        color: string) {
        let m = (y2-y1) / (x2-x1);
        let b = y1 - (m*x1);
        let deltaX = (x2 - x1) < 0 ?  x1-x2 : x2-x1;
        let deltaY = (y2 - y1) < 0 ? y1-y2 : y2-y1;
        
        if (deltaX > deltaY) {
            if (x1 < x2) {
                for (let x = x1; x <= x2; x++) {
                    let y = Math.floor((m*x) + b);
                    GraphicalPoint.staticDraw(ctx,x,y,color);
                }
            }
            else {
                for (let x = x1; x >= x2; x--) {
                    let y = Math.floor((m*x) + b);
                    GraphicalPoint.staticDraw(ctx,x,y,color);
                }
            }
        }
        else {
            if (y1 < y2) {
                for (let y=y1; y<=y2;y++) {
                    let x = Math.floor((y-b)/m);
                    GraphicalPoint.staticDraw(ctx,x,y,color);
                }
            }
            else {
                for (let y=y1; y>=y2;y--) {
                    let x = Math.floor((y-b)/m);
                    GraphicalPoint.staticDraw(ctx,x,y,color);
                }
            }
        }
    }
    
    erase(ctx: CanvasRenderingContext2D, color: string = "white") {
        GraphicalLine.drawNotOptimized(ctx,
            super.getXP1, super.getYP1, super.getXP2, super.getYP2,
            color);
        GraphicalLine.drawNotOptimized(ctx,
            super.getXP1, super.getYP1, super.getXP2, super.getYP2,
            color);
        GraphicalLine.drawNotOptimized(ctx,
            super.getXP1, super.getYP1, super.getXP2, super.getYP2,
            color);
    }
}