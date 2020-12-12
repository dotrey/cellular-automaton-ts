import { CellularAutomatonInterface } from "./cellular-automaton-interface";

export class Visualizer {
    private canvas : HTMLCanvasElement | null = null;
    private context : CanvasRenderingContext2D | null = null;
    private horizontalCells : number = 0;
    private verticalCells : number = 0;
    public updateInterval : number = 500;

    constructor(private automaton : CellularAutomatonInterface, private cellSize : number) {
        this.horizontalCells = automaton.size.w;
        this.verticalCells = automaton.size.h;
        this.createCanvas();
    }

    private createCanvas() {
        this.canvas = document.createElement("canvas");
        this.canvas.width = this.horizontalCells * this.cellSize;
        this.canvas.height = this.verticalCells * this.cellSize;
        document.body.append(this.canvas);
        this.context = this.canvas.getContext("2d");
    }

    public update() {
        if (!this.automaton) {
            return;
        }
        let alive : boolean = this.updateInterval > 0 && this.advance();
        this.draw();
        if (alive) {
            window.setTimeout(() => {
                this.update();
            }, this.updateInterval);
        }
    }

    public advance() {
        return this.automaton && this.automaton.tick() > 0;
    }

    public draw() {
        if (!this.automaton || !this.context || !this.canvas) {
            return false;
        }
        this.context.fillStyle = "#ffffff";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillStyle = "#000000";
        for (let x : number = 0; x < this.horizontalCells; x++) {
            for (let y : number = 0; y < this.verticalCells; y++) {
                if (this.automaton.cells[x] && this.automaton.cells[x][y]) {
                    this.context.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
                }
            }
        }
    }
}