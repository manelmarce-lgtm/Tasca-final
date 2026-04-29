let categories = JSON.parse(localStorage.getItem("categories")) || [];
function addCategory() {
    const nom = document.getElementById("nom").value.trim();
    const color = document.getElementById("color").value;

    if (nom === "") {
        alert("El nom de la categoria no pot estar buit. Si us plau, introdueix un nom vàlid.");
        return;
    }
    const novaCategoria = {
        nom: nom,
        color: color
    };
    categories.push(novaCategoria);
    localStorage.setItem("categories", JSON.stringify(categories));
    document.getElementById("novaCategoria").value = "";
    paintcategories();
}
