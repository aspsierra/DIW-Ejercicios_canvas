/**
 * Función para dibujar todos los círculos
 * @param {Object} data 
 * @param {CanvasRenderingContext2D} ctx 
 */
function circulo(data, ctx) {
    ctx.beginPath()
    ctx.strokeStyle = data.color;
    ctx.fillStyle = data.color;
    ctx.lineWidth = 2;
    ctx.arc(data.x0, data.y0, data.radio, 0, data.fin);
    if (data.fin == 2 * Math.PI) {
        ctx.fill();
    }
    ctx.stroke();
}

/**
 * Función para dibujar todas las líneas
 * @param {Object} data 
 * @param {CanvasRenderingContext2D} ctx 
 */
function linea(data, ctx) {
    ctx.beginPath()
    ctx.lineWidth = 5;
    ctx.strokeStyle = "white";
    ctx.moveTo(data.x0, data.y0);
    ctx.lineTo(data.x1, data.y1);
    ctx.stroke()
}

/**
 * Dibujar el monigote
 * @param {Object} data 
 * @param {CanvasRenderingContext2D} ctx 
 * @param {HTMLCanvasElement} canvas 
 */
function dibujaTio(data, ctx, canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    //cabeza
    circulo(data.cabeza, ctx);
    //sonrisa
    circulo(data.sonrisa, ctx);
    //ojo derecho
    circulo(data.ojoDer, ctx);
    //ojo izquierdo
    circulo(data.ojoIzq, ctx);
    //cuerpo
    linea(data.cuerpo, ctx);
    //brazo derecho
    linea(data.brazoDer, ctx);
    //brazo izq
    linea(data.brazoIzq, ctx);
    //pierna der
    linea(data.piernaDer, ctx);
    //pierna izq
    linea(data.piernaIzq, ctx);
}

/**
 * Brazos arriba
 * @param {object} data 
 * @returns {object}
 */
function salta(data) {
    data.sonrisa.fin *= 2;
    data.sonrisa.y0 += 10;
    data.sonrisa.radio = 10;
    data.brazoDer.y1 -= 60;
    data.brazoIzq.y1 -= 60;
    return data;
}

/**
 * Brazos abajo
 * @param {object} data 
 * @returns {object}
 */
function resetSalta(data) {
    pulsado = false;
    data.sonrisa.fin /= 2;
    data.sonrisa.y0 -= 10;
    data.sonrisa.radio = 20;
    data.brazoDer.y1 += 60;
    data.brazoIzq.y1 += 60;
    return data;
}

/**
 * función del intervalo, dibuja al monigote automáticamete
 * @param {object} data 
 * @param {CanvasRenderingContext2D} ctx 
 * @param {HTMLCanvasElement} canvas 
 */
function saltoContinuo(data, ctx, canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    if (!data.salto) {
        data.salto = true;
        data = salta(data);
        dibujaTio(data, ctx, canvas);
    } else {
        data.salto = false;
        data = resetSalta(data);
        dibujaTio(data, ctx, canvas);
    }

}

/**
 * Función principal
 */
function main() {
    /**
     * @type {HTMLCanvasElement}
     */
    const CANVAS = document.getElementById("canvas");
    /**
     * @type {CanvasRenderingContext2D}
     */
    const CTX = CANVAS.getContext("2d");

    /**
     * datos y coordenadas para dibujar el monigote 
     * @type {Object}
     */
    var data = {
        cabeza: {
            x0: 100,
            y0: 50,
            color: "white",
            radio: 30,
            fin: 2 * Math.PI
        },
        sonrisa: {
            x0: 100,
            y0: 50,
            color: "red",
            radio: 20,
            fin: Math.PI
        },
        ojoDer: {
            x0: 110,
            y0: 45,
            color: "red",
            radio: 3,
            fin: 2 * Math.PI
        },
        ojoIzq: {
            x0: 90,
            y0: 45,
            color: "red",
            radio: 3,
            fin: 2 * Math.PI
        },
        cuerpo: {
            x0: 100,
            y0: 80,
            x1: 100,
            y1: 200,
        },
        brazoDer: {
            x0: 100,
            y0: 100,
            x1: 50,
            y1: 130,
        },
        brazoIzq: {
            x0: 100,
            y0: 100,
            x1: 150,
            y1: 130,
        },
        piernaDer: {
            x0: 100,
            y0: 200,
            x1: 50,
            y1: 250,
        },
        piernaIzq: {
            x0: 100,
            y0: 200,
            x1: 150,
            y1: 250,
        },
        salto: false,
        interval: null,
    };

    var pulsado = false;
    dibujaTio(data, CTX, CANVAS);
    document.addEventListener("keydown", evt => {
        //salto único
        if (evt.code == 'Space' & !pulsado) {
            pulsado = true;
            data = salta(data);
            dibujaTio(data, CTX, CANVAS);

        } else if (evt.code == 'Space' & pulsado) {
            //Parar salto
            pulsado = false;
            data = resetSalta(data)
            dibujaTio(data, CTX, CANVAS);
        };

        //salto continuo
        if (evt.altKey) {
            if (data.interval == null && (evt.key == 'c' || evt.key == 'C')) {
                data.interval = setInterval(saltoContinuo, 500, data, CTX, CANVAS);
            }
        }
        //reset del salto
        if (evt.altKey) {
            if (data.interval != null && (evt.key == 's' || evt.key == 'S')) {
                clearInterval(data.interval);
                data.interval = null;
            }
        }
    })
}

main()