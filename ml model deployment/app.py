from flask import Flask, request, jsonify, render_template
import pickle
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)
model = pickle.load(open("model.pkl", "rb"))

@app.route("/predict", methods=["POST"])
def predict():
    try:
        
        data = request.json
        feature1 = data.get("feature1")
        feature2 = data.get("feature2")
        feature3 = data.get("feature3")
        feature4 = data.get("feature4")
        feature5 = data.get("feature5")
        print()
        
        # Log the extracted features for debugging
        print("Extracted features:", feature1, feature2, feature3, feature4, feature5)

        # Combine the features into a single string
        combined_symptoms = f"{feature1} and {feature2} and {feature3} and {feature4} and {feature5}"

        # Log the combined symptoms for debugging
        print("Combined Symptoms:", combined_symptoms)

        # Make prediction
        prediction = model.predict([combined_symptoms])  # Model expects a list of text documents

        # Log the prediction result
        print("Prediction:", prediction)

        # Return prediction result as JSON
        return jsonify({'prediction': prediction[0]})  # Return the first (and only) prediction

    except Exception as e:
        # Log the error message and return it as JSON
        print("Error:", e)
        return jsonify({'error': str(e)}), 500

@app.route("/")
def index():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)
