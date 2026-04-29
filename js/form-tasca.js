let tasques = JSON.parse(localStorage.getItem("tasques")) || [];

function addTask() {
    const titol = document.getElementById("nom").value.trim();
    const descripcio = document.getElementById("descripcio").value.trim();
    const data = document.getElementById("data").value;
    const selectCategoria = document.getElementById("categoria");
    const categoria = selectCategoria.value;
    const prioritat = document.getElementById("prioritat").value;
    
    const colorCategoria = selectCategoria.options[selectCategoria.selectedIndex]?.dataset.color || "#ccc";

    if (titol === "" || descripcio === "" || data === "" || categoria === "" || prioritat === "") {
        alert("Tots els camps són obligatoris.");
        return;
    }
    if (new Date(data) < new Date()) {
        alert("La data no pot ser anterior a l'actual.");
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

    alert("La tasca s'ha creat correctament!");
    window.location.href = "index.html";
}

function carregarCategories() {
    const categories = JSON.parse(localStorage.getItem("categories")) || [];
    const select = document.getElementById("categoria");
    if (!select) return;

    select.innerHTML = "";

    //usem les de defecte i les afegides per l'usuari
    const categoriesDefecte = [
        { nom: "Treball", color: "#3498db" },
        { nom: "Personal", color: "#e67e22" },
        { nom: "Estudis", color: "#e74c3c" }
    ];
    const llistaAMostrar = [...categoriesDefecte, ...categories];

    llistaAMostrar.forEach(cat => {
        const option = document.createElement("option");
        option.value = cat.nom;
        option.dataset.color = cat.color;
        option.textContent = cat.nom;
        select.appendChild(option);
    });
}

carregarCategories();