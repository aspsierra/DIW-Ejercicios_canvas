class Cuadrado {
    constructor(x0, y0, lado, color, sentido) {
        this.x0 = x0;
        this.y0 = y0;
        this.lado = lado;
        this.color = color;
        this.sentido = sentido
        this.incremento = 0.01;
        this.angulo = 0
    }
    /**
     * creo los gradientes para el cuadrado
     * @param {CanvasRenderingContext2D} context 
     */
    gradiente(context, xRel, yRel) {
        if (xRel != null && yRel != null) {
            this.grad = context.createLinearGradient(xRel - this.lado / 2, yRel - this.lado / 2, (xRel + this.lado), (yRel + this.lado))
        } else {
            this.grad = context.createLinearGradient(this.x0 - this.lado / 2, this.y0 - this.lado / 2, (this.x0 + this.lado), (this.y0 + this.lado))

        }
        for (let i = 0; i < this.color.length; i++) {
            this.grad.addColorStop(i, this.color[i]);
        }
    }
    /**
     * dibujo un cuadrado con degradado
     * @param {CanvasRenderingContext2D} context 
     */
    dibujar(context, xRel, yRel) {

        context.beginPath();
        if (xRel != null && yRel != null) {
            context.rect(xRel - (this.lado / 2), yRel - (this.lado / 2), this.lado, this.lado);

        } else {
            context.rect(this.x0 - (this.lado / 2), this.y0 - (this.lado / 2), this.lado, this.lado);
        }
        context.fillStyle = this.grad;
        context.fill();
        context.closePath();
    }
    /**
     * Rotar cuadrados
     * @param {CanvasRenderingContext2D} context 
     */
    girar(context) {
        context.translate(this.x0, this.y0);
        context.rotate(this.angulo);
        this.gradiente(context, 0, 0)
        this.dibujar(context, 0, 0);
        context.rotate(-this.angulo);
        context.translate(-this.x0, -this.y0);
        switch (this.sentido) {
            case 1:
                this.angulo += this.incremento;
                break;
            case -1:
                this.angulo -= this.incremento;
                break;
        }

    }
}
/**
 * girar cuadrados
 * @param {Array} cuadrados 
 * @param {CanvasRenderingContext2D} ctx 
 */
function rotar(cuadrados, ctx) {
    ctx.clearRect(0, 0, 800, 800);
    for (let i = 0; i < cuadrados.length; i++) {
        cuadrados[i].girar(ctx);
    }
}

function main() {
    /**
     * @type {HTMLCanvasElement}
     */
    var CANVAS = document.getElementById("canvas");
    /**
     * @type {CanvasRenderingContext2D}
     */
    var CTX = CANVAS.getContext('2d')
    var cuadrado1 = new Cuadrado(200, 200, 200, ["green", "red"], 1);
    var cuadrado2 = new Cuadrado(400, 500, 200, ["yellow", "white"], -1);
    cuadrado1.gradiente(CTX);
    cuadrado1.dibujar(CTX);

    cuadrado2.gradiente(CTX);
    cuadrado2.dibujar(CTX);

    setInterval(rotar, 1, [cuadrado1, cuadrado2], CTX)
}

main()