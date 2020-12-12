export type RuleFunction = (value : number, neighbors : number[]) => number;

export function conwayGameOfLife(value : number, neighbors : number[]) : number {
    let aliveNeighbors : number = neighbors.reduce((prev, current) => {
        if (current > 0) {
            prev++;
        }
        return prev;
    }, 0);
    if (value > 0) {
        // cell is alive
        if (aliveNeighbors === 2 || aliveNeighbors === 3) {
            // cell survives
            return value;
        }
    }else{
        // cell is dead
        if (aliveNeighbors === 3) {
            // cell comes back to live
            return 1;
        }
    }
    return 0;
}