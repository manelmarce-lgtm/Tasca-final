let tasques = JSON.parse(localStorage.getItem("tasques")) || [];

function carregarTasques() {
    const tasques = JSON.parse(localStorage.getItem("tasques")) || [];
    const llista = document.getElementById("llistaTasques");

    if (tasques.length === 0) {
        llista.innerHTML = "<p>No hi ha tasques creades.</p>";
        return;
    }

    let html = "";

    tasques.forEach(t => {
        html += `
            <div class="tasca">
                <h3>${t.titol}</h3>
                <p>${t.descripcio}</p>
                <p><strong>Data:</strong> ${t.data}</p>
                <p><strong>Categoria:</strong> ${t.categoria}</p>
                <p><strong>Prioritat:</strong> ${t.prioritat}</p>
            </div>
        `;
    });

    llista.innerHTML = html;
}
function marcarCompletada(id) {
    let tasques = JSON.parse(localStorage.getItem("tasques")) || [];

    tasques = tasques.map(t => {
        if (t.id === id) t.completada = !t.completada;
        return t;
    });

    localStorage.setItem("tasques", JSON.stringify(tasques));
    carregarTasques();
}

carregarTasques();