import Point from './PointTS';

// Because Vue's ref and reactive remove native private fields ('#'),
// GraphicalPoint properties are now public.

export default class GraphicalPoint extends Point {
    color: string;
    name: string;
    type: string;

    constructor(x: number, y: number, color: string, name: string = "Point") {
        super(x,y);
        this.color = color;
        this.name = name;
        this.type = "GraphicalPoint";
    }

    movePoint (x: number, y: number, ctx: CanvasRenderingContext2D,
        backgroundColor = "white") {
        let tempX, tempY;
        tempX = super.getX;
        tempY = super.getY;
        super.setX = x;
        super.setY = y;
        this.repaint(ctx);
        GraphicalPoint.staticDraw(ctx,tempX,tempY,backgroundColor);
        // this.erase(ctx, tempX, tempY, backgroundColor);
        return;
    }

    setColor(color: string) {
        this.color = color;
        return;
    }

    setName (name: string) {
        this.name = name;
        return;
    }

    getName () {
        return this.name;
    }

    getType () {
        return this.type;
    }
    
    setColorRepaint (color: string, ctx: CanvasRenderingContext2D) {
        this.color = color;
        this.repaint(ctx);
        return;
    }
    
    static staticDraw(ctx: CanvasRenderingContext2D,
        x: number, y: number, color: string) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.ellipse(x,y,1,1,Math.PI/4,0,2*Math.PI);
        ctx.fill()
        return;
    }

    draw(ctx: CanvasRenderingContext2D) {
        GraphicalPoint.staticDraw(ctx,this.getX,this.getY,this.color);
        return;
    }

    repaint(ctx: CanvasRenderingContext2D) {
        GraphicalPoint.staticDraw(ctx,this.getX,this.getY,this.color);
        return;
    }

    erase(ctx: CanvasRenderingContext2D, color: string = "white") {
        GraphicalPoint.staticDraw(ctx,this.getX,this.getY,color);
        GraphicalPoint.staticDraw(ctx,this.getX,this.getY,color);
        GraphicalPoint.staticDraw(ctx,this.getX,this.getY,color);
    }
    // static erase(ctx: CanvasRenderingContext2D, x: number, y: number, color: string) {
    //     // GraphicalPoint.staticDraw(ctx,this.getX,this.getY,this.color);
    //     GraphicalPoint.staticDraw(ctx,x,y,color);
    // }
}