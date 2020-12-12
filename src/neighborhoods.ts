export type NeighborhoodFunction = (cells : number[][], x : number, y : number, w : number, h : number) => number[];

/**
 * Returns a list of cell values in the following order, where S is the cell at given x/y:
 *  1 2 3
 *  8 S 4
 *  7 6 5
 * @param cells 
 * @param x 
 * @param y 
 * @param width
 * @param height
 */
export function mooreNeighborhood(cells : number[][], x : number, y : number, width : number, height : number) : number[]{
    let left : number = (x - 1 + width) % width;
    let right : number = (x + 1) % width;
    let up : number = (y - 1 + height) % height;
    let down : number = (y + 1) % height;
    
    return [
        cells[left] ? cells[left][up] || 0 : 0,
        cells[x] ? cells[x][up] || 0 : 0,
        cells[right] ? cells[right][up] || 0 : 0,
        cells[right] ? cells[right][y] || 0 : 0,
        cells[right] ? cells[right][down] || 0 : 0,
        cells[x] ? cells[x][down] || 0 : 0,
        cells[left] ? cells[left][down] || 0 : 0,
        cells[left] ? cells[left][y] || 0 : 0
    ];
}

/**
 * Returns a list of cell values in the following order, where S is the cell at given x/y:
 *  . 1 .
 *  4 S 2
 *  . 3 .
 * @param cells 
 * @param x 
 * @param y 
 * @param width
 * @param height
 */
export function neumannNeighborhood(cells : number[][], x : number, y : number, width : number, height : number) : number[]{
    let left : number = (x - 1 + width) % width;
    let right : number = (x + 1) % width;
    let up : number = (y - 1 + height) % height;
    let down : number = (y + 1) % height;
    
    return [
        cells[x] ? cells[x][up] || 0 : 0,
        cells[right] ? cells[right][y] || 0 : 0,
        cells[x] ? cells[x][down] || 0 : 0,
        cells[left] ? cells[left][y] || 0 : 0
    ];
}