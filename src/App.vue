<template>
  <h1>2D Transformations</h1>
  <!-- MenuButtons -->
  <h3>Figuras</h3>
  <p>Defina uma figura</p>
  <div class="btn-group">
    <button @click="draw('point')">Ponto</button>
    <button @click="draw('line')">Reta</button>
    <button @click="draw('circle')">Círculo</button>
  </div>

  <h3>Transformações</h3>
  <p>1. Clique no canvas para definir um ponto de referência</p>
  <p>2. Após escolher uma figura, clique nos botões abaixo para aplicar as transformações.</p>
  <p>3. O ponto de referência será: a) o ponto para onde as figuras serão transladadas; b)
    o ponto de referência para as rotações e escalas.</p>
  <div class="btn-group">
    <button @click="translate"
      :disabled="isTransformButtonDisabled">Translação</button>
    <button @click="scale"
      :disabled="isTransformButtonDisabled">Escala</button>
    <button @click="rotate"
      :disabled="isTransformButtonDisabled">Rotação</button>
  </div>
  <!-- / MenuButtons -->

  <!-- Input values -->
  <div v-if="transformationType === 'translation'">
    <h5>Translação</h5>
  </div>
  <div v-else-if="transformationType === 'scale'">
    <h5>Escala</h5>
    <!-- scale input -->
    <div class="input-group">
      <label for="sx">sx:</label>
      <input v-model.number="sx" type="text" id="sx" name="sx">
      <label for="sy">sy: </label>
      <input v-model.number="sy" type="text" id="sy" name="sy">
    </div>
    <!-- /scale input -->
  </div>
  <div v-else-if="transformationType === 'rotation'">
    <h5>Rotação</h5>
    <p>Clique dentro do canvas para rotacionar a figura</p>
    <!-- rotation input -->
    <label for="angle">Angulo de rotação (em graus):</label>
    <input v-model.number="rotationAngle" type="text" id="angle" name="angle">
    <!-- /rotation input -->
  </div>
  <!-- /Input values -->

  <br>

  <!-- Canvas -->
  <canvas ref="canvas" width="400" height="400"
    @click="setNewReferencePoint"></canvas>
  <!-- /Canvas -->
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import GraphicalPoint from '@/assets/ts/GraphicalPointTS';
import GraphicalLine from '@/assets/ts/GraphicalLineTS';
import GraphicalCircle from '@/assets/ts/GraphicalCircleTS';
import Transformation2D from '@/assets/ts/Transformation2D';
import Primitive from '@/types/Primitive';
import Transformation from '@/types/Transformation';
import Point from './assets/ts/PointTS';

// TODO:
// 1. Continuar a partir do método 'transform'
export default defineComponent({
  name: 'App',
  components: {},
  setup() {
    const drawingMode = ref<Primitive>();
    const transformationType = ref('');
    const point = ref<GraphicalPoint>();
    const line = ref<GraphicalLine>();
    const circle = ref<GraphicalCircle>();
    const newMouseX = ref<number>(0);
    const newMouseY = ref<number>(0);
    const canvasMiddleX = ref(0);
    const canvasMiddleY = ref(0);
    const canvas = ref();
    const transformationErrorMessage = ref('');
    const sx = ref(1), sy = ref(1);
    const rotationAngle = ref(0);
    const referencePoint = ref<Point>();

    return { drawingMode, transformationType,
    newMouseX, newMouseY, canvasMiddleX, canvasMiddleY, canvas,
    point, line, circle, transformationErrorMessage, sx, sy,
    rotationAngle, referencePoint };
  },
  methods: {
    setDrawingMode (mode: Primitive): void {
      this.drawingMode = mode;
    },
    setTransformationType (transformation: Transformation): void {
      this.transformationType = transformation;
    },
    setNewReferencePoint (event: any): void {
      if (this.referencePoint) {
        this.referencePoint.setX = event.offsetX;
        this.referencePoint.setY = event.offsetY;
        console.log(this.referencePoint.x, this.referencePoint.y);
      }
    },
    translate (): void {
      if (this.transformationErrorMessage.length > 0) this.transformationErrorMessage = "";
      this.setTransformationType('translation');

      switch (this.drawingMode) {
        case 'point':
          if (this.point !== undefined) {
            this.point.erase(this.canvas.getContext("2d"), "white");
            this.translatePoint(this.point);
            this.point.draw(this.canvas.getContext("2d"));
          }
          break;
        case 'line':
          if (this.line !== undefined) {
            this.line.erase(this.canvas.getContext("2d"), "white");
            this.translateLine();
            this.line.draw(this.canvas.getContext("2d"));
          }
          break;
        case 'circle':
          if (this.circle !== undefined) {
            this.circle.erase(this.canvas.getContext("2d"), "white");
            this.translateCircle();
            this.circle.draw(this.canvas.getContext("2d"));
          }
          break;
      
        default:
          break;
      }
    },
    scale (e: any): void {
      if (this.transformationErrorMessage.length > 0) this.transformationErrorMessage = "";
      this.setTransformationType('scale');
      let scaleX: number = this.sx, scaleY: number = this.sy;

      switch (this.drawingMode) {
        case 'point':
          if (this.point !== undefined) {
            this.point.erase(this.canvas.getContext("2d"), "white");
            this.scalePoint(this.point, scaleX, scaleY);
            this.point.draw(this.canvas.getContext("2d"));
          }
          break;
        case 'line':
          if (this.line !== undefined) {
            this.line.erase(this.canvas.getContext("2d"), "white");
            this.scaleLine(scaleX, scaleY);
            this.line.draw(this.canvas.getContext("2d"));
          }
          break;
        case 'circle':
          if (this.circle !== undefined) {
            this.circle.erase(this.canvas.getContext("2d"), "white");
            this.scaleCircle(scaleX, scaleY);
            this.circle.draw(this.canvas.getContext("2d"));
          }
          break;
      
        default:
          break;
      }
    },
    rotate (e: any): void {
      if (this.transformationErrorMessage.length > 0) this.transformationErrorMessage = "";
      let angle: number = this.rotationAngle;
      this.setTransformationType('rotation');

      switch (this.drawingMode) {
        case 'point':
          if (this.point !== undefined) {
            this.point.erase(this.canvas.getContext("2d"), "white");
            this.rotatePoint(this.point, angle);
            this.point.draw(this.canvas.getContext("2d"));
          }
          break;
        case 'line':
          if (this.line !== undefined) {
            this.line.erase(this.canvas.getContext("2d"), "white");
            this.rotateLine(angle);
            this.line.draw(this.canvas.getContext("2d"));
          }
          break;
        case 'circle':
          if (this.circle !== undefined) {
            this.circle.erase(this.canvas.getContext("2d"), "white");
            this.rotateCircle(angle);
            this.circle.draw(this.canvas.getContext("2d"));
          }
          break;
      
        default:
          break;
      }
    },
    draw (primitive: Primitive): void {
      switch (primitive) {
        case 'point':
          this.drawPoint();
          this.drawingMode = primitive;
          break;

        case 'line':
          this.drawLine();
          this.drawingMode = primitive;
          break;
        
        case 'circle':
          this.drawCircle ()
          this.drawingMode = primitive;
          break;
      
        default:
          break;
      }
    },
    drawPoint (): void {
      if (this.point === undefined) {
        this.point = new GraphicalPoint(this.canvasMiddleX, this.canvasMiddleY, 'red');
        this.point.draw(this.canvas.getContext('2d'));
      }
    },
    drawLine (): void {
      if (this.line === undefined) {
        this.line = new GraphicalLine(50, 300, 300, 200, "line", "green");
        this.line.draw(this.canvas.getContext('2d'));
      }
    },
    drawCircle (): void {
      if (this.circle === undefined) {
        this.circle = new GraphicalCircle(this.canvasMiddleX, this.canvasMiddleY, 100, "blue");
        this.circle.draw(this.canvas.getContext('2d'));
      }
    },
    translatePoint (point: Point): any {
      let tx: number, ty: number, t: Transformation2D;
      if (point !== undefined && this.referencePoint !== undefined) {
        tx = this.referencePoint.x - point.getX;
        ty = this.referencePoint.y - point.getY;
        t = new Transformation2D(point).translate(tx, ty);
        return {tx: tx, ty: ty};
      }
    },
    translateLine (): void {
      if (this.line !== undefined) {
        let t: Transformation2D;
        let {tx, ty} = this.translatePoint(this.line.getP1);
        t = new Transformation2D(this.line.getP2).translate(tx, ty);
      }
    },
    translateCircle (): void {
      if (this.circle !== undefined) {
        this.translatePoint(this.circle.center);
      }
    },
    scalePoint (point: Point, sx: number = 1.2, sy: number = 1.2): void {
      let t: Transformation2D;
      if (point !== undefined && this.referencePoint !== undefined) {
        // t = new Transformation2D(point).scale(sx,sy);
        t = new Transformation2D(point).scale(sx,sy,
          this.referencePoint.x, this.referencePoint.y);
      }
    },
    scaleLine (sx: number = 1.2, sy: number = 1.2): void {
      if (this.line !== undefined) {
        this.scalePoint(this.line.getP1, sx, sy);
        this.scalePoint(this.line.getP2, sx, sy);
      }
    },
    scaleCircle (sx: number = 1.2, sy: number = 1.2): void {
      if (this.circle !== undefined) {
        this.scalePoint(this.circle.center, sx, sy);
        this.circle.setRadius = this.circle.radius * sx;
      }
    },
    rotatePoint (point: Point, angle: number): void {
      if (point !== undefined) {
        let t = new Transformation2D(point).rotate(angle);
      }
    },
    rotateLine (angle: number): void {
      if (this.line !== undefined && this.referencePoint !== undefined) {
        let t = new Transformation2D(this.line.getP1);
        t.rotate(angle, this.referencePoint.x, this.referencePoint.y)
          .setPoint(this.line.getP2)
          .rotate(angle, this.referencePoint.x, this.referencePoint.y);
      }
    },
    rotateCircle (angle: number): void {
      if (this.circle !== undefined && this.referencePoint !== undefined) {
        let t = new Transformation2D(this.circle.center)
          .rotate(angle, this.referencePoint.x, this.referencePoint.y);
      }
    },
  },
  mounted () {
    this.canvasMiddleX = Math.round(this.canvas.width / 2);
    this.canvasMiddleY = Math.round(this.canvas.height / 2);
    this.referencePoint = new Point(this.canvasMiddleX, this.canvasMiddleY);
  },
  computed: {
    isTransformButtonDisabled (): boolean {
      return this.drawingMode !== undefined ? this.drawingMode.length < 0 : true;
    }
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
canvas {
  border: 1px grey solid;
}
</style>
