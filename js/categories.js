let categories = JSON.parse(localStorage.getItem("categories")) || [];
function addCategory() {
    
    const nom = document.getElementById("novaCategoria").value.trim(); 
    const color = document.getElementById("colorCategoria").value;

    if (nom === "") {
        alert("El nom de la categoria no pot estar buit.");
        return;
    }
    const novaCategoria = { nom: nom, color: color };
    categories.push(novaCategoria);
    localStorage.setItem("categories", JSON.stringify(categories));
    
    document.getElementById("novaCategoria").value = "";
}
function paintCategories() {
    const llista = document.getElementById("llistaCategories");
    llista.innerHTML = "";

    categories.forEach(cat => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span style="display:inline-block; width:15px; height:15px; background:${cat.color}; margin-right:10px;"></span>
            ${cat.nom}
        `;
        llista.appendChild(li);
    });
    paintCategories()
}