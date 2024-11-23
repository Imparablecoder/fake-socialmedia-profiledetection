from flask import Flask, render_template, request
import numpy as np
import tensorflow as tf
import pandas as pd
from sklearn.preprocessing import StandardScaler

app = Flask(__name__)

model = tf.keras.models.load_model('project1.h5')

scaler = StandardScaler()
instagram_df = pd.read_excel("whole big data set.xlsx")
X = instagram_df.drop(columns=['fake'])
scaler.fit(X)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
 
    profile_pic = int(request.form['profile_pic'])
    Numbs_length_of_username = float(request.form['Numbs_length_of_username'])
    FullName_In_Words = float(request.form['FullName_In_Words'])
    Numbs_length_of_Fullname = float(request.form['Numbs_length_of_Fullname'])
    Name=Username = int(request.form['Name==Username'])
    Description_Length = float(request.form['Description_Length'])
    External_URL = int(request.form['External_URL'])
    private_account = int(request.form['private_account'])
    Total_posts = int(request.form['Total_posts'])
    Followers = int(request.form['Followers'])
    Follows = int(request.form['Follows'])

    
    user_data = np.array([[profile_pic,Numbs_length_of_username, FullName_In_Words, Numbs_length_of_Fullname, 
                           Name==Username, Description_Length, External_URL, 
                           private_account, Total_posts, Followers, Follows]])


    user_data_scaled = scaler.transform(user_data)


    prediction = model.predict(user_data_scaled)
    predicted_class = np.argmax(prediction, axis=1)


    result = "FAKE" if predicted_class == 1 else "REAL"

    return render_template('index.html', prediction_text=f'THIS PROFILE IS PREDICTED TO BE {result}')

if __name__ == '__main__':
    app.run(debug=True)

