import matplotlib
matplotlib.use('Agg')  # Use non-GUI backend

import sys
import os

# Ensure the modelsAI directory is included in the path
sys.path.append(os.path.join(os.path.dirname(__file__), 'modelsAI'))

from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import numpy as np
from datetime import timedelta, datetime
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
from math import sqrt
import matplotlib.pyplot as plt
import io
import base64
from utils import utils  # Correct import for utils
import sys
import os

app = Flask(__name__)
CORS(app)


@app.route('/predict', methods=['POST'])
def predict():
    # Read synthetic data
    df = pd.read_csv('C:/CycleBloom/CycleBloom/file/dataset/synthetic_data.csv', sep=',', header=0)
    periods_data = utils.calculate_datatime(df)
    features, labels = utils.generate_final_features(df)

    # Convert features and labels to NumPy arrays if they are not already
    features = np.array(features)
    labels = np.array(labels)

    # Train-test split
    x_train, x_test, y_train, y_test = train_test_split(features, labels, test_size=0.2, random_state=10)
    
    # Reshape the data
    train_x = x_train.reshape((x_train.shape[0], x_train.shape[1] * x_train.shape[2]))
    train_y = y_train.reshape((y_train.shape[0], y_train.shape[1] * 1))
    test_x = x_test.reshape((x_test.shape[0], x_test.shape[1] * x_test.shape[2]))
    test_y = y_test.reshape((y_test.shape[0], y_test.shape[1] * 1))

    # Linear Regression Model
    model_LR = LinearRegression()
    model_LR.fit(train_x, train_y)
    y_pred = model_LR.predict(test_x)

    # Predicted cycle length and periods
    output_pred = [[int(round(i[0])), int(round(i[1]))] for i in y_pred]
    cycle_length = [i[0] for i in output_pred]
    periods = [i[1] for i in output_pred]

    # Calculate start and end dates for the cycle
    start_date = datetime(2024, 9, 2)  # Example start date, adjust as needed
    end_date = start_date + timedelta(days=cycle_length[0])  # Assuming cycle_length is in days

    # Format the prediction message
    prediction_message = f"Cycle Length: {start_date.strftime('%B')} {start_date.day} to {end_date.strftime('%B')} {end_date.day}, {cycle_length[0]} days.\n\n" \
                         "Cycle Analysis:\n" \
                         f"The average cycle is typically between 21 and 35 days. A {cycle_length[0]}-day cycle is longer than average and may indicate irregularity.\n\n" \
                         "Possible Causes: Irregular or extended cycles can sometimes be influenced by stress, lifestyle changes, hormonal imbalances, or health conditions like polycystic ovary syndrome (PCOS) or thyroid issues.\n\n"

    # Define recommendation based on the predicted cycle length
    if cycle_length[0] < 21:
        recommendation = "Your cycle length is shorter than average. It might be worth consulting a healthcare provider."
    elif cycle_length[0] > 35:
        recommendation = "Your cycle length is longer than average. It may indicate an underlying health issue. Consider seeing a healthcare provider."
    else:
        recommendation = "Your cycle length is within the typical range. Keep monitoring and maintain a healthy lifestyle."

    # RMSE and MAE
    rms = sqrt(mean_squared_error(test_y, y_pred))
    mae = np.mean(np.abs(test_y - y_pred))

    # Generate plots (pass correct arguments to generate_plot)
    img_cycle = generate_plot(cycle_length, test_y[:, 0], 'Cycles', 'Days', 'Cycle Variation', 'linear.png')
    img_period = generate_plot(periods, test_y[:, 1], 'Periods', 'Days', 'Period Variation', 'linear_periods.png')

    # Include interpretation of the plots in the prediction message
    plot_interpretation = f"RMSE: {rms:.2f}, MAE: {mae:.2f}\n\n" \
                          "The cycle variation graph indicates how the predicted cycle lengths compare to the actual values.\n" \
                          "A significant deviation from the expected range (21-35 days) may warrant further investigation into health conditions.\n" \
                          "The period variation graph similarly shows how the predicted period days compare to actual data."

    # Return the response
    return jsonify({
        'predictedMessage': prediction_message,  # Return the formatted message
        'plot_interpretation': plot_interpretation,  # Additional insights based on the plot
        'img_cycle': img_cycle,
        'img_period': img_period,
        'recommendation': recommendation  # Return the recommendation
    })

def generate_plot(predictions, actuals, xlabel, ylabel, title, filename):
    # Create a figure and axis
    fig, ax = plt.subplots()
    
    # Plot the predictions vs actuals
    ax.plot(actuals, label='Actual', color='blue')
    ax.plot(predictions, label='Predicted', color='red')
    
    # Add labels and title
    ax.set_xlabel(xlabel)
    ax.set_ylabel(ylabel)
    ax.set_title(title)
    
    # Add legend
    ax.legend()

    # Save plot to a BytesIO object to return as base64
    img = io.BytesIO()
    plt.savefig(img, format='png')
    img.seek(0)
    
    # Convert to base64
    img_base64 = base64.b64encode(img.getvalue()).decode('utf-8')

    return img_base64


def save_plot_to_base64(fig, filename):
    """Helper function to convert a plot to a base64 image string."""
    buf = io.BytesIO()
    fig.savefig(buf, format='png')
    buf.seek(0)
    img_str = base64.b64encode(buf.read()).decode('utf-8')
    buf.close()
    return img_str
    

if __name__ == '__main__':
    app.run(debug=True)
