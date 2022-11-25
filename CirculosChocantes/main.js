class circulo {
    constructor(radio, color, x, y) {
        this.radio = radio;
        this.color = color;
        this.x = x;
        this.y = y;
        this.inicio = 0;
        this.fin = 2 * Math.PI;
        this.angulo = 0
        this.incrementoX = 1;
        this.incrementoY = 1;
        this.choque = false
    }
    /**
     * dibujar circulo
     * @param {CanvasRenderingContext2D} context 
     */
    gradiente(context) {
        this.grad = context.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radio)
        for (let i = 0; i < this.color.length; i++) {
            this.grad.addColorStop(i, this.color[i]);
        }
    }

    /**
     * dibujar circulo
     * @param {CanvasRenderingContext2D} context 
     */
    dibujar(context) {
        context.beginPath()
        context.arc(this.x, this.y, this.radio, this.inicio, this.fin);
        context.fillStyle = this.grad;
        context.fill()
        context.closePath()
    }
    mover() {
        this.x += this.incrementoX;
        this.y += this.incrementoY;
    }
    choqueCirculos(circulo) {

        if (this.distancia(circulo) <= circulo.radio + this.radio) {

            this.incrementoX *= -1;
            this.incrementoY *= -1;

        }

    }
    choqueLimite(limites) {
        if ((this.x - this.radio) <= 0 || (this.x + this.radio) >= limites.width) {
            this.incrementoX *= -1;
        }
        if ((this.y - this.radio) <= 0 || (this.y + this.radio) >= limites.height) {
            this.incrementoY *= -1;
        }
    }

    distancia(circulo) {
        return Math.sqrt(Math.pow((circulo.x - this.x), 2) + Math.pow((circulo.y - this.y), 2))
    }
}
/**
 * Bucle
 * @param {Array} circulos 
 * @param {CanvasRenderingContext2D} CTX 
 * @param {HTMLCanvasElement} CANVAS 
 */
function loop(circulos, CTX, CANVAS) {
    CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
    for (const id in circulos) {

        circulos[id].choqueLimite(CANVAS);
        for (let i = 0; i < circulos.length; i++) {
            if (circulos[id] != circulos[i]) {
                circulos[id].choqueCirculos(circulos[i])
            }
        }
        circulos[id].mover();
        circulos[id].gradiente(CTX);
        circulos[id].dibujar(CTX)
    }

}


function main() {
    /**
     * @type {HTMLCanvasElement}
     */
    const CANVAS = document.getElementById("canvas");
    /**
     * @type {CanvasRenderingContext2D}
     */
    const CTX = CANVAS.getContext('2d')

    var arCirculos = new Array();

    /* var circulo1 = new circulo(10, ["red", "green"], 105, 350);
     var circulo2 = new circulo(10, ["red", "yellow"], 300, 650);
     var circulo3 = new circulo(10, ["purple", "blue"], 600, 400);
     var circulo4 = new circulo(10, ["black", "pink"], 500, 50);
     var circulo5 = new circulo(10, ["orange", "purple"], 450, 500);*/

    for (let i = 0; i < 15; i++) {
        posX = Math.floor(Math.random() * (790 - 10) + 10);
        posY = Math.floor(Math.random() * (790 - 10) + 10);
        arCirculos.push(new circulo(10, ["red", "green"], posX, posY));

    }
    for (const id in arCirculos) {
        arCirculos[id].gradiente(CTX);
        arCirculos[id].dibujar(CTX);
    }

    setInterval(loop, 1, arCirculos, CTX, CANVAS);
}

main()