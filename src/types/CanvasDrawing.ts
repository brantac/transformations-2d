import GraphicalPoint from '@/assets/ts/GraphicalPointTS';
import GraphicalLine from '@/assets/ts/GraphicalLineTS';
import GraphicalCircle from '@/assets/ts/GraphicalCircleTS';

interface CanvasDrawing {
    point: GraphicalPoint | null,
    line: GraphicalLine | null,
    circle: GraphicalCircle | null
};

export default CanvasDrawing;