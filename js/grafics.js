export function crearGraficaTasques(context,dades) {
    let existingChart = Chart.getChart(context);
    if (existingChart) {
        existingChart.destroy();
    }
    new Chart(context, {
        type: 'bar',
        data: {
            labels: Object.keys(dades),
            datasets: [{
                label: 'tasques realitzades',
                data: Object.values(dades),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {  
                    beginAtZero: true,
                }
            }
        }
    });
}