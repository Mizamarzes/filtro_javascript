document.addEventListener('DOMContentLoaded',async()=>{
    
    // CARGA LA LISTA DE CIUDADANOS
    await loadJson("ciudadanos", ciudadanosList, "CIUDADANOS");
    
    // CARGA EL FORMULARIO DE CREAR CIUDADANO
    loadFormCiudadano();
})