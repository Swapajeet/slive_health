import pandas as pd
import joblib
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder

# Load dataset
data = pd.read_csv("dataset.csv")

# Input features
X = data[['Conductivity uS cm',
          'Oxygen ADC',
          'Methane ADC',
          'Ammonia ADC']]

# Output label
y = data['Diagnosis']

# Convert label to number
encoder = LabelEncoder()
y_encoded = encoder.fit_transform(y)

# Train model
model = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)

model.fit(X, y_encoded)

# Save model
joblib.dump(model, "disease_model.pkl")
joblib.dump(encoder, "label_encoder.pkl")

print("Model Trained Successfully!")