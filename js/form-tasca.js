let tasques = JSON.parse(localStorage.getItem("tasques")) || [];

function addTask() {
    const titol = document.getElementById("nom").value.trim();
    const descripcio = document.getElementById("descripcio").value.trim();
    const data = document.getElementById("data").value;
    const categoria = document.getElementById("categoria").value;
    const prioritat = document.getElementById("prioritat").value;

    // Validam que el titol no estigui buit.
    if (titol === "") {
        alert("El títol és obligatori");
        return;
    }
}