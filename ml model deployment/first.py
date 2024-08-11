import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import Pipeline
from sklearn.svm import SVC
from sklearn.model_selection import train_test_split
import pickle



# Create a pipeline with TF-IDF vectorizer and Naive Bayes classifier
df=pd.DataFrame(pd.read_csv('Untitled spreadsheet - Sheet1 (2).csv'))
model = Pipeline([
    ('tfidf', TfidfVectorizer()),
    ('clf', MultinomialNB())
])

# Train the model
X = df['symptoms']
y = df['specialization']
model.fit(X, y)

# Example prediction

# Create a pipeline with TF-IDF vectorizer and SVM classifier
model1 = Pipeline([
    ('tfidf', TfidfVectorizer(ngram_range=(1, 2))),  # Using bigrams as well
    ('clf', SVC(kernel='linear', C=1.0))  # SVM with linear kernel
])


# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model.fit(X_train, y_train)


def predict_specialization(symptoms):
    return model.predict([symptoms])[0]

pickle.dump(model,open("model.pkl","wb"))

model.fit(X_train, y_train)
# Make predictions on the testing set
y_pred = model.predict(X_test)
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix

# Calculate accuracy
accuracy = accuracy_score(y_test, y_pred)
print(f"Accuracy: {accuracy:.2f}")

# Classification report (includes precision, recall, and F1-score)
print("Classification Report:")
print(classification_report(y_test, y_pred))

# Confusion matrix
print("Confusion Matrix:")
print(confusion_matrix(y_test, y_pred))


# Example prediction
print(predict_specialization('itching and ring worms'))





