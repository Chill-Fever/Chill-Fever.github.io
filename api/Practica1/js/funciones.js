var originalImage
var filteredImageCanvas
async function getImage(){
    var url = "https://picsum.photos/250/250";    
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
    var canvas = document.getElementById("imagen-original")
    var context = canvas.getContext("2d")        
    originalImage = document.getElementById("imagen");            
    context.drawImage(originalImage, 0, 0, 250, 250);    
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