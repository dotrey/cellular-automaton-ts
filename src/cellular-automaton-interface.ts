export interface CellularAutomatonInterface {

    /**
     * Sets the value of the cell at a given position.
     * @param x 
     * @param y 
     * @param value
     */
    set(x : number, y : number, value : number) : void;

    /**
     * Advances the state of the automaton by 1 and returns the number of
     * cells alive in the new state.
     */
    tick() : number;

    /**
     * The total number of ticks executed.
     */
    ticks : number;

    /**
     * The grid of the current generation.
     */
    cells : number[][];

    /**
     * The size of the grid.
     */
    size : { w : number, h : number };


}