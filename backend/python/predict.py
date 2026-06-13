import sys
import joblib
import json

# Load model
model = joblib.load("disease_model.pkl")
encoder = joblib.load("label_encoder.pkl")

# Get values from Node.js
conductivity = float(sys.argv[1])
oxygen = float(sys.argv[2])
methane = float(sys.argv[3])
ammonia = float(sys.argv[4])

sample = [[
    conductivity,
    oxygen,
    methane,
    ammonia
]]

# Disease prediction
prediction = model.predict(sample)

# Disease name
disease = encoder.inverse_transform(prediction)[0]

# Confidence percentage
probabilities = model.predict_proba(sample)[0]

# Convert to disease names
all_diseases = encoder.classes_

result = []

for disease_name, prob in zip(all_diseases, probabilities):
    result.append({
        "disease": disease_name,
        "percentage": round(float(prob * 100), 2),
        "ammonia": ammonia
    })

# Send JSON to Node.js
print(json.dumps(result))