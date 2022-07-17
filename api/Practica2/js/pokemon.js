
async function datosPokemon(id){          
    try{
        var url = "https://pokeapi.co/api/v2/pokemon/"+id                    
        var res = await fetch(url)
        var datos = await res.json()
        console.log(datos)
        var imagenPokemon = document.getElementById("imagenPokemon")
        imagenPokemon.src = datos.sprites.front_default                 
        if(datos.sprites.back_default ){
            var imagenPokemon2 = document.getElementById("imagenPokemon2")
            imagenPokemon2.src = datos.sprites.back_default 
        }else{
            var imagenPokemon2 = document.getElementById("imagenPokemon2")
            imagenPokemon2.src = "img/pregunta.png"
        }
        
        document.getElementById("nombrePokemon").innerHTML = datos.name + "<br> #" + datos.id
        var tipos = ""
        for (let i = 0; i < datos.types.length; i++) {
            if(i>0){
                tipos = tipos + " / "
                document.getElementById("tipoTitulo").innerHTML = "types"
            }    
            tipos = tipos + datos.types[i].type.name        
        }        
        document.getElementById("tipos").innerHTML = tipos
        
        var habilidades = ""
        for (i = 0; i < datos.abilities.length; i++) {
            if(i>0){
                habilidades = habilidades + " / "
                document.getElementById("habilidadTitulo").innerHTML = "abilities"
            }    
            habilidades = habilidades + datos.abilities[i].ability.name                    
            if(datos.abilities[i].is_hidden){
                habilidades = habilidades + " (Hidden ability) "
            }
        }
        document.getElementById("habilidades").innerHTML = habilidades
        for (i = 0; i < datos.stats.length; i++) {            
            document.getElementById(""+datos.stats[i].stat.name).innerHTML = datos.stats[i].base_stat                        
        }
        var movimientos=""
        for (i = 0; i < datos.moves.length; i++) {       
            if(i<datos.moves.length-1 && i>0){
                movimientos = movimientos + datos.moves[i].move.name
                movimientos = movimientos + ", "
            }else{
                movimientos = movimientos + " " + datos.moves[i].move.name
            }                                      
        }        
        document.getElementById("moves").innerHTML = movimientos
    }catch (error){
        alert("Ha ocurrido un error: "+error)
    }
    
    
}
