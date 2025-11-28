export class BarChart {
    #svgns = "http://www.w3.org/2000/svg";
    #svg
    /**
     * Creates a bar chart inside the given DOM element.
     * @param {HTMLElement} domElement 
     */
    constructor(domElement) { 
        // NS - NameSpace permite sa specificam namespaceul in care este definit acel tip de date
        this.#svg = document.createElementNS(this.#svgns, "svg");
        this.#svg.style.border = "1px solid black";
        this.#svg.style.backgroundColor = "whitesmoke";
        this.#svg.style.width = '600px';
        this.#svg.style.height = '400px';

        domElement.appendChild(this.#svg);
    }

    /**
     * @param {Array<object>} data
     */
    draw(data) {
        // Clear previous content
        this.#svg.replaceChildren();

        // Draw the new content
        const width = this.#svg.clientWidth;
        const height = this.#svg.clientHeight;

        const barWidth = width / data.length;
        const maxDataValue = Math.max(...data.map(d => d.value));
        const f = height / maxDataValue;

        for (let i = 0; i < data.length; i++) {
            const barHeight = data[i].value * f * 0.9; // 90% hieght to leave some space at the top
            const barY = height - barHeight;
            const barX = i * barWidth;

            const bar = document.createElementNS(this.#svgns, "rect");
            bar.setAttribute('x', barX + barWidth / 4); // Center the bar in its segment
            bar.setAttribute('y', barY);
            bar.setAttribute('width', barWidth / 2); // 50% width to leave some space between bars
            bar.setAttribute('height', barHeight); 
            // bar.setAttribute('fill', 'steelblue');
            bar.classList.add('bar');

            bar.addEventListener('click', () => {
                alert(`Label: ${data[i].label}\nValoarea barei: ${data[i].value}`);
            });
            this.#svg.appendChild(bar);

            const text = document.createElementNS(this.#svgns, "text");

            text.textContent = data[i].label;
            text.setAttribute('x', barX + barWidth / 2);
            text.setAttribute('y', height - 5);
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('font-size', '12px'); 
            
            this.#svg.appendChild(text);
        }
    }
}