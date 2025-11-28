export class ImageEditor {
    #visibleCanvas
    #visibleCanvasCtx
    #offscreenCanvas
    #offscreenCanvasCtx
    #effect

    /**
     * Creates a new image editor instance
     * @param {HTMLCanvasElement} visibleCanvas 
     */
    constructor(visibleCanvas){
        this.#visibleCanvas = visibleCanvas;
        this.#visibleCanvasCtx = this.#visibleCanvas.getContext('2d');
        this.#offscreenCanvas = document.createElement('canvas');
        this.#offscreenCanvasCtx = this.#offscreenCanvas.getContext('2d');
    }

    /**
     * Change the current image
     * @param {HTMLImageElement} img 
     */
    changeImage(img){
        // Resize the two canvases
        this.#visibleCanvas.width = this.#offscreenCanvas.width = img.naturalWidth;
        this.#visibleCanvas.height = this.#offscreenCanvas.height = img.naturalHeight;
        // 
        this.#offscreenCanvasCtx.drawImage(img, 0, 0);
        //this.#visibleCanvasCtx.drawImage(this.#offscreenCanvas, 0, 0);
        this.#effect = 'normal';
        this.#drawImage();
    }

    /**
     * Changes the current effect
     * @param {string} effect 
     */
    changeEffect(effect){
        if(effect != this.#effect){
            this.#effect = effect;
            this.#drawImage();
        }
    }

    saveImage() { 
        const link = document.createElement('a');
        link.download = 'edited-image.png';
        link.hre = this.#visibleCanvas.toDataURL('image/jpeg', 1.0);
        link.click();
    }

    #drawImage(){
        // this.#visibleCanvasCtx.drawImage(this.#offscreenCanvas, 0, 0);
        switch(this.#effect){ 
            case 'normal':
                this.#normal();
                break;
            case 'grayscale': 
                this.#grayscale();
                break;
            case 'sepia':
                this.#sepia();
                break
            case 'threshold':
                this.#threshold(128);
                break
        }   
    }

    #normal() { 
        this.#visibleCanvasCtx.drawImage(this.#offscreenCanvas, 0, 0);
    }

    #grayscale() { 
        const imageData = this.#offscreenCanvasCtx.getImageData(0, 0, this.#offscreenCanvas.width, this.#offscreenCanvas.height);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            // pentru lucrare media aritmetica
            const gray = 0.299 * r + 0.587 * g + 0.114 * b; 
            data[i] = data[i + 1] = data[i + 2] = gray;
            // r = g = b = gray - nu functioneaza pentru ca vrem sa schimbam valorile elem din array
            // r, g, b sunt declarate pe stiva functiei, la nivelul buclei for
        } 
        this.#visibleCanvasCtx.putImageData(imageData, 0, 0);
    }

    #sepia() {
        const imageData = this.#offscreenCanvasCtx.getImageData(0,0,this.#offscreenCanvas.width, this.#offscreenCanvas.height);

        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {

            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            data[i]     = Math.min(255, Math.round((r * 0.393) + (g * 0.769) + (b * 0.189)));
            data[i + 1] = Math.min(255, Math.round((r * 0.349) + (g * 0.686) + (b * 0.168)));
            data[i + 2] = Math.min(255, Math.round((r * 0.272) + (g * 0.534) + (b * 0.131)));
        }
        this.#visibleCanvasCtx.putImageData(imageData, 0, 0);
    }

    #threshold() {
        const imageData = this.#offscreenCanvasCtx.getImageData(0, 0, this.#offscreenCanvas.width,this.#offscreenCanvas.height);

        const data = imageData.data;
        const threshold = 128;
        for (let i = 0; i < data.length; i += 4) {

            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const gray = 0.299 * r + 0.587 * g + 0.114 *b;
            const value = gray >= threshold ? 255 : 0;
            data[i]     = value;
            data[i + 1] = value;
            data[i + 2] = value;
        }

        this.#visibleCanvasCtx.putImageData(imageData, 0, 0);
    }

    //https://github.com/liviucotfas/ase-multimedia/blob/master/Labs/03.%20Graphics.2D%20-%20Raster/code-examples/canvas-image-editor/image-editor.js 
}