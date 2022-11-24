class circulo {
    constructor(radio, color, x, y) {
        this.radio = radio;
        this.color = color;
        this.x = x;
        this.y = y;
        this.inicio = 0;
        this.fin = 2 * Math.PI;
        this.angulo = 0
        this.incremento = 0.1;
    }
    /**
     * dibujar circulo
     * @param {CanvasRenderingContext2D} context 
     */
    gradiente(context) {
        var grad = context.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radio)
        grad.addColorStop(0, "white");
        grad.addColorStop(1, "red");
        /*context.fillStyle = grad;
        context.fill()*/
        this.dibujar(context, grad)
    }

    /**
     * dibujar circulo
     * @param {CanvasRenderingContext2D} context 
     */
    dibujar(context, relleno) {
        context.beginPath()
        context.strokeStyle = this.color;

        context.lineWidth = 2;
        context.arc(this.x, this.y, this.radio, this.inicio, this.fin);
        context.stroke();
        if (relleno) {
            context.fillStyle = relleno;
            context.fill()
        }
        context.closePath()
    }

    mover(dist, xExt, yExt) {
        this.sen = Math.sin(this.angulo) * dist;
        this.cos = Math.cos(this.angulo) * dist;
        this.x = xExt + this.cos;
        this.y = yExt + this.sen;
        this.angulo += this.incremento;
    }
    /**
         * dibujar circulo
         * @param {CanvasRenderingContext2D} context 
         */
    dibujaLinea(x1, y1, context) {
        context.beginPath()
        context.lineWidth = 1;
        context.strokeStyle = this.color;
        context.moveTo(this.x, this.y);
        context.lineTo(this.x + this.cos, this.y + this.sen);
        context.stroke()
        context.closePath();

    }
}
/**
 * 
 * @param {circulo} int 
 * @param {*} angulo 
 * @param {*} hip 
 * @param {CanvasRenderingContext2D} ctx 
 */
function loop(int, ext, intInt, ext1, hip, hipInt, hipExt1, ctx) {
    ctx.clearRect(0, 0, 800, 800);

    int.mover(hip, ext.x, ext.y);
    intInt.mover(hipInt, int.x, int.y)
    ext1.mover(hipExt1, ext.x, ext.y)

    ext.dibujar(ctx);
    int.dibujar(ctx);
    int.dibujaLinea(ext.x, ext.y, ctx)
    intInt.dibujar(ctx);
    intInt.dibujaLinea(ext.x, ext.y, ctx)
    ext1.dibujar(ctx);
    ext1.dibujaLinea(ext.x, ext.y, ctx)

}

/**
 * eventos asociados
 * @param {circulo} ext 
 * @param {circulo} int 
 * @param {circulo} intInt
 */
function eventos(ext, int1, int2, ext1, ctx) {
    var pulsado = false;
    var interv = null;
    hip = ext.radio - int1.radio;
    hipInt = int1.radio - int2.radio;
    hipExt1 = ext1.radio + ext.radio;
    document.addEventListener("keydown", evt => {
        switch (evt.key) {
            case " ":
                if (!pulsado) {
                    pulsado = true;
                    interv = setInterval(loop, 10, int1, ext, int2, ext1, hip, hipInt, hipExt1, ctx)
                } else {
                    pulsado = false;
                    clearInterval(interv);
                }
                break;
            case "1":
                int1.incremento = 0.01;
                break;
            case "2":
                int1.incremento = 0.05;
                break;
            case "3":
                int1.incremento = 0.1;
                break;
            case "4":
                int1.incremento = 0.15;
                break;
            case "9":
                int1.incremento *= -1;
                break;
        }
    })
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
    var circuloExt = new circulo(250, "blue", CANVAS.width / 2, CANVAS.height / 2);
    var circuloInt1 = new circulo(120, "red", circuloExt.x + circuloExt.radio - 120, CANVAS.height / 2);
    var circuloInt2 = new circulo(80, "green", circuloInt1.x + circuloInt1.radio - 80, CANVAS.height / 2);
    var circuloExt1 = new circulo(20, "purple", circuloExt.x + circuloExt.radio + 20, CANVAS.height / 2);
    circuloExt1.incremento = 0.015

    circuloExt.dibujar(CTX);

    circuloInt1.dibujar(CTX);
    circuloInt1.dibujaLinea(circuloExt.x, circuloExt.y, CTX)
    circuloInt2.dibujar(CTX);
    circuloInt2.dibujaLinea(circuloInt1.x, circuloInt1.y, CTX);
    circuloExt1.dibujar(CTX);
    circuloExt1.dibujaLinea(circuloInt2.x, circuloInt2.y, CTX);


    eventos(circuloExt, circuloInt1, circuloInt2, circuloExt1, CTX);
}

main()