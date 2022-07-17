var originalImage
var filteredImageCanvas
async function getImage(){
    var url = "https://picsum.photos/200/200";    
    var imagen = document.getElementById("imagen");
    imagen.crossOrigin = "Anonymous"
    
    try{
        const res = await fetch(url)    
        imagen.src = res.url;        
    }catch(error){
        alert("Hubo un error:" +error)
    }
    setTimeout(incializar, 100)        
}
function incializar(){
    originalImage = document.getElementById("imagen");            
    filteredImageCanvas = document.getElementById("filtered-image");                  
    var filter = LenaJS['mirror'];        
    LenaJS.filterImage(filteredImageCanvas, filter, originalImage);
    LenaJS.redrawCanvas(filteredImageCanvas, filter);
}
function boton(aux){       
    originalImage = document.getElementById("imagen");            
    filteredImageCanvas = document.getElementById("filtered-image");           
    var filter     
    filter = LenaJS[aux];        
    console.log(filter)
    LenaJS.redrawCanvas(filteredImageCanvas, filter, originalImage);
}     