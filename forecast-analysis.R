# Expense Forecasting Analysis Script
# Purpose: Forecast total monthly expenses for the next 3 months
# Date: 2026-05-13

library(tidyverse)
library(lubridate)
library(forecast)

# ============================================================================
# STEP 1: Define the Objective
# ============================================================================
print("Objective: Forecast the total monthly expenses for the next 3 months.")

# ============================================================================
# STEP 2: Create a MOCK Transaction Dataset
# ============================================================================
# Note: Replace with your actual CSV loading: 
# mock_data <- read_csv("your_transactions.csv")

set.seed(42)
num_months <- 24
start_date <- ymd("2023-01-01")

# Create a data frame spanning 24 months
mock_data <- tibble(
  Date = seq(start_date, by = "month", length.out = num_months)
) %>%
  # Simulate monthly total spending with a slight upward trend and some noise
  mutate(
    Month = floor_date(Date, "month"),
    BaseExpense = 1500 + (row_number() * 10),
    Noise = rnorm(num_months, mean = 0, sd = 100),
    Total_Expense = round(BaseExpense + Noise, 0)
  ) %>%
  select(Month, Total_Expense)

# View the first few rows of the mock data
print("Historical Data (First 6 months):")
print(head(mock_data))
print("")
print("Historical Data (Last 6 months):")
print(tail(mock_data))

# ============================================================================
# STEP 3: Create a Time Series Object
# ============================================================================
expense_ts <- ts(mock_data$Total_Expense, 
                 start = c(2023, 1), 
                 frequency = 12)  # Monthly data

print("Time Series Summary:")
print(summary(expense_ts))

# ============================================================================
# STEP 4: Perform ARIMA Forecasting
# ============================================================================

# Auto-select ARIMA parameters
arima_model <- auto.arima(expense_ts, 
                          max.p = 5, 
                          max.q = 5, 
                          max.P = 2, 
                          max.Q = 2)

print("ARIMA Model Summary:")
print(summary(arima_model))

# ============================================================================
# STEP 5: Generate 3-Month Forecast
# ============================================================================
forecast_result <- forecast(arima_model, h = 3)  # h = 3 for 3 months ahead

print("")
print("=== 3-MONTH FORECAST RESULTS ===")
print(forecast_result)

# ============================================================================
# STEP 6: Extract and Display Forecast Details
# ============================================================================
forecast_df <- tibble(
  Month = c("Month 25 (Jan 2025)", "Month 26 (Feb 2025)", "Month 27 (Mar 2025)"),
  Predicted_Expense = round(as.numeric(forecast_result$mean), 2),
  Lower_95_CI = round(as.numeric(forecast_result$lower[, 2]), 2),
  Upper_95_CI = round(as.numeric(forecast_result$upper[, 2]), 2)
)

print("\nDetailed Forecast Table:")
print(forecast_df)

# ============================================================================
# STEP 7: Calculate Key Statistics
# ============================================================================
average_expense <- round(mean(mock_data$Total_Expense), 2)
trend_rate <- round(10, 2)  # Approximate from BaseExpense calculation
forecasted_average <- round(mean(forecast_df$Predicted_Expense), 2)

print("\n=== KEY STATISTICS ===")
print(paste("Average Historical Monthly Expense: $", average_expense))
print(paste("Monthly Trend Rate: +$", trend_rate))
print(paste("Average Forecasted Expense (3 months): $", forecasted_average))
print(paste("Forecast Confidence Level: 95%"))
print(paste("Model AIC:", round(arima_model$aic, 2)))

# ============================================================================
# STEP 8: Visualization
# ============================================================================
print("\nGenerating visualization...")

# Plot the forecast
png("forecast_plot.png", width = 1200, height = 600, res = 100)
autoplot(forecast_result) +
  labs(title = "24-Month Historical Expenses & 3-Month Forecast",
       x = "Time (Months)",
       y = "Total Monthly Expense ($)",
       subtitle = "ARIMA Model with 95% Confidence Intervals") +
  theme_minimal() +
  theme(plot.title = element_text(size = 16, face = "bold"),
        plot.subtitle = element_text(size = 12))
dev.off()

print("Forecast plot saved as 'forecast_plot.png'")

# ============================================================================
# STEP 9: Recommendations
# ============================================================================
print("\n=== BUDGET RECOMMENDATIONS ===")
print("Based on the forecast analysis:")
print(paste("1. Expected average monthly expense: $", forecasted_average))
print(paste("2. Budget range (95% CI): $", 
            paste(forecast_df$Lower_95_CI[1], "-", forecast_df$Upper_95_CI[1])))
print("3. Maintain current spending patterns as trend is stable")
print("4. Monitor for any anomalies or unexpected increases")
print("5. Review forecast quarterly with actual data")

print("\n=== ANALYSIS COMPLETE ===")