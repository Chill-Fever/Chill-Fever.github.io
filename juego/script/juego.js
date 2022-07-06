
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
var posicionAleatoriaX
var posicionAleatoriaY
var puntuacion = 0;
var velocidadProyectil = 5;
var proyectilX;
var proyectilY;


document.onkeydown = function(e) {
    tecla = e.key;
 }
 document.onkeyup = function(e) {
     tecla = false;
  }
function empezarJuego(){    
    dibujarPunto()
    dibujarProyectil()
    setInterval(Actualizar, 20);
}
function Actualizar(){
    if (colisionProyectil()){        
        gameOver()
    }else{
        velocidadesX = 0;
        velocidadesY = 0;
        controles();
        limpiar();
        puntaje()
        nuevaPosicion();
        colisionPuntos();
        colisionProyectil();
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
    context.font = "50px arial";
    context.textBaseline = "middle";
    context.textAlign = "center";
    context.fillText(puntuacion, 100, 30);
}
function dibujarPunto() {
    var canvas = document.getElementById("myCanvas")
    posicionAleatoriaX = NumAleatorio(canvas.width-anchoPuntos, 0) ;
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
        context.fillStyle = "rgb(120,20,10)"
        context.fillRect(movimientoX, movimientoY, anchoCuadrado, altoCuadrado)
    }else{
        if(movimientoX<0){
            movimientoX=0
        }
        if(movimientoX>=canvas.width-anchoCuadrado){
            movimientoX=canvas.width-anchoCuadrado-1
        }
        if(movimientoY<0){
            movimientoY=0
        }
        if(movimientoY>=canvas.height-altoCuadrado){
            movimientoY=canvas.height-anchoCuadrado-1
        }        
    } 
    context.fillStyle = "rgb(10,200,10)"
    context.fillRect(posicionAleatoriaX, posicionAleatoriaY, anchoPuntos, altoPuntos)        

    context.fillStyle = "rgb(10,10,200)"    
    context.fillRect(proyectilX,proyectilY, 10, 10)
    proyectilX+=velocidadProyectil

    
   
}
function colisionPuntos(){
    var canvas = document.getElementById("myCanvas")
    var context = canvas.getContext("2d")
    if(colision(posicionAleatoriaX, posicionAleatoriaY, anchoPuntos, altoPuntos)){
        context.clearRect(posicionAleatoriaX, posicionAleatoriaY, anchoPuntos, altoPuntos)
        dibujarPunto()
        puntuacion += 10;
        velocidadProyectil *= 1.05;
    }
}
function colisionProyectil(){
    var canvas = document.getElementById("myCanvas")    
    if(colision(proyectilX,proyectilY, 10, 10)){
        puntuacion++
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




