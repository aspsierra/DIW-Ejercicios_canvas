function degradador() {
    var grad = ctx.createLinearGradient(0, 0, 800, 400);
    grad.addColorStop(0, color = "magenta");
    grad.addColorStop(1, color = 'orange');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 800, 600);
    ctx.stroke();
    ctx.fillStyle = "black";
    ctx.rect(0, 0, 800, 600);
    ctx.stroke();

}

function linea(x0, y0, x1, y1) {
    ctx.beginPath();
    ctx.lineWidth = 15;
    ctx.strokeStyle = "cyan";
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke();
}

function circulo(xCenter, yCenter, color) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    //ctx.fillStyle = "";
    ctx.lineWidth = 15;
    ctx.arc(xCenter, yCenter, 90, 0, 2 * Math.PI);
    //ctx.fill();
    ctx.stroke();
}

function circuloRelleno(xCenter, yCenter, color) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 15;
    ctx.arc(xCenter, yCenter, 90, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
}

function rectangulo(x0, y0, x1, y1) {

    ctx.fillStyle = "white";
    ctx.fillRect(x0, y0, x1, y1);
    ctx.stroke();
}

function triangulo(x0, y0, x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.lineWidth = 10;
    ctx.strokeStyle = "blue";
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x0, y0);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
    ctx.stroke()

}

function dibujar(x, y) {

    var img = new Image();
    img.src = "./images/pelota.png";
    ctx.drawImage(img, x, y, 50, 50);
    dibujaPala();
    dibujaTexto();
    if (izqPulsa && palaX > 0 + palaW) {
        palaX -= 7;
    } else if (derPulsa && palaX < canvas.width - palaW) {
        palaX += 7;
    }



}
function choquePala() {
    if ((x1 >= palaX - 50 && x1 <= palaX + palaW + 50) && y1 >= canvas.height - 60) {
        contador++;
        return true;

    }
}

function dibujaBalon() {
    ctx.clearRect(0, 0, 1200, 600);

    x1 += dx1;
    y1 += dy1;

    if (x1 + dx1 < 0 | x1 + dx1 > canvas.width - 50) {
        dx1 *= -1;
    }
    if (y1 + dy1 < 0 | choquePala()) {
        dy1 *= -1.05;
        dx1 *= 1.05;

    } else if (y1 + dy1 > canvas.height - 50) {
        //alert("Fin do xogo");
        //window.close();
    }

    /* x2 += dx2;
     y2 += dy2;*/

    /*if (x2 + dx2 < 0 | x2 + dx2 > canvas.width - 50) {
        dx2 *= -1;
    }
    if (y2 + dy2 < 0 | y2 + dy2 > canvas.height - 50) {
        dy2 *= -1;
    }*/

    /*if (Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)) < 40) {
        dx1 *= -1;
        dy1 *= -1;
        dx2 *= -1;
        dy2 *= -1;
    }*/

    dibujar(x1, y1, dx1, dy1);
    //dibujar(x2, y2, dx2, dy2)
}

function dibujaPala() {
    ctx.beginPath();
    ctx.rect(palaX - 20, canvas.height - 20, palaW, palaH);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
}

function keyDownHandler(e) {
    if (e.keyCode == 39) {
        derPulsa = true;
    } else if (e.keyCode == 37) {
        izqPulsa = true;
    }
    console.log(e.keyCode);
}

function keyUpHandler(e) {
    if (e.keyCode == 39) {
        derPulsa = false;
    } else if (e.keyCode == 37) {
        izqPulsa = false;
    }
}


function dibujaTexto() {
    ctx1.clearRect(0, 0, canvas.width, canvas.height);
    ctx1.fillStyle = 'red';
    ctx1.font = '20px serif';
    ctx.textAlign = 'center';
    ctx1.strokeText('PONG', 600, 30);
    ctx1.textAlign = 'left';
    ctx1.fillText('Aciertos ' + contador, 100, 30);


}
