import matplotlib
matplotlib.use('Agg')

import sys
import os
import numpy as np
import pandas as pd
from datetime import timedelta, datetime
from math import sqrt
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from flask import Flask, jsonify, request
from flask_cors import CORS
import threading
import matplotlib.pyplot as plt
import io
import base64
from utils import utils  # Ensure you have this utility file

app = Flask(__name__)
CORS(app)

# Initialize the encoders for the symptom prediction model
le_menstrual_flow = LabelEncoder()
le_mood = LabelEncoder()
le_symptoms = LabelEncoder()

# Initialize the RandomForest model for symptom prediction
symptom_model = RandomForestClassifier(n_estimators=100, random_state=42)

# Training data for symptom prediction (same as tracking_symptoms.py)
data = [
    ['light', 'happy', 'no symptoms', 'all fine'],
    ['medium', 'sad', 'headache', 'headache'],
    ['heavy', 'angry', 'cramps', 'cramps'],
    ['light', 'confident', 'no symptoms', 'all fine'],
    ['medium', 'anxious', 'cramps', 'cramps'],
    ['heavy', 'calm', 'headache', 'headache'],
    ['light', 'depressed', 'cramps', 'cramps'],
    ['medium', 'happy', 'no symptoms', 'all fine'],
    ['light', 'anxious', 'migraine', 'migraine'],
    ['heavy', 'happy', 'joint pain', 'joint pain'],
    ['medium', 'confident', 'lower back pain', 'lower back pain'],
    ['light', 'angry', 'cramps', 'cramps'],
    ['medium', 'calm', 'headache', 'headache'],
    ['heavy', 'sad', 'nausea', 'nausea'],
    ['light', 'confident', 'cramps', 'cramps'],
    ['medium', 'happy', 'back pain', 'back pain'],
    ['heavy', 'angry', 'headache', 'headache'],
    ['light', 'depressed', 'joint pain', 'joint pain'],
    ['medium', 'sad', 'no symptoms', 'all fine'],
    ['heavy', 'happy', 'migraine', 'migraine'],
    ['light', 'confident', 'nausea', 'nausea'],
    ['medium', 'anxious', 'leg pain', 'leg pain'],
    ['heavy', 'happy', 'headache', 'headache'],
    ['light', 'sad', 'no symptoms', 'all fine'],
    ['medium', 'calm', 'back pain', 'back pain'],
    ['heavy', 'confident', 'nausea', 'nausea'],
    ['light', 'angry', 'migraine', 'migraine'],
    ['medium', 'happy', 'headache', 'headache'],
    ['heavy', 'sad', 'no symptoms', 'all fine'],
    ['light', 'confident', 'cramps', 'cramps'],
    ['medium', 'depressed', 'migraine', 'migraine'],
    ['heavy', 'anxious', 'joint pain', 'joint pain'],
    ['light', 'happy', 'headache', 'headache'],
    ['medium', 'angry', 'back pain', 'back pain'],
    ['heavy', 'calm', 'cramps', 'cramps'],
    ['light', 'sad', 'nausea', 'nausea'],
    ['medium', 'confident', 'migraine', 'migraine'],
    ['heavy', 'happy', 'no symptoms', 'all fine'],
    ['light', 'depressed', 'lower back pain', 'lower back pain'],
    ['medium', 'angry', 'leg pain', 'leg pain'],
    ['heavy', 'sad', 'cramps', 'cramps'],
    ['light', 'calm', 'nausea', 'nausea'],
    ['medium', 'confident', 'headache', 'headache'],
    ['heavy', 'happy', 'joint pain', 'joint pain'],
    ['light', 'anxious', 'migraine', 'migraine'],
    ['medium', 'sad', 'back pain', 'back pain'],
    ['heavy', 'confident', 'leg pain', 'leg pain'],
    ['light', 'angry', 'cramps', 'cramps'],
    ['medium', 'happy', 'headache', 'headache'],
    ['heavy', 'calm', 'no symptoms', 'all fine'],
    ['light', 'sad', 'migraine', 'migraine'],
    ['medium', 'angry', 'back pain', 'back pain'],
    ['heavy', 'depressed', 'no symptoms', 'all fine'],
    ['light', 'happy', 'cravings', 'all fine'],
    ['medium', 'confident', 'cravings', 'all fine'],
    ['heavy', 'sad', 'cravings', 'all fine'],
    ['light', 'anxious', 'cravings', 'all fine'],
    ['medium', 'angry', 'cravings', 'all fine'],
    ['heavy', 'calm', 'cravings', 'all fine'],
    ['light', 'confident', 'cravings', 'all fine'],
    ['medium', 'happy', 'cravings', 'all fine'],
    ['heavy', 'depressed', 'cravings', 'all fine'],
]

# Split data into features (X) and target (y)
X = [x[:3] for x in data]  # First three columns as features
y = [x[3] for x in data]   # Last column as target (symptoms)

# Fit encoders on the data (including all possible values)
le_menstrual_flow.fit([feature[0] for feature in X])
le_mood.fit([feature[1] for feature in X])
le_symptoms.fit([feature[2] for feature in X])

# Encode features
X_encoded = np.array([
    le_menstrual_flow.transform([feature[0]])[0] for feature in X
]).reshape(-1, 1)

X_encoded = np.hstack((
    X_encoded,
    le_mood.transform([feature[1] for feature in X]).reshape(-1, 1),
    le_symptoms.transform([feature[2] for feature in X]).reshape(-1, 1)
))

# Encode target (y) and flatten it into 1D
y_encoded = le_symptoms.fit_transform(y).ravel()  # Flatten to 1D

# Train the symptom prediction model
symptom_model.fit(X_encoded, y_encoded)


@app.route('/predict_cycle', methods=['POST'])
def predict_cycle():
    # Read synthetic data for cycle prediction
    df = pd.read_csv('C:/CycleBloom/CycleBloom/file/dataset/synthetic_data.csv', sep=',', header=0)
    periods_data = utils.calculate_datatime(df)
    features, labels = utils.generate_final_features(df)

    # Convert features and labels to NumPy arrays if they are not already
    features = np.array(features)
    labels = np.array(labels)

    # Train-test split for cycle prediction
    x_train, x_test, y_train, y_test = train_test_split(features, labels, test_size=0.2, random_state=10)

    # Reshape the data
    train_x = x_train.reshape((x_train.shape[0], x_train.shape[1] * x_train.shape[2]))
    train_y = y_train.reshape((y_train.shape[0], y_train.shape[1] * 1))
    test_x = x_test.reshape((x_test.shape[0], x_test.shape[1] * x_test.shape[2]))
    test_y = y_test.reshape((y_test.shape[0], y_test.shape[1] * 1))

    # Linear Regression Model for cycle prediction
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
    # Format the prediction message
    prediction_message = f"Cycle Length: \n" \
                     f"{start_date.strftime('%B')} {start_date.day} to {end_date.strftime('%B')} {end_date.day}, {cycle_length[0]} days.\n\n" \
                     "Cycle Analysis:\n" \
                     f"The average cycle is typically between 21 and 35 days. A {cycle_length[0]}-day cycle is longer than average and may indicate irregularity.\n\n" \
                     "Possible Causes: \n" \
                     "Irregular or extended cycles can sometimes be influenced by stress, lifestyle changes, hormonal imbalances, or health conditions like polycystic ovary syndrome (PCOS) or thyroid issues.\n\n"


    # Define recommendation based on the predicted cycle length
    if cycle_length[0] < 21:
        recommendation = "Your cycle length is shorter than average. It might be worth consulting a healthcare provider."
    elif cycle_length[0] > 35:
        recommendation = "Your cycle length is longer than average. It may indicate an underlying health issue. Consider seeing a healthcare provider."
    else:
        recommendation = "Your cycle length is within the typical range. Keep monitoring and maintain a healthy lifestyle."

    # RMSE and MAE for cycle prediction
    rms = sqrt(mean_squared_error(test_y, y_pred))
    mae = np.mean(np.abs(test_y - y_pred))

    # Generate plots for cycle prediction
    img_cycle = generate_plot_threaded(cycle_length, test_y[:, 0], 'Cycles', 'Days', 'Cycle Variation', 'linear.png')
    img_period = generate_plot_threaded(periods, test_y[:, 1], 'Periods', 'Days', 'Period Variation', 'linear_periods.png')

    # Include interpretation of the plots in the prediction message
    plot_interpretation = f"RMSE: {rms:.2f}, MAE: {mae:.2f}\n\n" \
                          "The cycle variation graph indicates how the predicted cycle lengths compare to the actual values.\n" \
                          "A significant deviation from the expected range (21-35 days) may warrant further investigation into health conditions.\n" \
                          "The period variation graph similarly shows how the predicted period days compare to actual data."

    # Return the response for cycle prediction
    return jsonify({
        'predictedMessage': prediction_message,
        'plot_interpretation': plot_interpretation,
        'img_cycle': img_cycle,
        'img_period': img_period,
        'recommendation': recommendation
    })


@app.route('/predict_symptoms', methods=['POST'])
def predict_symptoms():
    data = request.json
    menstrual_flow = data.get('menstrual_flow')
    mood = data.get('mood')
    symptoms = data.get('symptoms')

    if not menstrual_flow or not mood or not symptoms:
        return jsonify({'error': 'Missing required input data'}), 400

    try:
        # If symptoms is a list, join them as a string (or handle them as needed)
        if isinstance(symptoms, list):
            symptoms = ', '.join(symptoms)  # Convert the list to a comma-separated string


        input_data = [menstrual_flow, mood, symptoms]
        input_encoded = np.array([
            le_menstrual_flow.transform([input_data[0]])[0],
            le_mood.transform([input_data[1]])[0],
            le_symptoms.transform([input_data[2]])[0]
        ]).reshape(1, -1)

        # Make prediction
        prediction = symptom_model.predict(input_encoded)

        # Decode the prediction
        predicted_symptoms = le_symptoms.inverse_transform(prediction)[0]

        # Generate message and recommendation
        message = generate_message(menstrual_flow, mood, predicted_symptoms)
        recommendation = generate_recommendation(predicted_symptoms)

        return jsonify({
            'predicted_message': message,
            'recommendation': recommendation
        })

    except Exception as e:
        return jsonify({'error': f'Error during prediction: {str(e)}'}), 500



def generate_message(menstrual_flow, mood, symptom):
    # You can expand this logic with more complex rules
    if menstrual_flow == 'light':
        period_info = "your flow is light"
    elif menstrual_flow == 'medium':
        period_info = "your flow is medium"
    else:
        period_info = "your flow is heavy"

    if mood == 'happy':
        mood_info = "you're feeling happy"
    elif mood == 'sad':
        mood_info = "you're feeling sad"
    elif mood == 'angry':
        mood_info = "you're feeling angry"
    elif mood == 'calm':
        mood_info = "you're feeling calm"
    elif mood == 'anxious':
        mood_info = "you're feeling anxious"
    elif mood == 'depressed':
        mood_info = "you're feeling depressed"
    elif mood == 'confident':
        mood_info = "you're feeling confident"
    elif mood == 'insecure':
        mood_info = "you're feeling insecure"
    else:
        mood_info = f"you're feeling {mood}"

    # Now generate a sentence with the symptom
    if symptom == 'headache':
        symptom_info = "you might get a headache on the first day."
    elif symptom == 'cravings':
        symptom_info = "you might experience cravings, try consuming healthy snacks like fruits, nuts, or yogurt."
    elif symptom == 'cramps':
        symptom_info = "you might experience cramps."
    elif symptom == 'back pain':
        symptom_info = "you might experience back pain."
    elif symptom == 'migraine':
        symptom_info = "you might experience a migraine."
    elif symptom == 'joint pain':
        symptom_info = "you might experience joint pain."
    elif symptom == 'nausea':
        symptom_info = "you might experience nausea."
    else:
        symptom_info = "you have no symptoms."

    return f"Based on your symptoms, {period_info}, {mood_info}, and {symptom_info}"


def generate_recommendation(symptom):
    if symptom == 'headache':
        return "Try resting, staying hydrated, and using a cold compress."
    elif symptom == 'cravings':
        return "Consider eating healthy snacks, like fruits, to satisfy your cravings."
    elif symptom == 'cramps':
        return "Try using a heating pad, or consider over-the-counter pain relief."
    elif symptom == 'back pain':
        return "Consider gentle stretching, or using a heating pad."
    elif symptom == 'migraine':
        return "Rest in a dark room and stay hydrated."
    elif symptom == 'joint pain':
        return "Try light exercise or over-the-counter pain relief."
    elif symptom == 'nausea':
        return "Try ginger tea or deep breathing exercises."
    else:
        return "No symptoms reported. Continue to monitor your health."



# Update the function to return the image after generating it
def generate_plot(predictions, actuals, x_label, y_label, title, filename):
    plt.figure(figsize=(10, 6))
    plt.plot(predictions, label='Predicted')
    plt.plot(actuals, label='Actual')
    plt.xlabel(x_label)
    plt.ylabel(y_label)
    plt.title(title)
    plt.legend()
    plt.grid(True)

    # Save plot as a base64 string
    img_io = io.BytesIO()
    plt.savefig(img_io, format='png')
    img_io.seek(0)
    img_base64 = base64.b64encode(img_io.read()).decode('utf-8')
    img_io.close()

    return img_base64

def generate_plot_threaded(predictions, actuals, x_label, y_label, title, filename):
    # Create a thread that generates the plot
    def plot_thread():
        img_base64 = generate_plot(predictions, actuals, x_label, y_label, title, filename)
        return img_base64

    # Start the thread and wait for it to finish
    thread = threading.Thread(target=plot_thread)
    thread.start()
    thread.join()  # Ensure the thread finishes before continuing

    return plot_thread()  # Return the result of the plot generation


if __name__ == '__main__':
    app.run(debug=True)
