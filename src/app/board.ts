export class Board {
    width: number;
    height: number;

    constructor(
        width: number,
        height: number
    ) {
        this.width = width;
        this.height = height;
    }

    getWidth() { return this.width; }
    getHeight() { return this.height; }
}
