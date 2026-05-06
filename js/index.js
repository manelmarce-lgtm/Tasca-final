function carregarTasques() {
    const tasques = JSON.parse(localStorage.getItem("tasques")) || [];
    const llista = document.getElementById("llistaTasques");
    if (!llista) return;

    if (tasques.length === 0) {
        llista.innerHTML = "<p>No hi ha tasques creades.</p>";
        return;
    }
    llista.innerHTML = "";

    tasques.forEach(tasca => {
        const categoriaNom = typeof tasca.categoria === "object" ? tasca.categoria.nom : tasca.categoria || "Sense categoria";
        const categoriaColor = tasca.color || (typeof tasca.categoria === "object" ? tasca.categoria.color : "#999");
        const safeId = JSON.stringify(tasca.id);

        const div = document.createElement("div");
        div.className = "tasca";
        div.innerHTML = `
            <div class="tasca-header">
                <h3>${tasca.titol}</h3>
                <span class="categoria-pastilla" style="background-color: ${categoriaColor};">${categoriaNom}</span>
            </div>
            <p>${tasca.descripcio}</p>
            <p><strong>Data:</strong> ${new Date(tasca.data).toLocaleDateString()}</p>
            <p><strong>Prioritat:</strong> ${tasca.prioritat}</p>
        `;
        const eliminarBtn = document.createElement("button");
        eliminarBtn.className = "btn";
        eliminarBtn.textContent = "Eliminar";
        eliminarBtn.addEventListener("click", () => eliminarTasca(tasca.id));
        div.appendChild(eliminarBtn);
        llista.appendChild(div);
    });
}

function eliminarTasca(id) {
    let tasques = JSON.parse(localStorage.getItem("tasques")) || [];
    const idString = id?.toString();
    tasques = tasques.filter(t => t.id?.toString() !== idString);
    localStorage.setItem("tasques", JSON.stringify(tasques));
    carregarTasques();
}

carregarTasques();


function addTaskFromFile(file) {
    const reader = new FileReader();
    reader.onload = function(event) {
        try {
            const tasquesFromFile = JSON.parse(event.target.result);
            if (Array.isArray(tasquesFromFile)) {
                let tasques = JSON.parse(localStorage.getItem("tasques")) || [];
                const normalized = tasquesFromFile.map(item => {
                    const categoriaObj = typeof item.categoria === "object" ? item.categoria : { nom: item.categoria || "Sense categoria", color: item.color || "#999" };
                    return {
                        id: item.id || Date.now().toString() + Math.random().toString(16).slice(2),
                        titol: item.titol || item.nom || "Sense títol",
                        descripcio: item.descripcio || item.descripcio || "",
                        data: item.data || new Date().toISOString().slice(0, 10),
                        categoria: categoriaObj.nom,
                        color: categoriaObj.color,
                        prioritat: item.prioritat || item.prioritat || "Mitjana",
                        completada: item.completada || item.realitzada || false
                    };
                });
                tasques = tasques.concat(normalized);
                localStorage.setItem("tasques", JSON.stringify(tasques));
                alert("Tasques pujades correctament!");
                carregarTasques();
            } else {
                alert("El fitxer no conté un array de tasques vàlid.");
            }
        } catch (error) {
            alert("Error en llegir el fitxer.");
        }
    };
    reader.readAsText(file);
}

function deleteAllTasks() {
    if (confirm("Segur que vols eliminar totes les tasques? Aquesta acció no es pot desfer.")) {
        localStorage.removeItem("tasques");
        carregarTasques();
    }
}

// Manejar la pujada de tasques des d'un fitxer JSON
document.getElementById("fileInput").addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (!file) return;
});
