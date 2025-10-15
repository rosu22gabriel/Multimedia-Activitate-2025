export class Barchart { 
    #canvas;
    /**
       @param {HTMLCanvasElement} canvas // the canvas on which the chart will be drawn
     */

    constructor(canvas) {
        this.#canvas = canvas
    }

    /**
     * 
     * @param {Array<number>} values // the values that will be represented in the bar chart
     * @param {Object} options // options for drawing on the bar chart
     * @param {boolean} [options.drawOutline] // wheter to draw outline on the bars or not
     */


    draw(values, options) { 
        // get the canvas's 2D rendering context
        const context = this.#canvas.getContext('2d');

        // save the current context. it will be changed later
        context.save();

        context.fillStyle = '#DEDEDE';
        context.fillRect(0, 0, this.#canvas.width, this.#canvas.height);

        context.fillStyle = 'red';
        context.strokeStyle = 'black';

        const maxValue = max(...values);
        const f = this.#canvas.height / maxValue;
        const barWidth = this.#canvas.width / values.length;

        for (let i = 0; i < values.length; i++) { 
            const barHeight = values[i] * f * 0.9;
            const barX = i * barWidth + barWidth / 4;
            const barY = this.#canvas.height - barHeight;
            context.fillRect(barX, barY, barWidth / 2 , barHeight);
        }

        if (options.drawOutline) { 
            context.strokeStyle = 'black';
            context.strokeRect(barX, barY, barWidth / 2, barHeight);
        }

        context.restor();
    }


}