var movimientoX = 300;
var movimientoY = 100;
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
var velocidadProyectilInicial = 5;
var velocidadProyectil = velocidadProyectilInicial;
var velocidadProyectilAumentada = velocidadProyectil;
var proyectilX;
var proyectilY;
var colorCuadrado = "160,20,20, 0";
var banderaVelocidad = true;
var velocidadLenta = 2
var texto= 1
var movimientoFondo = 0
var movimientoFondo2 = 0
var velocidadFondoInicial = 8
var velocidadFondo = velocidadFondoInicial
const musicaFondo = new Audio("sound/background.mp3");
const explosion = new Audio("sound/explosion.wav");
const congelar = new Audio("sound/congelar.wav");
const energia= new Audio("sound/energia.wav");
const impacto= new Audio("sound/impacto.wav");
const alarma1= new Audio("sound/alarma.wav");
const alarma2= new Audio("sound/alarma2.wav");
const perdiste= new Audio("sound/gameOver.mp3");
var actualizador

function start(){
    var boton = document.getElementById("botonInicio")
    boton.disabled = true
    empezarJuego()    
}
function tituloJuego(){
    var canvas = document.getElementById("myCanvas")
    var context = canvas.getContext("2d")
    context.fillStyle = "rgb(250,250,0)"
    context.font = "70px arial";
    context.textBaseline = "middle";
    context.textAlign = "center";
    context.fillText("SPACE DEFENDER", 350, 150);
    context.font = "25px arial";
    context.textBaseline = "middle";
    context.textAlign = "center";
    context.fillStyle = "white"
    context.fillText("(Click en el boton JUGAR para empezar)", 350, 210);
}
document.onkeydown = function(e) {
    tecla = e.key;
 }
 document.onkeyup = function(e) {
     tecla = false;
  }
function empezarJuego(){        
    reproducirMusicaLoop(musicaFondo)
    limpiar();       
    dibujarPunto()
    dibujarProyectil()
    dibujarCongelar()
    actualizador=setInterval(Actualizar, 20);
    setInterval(dibujarCongelar, 30000);      

}
function Actualizar(){
    if (colisionProyectil()){        
        gameOver()
        
    }else{
        velocidadesX = 0;
        velocidadesY = 0;        
        controles();
        limpiar();       
        Actualizarvelocidad() 
        nuevaPosicion();
        colisionPuntos();
        colisionProyectil();
        colisionCongelar()        
        puntaje()
        aumentarDificultad()
    }
    
}
function reproducirMusicaLoop(musica){
    musica.play();
    musica.loop =true;
    musica.playbackRate = 1;
}
function reproducirSonido(musica){
    musica.loop =false;
    musica.play();
    
}
function pararMusica(musica){
    musica.pause();
}
function limpiar(){            
    var canvas = document.getElementById("myCanvas")
    var context = canvas.getContext("2d")
    context.clearRect(0, 0, canvas.width, canvas.height)
}
function puntaje(){
    var canvas = document.getElementById("myCanvas")
    var context = canvas.getContext("2d")
    context.fillStyle = "white"
    context.font = "20px arial";
    context.textBaseline = "middle";
    context.textAlign = "center";
    context.fillText("Puntos: "+puntuacion, 100, 30); 
}
function dibujarCongelar() {
    var canvas = document.getElementById("myCanvas")
    posicionAleatoriaX2 = NumAleatorio(canvas.width-anchoPuntos, 100) ;
    posicionAleatoriaY2 = NumAleatorio (canvas.height-altoPuntos, 40) ;        
}
function ReiniciarVelocidad (){
    banderaVelocidad = true;
}
function Actualizarvelocidad (){
    if (banderaVelocidad){        
        velocidadProyectil = velocidadProyectilAumentada                   
        velocidadFondo = velocidadFondoInicial
    }else{
        velocidadProyectil = velocidadLenta;       
        velocidadProyectilAumentada = velocidadProyectilInicial 
        aceleracion = 10 
        efectoHielo()       
        velocidadFondo = 5
    }
}
function efectoHielo(){
    var canvas = document.getElementById("myCanvas")
    var context = canvas.getContext("2d")
    context.fillStyle = "rgba(8, 155, 240, 0.377)"
    context.fillRect(0, 0, canvas.width, canvas.height) 
}
function dibujarPunto() {
    var canvas = document.getElementById("myCanvas")
    posicionAleatoriaX = NumAleatorio(canvas.width-anchoPuntos, 100) ;
    posicionAleatoriaY = NumAleatorio (canvas.height-altoPuntos, 40) ;
}
function NumAleatorio(maximo, minimo){
    var x = Math.floor((Math.random() * ((maximo+1)-minimo))+minimo);
    return x;
}
function nuevaPosicion(){
    var canvas = document.getElementById("myCanvas")
    var context = canvas.getContext("2d")    
    var asteroide = document.getElementById("asteroide")
    var nave = document.getElementById("nave")
    var reloj = document.getElementById("reloj")
    var energia = document.getElementById("energia")
    var estrellas = document.getElementById("estrellas")
    var estrellas2 = document.getElementById("estrellas")
    movimientoFondo-=velocidadFondo
    movimientoFondo2-=velocidadFondo
    if(movimientoFondo <= -canvas.width){
        movimientoFondo2 = movimientoFondo + 1400
    }
    if(movimientoFondo2 <= -canvas.width){
        movimientoFondo = movimientoFondo2 + 1400
    }    
    context.drawImage(estrellas, movimientoFondo, 0, 1400, canvas.height)
    context.drawImage(estrellas2, movimientoFondo2, 0, 1400, canvas.height)
    movimientoX+=velocidadesX      
    movimientoY+=velocidadesY
    if(movimientoX>-1&&movimientoX<canvas.width-anchoCuadrado&&movimientoY>-1&&movimientoY<canvas.height-altoCuadrado){                 
        context.fillStyle = "rgba("+colorCuadrado+")"      
        context.fillRect(movimientoX, movimientoY, anchoCuadrado, altoCuadrado)        
        context.drawImage(nave, movimientoX, movimientoY, anchoCuadrado, altoCuadrado)        
    }else{
        if(movimientoX<0){
            movimientoX=0
            context.fillStyle = "rgba("+colorCuadrado+")"
            context.fillRect(movimientoX, movimientoY, anchoCuadrado, altoCuadrado)
            context.drawImage(nave, movimientoX, movimientoY, anchoCuadrado, altoCuadrado)
        }
        if(movimientoX>=canvas.width-anchoCuadrado){
            movimientoX=canvas.width-anchoCuadrado-1
            context.fillStyle = "rgba("+colorCuadrado+")"
            context.fillRect(movimientoX, movimientoY, anchoCuadrado, altoCuadrado)
            context.drawImage(nave, movimientoX, movimientoY, anchoCuadrado, altoCuadrado)
        }
        if(movimientoY<0){
            movimientoY=0
            context.fillStyle = "rgba("+colorCuadrado+")"
            context.fillRect(movimientoX, movimientoY, anchoCuadrado, altoCuadrado)
            context.drawImage(nave, movimientoX, movimientoY, anchoCuadrado, altoCuadrado)
        }
        if(movimientoY>=canvas.height-altoCuadrado){
            movimientoY=canvas.height-anchoCuadrado-1
            context.fillStyle = "rgba("+colorCuadrado+")"
            context.fillRect(movimientoX, movimientoY, anchoCuadrado, altoCuadrado)
            context.drawImage(nave, movimientoX, movimientoY, anchoCuadrado, altoCuadrado)
        }
        aceleracion= aceleracionInicial        
        context.fillStyle = "rgba("+colorCuadrado+")"
        context.fillRect(movimientoX, movimientoY, anchoCuadrado, altoCuadrado)
        context.drawImage(nave, movimientoX, movimientoY, anchoCuadrado, altoCuadrado)
    } 
    context.fillStyle = "rgba(10,200,10,0)"
    context.fillRect(posicionAleatoriaX, posicionAleatoriaY, anchoPuntos, altoPuntos)        
    context.drawImage(energia, posicionAleatoriaX, posicionAleatoriaY, anchoPuntos, altoPuntos)

    context.fillStyle = "rgba(250, 235, 215, 0)"    
    context.fillRect(proyectilX,proyectilY, 20, 20)
    context.drawImage(asteroide, proyectilX, proyectilY, 20, 20)
    proyectilX+=velocidadProyectil

    context.fillStyle = "rgba(10,150,120,0)"
    context.fillRect(posicionAleatoriaX2, posicionAleatoriaY2, anchoPuntos, altoPuntos)   
    context.drawImage(reloj, posicionAleatoriaX2, posicionAleatoriaY2, anchoPuntos, altoPuntos)
}
function colisionPuntos(){        
    if(colision(posicionAleatoriaX, posicionAleatoriaY, anchoPuntos, altoPuntos)){        
        dibujarPunto()
        puntuacion += 10;        
        velocidadProyectilAumentada *= 1.05
        velocidadesX *= 1.1
        velocidadesY *= 1.1
        reproducirSonido(energia)
        return true
    }
}
function colisionCongelar(){
    if(colision(posicionAleatoriaX2, posicionAleatoriaY2, anchoPuntos, altoPuntos)){       
        puntuacion += 15;
        posicionAleatoriaX2 = -30;
        posicionAleatoriaY2 = -30;
        banderaVelocidad = false;
        setTimeout(ReiniciarVelocidad, 5000);
        reproducirSonido(congelar)
        return true
    }
}
function aumentarDificultad(){
    var dificultad = Math.floor(puntuacion/10)
    if(colisionPuntos||colisionCongelar){        
        switch (dificultad) {
            case 15:
                reproducirSonido(alarma1)
                texto = 2
                velocidadProyectilInicial = 7
                velocidadProyectilAumentada = 7
                aceleracionInicial = 11
                break;
            case 25:
                reproducirSonido(alarma1)
                texto = 3
                velocidadProyectilInicial = 8
                velocidadProyectilAumentada = 8
                aceleracionInicial = 12
                break;
            case 35:
                texto = 4
                reproducirSonido(alarma1)
                velocidadProyectilInicial = 9
                velocidadProyectilAumentada = 9
                aceleracionInicial = 13
                break; 
            case 45:
                texto = 5
                reproducirSonido(alarma2)
                velocidadProyectilInicial = 10
                velocidadProyectilAumentada = 10
                aceleracionInicial = 14
                velocidadFondoInicial = 15
                break;    
            case 55:
                texto = 6
                reproducirSonido(alarma1)
                velocidadProyectilInicial = 12
                velocidadProyectilAumentada = 12
                aceleracionInicial = 15
                break;     
            case 65:
                texto = 7
                reproducirSonido(alarma1)
                velocidadProyectilInicial = 13
                velocidadProyectilAumentada = 13
                aceleracionInicial = 16
                break;         
            case 75:
                texto = 8
                reproducirSonido(alarma1)
                velocidadProyectilInicial = 17
                velocidadProyectilAumentada = 17
                aceleracionInicial = 17
                break;   
            case 85:
                texto = 9
                reproducirSonido(alarma1)
                velocidadProyectilInicial = 20
                velocidadProyectilAumentada = 20
                aceleracionInicial = 20                
                break;   
            case 100:
                texto = 10
                reproducirSonido(alarma2)
                velocidadProyectilInicial = 25
                velocidadProyectilAumentada = 25
                aceleracionInicial = 25
                velocidadFondoInicial = 25
                break;                   
            default:
                break;
        }
    }    
    var canvas = document.getElementById("myCanvas")
    var context = canvas.getContext("2d")
    
    context.fillStyle = "white"
    context.font = "20px arial";
    context.textBaseline = "middle";
    context.textAlign = "center";
    context.fillText("Multiplicador: "+"x"+texto, 500, 30);    
}
function colisionProyectil(){
    var canvas = document.getElementById("myCanvas")    
    if(colision(proyectilX,proyectilY, 20, 20)){
        puntuacion = puntuacion + (1*texto)
        reproducirSonido(impacto)
        dibujarProyectil()
    }
    if(proyectilX>-1&&proyectilX<canvas.width&&proyectilY>-1&&proyectilY<canvas.height){        
    }else{
        reproducirSonido(explosion)       
        return true
    }
}
function gameOver(){        
    var canvas = document.getElementById("myCanvas")
    var context = canvas.getContext("2d")   
    clearInterval(actualizador)     
    pararMusica(musicaFondo)            
    reproducirMusicaLoop(perdiste)
    limpiar()
    context.fillStyle = "rgb(250,0,0)"
    context.font = "100px arial";
    context.textBaseline = "middle";
    context.textAlign = "center";
    context.fillText("GAME OVER", 350, 150);
    context.font = "25px arial";
    context.textBaseline = "middle";
    context.textAlign = "center";
    context.fillStyle = "white"
    context.fillText("(Recarga con f5 para jugar de nuevo)", 350, 210);
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
    proyectilX = 0
    proyectilY = NumAleatorio(canvas.height-40, 40) ;
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
        aceleracion = aceleracionInicial              
    }
}
