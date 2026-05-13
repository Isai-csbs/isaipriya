// Sample historical data (32 months from Jan 2023 to Aug 2025)
const historicalData = [
    1647, 1464, 1566, 1603, 1590, 1549, 1635, 1749, 1625, 1558, 1721, 1668, // 2023
    1725, 1789, 1700, 1697, 1680, 1759, 1828, 1666, 1747, 1703, 1728, 1797, // 2024
    1744, 1604, 1836, 1736, 1856, 1890, 1827, 1771 // 2025 (up to Aug)
];

const months = [
    'Jan-23', 'Feb-23', 'Mar-23', 'Apr-23', 'May-23', 'Jun-23', 'Jul-23', 'Aug-23', 'Sep-23', 'Oct-23', 'Nov-23', 'Dec-23',
    'Jan-24', 'Feb-24', 'Mar-24', 'Apr-24', 'May-24', 'Jun-24', 'Jul-24', 'Aug-24', 'Sep-24', 'Oct-24', 'Nov-24', 'Dec-24',
    'Jan-25', 'Feb-25', 'Mar-25', 'Apr-25', 'May-25', 'Jun-25', 'Jul-25', 'Aug-25'
];

// Forecast data (next 3 months: Sep, Oct, Nov 2025)
const forecastMonths = ['Sep-25', 'Oct-25', 'Nov-25'];
const forecastData = [1850, 1860, 1870];
const confidenceHigh = [1980, 2010, 2040];
const confidenceLow = [1720, 1710, 1700];

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
                borderWidth: 2.5,
                pointRadius: 4,
                pointBackgroundColor: '#2563eb',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                tension: 0.3,
                segment: {
                    borderDash: ctx => ctx.p0DataIndex >= 31 || ctx.p1DataIndex >= 31 ? [5, 5] : undefined,
                }
            },
            {
                label: 'Forecast',
                data: new Array(32).fill(null).concat(forecastData),
                borderColor: '#f59e0b',
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                fill: false,
                borderWidth: 2.5,
                borderDash: [5, 5],
                pointRadius: 5,
                pointBackgroundColor: '#f59e0b',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                tension: 0.3
            },
            {
                label: '95% Confidence Upper',
                data: new Array(32).fill(null).concat(confidenceHigh),
                borderColor: '#10b981',
                fill: false,
                borderWidth: 1,
                borderDash: [2, 2],
                pointRadius: 0,
                tension: 0.3
            },
            {
                label: '95% Confidence Lower',
                data: new Array(32).fill(null).concat(confidenceLow),
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.2)',
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