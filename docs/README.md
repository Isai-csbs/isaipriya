# Expense Forecasting Website

A modern, interactive dashboard for viewing expense forecasting analysis and predictions.

## 📊 Features

- **Historical Data Visualization**: 24-month historical expense data with interactive charts
- **3-Month Forecast**: AI-powered predictions with confidence intervals
- **Key Metrics**: Display of average expenses, trends, and forecast accuracy
- **Responsive Design**: Mobile-friendly interface that works on all devices
- **Detailed Insights**: Analysis of trends and budget planning recommendations
- **Methodology Documentation**: Explanation of forecasting approach and tools used

## 🚀 Getting Started

### Local Deployment

1. Open `index.html` in your web browser
2. The dashboard will load with sample data

### GitHub Pages Deployment

The website is automatically deployed to GitHub Pages at:
```
https://Isai-csbs.github.io/isaipriya/
```

## 📁 File Structure

```
docs/
├── index.html      # Main dashboard page
├── styles.css      # Styling and layout
├── chart.js        # Chart visualization and data
└── README.md       # This file
```

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript
- **Charts**: Chart.js library
- **Data**: Sample monthly expense data (24 months historical + 3-month forecast)
- **Styling**: Custom CSS with responsive design

## 📈 Forecasting Methodology

### Data Source
- Historical transaction data spanning 24 months (Jan 2023 - Dec 2024)

### Forecasting Method
- **Model**: ARIMA (AutoRegressive Integrated Moving Average)
- **Components**:
  - Base expense calculation
  - Trend analysis (approx. +$10/month)
  - Noise/variance modeling
  - 95% confidence interval estimation

### Tools Used (R-based Analysis)
- **tidyverse**: Data manipulation and analysis
- **lubridate**: Date and time handling
- **forecast**: Time series forecasting

## 📊 Dashboard Sections

### 1. Key Metrics
Displays four important metrics:
- Average Monthly Expense
- Trend direction and rate
- Forecast accuracy percentage
- Number of historical data points

### 2. Historical & Forecast Chart
Interactive line chart showing:
- 24 months of historical data (solid blue line)
- 3-month forecast (orange dashed line)
- 95% confidence intervals (green dashed lines)

### 3. Forecast Table
Detailed predictions for the next 3 months including:
- Predicted expense amount
- 95% confidence interval range

### 4. Key Insights
Auto-generated insights about:
- Trend analysis
- Pattern stability
- Forecast confidence
- Budget planning recommendations

### 5. Methodology
Documentation of:
- Data sources
- Forecasting methods
- Statistical tools used
- R packages employed

## 🎨 Customization

### Update Data
To use real data instead of sample data:

1. **Update `chart.js`**:
   - Modify the `historicalData` array with your actual expense data
   - Update `forecastData` with predicted values from R forecast
   - Adjust `confidenceHigh` and `confidenceLow` arrays

2. **Update Metrics** in `index.html`:
   - Average Monthly Expense
   - Trend value
   - Forecast accuracy

3. **Update Forecast Table**:
   - Replace the 3-month predictions
   - Update confidence intervals

### Styling Changes
Edit `styles.css` to:
- Change colors by modifying CSS variables (`:root` section)
- Adjust fonts and spacing
- Modify responsive breakpoints

## 🔄 Integration with R Analysis

Your R script generates the forecast data:
```r
# The R analysis produces:
# - Historical monthly totals
# - Forecast predictions
# - Confidence intervals
# - Statistical metrics
```

To integrate real forecasts:
1. Run your R script to generate predictions
2. Extract the forecast values and confidence intervals
3. Update `chart.js` with the actual data
4. Update metrics in `index.html`

## 📱 Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Full responsive support

## 📝 Notes

- The website uses Chart.js CDN for chart rendering
- All styling is self-contained in `styles.css`
- No database or backend required for deployment
- Data is hardcoded for static deployment

## 🚀 Future Enhancements

- [ ] Backend API integration for dynamic data
- [ ] Database for historical data storage
- [ ] User authentication
- [ ] Export to PDF/CSV
- [ ] Multiple forecast models comparison
- [ ] Real-time data updates
- [ ] User-customizable forecast periods

## 📧 Contact

For questions or improvements, visit: https://github.com/Isai-csbs/isaipriya

---

**Last Updated**: May 13, 2026
