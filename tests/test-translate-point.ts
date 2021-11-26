import Transformation2D from "@/assets/ts/Transformation2D";
import Point from "@/assets/ts/PointTS";


export default function testTranslation() {
    // Exemplo 1: coordinate [3,2] + translation [2,2]
    // Resultado: [5,4]
    let p1 = new Point(3,2);
    let t1 = new Transformation2D(p1);
    t1.translate(2,2);
    // console.log(t1.getPoint.getX, t1.getPoint.getY);
    // Exemplo 2: coordinate [-5,-3] + translation [5,5]
    // Resultado: [0,2]
    p1.setX = -5;
    p1.setY = -3;
    t1.translate(5,5).translate(-5,-5).translate(0,0);
    console.log(t1.getPoint.getX, t1.getPoint.getY);
    
}