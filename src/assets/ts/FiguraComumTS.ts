import GraphicalLine from "./GraphicalLineTS";
import GraphicalCircle from "./GraphicalCircleTS";
import Circle from "./CircleTS";

/* 
    TO-DO
    1. Fix the method "computeOuterMostIntersections"
    2. Implement ways of changing the color of the forms
    independently: inner circle; external circles; and lines.
*/

type coordinate = [number, number];

export default class FiguraComum {
    #gpcInnerCircle: GraphicalCircle;
    #gpcExternalCircles: GraphicalCircle[];
    // #externalCirclesCenters: number[][];
    // #outerMostIntersections: number[][];
    #externalCirclesCenters: coordinate[];
    #outerMostIntersections: coordinate[];
    #gpcLines: GraphicalLine[];
    #name: string;

    constructor (xc: number, yc: number, radius: number,
        color = "black", name = "FiguraComum") {
        this.#gpcInnerCircle = new GraphicalCircle(xc, yc, radius, color);
        this.#name = name;
        this.#externalCirclesCenters = [];
        this.#gpcExternalCircles = [];
        this.#gpcLines = [];
        this.#outerMostIntersections = [];
    }

    draw2 (ctx: CanvasRenderingContext2D) {
        this.drawInnerCircle(ctx);
        this.drawExternalCircles(ctx);
        this.drawLines(ctx);
    }

    drawInnerCircle (ctx: CanvasRenderingContext2D) {
        GraphicalCircle.drawCircleNotOptimized(ctx,
            this.#gpcInnerCircle.getRadius,this.#gpcInnerCircle.getCenter,
            this.#gpcInnerCircle.getColor);
    }

    drawExternalCircles (ctx: CanvasRenderingContext2D) {
        for(let i=0; i<=359;i=i+60) {
            let newCenter: coordinate;
            let xc, yc;

            [xc,yc] = this.computeXAndYInRelationFromInnerCircleCenter(i);
            // newCenter.push(xc);
            // newCenter.push(yc);
            newCenter = [xc,yc];
            this.#externalCirclesCenters.push(newCenter);

            GraphicalCircle.drawCircleNotOptimized(ctx,
                this.#gpcInnerCircle.getRadius,
                [xc,yc],
                this.#gpcInnerCircle.getColor);
        }
    }
    
    drawLines (ctx: CanvasRenderingContext2D) {
        // Draw from center of inner circle to center of external circles
        this.connectInnerCircleCenterToExternalCenters(ctx);

        // Draw from center of one circle to the center of the adjacent circle
        this.connectExternalCenters(ctx);

        // Draw line from inner circle center to the farthest intersections between circles
        this.connectInnerCenterToOuterMostIntersections(ctx);
    }

    connectInnerCircleCenterToExternalCenters (ctx: CanvasRenderingContext2D) {
        for (const center of this.#externalCirclesCenters) {
            GraphicalLine.drawNotOptimized(ctx,
                this.#gpcInnerCircle.getCenterX,
                this.#gpcInnerCircle.getCenterY,
                center[0], center[1], 'blue');
        }
    }

    connectExternalCenters (ctx: CanvasRenderingContext2D) {
        let size = this.#externalCirclesCenters.length;
        for (let i = 0; i < size; i++) {
            let centerA, centerB;
            let next = i + 1;
            if (next >= size) next = next % size;
            centerA = this.#externalCirclesCenters[i];
            centerB = this.#externalCirclesCenters[next];
            GraphicalLine.drawNotOptimized(ctx,
                centerA[0], centerA[1],
                centerB[0], centerB[1],
                'blue');
        }
    }

    connectInnerCenterToOuterMostIntersections(ctx: CanvasRenderingContext2D) {
        this.computeOuterMostIntersections();

        this.#outerMostIntersections.forEach(intersection => {
            GraphicalLine.drawNotOptimized(ctx,
                this.#gpcInnerCircle.getCenterX, this.#gpcInnerCircle.getCenterY,
                intersection[0], intersection[1],
                "blue");
        });
    }

    computeXAndYInRelationFromInnerCircleCenter (angleInDegrees: number): coordinate {
        let alfa, x, y;
        alfa = Circle.degreesToRadians(angleInDegrees);
        x = this.#gpcInnerCircle.getCenterX + this.#gpcInnerCircle.getRadius * Math.cos(alfa);
        y = this.#gpcInnerCircle.getCenterY + this.#gpcInnerCircle.getRadius * Math.sin(alfa);
        return [x,y];
    }

    // FINISH THIS ONE!
    computeOuterMostIntersections () {
        let anglesOfEachIntersectionPoint = [30,90,150,210,270,330];
        let xc: number, yc: number, radius: number;
        [xc, yc] = this.#gpcInnerCircle.getCenter;
        radius = this.#gpcInnerCircle.getRadius;

        anglesOfEachIntersectionPoint.forEach(angle => {
            let x: number, y: number;
            let radians = Circle.degreesToRadians(angle);
            // x = xc + 2 * radius * Math.pow(Math.cos(radians),2);
            // y = yc + 2 * radius * Math.cos(radians) * Math.sin(radians);
            x = xc + ((3/2) * Math.pow(radius,2) * Math.cos(radians));
            y = yc + ((3/2) * Math.pow(radius,2) * Math.sin(radians));
            this.#outerMostIntersections.push([x, y]);
        });
        console.log(radius, this.#outerMostIntersections);
    }
}
