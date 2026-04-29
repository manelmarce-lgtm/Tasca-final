let tasques = JSON.parse(localStorage.getItem("tasques")) || [];

function addTask() {
    const titol = document.getElementById("nom").value.trim();
    const descripcio = document.getElementById("descripcio").value.trim();
    const data = document.getElementById("data").value;
    const categoria = document.getElementById("categoria").value;
    const prioritat = document.getElementById("prioritat").value;

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
        prioritat: prioritat,
        completada: false
    };
    tasques.push(novaTasca);
    localStorage.setItem("tasques", JSON.stringify(tasques));

    alert("La tasca s´ha creat correctament!");
    window.location.href = "index.html";
}

