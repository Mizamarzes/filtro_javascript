document.addEventListener('DOMContentLoaded',async()=>{
    
    // CIUDADANOS
    await loadJson("ciudadanos", ciudadanosList, "CIUDADANOS");
    
    loadFormCiudadano();
})