function dibujarImagen() {
    ctx.clearRect(0, 0, 1000, 1000);
    var img = new Image();
    img.src = "./images/pelota.png";
    ctx.drawImage(img, x, y, 1, 1);
    ctx.translate(canvas.width / 2 + 0.25, canvas.height / 2 + 0.25)
    ctx.scale(1.01, 1.01);
    ctx.rotate(Math.PI / 125);
    ctx.translate(-canvas.width / 2 - 0.25, -canvas.height / 2 - 0.25)
}
/*
function main() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext('2d');
    x = canvas.width / 2;
    y = canvas.height / 2;
    dibujarImagen(ctx, x, y)

}
*/