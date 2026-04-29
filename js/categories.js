let categories = JSON.parse(localStorage.getItem("categories")) || [];

function addCategory() {
    const nomInput = document.getElementById("novaCategoria");
    const colorInput = document.getElementById("colorCategoria");
    const nom = nomInput.value.trim();
    const color = colorInput.value;

    if (nom === "") {
        alert("El nom de la categoria no pot estar buit.");
        return;
    }

    const novaCategoria = {
        nom: nom,
        color: color
    };

    categories.push(novaCategoria);
    localStorage.setItem("categories", JSON.stringify(categories));
    
    nomInput.value = "";
    paintCategories();
}

function paintCategories() {
    const llista = document.getElementById("llistaCategories");
    if (!llista) return;

    llista.innerHTML = "";
    categories.forEach(cat => {
        const li = document.createElement("li");
        li.style.listStyle = "none";
        li.style.marginBottom = "10px";
        li.innerHTML = `
            <span style="display:inline-block; width:15px; height:15px; background:${cat.color}; border-radius:50%; margin-right:10px;"></span>
            ${cat.nom}
        `;
        llista.appendChild(li);
    });
}

paintCategories();