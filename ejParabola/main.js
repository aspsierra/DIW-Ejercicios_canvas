class circulo {
    constructor(x, y, radio) {
        this.x = x;
        this.y = y;
        this.radio = radio;
        this.inicio = 0;
        this.fin = 2 * Math.PI;
        this.angulo = Math.PI / 4;
        this.color = "green";
        this.x0 = 400;
        this.y0 = 100;
    }
    dibujar(context) {
        context.beginPath()
        context.strokeStyle = this.color;
        context.lineWidth = 2;
        context.arc(this.x, this.y, this.radio, this.inicio, this.fin);
        context.stroke();
        context.fillStyle = this.color;;
        context.fill()
        context.closePath()
    }

    trayectoria() {
        this.y0 = Math.pow(this.x0, 2)
        this.x += this.x0;
        this.y -= this.y0;
        this.x0 += 0.1;
    }
}

/**
 * @param {misil} data 
 * @param {CanvasRenderingContext2D} CTX 
 */
function disparo(data, CTX) {
    data.trayectoria();
    data.dibujar(CTX);
}

function main() {
    /**
     * canvas principal
     * @type {HTMLCanvasElement}
     */
    const CANVAS = document.getElementById("canvas");
    /**
     * @type {CanvasRenderingContext2D}
     */
    const CTX = CANVAS.getContext("2d");

    /**
     * @type {misil}
     */
    var misil = new circulo(100, CANVAS.height - 100, 10);

    misil.dibujar(CTX);

    document.addEventListener("keydown", evt => {
        var interv = null;
        switch (evt.key) {
            case " ":
                interv = setInterval(disparo, 10, misil, CTX)
                break;
        }
    })
}

main()