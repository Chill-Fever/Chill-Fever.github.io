var movimientoX = 0;
var movimientoY = 0;
var velocidadesX;
var velocidadesY;
var anchoCuadrado = 50;
var altoCuadrado = 50;
var anchoPuntos = 15;
var altoPuntos = 15;
var tecla;
var aceleracionInicial = 10;
var aceleracion = aceleracionInicial;
var posicionAleatoriaX;
var posicionAleatoriaY;
var posicionAleatoriaX2;
var posicionAleatoriaY2;
var puntuacion = 1;
var velocidadProyectil = 5;
var velocidadProyectilAumentada = velocidadProyectil;
var proyectilX;
var proyectilY;
var colorCuadrado = "160,20,20";
var banderaVelocidad = true;
var velocidadLenta = 2
var texto= 1

document.onkeydown = function(e) {
    tecla = e.key;
 }
 document.onkeyup = function(e) {
     tecla = false;
  }
function empezarJuego(){    
    dibujarPunto()
    dibujarProyectil()
    dibujarCongelar()
    setInterval(Actualizar, 20);
    setInterval(dibujarCongelar, 30000);    

}
function Actualizar(){
    if (colisionProyectil()){        
        gameOver()
    }else{
        velocidadesX = 0;
        velocidadesY = 0;
        Actualizarvelocidad()
        controles();
        limpiar();        
        nuevaPosicion();
        colisionPuntos();
        colisionProyectil();
        colisionCongelar()        
        puntaje()
        aumentarDificultad()

    }
    
}
function limpiar(){            
    var canvas = document.getElementById("myCanvas")
    var context = canvas.getContext("2d")
    context.clearRect(0, 0, canvas.width, canvas.height)
}
function puntaje(){
    var canvas = document.getElementById("myCanvas")
    var context = canvas.getContext("2d")
    context.fillStyle = "rgb(0,0,0)"
    context.font = "20px arial";
    context.textBaseline = "middle";
    context.textAlign = "center";
    context.fillText("Puntos: "+puntuacion, 100, 30); 
}
function dibujarCongelar() {
    var canvas = document.getElementById("myCanvas")
    posicionAleatoriaX2 = NumAleatorio(canvas.width-anchoPuntos, 100) ;
    posicionAleatoriaY2 = NumAleatorio (canvas.height-altoPuntos, 0) ;        
}
function ReiniciarVelocidad (){
    banderaVelocidad = true;
}
function Actualizarvelocidad (){
    if (banderaVelocidad){
        velocidadProyectil = velocidadProyectilAumentada;
    }else{
        velocidadProyectil = velocidadLenta;
        velocidadProyectilAumentada = 10;
    }
}
function dibujarPunto() {
    var canvas = document.getElementById("myCanvas")
    posicionAleatoriaX = NumAleatorio(canvas.width-anchoPuntos, 100) ;
    posicionAleatoriaY = NumAleatorio (canvas.height-altoPuntos, 0) ;
}
function NumAleatorio(maximo, minimo){
    var x = Math.floor((Math.random() * ((maximo+1)-minimo))+minimo);
    return x;
}
function nuevaPosicion(){
    var canvas = document.getElementById("myCanvas")
    var context = canvas.getContext("2d")    
    movimientoX+=velocidadesX      
    movimientoY+=velocidadesY
    if(movimientoX>-1&&movimientoX<canvas.width-anchoCuadrado&&movimientoY>-1&&movimientoY<canvas.height-altoCuadrado){
        context.fillStyle = "rgb("+colorCuadrado+")"
        context.fillRect(movimientoX, movimientoY, anchoCuadrado, altoCuadrado)
    }else{
        if(movimientoX<0){
            movimientoX=0
            context.fillStyle = "rgb("+colorCuadrado+")"
            context.fillRect(movimientoX, movimientoY, anchoCuadrado, altoCuadrado)
        }
        if(movimientoX>=canvas.width-anchoCuadrado){
            movimientoX=canvas.width-anchoCuadrado-1
            context.fillStyle = "rgb("+colorCuadrado+")"
            context.fillRect(movimientoX, movimientoY, anchoCuadrado, altoCuadrado)
        }
        if(movimientoY<0){
            movimientoY=0
            context.fillStyle = "rgb("+colorCuadrado+")"
            context.fillRect(movimientoX, movimientoY, anchoCuadrado, altoCuadrado)
        }
        if(movimientoY>=canvas.height-altoCuadrado){
            movimientoY=canvas.height-anchoCuadrado-1
            context.fillStyle = "rgb("+colorCuadrado+")"
            context.fillRect(movimientoX, movimientoY, anchoCuadrado, altoCuadrado)
        }
        aceleracion= aceleracionInicial        
        context.fillStyle = "rgb("+colorCuadrado+")"
        context.fillRect(movimientoX, movimientoY, anchoCuadrado, altoCuadrado)
    } 
    context.fillStyle = "rgb(10,200,10)"
    context.fillRect(posicionAleatoriaX, posicionAleatoriaY, anchoPuntos, altoPuntos)        

    context.fillStyle = "rgb(10,10,200)"    
    context.fillRect(proyectilX,proyectilY, 10, 10)
    proyectilX+=velocidadProyectil

    context.fillStyle = "rgb(10,150,120)"
    context.fillRect(posicionAleatoriaX2, posicionAleatoriaY2, anchoPuntos, altoPuntos)   
    
    
   
}
function colisionPuntos(){
    var canvas = document.getElementById("myCanvas")
    var context = canvas.getContext("2d")
    if(colision(posicionAleatoriaX, posicionAleatoriaY, anchoPuntos, altoPuntos)){
        fillStyle = "rgb("+colorCuadrado+")"
        context.fillRect(posicionAleatoriaX, posicionAleatoriaY, anchoPuntos, altoPuntos)
        dibujarPunto()
        puntuacion += 10;
        velocidadProyectilAumentada *= 1.1;
        velocidadesX *= 1.1
        velocidadesY *= 1.1
    }
}
function colisionCongelar(){
    var canvas = document.getElementById("myCanvas")
    var context = canvas.getContext("2d")
    if(colision(posicionAleatoriaX2, posicionAleatoriaY2, anchoPuntos, altoPuntos)){
        fillStyle = "rgb("+colorCuadrado+")"
        context.fillRect(posicionAleatoriaX2, posicionAleatoriaY2, anchoPuntos, altoPuntos)        
        puntuacion += 15;
        posicionAleatoriaX2 = -30;
        posicionAleatoriaY2 = -30;
        banderaVelocidad = false;
        setInterval(ReiniciarVelocidad, 5000);

    }
}
function aumentarDificultad(){
    var dificultad = Math.floor(puntuacion/10)

    switch (dificultad) {
        case 5:
            texto = 2
            velocidadProyectil *= 1.05
            aceleracion *= 1.025    
            break;
        case 10:
            texto = 3
            velocidadProyectil *= 1.05
            aceleracion *= 1.025    
            break;
        case 15:
            texto = 3
            velocidadProyectil *= 1.05
            aceleracion *= 1.025    
            break; 
        case 20:
            texto = 4
            velocidadProyectil *= 1.05
            aceleracion *= 1.025    
            break;    
        case 25:
            texto = 5
            velocidadProyectil *= 1.05
            aceleracion *= 1.025    
            break;     
        case 30:
            texto = 6
            velocidadProyectil *= 1.05
            aceleracion *= 1.025    
            break;         
        default:
            break;
    }
    var canvas = document.getElementById("myCanvas")
    var context = canvas.getContext("2d")
    
    context.fillStyle = "rgb(0,0,0)"
    context.font = "20px arial";
    context.textBaseline = "middle";
    context.textAlign = "center";
    context.fillText("Dificultad: "+"x"+texto, 500, 30);    
}
function colisionProyectil(){
    var canvas = document.getElementById("myCanvas")    
    if(colision(proyectilX,proyectilY, 10, 10)){
        puntuacion = puntuacion + (1*texto)
        dibujarProyectil()
    }
    if(proyectilX>-1&&proyectilX<canvas.width&&proyectilY>-1&&proyectilY<canvas.height){        
    }else{
        return true
    }
}
function gameOver(){    
    var canvas = document.getElementById("myCanvas")
    var context = canvas.getContext("2d")
    limpiar()
    context.fillStyle = "rgb(250,0,0)"
    context.font = "100px arial";
    context.textBaseline = "middle";
    context.textAlign = "center";
    context.fillText("GAME OVER", 400, 200);
    context.font = "25px arial";
    context.textBaseline = "middle";
    context.textAlign = "center";
    context.fillStyle = "rgb(0,0,0)"
    context.fillText("(Recarga para jugar de nuevo)", 400, 300);
}
function colision(x, y, ancho, alto){
    if((movimientoX>x||movimientoX+anchoCuadrado>x) && (movimientoX<x+ancho||movimientoX+anchoCuadrado<x+ancho)){        
        if((movimientoY>y||movimientoY+altoCuadrado>y) && (movimientoY<y+alto||movimientoY+altoCuadrado<y+alto)){
            return true;
        }
    }
}
function dibujarProyectil(){
    var canvas = document.getElementById("myCanvas")
    var bandera=NumAleatorio(0,1)
    if(bandera==1){
        proyectilX = 0;
        proyectilY = 0
    }else{
        proyectilX = 0
        proyectilY = NumAleatorio(canvas.width-10, 0) ;
    }
    
    proyectilY = NumAleatorio (canvas.height-10, 0) ;
}
function controles(){
    if (tecla && tecla == "ArrowLeft") {
        velocidadesX = -aceleracion;         
    }
    if (tecla && tecla == "ArrowRight") {
        velocidadesX = aceleracion; 
        aceleracion+=0.25
    }
    if (tecla && tecla == "ArrowDown") {
        velocidadesY = aceleracion; 
        aceleracion+=0.25
    }
    if (tecla && tecla == "ArrowUp") {
        velocidadesY = -aceleracion; 
        aceleracion+=0.25
    }
    if (tecla && tecla == "a") {
        velocidadesX = -aceleracion; 
        aceleracion+=0.25
    }
    if (tecla && tecla == "d") {
        velocidadesX = aceleracion; 
        aceleracion+=0.25
    }
    if (tecla && tecla == "s") {
        velocidadesY = aceleracion; 
        aceleracion+=0.25
    }
    if (tecla && tecla == "w") {
        velocidadesY = -aceleracion; 
        aceleracion+=0.25
    }if (tecla && tecla == "A") {
        velocidadesX = -aceleracion; 
        aceleracion+=0.25
    }
    if (tecla && tecla == "D") {
        velocidadesX = aceleracion; 
        aceleracion+=0.25
    }
    if (tecla && tecla == "S") {
        velocidadesY = aceleracion; 
        aceleracion+=0.25
    }
    if (tecla && tecla == "W") {
        velocidadesY = -aceleracion; 
        aceleracion+=0.25
    }
    if(!tecla){
        aceleracion= aceleracionInicial
    }
}
