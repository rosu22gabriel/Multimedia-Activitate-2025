export class CanvasReporter { 
    #ctx;
    #canvas;

    constructor(domElement, width, height) { 
        this.#canvas = document.createElement('canvas');
        this.#canvas.setAttribute('width', width);
        this.#canvas.setAttribute('height', height);
        this.#ctx = this.#canvas.getContext('2d');
        domElement.appendChild(this.#canvas);
    }


    drawText(text, font, color){ 
        this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
        this.#ctx.font = font;
        this.#ctx.color = color;
        this.#ctx.textAlign = 'center';

        const centerX = this.#canvas.width / 2;
        const centerY = this.#canvas.height / 2 + 7;
        this.#ctx.fillText(text, centerX, centerY);
    }


}