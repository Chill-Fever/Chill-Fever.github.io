var id
function navegar(i){        
    id+=i
    datosPokemon(id)
    comprobar()
}
function comprobar(){
    var aux = 1
    for (let i = 0; i < 3; i++) {
        if(id-aux<1){
            document.getElementById("anteriorx"+aux).disabled = true
        }else{
            document.getElementById("anteriorx"+aux).disabled = false
        }
        aux*=10
    }
    aux = 1
    for ( i = 0; i < 3; i++) {
        if(id+aux>898){
            document.getElementById("siguientex"+aux).disabled = true
        }else{
            document.getElementById("siguientex"+aux).disabled = false
        }
        aux*=10
    }
}
function empezar(){
    id=1
    datosPokemon(id)
    comprobar()
}