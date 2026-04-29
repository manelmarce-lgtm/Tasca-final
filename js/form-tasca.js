let tasques = [];
let filtreActiu = 'totes';

function createTask(text) {
    return {
        id: Date.now(),
        text: text,
        completada: false
    };
}
function addTask() {
    const input = document.getElementById('inputTasca');
    const textTasca = input.value.trim();

    if (textTasca === '') {
        alert('Escriu una tasca!');
        return;
    }

    const novaTasca = createTask(textTasca);
    tasques.push(novaTasca);

    input.value = '';
    showTasks();
    updateStatistics();
}