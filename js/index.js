import "./grafics.js";
import { crearGraficaTasques } from "./grafics.js";
function crearTascaCard(tasca, completada) {
    const categoriaNom = typeof tasca.categoria === "object" ? tasca.categoria.nom : tasca.categoria || "Sense categoria";
    const categoriaColor = tasca.color || (typeof tasca.categoria === "object" ? tasca.categoria.color : "#999");

    const div = document.createElement("div");
    div.className = "tasca";
    if (completada) div.classList.add("completada");

    div.innerHTML = `
        <div class="tasca-header">
            <h3>${tasca.titol}</h3>
            <span class="categoria-pastilla" style="background-color: ${categoriaColor};">${categoriaNom}</span>
        </div>
        <p>${tasca.descripcio}</p>
        <p><strong>Data:</strong> ${new Date(tasca.data).toLocaleDateString()}</p>
        <p><strong>Prioritat:</strong> ${tasca.prioritat}</p>
    `;

    const actions = document.createElement("div");
    actions.className = "tasca-accions";

    if (!completada) {
        const completarBtn = document.createElement("button");
        completarBtn.className = "btn";
        completarBtn.textContent = "Marcar com feta";
        completarBtn.addEventListener("click", () => marcarTascaCompletada(tasca.id));
        actions.appendChild(completarBtn);
    } else {
        const reobrirBtn = document.createElement("button");
        reobrirBtn.className = "btn";
        reobrirBtn.textContent = "Reobrir";
        reobrirBtn.addEventListener("click", () => actualitzarEstatTasca(tasca.id, false));
        actions.appendChild(reobrirBtn);
    }

    const eliminarBtn = document.createElement("button");
    eliminarBtn.className = "btn";
    eliminarBtn.textContent = "Eliminar";
    eliminarBtn.addEventListener("click", () => eliminarTasca(tasca.id));
    actions.appendChild(eliminarBtn);

    div.appendChild(actions);
    return div;
}

function carregarTasques() {
    const tasques = JSON.parse(localStorage.getItem("tasques")) || [];
    const pendentsContainer = document.getElementById("llistaTasquesPendents");
    const finalitzadesContainer = document.getElementById("llistaTasquesFinalitzades");
    if (!pendentsContainer || !finalitzadesContainer) return;

    const pendents = tasques.filter(t => !t.completada);
    const finalitzades = tasques.filter(t => t.completada);

    pendentsContainer.innerHTML = "";
    finalitzadesContainer.innerHTML = "";

    if (pendents.length === 0) {
        pendentsContainer.innerHTML = "<p>No hi ha tasques pendents.</p>";
    } else {
        pendents.forEach(tasca => {
            pendentsContainer.appendChild(crearTascaCard(tasca, false));
        });
    }

    if (finalitzades.length === 0) {
        finalitzadesContainer.innerHTML = "<p>No hi ha tasques finalitzades.</p>";
    } else {
        finalitzades.forEach(tasca => {
            finalitzadesContainer.appendChild(crearTascaCard(tasca, true));
        });
    }
    
    actualitzarGrafic();
}

function actualitzarEstatTasca(id, completada) {
    let tasques = JSON.parse(localStorage.getItem("tasques")) || [];
    const idString = id?.toString();
    tasques = tasques.map(t => t.id?.toString() === idString ? { ...t, completada } : t);
    localStorage.setItem("tasques", JSON.stringify(tasques));
    carregarTasques();
}

function marcarTascaCompletada(id) {
    actualitzarEstatTasca(id, true);
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

document.getElementById("fileInput").addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (!file) return;
    addTaskFromFile(file);
});


function actualitzarGrafic() {
    const mesos = ["Gener", "Febrer", "Març", "Abril", "Maig", "Juny", "Juliol", "Agost", "Setembre", "Octubre", "Novembre", "Desembre"];
    const tasques = JSON.parse(localStorage.getItem("tasques")) || [];
    const tasquesCompletades = tasques.filter(t => t.completada);
    
    const dadesPerMes = tasquesCompletades.reduce((acc, tasca) => {
        const data = new Date(tasca.data);
        const mes = data.getMonth();
        acc[mesos[mes]] = (acc[mesos[mes]] || 0) + 1;
        return acc;
    }, {Gener: 0, Febrer: 0, Març: 0, Abril: 0, Maig: 0, Juny: 0, Juliol: 0, Agost: 0, Setembre: 0, Octubre: 0, Novembre: 0, Desembre: 0});
    
    const canvas = document.getElementById("tasquesChart");
    if (canvas) {
        crearGraficaTasques(canvas, dadesPerMes);
    }
}

window.deleteAllTasks = deleteAllTasks;
window.addTaskFromFile = addTaskFromFile;
