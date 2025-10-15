export class BarChart { 
    #canvas;
    /**
       @param {HTMLCanvasElement} canvas // the canvas on which the chart will be drawn
     */

    constructor(canvas) {
        this.#canvas = canvas
    }

    // Comentarii JS-Doc
    /**
     * 
     * @param {Array<number>} values // the values that will be represented in the bar chart
     * @param {Object} options // options for drawing on the bar chart
     * @param {boolean} [options.drawOutline] // wheter to draw outline on the bars or not
     */


    draw(values, options) { 
        // OpenGL pentru aplicatii desktop - WebGL pentru web
        const context = this.#canvas.getContext('2d');
        // context.fillStyle = '#DEDEDE';
        // context.fillStyle = 'grey';
        context.fillstyle = rgb(222, 222, 222); //rgba(222, 222, 222, 0.5)

        context.fillRect(0, 0, this.#canvas.width, this.#canvas.height);

        context.fillStyle = rgba(247, 7, 7, 1);
        const barWidth = this.#canvas.width / values.length;
        const maxValue = Math.max(...values);
        // factorul de scalare
        const f = this.#canvas.height / max;

        for (let i = 0; i < values.length; i++) {
            const barX = i * barWidth;
            const barHeight = values[i] * f;
            const barY = this.#canvas.height - barHeight;
            context.fillRect(barX, barY, barWidth, barHeight);
        }

    }

}