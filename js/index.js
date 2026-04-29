function carregarTasques() {
    const tasques = JSON.parse(localStorage.getItem("tasques")) || [];
    const llista = document.getElementById("llistaTasques");
    if (!llista) return;

    if (tasques.length === 0) {
        llista.innerHTML = "<p>No hi ha tasques creades.</p>";
        return;
    }

    let html = "";
    tasques.forEach(t => {
        html += `
            <div class="tasca" style="border-left: 5px solid ${t.color || '#ccc'}; margin-bottom: 15px; padding: 10px; background: #f9f9f9;">
                <h3>${t.titol}</h3>
                <p>${t.descripcio}</p>
                <p><strong>Data:</strong> ${t.data} | <strong>Prioritat:</strong> ${t.prioritat}</p>
                <p><span style="background:${t.color}; color:white; padding:2px 6px; border-radius:4px;">${t.categoria}</span></p>
                <button onclick="eliminarTasca(${t.id})">Eliminar</button>
            </div>
        `;
    });

    llista.innerHTML = html;
}

function eliminarTasca(id) {
    let tasques = JSON.parse(localStorage.getItem("tasques")) || [];
    tasques = tasques.filter(t => t.id !== id);
    localStorage.setItem("tasques", JSON.stringify(tasques));
    carregarTasques();
}

carregarTasques();