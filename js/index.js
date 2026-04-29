let tasques = [];
let filtreActiu = 'totes';

function createTask(text) {
    return {
        id: Date.now(),
        text: text,
        completada: false
    };
}