export class SVGRectDrawer {
    #svgns = "http://www.w3.org/2000/svg";
    #svg;
    constructor (domElement, width, height) { 
        this.#svg = document.createElementNS(this.#svgns, "svg");
        this.#svg.style.border = '1px solid black';
        this.#svg.setAttribute('width', width);
        this.#svg.setAttribute('height', height);

        domElement.appendChild(this.#svg);
    }

    drawRect(x, y, width, height) {
        this.#svg.replaceChildren(); // curata continutul existent

        const rect = document.createElementNS(this.#svgns, 'rect');
        rect.setAttribute('x', x);
        rect.setAttribute('y', y); 
        rect.setAttribute('width', width);
        rect.setAttribute('height', height);
        rect.classList.add('svg-rect');
        this.#svg.appendChild(rect);
    }
}