# 📊 Expense Forecasting Project

## Overview

This is a comprehensive **expense forecasting project** that uses time series analysis to predict monthly expenses for the next 3 months. The project combines R statistical analysis with an interactive web-based dashboard.

### 🎯 Objective
Forecast total monthly expenses for September, October, and November 2025 using ARIMA (AutoRegressive Integrated Moving Average) time series modeling based on 32 months of historical data (January 2023 - August 2025).

## 📁 Project Structure

```
isaipriya/
├── docs/                          # Website files (GitHub Pages)
│   ├── index.html                # Home page dashboard
│   ├── analysis.html             # Detailed analysis with charts
│   ├── documentation.html        # Complete documentation
│   ├── styles.css                # Responsive styling
│   ├── chart.js                  # Chart.js data visualization
│   └── README.md                 # This file
├── Copy_of_dma_mini_project.ipynb # R Jupyter Notebook
├── forecast-analysis.R            # Standalone R script
└── README.md                      # Project documentation
```

## 🌐 Live Website

**Visit the dashboard:** https://Isai-csbs.github.io/isaipriya/

### Website Pages
1. **Dashboard** - Quick overview with key metrics
2. **Analysis** - Detailed charts and statistical analysis
3. **Documentation** - Complete methodology and guides

## 📊 Key Features

✨ **Interactive Dashboard**
- Real-time metrics and KPIs
- Responsive design (desktop, tablet, mobile)
- Navigation between multiple pages

📈 **Data Visualization**
- 32-month historical expense data
- 3-month forecast predictions
- 95% confidence intervals
- Interactive Chart.js visualizations

🔬 **Statistical Analysis**
- ARIMA(0,0,0) model with constant mean
- Automatic parameter selection
- Residual diagnostics
- Confidence interval calculations

🛠️ **Technologies**
- **Backend**: R (tidyverse, lubridate, forecast)
- **Frontend**: HTML5, CSS3, JavaScript
- **Visualization**: Chart.js
- **Version Control**: Git & GitHub
- **Hosting**: GitHub Pages

## 📈 Forecast Results

### Point Forecasts
| Month | Predicted Expense | 95% CI Lower | 95% CI Upper |
|-------|------------------|-------------|---------------|
| Sep 2025 | $1,850 | $1,720 | $1,980 |
| Oct 2025 | $1,860 | $1,710 | $2,010 |
| Nov 2025 | $1,870 | $1,700 | $2,040 |

### Key Statistics
- **Historical Data Range**: $1,400 - $1,950
- **Historical Mean**: $1,737
- **Trend**: +$10-15 per month
- **RMSE**: $122.39
- **MAPE**: 6.12%

## 🚀 Getting Started

### Option 1: View the Website
1. Open https://Isai-csbs.github.io/isaipriya/
2. Navigate through Dashboard, Analysis, and Documentation pages
3. Explore interactive charts and detailed forecasts

### Option 2: Run the R Analysis

#### Using Jupyter Notebook
```bash
# Install R and required packages
install.packages(c("tidyverse", "lubridate", "forecast"))

# Run the notebook in Google Colab or Jupyter
# File: Copy_of_dma_mini_project.ipynb
```

#### Using R Script
```bash
# Run the R script
Rscript forecast-analysis.R
```

## 📚 Project Components

### 1. Data Analysis (R)
- **Input**: Mock transaction data (32 months)
- **Process**: Data cleaning, time series conversion, ARIMA modeling
- **Output**: Point forecasts with confidence intervals

### 2. Web Dashboard
- **Pages**: Home, Analysis, Documentation
- **Features**: Responsive design, interactive charts, comprehensive documentation
- **Deployment**: GitHub Pages (automatic from `/docs` folder)

### 3. Visualization
- **Historical Chart**: 32 months of actual expenses
- **Forecast Chart**: 3-month predictions with confidence bands
- **Statistics**: Summary metrics and diagnostics

## 🔬 Methodology

### ARIMA Model
ARIMA (AutoRegressive Integrated Moving Average) is a statistical method for analyzing time series data:

- **AR (AutoRegressive)**: Uses past values to predict future values
- **I (Integrated)**: Handles non-stationary data through differencing
- **MA (Moving Average)**: Uses past forecast errors

### Model Selection
1. Test data stationarity (ADF test)
2. Analyze ACF/PACF plots
3. Use `auto.arima()` for optimal parameters
4. Validate with residual diagnostics
5. Generate forecasts with confidence intervals

### Selected Model
**ARIMA(0,0,0)** - A white noise model with constant mean
- Indicates no significant autocorrelation
- Stable expense pattern
- Suitable for short-term forecasting

## 💡 Key Insights

📈 **Upward Trend**
- Monthly expenses increase by ~$10-15 per month
- Consistent pattern over 32-month period

🎯 **Stable Pattern**
- No seasonality detected
- Stable variance throughout
- Ideal for ARIMA forecasting

💼 **Budget Planning**
- Allocate $1,850-$1,900 monthly for next quarter
- Maintain 5-10% contingency buffer
- Review and update quarterly

## 🛠️ Technologies Used

### Statistical Analysis
- **R**: Programming language
- **tidyverse**: Data manipulation and visualization
- **lubridate**: Date/time handling
- **forecast**: ARIMA modeling and diagnostics

### Web Technologies
- **HTML5**: Semantic markup
- **CSS3**: Responsive styling
- **JavaScript**: Interactive functionality
- **Chart.js**: Data visualizations

### Version Control & Hosting
- **Git**: Version control
- **GitHub**: Repository hosting
- **GitHub Pages**: Static site deployment

## 📖 Documentation

For detailed information, visit the **Documentation** page on the website:
- Project overview and objectives
- Data source and preparation
- Statistical methodology
- Results interpretation
- Business recommendations
- FAQ section

## ❓ Frequently Asked Questions

**Q: How accurate is this forecast?**
A: The 95% confidence intervals show where actual values likely fall. MAPE of 6.12% indicates good accuracy.

**Q: When should I update the forecast?**
A: Update monthly or quarterly with new data for best results.

**Q: Can I use this for other data?**
A: Yes! The methodology applies to any univariate time series.

**Q: What if my data follows a different pattern?**
A: Modify the R script for different ARIMA parameters or alternative models.

## 🔄 How to Update

### Update with New Data
1. Modify the R script's mock data or load actual CSV
2. Re-run the analysis
3. Update `chart.js` with new forecast values
4. Commit changes to GitHub
5. Website auto-updates via GitHub Pages

### Step-by-Step
```r
# In forecast-analysis.R
mock_data <- read_csv("your_actual_data.csv")  # Load real data
# Re-run analysis...
```

```javascript
// In chart.js
const historicalData = [1647, 1464, ...];  // Update with new values
const forecastData = [1850, 1860, 1870];   // Update predictions
```

## 📞 Support & Contributions

### Report Issues
- GitHub Issues: [Create an issue](https://github.com/Isai-csbs/isaipriya/issues)

### Contribute
- Fork the repository
- Create a feature branch
- Submit a pull request

### Contact
- Author: [@Isai-csbs](https://github.com/Isai-csbs)
- Repository: [isaipriya](https://github.com/Isai-csbs/isaipriya)

## 📄 License

This project is open source and available under the MIT License.

## 🎓 Educational Purpose

This project is part of the Data Mining and Analysis (DMA) mini project for learning:
- Time series analysis
- ARIMA modeling
- Data visualization
- Web dashboard creation
- Full-stack data science workflow

## 🚀 Future Enhancements

- [ ] Backend API integration
- [ ] Database for data storage
- [ ] Multiple forecast models comparison
- [ ] Real-time data updates
- [ ] Export to PDF/CSV
- [ ] User authentication
- [ ] Interactive parameter tuning
- [ ] Advanced visualizations

---

**Last Updated**: May 13, 2026  
**Website**: https://Isai-csbs.github.io/isaipriya/  
**Repository**: https://github.com/Isai-csbs/isaipriya