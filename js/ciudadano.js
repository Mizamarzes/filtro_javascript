const ciudadanosList = [];

console.log(ciudadanosList)

// ------------- CARGAR FORMULARIO CIUDADANOS --------------------------

const loadFormCiudadano=()=>{
    const formCiudadanos = document.getElementById('show-info');
    formCiudadanos.innerHTML=`
        <form id="registroCiudadanoForm">
            <div class="mb-3">
                <label for="nombreCiudadanoLabel" class="form-label">Nombre: </label>
                <input type="text" class="form-control" id="nombreCiudadanoInput" required>
            </div>

            <div class="mb-3">
                <label for="codigoAdnCiudadanoLabel" class="form-label">Codigo ADN(Ingrese solamente 1 Y 0): </label>
                <input type="number" class="form-control" id="codigoAdnCiudadanoInput" minlength="20" required><br>
            </div>

            <div class="mb-3">
                <label for="celularCiudadanoLabel" class="form-label">Celular: </label>
                <input type="number" class="form-control" id="celularCiudadanoInput" required>
            </div>

            <div class="mb-3">
                <label for="direccionCiudadanoLabel" class="form-label">Direccion: </label>
                <input type="text" class="form-control" id="direccionCiudadanoInput" required>
            </div>

            <button type="submit" class="btn btn-primary" onclick="crearCiudadano()">Crear Ciudadano</button>
        </form>
    `;
}

// ------------- CREAR CIUDADANO --------------------------

const crearCiudadano=async()=>{
    const nombre = document.getElementById('nombreCiudadanoInput').value;
    const codigoAdn = document.getElementById('codigoAdnCiudadanoInput').value;
    const celular = document.getElementById('celularCiudadanoInput').value;
    const direccion = document.getElementById('direccionCiudadanoInput').value

    // Verifica que todos los campos tengan informacion
    if(!nombre || !codigoAdn || !celular || !direccion){
        alert("Por favor, completa todos los campos");
        return;
    }

    // Verificar si el código ADN ya está registrado
    const codigoAdnExiste = ciudadanosList.some(ciudadano => ciudadano.codigo_adn === codigoAdn);
    if (codigoAdnExiste) {
        alert('El código ADN ingresado ya está registrado. Por favor, ingrese uno nuevo.');
        return;
    }

    const newCiudadano={
        "nombre_completo": nombre,
        "direccion": direccion,
        "celular": celular,
        "codigo_adn": codigoAdn,
        "id": ciudadanosList.length+1
    }

    await saveJson("ciudadanos", newCiudadano, "CIUDADANO");

    nombre.value='';
    codigoAdn.value='';
    celular.value='';
    direccion.value='';

    alert("Ciudadano creado con exito");
}


