let tasques = JSON.parse(localStorage.getItem("tasques")) || [];

function addTask() {
    const titol = document.getElementById("nom").value.trim();
    const descripcio = document.getElementById("descripcio").value.trim();
    const data = document.getElementById("data").value;
    const categoria = document.getElementById("categoria").value;
    const prioritat = document.getElementById("prioritat").value;
    const colorCategoria = select.options[select.selectedIndex].dataset.color;

    // Validam que el titol no estigui buit.
    if (titol === "" || descripcio === "" || data === "" || categoria === "" || prioritat === "") {
        alert("Tots els camps són obligatoris. Si us plau, completa'ls abans de crear la tasca.");
        return;
    }
    const novaTasca = {
        id: Date.now(),
        titol: titol,
        descripcio: descripcio,
        data: data,
        categoria: categoria,
        color: colorCategoria,
        prioritat: prioritat,
        completada: false
    };
    tasques.push(novaTasca);
    localStorage.setItem("tasques", JSON.stringify(tasques));

    alert("La tasca s´ha creat correctament!");
    window.location.href = "index.html";
}
function carregarCategories() {
    const categories = JSON.parse(localStorage.getItem("categories")) || [];
    const select = document.getElementById("categoria");
    select.innerHTML = "";
    categories.forEach(cat => {
        const option = document.createElement("option");
        option.value = cat.nom;
        option.dataset.color = cat.color; 
        option.textContent = cat.nom;
        select.appendChild(option);
    });
//Funcions per default
if (categories.length === 0) {
    const perDefecte = [
        { nom: "Estudis", color: "#2196F3" },
        { nom: "Treball", color: "#4CAF50" },
        { nom: "Personal", color: "#FF9800" }
    ];
    perDefecte.forEach(cat => {
        const option = document.createElement("option");
        option.value = cat.nom;
        option.dataset.color = cat.color;
        option.textContent = cat.nom;
        select.appendChild(option);
    });
}
}

carregarCategories();