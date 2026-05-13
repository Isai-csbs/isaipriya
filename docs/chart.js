// Sample historical data (24 months)
const historicalData = [
    1500, 1510, 1520, 1530, 1540, 1550, 1560, 1570, 1580, 1590,
    1600, 1610, 1620, 1630, 1640, 1650, 1660, 1670, 1680, 1690,
    1700, 1710, 1720, 1730
];

const months = Array.from({length: 24}, (_, i) => {
    const date = new Date(2023, 0, 1);
    date.setMonth(date.getMonth() + i);
    return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
});

// Forecast data (next 3 months)
const forecastMonths = ['Jan-25', 'Feb-25', 'Mar-25'];
const forecastData = [1790, 1800, 1810];
const confidenceHigh = [1930, 1960, 1990];
const confidenceLow = [1650, 1640, 1630];

// Combine for visualization
const allMonths = [...months, ...forecastMonths];
const allData = [...historicalData, ...forecastData];

// Create the chart
const ctx = document.getElementById('forecastChart').getContext('2d');
const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: allMonths,
        datasets: [
            {
                label: 'Historical Expenses',
                data: [...historicalData, null, null, null],
                borderColor: '#2563eb',
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                fill: true,
                borderWidth: 2,
                pointRadius: 4,
                pointBackgroundColor: '#2563eb',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                tension: 0.3,
                segment: {
                    borderDash: ctx => ctx.p0DataIndex >= 23 || ctx.p1DataIndex >= 23 ? [5, 5] : undefined,
                }
            },
            {
                label: 'Forecast',
                data: [null, null, null, null, null, null, null, null, null, null,
                       null, null, null, null, null, null, null, null, null, null,
                       null, null, null, null, ...forecastData],
                borderColor: '#f59e0b',
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                fill: false,
                borderWidth: 2,
                borderDash: [5, 5],
                pointRadius: 5,
                pointBackgroundColor: '#f59e0b',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                tension: 0.3
            },
            {
                label: '95% Confidence Upper',
                data: [null, null, null, null, null, null, null, null, null, null,
                       null, null, null, null, null, null, null, null, null, null,
                       null, null, null, null, ...confidenceHigh],
                borderColor: '#10b981',
                fill: false,
                borderWidth: 1,
                borderDash: [2, 2],
                pointRadius: 0,
                tension: 0.3
            },
            {
                label: '95% Confidence Lower',
                data: [null, null, null, null, null, null, null, null, null, null,
                       null, null, null, null, null, null, null, null, null, null,
                       null, null, null, null, ...confidenceLow],
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                fill: '-1',
                borderWidth: 1,
                borderDash: [2, 2],
                pointRadius: 0,
                tension: 0.3
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    usePointStyle: true,
                    padding: 15,
                    font: {
                        size: 12,
                        weight: 'bold'
                    }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                padding: 12,
                cornerRadius: 8,
                titleFont: {
                    size: 14,
                    weight: 'bold'
                },
                bodyFont: {
                    size: 13
                },
                callbacks: {
                    label: function(context) {
                        if (context.parsed.y !== null) {
                            return context.dataset.label + ': $' + context.parsed.y.toFixed(0);
                        }
                        return '';
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: false,
                min: 1400,
                max: 2100,
                ticks: {
                    callback: function(value) {
                        return '$' + value.toLocaleString();
                    },
                    font: {
                        size: 12
                    }
                },
                grid: {
                    drawBorder: true,
                    color: 'rgba(0, 0, 0, 0.1)'
                }
            },
            x: {
                ticks: {
                    font: {
                        size: 11
                    }
                },
                grid: {
                    display: false
                }
            }
        }
    }
});