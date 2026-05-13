// Financial Forecast Calculator Logic

let chartInstance = null;

// Trend factor slider update
document.getElementById('trendFactor').addEventListener('input', function() {
    document.getElementById('trendValue').textContent = this.value + '%';
});

// Calculate button
document.getElementById('calculateBtn').addEventListener('click', calculateForecast);

// Reset button
document.getElementById('resetBtn').addEventListener('click', function() {
    document.getElementById('monthlyExpenses').value = '';
    document.getElementById('resultsPanel').style.display = 'none';
    document.getElementById('chartSection').style.display = 'none';
    document.getElementById('insightsSection').style.display = 'none';
});

function calculateForecast() {
    // Get input data
    const expensesInput = document.getElementById('monthlyExpenses').value.trim();
    const forecastMonths = parseInt(document.getElementById('forecastMonths').value);
    const confidenceLevel = parseInt(document.getElementById('confidenceLevel').value);
    const trendFactor = parseFloat(document.getElementById('trendFactor').value) / 100;

    // Validate input
    if (!expensesInput) {
        alert('Please enter monthly expenses data');
        return;
    }

    // Parse expenses
    let expenses = expensesInput.split(',').map(v => parseFloat(v.trim())).filter(v => !isNaN(v));
    
    if (expenses.length < 3) {
        alert('Please enter at least 3 months of data');
        return;
    }

    // Calculate statistics
    const stats = calculateStatistics(expenses);

    // Generate forecast
    const forecast = generateForecast(expenses, forecastMonths, stats, trendFactor);

    // Calculate confidence intervals
    const confidenceIntervals = calculateConfidenceIntervals(forecast, stats, confidenceLevel);

    // Display results
    displayResults(expenses, forecast, confidenceIntervals, stats, forecastMonths, confidenceLevel);

    // Display chart
    displayChart(expenses, forecast, confidenceIntervals);

    // Display insights
    displayInsights(expenses, forecast, stats, trendFactor);
}

function calculateStatistics(expenses) {
    const n = expenses.length;
    const mean = expenses.reduce((a, b) => a + b, 0) / n;
    
    const variance = expenses.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / n;
    const stdDev = Math.sqrt(variance);
    
    // Calculate trend (slope)
    let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
    for (let i = 0; i < n; i++) {
        sumX += i;
        sumY += expenses[i];
        sumXY += i * expenses[i];
        sumX2 += i * i;
    }
    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    
    return {
        mean,
        stdDev,
        variance,
        slope,
        min: Math.min(...expenses),
        max: Math.max(...expenses),
        count: n
    };
}

function generateForecast(expenses, months, stats, trendFactor) {
    const forecast = [];
    const baseMonth = expenses.length;
    
    for (let i = 1; i <= months; i++) {
        // Calculate base forecast using trend
        const baseForecast = stats.mean + (stats.slope * (baseMonth + i)) + (stats.mean * trendFactor * i);
        forecast.push(baseForecast);
    }
    
    return forecast;
}

function calculateConfidenceIntervals(forecast, stats, confidenceLevel) {
    // Z-scores for different confidence levels
    const zScores = {
        80: 1.282,
        90: 1.645,
        95: 1.96
    };
    
    const zScore = zScores[confidenceLevel];
    const marginOfError = zScore * stats.stdDev;
    
    return forecast.map(value => ({
        point: value,
        lower: Math.max(0, value - marginOfError),
        upper: value + marginOfError
    }));
}

function displayResults(expenses, forecast, intervals, stats, forecastMonths, confidenceLevel) {
    const resultsPanel = document.getElementById('resultsPanel');
    
    // Update metrics
    document.getElementById('avgHistorical').textContent = Math.round(stats.mean);
    document.getElementById('trendRate').textContent = (stats.slope * 100 / stats.mean).toFixed(2);
    document.getElementById('avgForecast').textContent = Math.round(forecast.reduce((a, b) => a + b, 0) / forecast.length);
    document.getElementById('variance').textContent = Math.round(stats.stdDev);
    
    // Build forecast table
    const tbody = document.querySelector('#forecastTable tbody');
    tbody.innerHTML = '';
    
    for (let i = 0; i < forecast.length; i++) {
        const row = document.createElement('tr');
        const monthName = getMonthName(new Date().getMonth() + i + 1);
        const year = new Date().getFullYear() + Math.floor((new Date().getMonth() + i + 1) / 12);
        
        row.innerHTML = `
            <td>${monthName} ${year}</td>
            <td>$${Math.round(intervals[i].point)}</td>
            <td>$${Math.round(intervals[i].lower)}</td>
            <td>$${Math.round(intervals[i].upper)}</td>
            <td>${confidenceLevel}%</td>
        `;
        tbody.appendChild(row);
    }
    
    resultsPanel.style.display = 'block';
}

function displayChart(expenses, forecast, intervals) {
    const chartSection = document.getElementById('chartSection');
    chartSection.style.display = 'block';
    
    const ctx = document.getElementById('forecastChart');
    
    // Destroy previous chart if exists
    if (chartInstance) {
        chartInstance.destroy();
    }
    
    // Prepare labels
    const historicalLabels = expenses.map((_, i) => `Month ${i + 1}`);
    const forecastLabels = forecast.map((_, i) => `F+${i + 1}`);
    const allLabels = [...historicalLabels, ...forecastLabels];
    
    // Prepare data
    const historicalData = [...expenses, null, null, null, null, null, null, null, null, null, null, null].slice(0, expenses.length + forecast.length);
    const forecastData = new Array(expenses.length).fill(null).concat(forecast);
    const upperBound = new Array(expenses.length).fill(null).concat(intervals.map(i => i.upper));
    const lowerBound = new Array(expenses.length).fill(null).concat(intervals.map(i => i.lower));
    
    chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: allLabels,
            datasets: [
                {
                    label: 'Historical Expenses',
                    data: historicalData,
                    borderColor: '#2563eb',
                    backgroundColor: 'rgba(37, 99, 235, 0.1)',
                    fill: true,
                    borderWidth: 2.5,
                    pointRadius: 5,
                    pointBackgroundColor: '#2563eb',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    tension: 0.3
                },
                {
                    label: 'Forecast',
                    data: forecastData,
                    borderColor: '#f59e0b',
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    borderDash: [5, 5],
                    borderWidth: 2.5,
                    pointRadius: 5,
                    pointBackgroundColor: '#f59e0b',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    tension: 0.3
                },
                {
                    label: 'Upper Bound (Confidence)',
                    data: upperBound,
                    borderColor: '#10b981',
                    borderDash: [2, 2],
                    borderWidth: 1,
                    pointRadius: 0,
                    fill: false
                },
                {
                    label: 'Lower Bound (Confidence)',
                    data: lowerBound,
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.2)',
                    borderDash: [2, 2],
                    borderWidth: 1,
                    fill: '-1',
                    pointRadius: 0
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
                        font: { size: 12, weight: 'bold' }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    cornerRadius: 8,
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
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                }
            }
        }
    });
}

function displayInsights(expenses, forecast, stats, trendFactor) {
    const insightsSection = document.getElementById('insightsSection');
    insightsSection.style.display = 'block';
    
    const historicalAvg = stats.mean;
    const forecastAvg = forecast.reduce((a, b) => a + b, 0) / forecast.length;
    const changePercent = ((forecastAvg - historicalAvg) / historicalAvg) * 100;
    
    // Summary
    let summaryText = `Your expenses are forecasted to average $${Math.round(forecastAvg)} over the next period. `;
    if (changePercent > 0) {
        summaryText += `This represents a ${changePercent.toFixed(1)}% increase from the historical average of $${Math.round(historicalAvg)}.`;
    } else {
        summaryText += `This represents a ${Math.abs(changePercent).toFixed(1)}% decrease from the historical average of $${Math.round(historicalAvg)}.`;
    }
    document.getElementById('summaryText').textContent = summaryText;
    
    // Budget Recommendation
    const upperBound = forecastAvg + stats.stdDev;
    let budgetText = `Allocate $${Math.round(upperBound)} monthly to be safe. This includes a safety margin to cover unexpected expenses. The variance range is ±$${Math.round(stats.stdDev)}.`;
    document.getElementById('budgetText').textContent = budgetText;
    
    // Risk Analysis
    let riskText = 'Standard deviation: $' + Math.round(stats.stdDev) + '. ';
    if (stats.stdDev > historicalAvg * 0.15) {
        riskText += 'Your expenses are relatively volatile - maintain a larger emergency fund.';
    } else if (stats.stdDev < historicalAvg * 0.05) {
        riskText += 'Your expenses are stable - predictable budgeting is possible.';
    } else {
        riskText += 'Your expenses show moderate stability - plan accordingly.';
    }
    document.getElementById('riskText').textContent = riskText;
    
    // Action Items
    let actionText = '✓ Review forecast monthly with actual spending\n';
    if (changePercent > 5) {
        actionText += '✓ Expenses are increasing - identify areas to reduce\n';
    } else if (changePercent < -5) {
        actionText += '✓ Expenses are decreasing - maintain good habits\n';
    }
    actionText += '✓ Keep receipts for verification\n✓ Adjust budget as needed';
    document.getElementById('actionText').textContent = actionText;
}

function getMonthName(month) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[(month - 1) % 12];
}

// Sample Data Functions
function loadSampleData(scenario) {
    let data = '';
    
    switch(scenario) {
        case 'conservative':
            data = '1500, 1520, 1510, 1530, 1525, 1535';
            document.getElementById('trendFactor').value = '1';
            break;
        case 'growth':
            data = '1200, 1350, 1500, 1650, 1800, 1950';
            document.getElementById('trendFactor').value = '5';
            break;
        case 'decline':
            data = '2000, 1850, 1700, 1550, 1400, 1250';
            document.getElementById('trendFactor').value = '-5';
            break;
        case 'volatile':
            data = '1500, 1200, 1900, 1400, 1800, 1100';
            document.getElementById('trendFactor').value = '0';
            break;
    }
    
    document.getElementById('monthlyExpenses').value = data;
    document.getElementById('forecastMonths').value = '6';
    document.getElementById('trendValue').textContent = document.getElementById('trendFactor').value + '%';
    
    // Auto calculate
    setTimeout(calculateForecast, 100);
}