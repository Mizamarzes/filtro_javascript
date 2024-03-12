// ------------- JSON LOAD FUNCTION --------------------------

const loadJson=async(url, list, messageSecurity)=>{
    try{
        list.length=0;
        const response=await fetch(`http://localhost:3000/${url}`);

        if(!response.ok){
            throw new Error(`Error loading ${messageSecurity}, status: ${response.status}`);
        }
        const listJSON=await response.json();
        list.push(...listJSON);
    }catch(error){
        console.error(`Error loading ${messageSecurity}, ${error.message}`);
    }
    
}

// ------------- JSON SAVE FUNCTION --------------------------

const saveJson= async(url, newItem, messageSecurity)=>{
    try{
        const response=await fetch(`http://localhost:3000/${url}`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(newItem),
        });

        if(!response.ok){
            throw new Error(`Error creating a ${messageSecurity}, status: ${response.status}`);
        }
        const itemCreated= await response.json();
        console.log(`${messageSecurity} created: ${itemCreated}`);

    }catch(error){
        console.error(`Error loading a ${messageSecurity}, ${error.message}`);
    }
}

// ------------- FUNCTION FOR SHOW THE LISTS --------------------------

const fieldsCiudadanos = [
    "id", "nombre_completo", "direccion", "celular", "codigo_adn"
]

const showListInTable = async (url, dataList, tableBodyId, fields) => {
    await loadJson(url, dataList, "LISTA");
    const tableBody = document.getElementById(tableBodyId);
    tableBody.innerHTML = '';

    for (const dataItem of dataList) {
        const tr = document.createElement('tr');
        let rowData = '';
        for (const field of fields) {
            if (field === 'class_schedule') {
                // Procesar el campo class_schedule
                let scheduleStr = '';
                for (const schedule of dataItem[field]) {
                    scheduleStr += `${schedule.day} ${schedule.start_time}-${schedule.end_time} (Salon ${schedule.salon_id})<br>`;
                }
                rowData += `<td>${scheduleStr}</td>`;
            } else {
                rowData += `<td>${dataItem[field]}</td>`;
            }
        }
        tr.innerHTML = rowData;
        tableBody.appendChild(tr);
    }
}
