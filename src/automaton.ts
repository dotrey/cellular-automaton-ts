import { conwayGameOfLife, RuleFunction } from "./rules.js";
import { mooreNeighborhood, NeighborhoodFunction } from "./neighborhoods.js"
import { CellularAutomatonInterface } from "./cellular-automaton-interface.js";

export class Automaton implements CellularAutomatonInterface {

    private _cells : number[][] = [];
    private _ticks : number = 0;
    private neighborhood : NeighborhoodFunction | null = null;
    private rule : RuleFunction | null = null;

    constructor(private width: number, private height: number) {
        for (let x = 0; x < this.width; x++) {
            this._cells[x] = [];
            this._cells[x].fill(0, 0, this.height);
        }
        this.neighborhood = mooreNeighborhood;
        this.rule = conwayGameOfLife;
    }

    tick() : number{
        if (typeof this.neighborhood !== "function" ||
            typeof this.rule !== "function") {
            return 0;
        }
        let cellsAlive : number = 0;
        let nextGeneration : number[][] = [];
        for (let x = 0; x < this.width; x++) {
            nextGeneration[x] = [];
            for (let y = 0; y < this.width; y++) {
                nextGeneration[x][y] = this.rule(
                    this.cell(x, y), 
                    this.neighborhood(this._cells, x, y, this.width, this.height)
                );
                if (nextGeneration[x][y]) {
                    cellsAlive++;
                }
            }
        }
        this._cells = nextGeneration;
        this._ticks++;
        return cellsAlive;
    }

    get ticks() : number {
        return this.ticks;
    }

    get size() : { w : number, h : number }{
        return {
            w : this.width,
            h : this.height
        };
    }

    set(x : number, y : number, value : number) {
        if (x < 0 || x >= this.width ||
            y < 0 || y >= this.height) {
            return;
        }
        if (typeof this._cells[x] === "undefined") {
            this._cells[x] = [];
        }
        this._cells[x][y] = value;
    }

    get cells() : number[][] {
        return this._cells.map((arr) => {
            return arr.slice();
        });
    }

    setNeighborhoodFunction(f : NeighborhoodFunction) {
        this.neighborhood = f;
    }

    setRuleFunction(f : RuleFunction) {
        this.rule = f;
    }

    cell(x : number, y : number) : number {
        if (x < 0 || x >= this.width ||
            y < 0 || y >= this.height) {
            return 0;
        }
        if (typeof this._cells[x] === "undefined") {
            this._cells[x] = [];
        }
        return this._cells[x][y] || 0;
    }
}