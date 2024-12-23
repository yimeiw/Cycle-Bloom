from flask import Flask, request, jsonify
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Initialize the encoders for each feature
le_menstrual_flow = LabelEncoder()
le_mood = LabelEncoder()
le_symptoms = LabelEncoder()

# Initialize the model
model = RandomForestClassifier(n_estimators=100, random_state=42)

# Training data
# Updated dataset with flow, mood, symptoms as input, and target (prediction)
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

# Train the model
model.fit(X_encoded, y_encoded)


def generate_recommendation(symptom):
    """
    Generates a recommendation based on the predicted symptom.
    """
    recommendations = {
        'cravings': "Try consuming healthy snacks like fruits, nuts, or yogurt to satisfy cravings. Stay hydrated, as thirst can sometimes be mistaken for hunger.",
        'headache': "Consider pain relievers like Ibuprofen or aspirin. Rest and hydration may also help.",
        'cramps': "Try a heating pad, gentle stretching, or over-the-counter pain relief.",
        'back pain': "Use a warm compress, take rest, or try topical pain-relief creams.",
        'migraine': "Rest in a dark, quiet room. Over-the-counter or prescribed medications may help.",
        'joint pain': "Apply ice or use anti-inflammatory medication. Gentle exercises can help.",
        'nausea': "Ginger tea, small frequent meals, or anti-nausea medication might help.",
        'leg pain': "Elevate your legs, stay hydrated, or use muscle relaxants.",
        'lower back pain': "Apply heat, avoid heavy lifting, and practice gentle stretching.",
        'no symptoms': "You seem to be symptom-free. Maintain a healthy lifestyle to stay well.",
    }
    return recommendations.get(symptom, "No specific recommendation available for this symptom.")


@app.route('/predict', methods=['POST'])
def predict_symptoms():
    data = request.json
    print('Received data:', data)  # Log the incoming request data for debugging

    # Ensure the required fields are in the incoming request
    menstrual_flow = data.get('menstrual_flow')
    mood = data.get('mood')
    symptoms = data.get('symptoms')

    if not menstrual_flow or not mood or not symptoms:
        return jsonify({'error': 'Missing required input data'}), 400  # Return error if data is missing

    # Process the data (encode using the corresponding encoders)
    try:
        # Ensure symptoms is a single string, not a list
        if isinstance(symptoms, list):
            symptoms = symptoms[0]  # Take the first symptom if it's a list

        input_data = [menstrual_flow, mood, symptoms]
        input_encoded = np.array([
            le_menstrual_flow.transform([input_data[0]])[0],
            le_mood.transform([input_data[1]])[0],
            le_symptoms.transform([input_data[2]])[0]
        ]).reshape(1, -1)

        # Make prediction
        prediction = model.predict(input_encoded)

        # Decode the prediction to get the original symptom label
        predicted_symptoms = le_symptoms.inverse_transform(prediction)[0]

        # Generate a descriptive output based on the inputs and prediction
        message = generate_message(menstrual_flow, mood, predicted_symptoms)

        recommendation = generate_recommendation(predicted_symptoms)
        print('Generated recommendation:', recommendation)

        return jsonify({
            'predicted_message': message,
            'recommendation': recommendation
        })

    except Exception as e:
        print(f"Error during prediction: {str(e)}")
        return jsonify({'error': f'Error during prediction: {str(e)}'}), 500

def generate_message(menstrual_flow, mood, symptom):
    """
    Generates a natural language message based on menstrual flow, mood, and predicted symptom.
    """
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
        symptom_info = "you might feel nauseous."
    elif symptom == 'leg pain':
        symptom_info = "you might experience leg pain."
    elif symptom == 'lower back pain':
        symptom_info = "you might experience lower back pain."
    elif symptom == 'no symptoms':
        symptom_info = "there are no major symptoms predicted, but make sure to stay healthy and hydrated."
    elif symptom == 'all fine':
        symptom_info = "everything seems to be in good condition, no symptoms detected."
    else:
        symptom_info = f"there is no specific information for the symptom '{symptom}'."

    return f"Based on your last period and cycle, {period_info}, {mood_info}, and {symptom_info}"

if __name__ == '__main__':
    app.run(debug=True)
