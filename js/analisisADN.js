// ------------- CARGAR FORMULARIO  --------------------------

const loadFormAnalisisAdn = ()=>{
    const formAnalisis = document.getElementById('show-info');
    formAnalisis.innerHTML=`
        <form>

            <div class="mb-3">
                <label for="codigoAdnCiudadanoLabel" class="form-label">Codigo ADN(Ingrese solamente 1 Y 0): </label>
                <input type="number" class="form-control" id="codigoAdnSospechosoInput" minlength="20" required><br>
                <button type="submit" class="btn btn-primary" onclick="analisisAdn()">Enviar</button>
            </div>

            <div class="mb-3>
                <label for="resultadosAnalisisAdn" class="form-label">Resultado: </label>
                <ul class="mb-5 mt-3" id="listResultadosAnalisisAdn">
                
                </ul>
            </div>
        </form>
    `;
}

// ------------- ANALISIS DE COINCIDENCIAS Y CALCULO DE PORCENTAJES  --------------------------

const analisisAdn = async () => {
    await loadJson("ciudadanos", ciudadanosList, "CIUDADANOS");

    const codigoAdnUsuario = document.getElementById('codigoAdnSospechosoInput').value;

    // Verifica que todos los campos tengan informacion
    if(!codigoAdnUsuario){
        alert("Por favor, completa todos los campos");
        return;
    }

    // Verifica si el código ADN tiene exactamente 20 dígitos y solo contiene 1 y 0
    if (!/^[01]{20}$/.test(codigoAdnUsuario)) {
        alert("El código ADN debe contener exactamente 20 dígitos y solo puede contener los caracteres 0 y 1.");
        return;
    }

    // Calcular el porcentaje de coincidencia 
    const coincidencias = ciudadanosList.map(ciudadano => {
        const codigoAdnCiudadano = ciudadano.codigo_adn;
        const porcentajeCoincidencia = calcularPorcentajeCoincidencia(codigoAdnUsuario, codigoAdnCiudadano);
        return { nombre: ciudadano.nombre_completo, porcentaje: porcentajeCoincidencia };
    });

    // Ordenar la lista en orden ascendente 
    coincidencias.sort((a, b) => b.porcentaje - a.porcentaje);

    // Mostrar los primeros 5 resultados en forma de lista
    const listResultados = document.getElementById('listResultadosAnalisisAdn');
    listResultados.innerHTML = '';
    for (let i = 0; i < 5 && i < coincidencias.length; i++) {
        const coincidencia = coincidencias[i];
        const listItem = document.createElement('li');
        listItem.textContent = `${coincidencia.nombre}: ${coincidencia.porcentaje}%`;
        listResultados.appendChild(listItem);
    }
};

// funcion para calcular el porcentaje de coinicidencia
const calcularPorcentajeCoincidencia = (codigoUsuario, codigoCiudadano) => {
    let coincidencias = 0;
    for (let i = 0; i < codigoUsuario.length; i++) {
        if (codigoUsuario[i] === codigoCiudadano[i]) {
            coincidencias++;
        }
    }
    return (coincidencias / codigoUsuario.length) * 100;
};