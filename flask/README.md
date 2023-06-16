# Machine Learning with Flask for IBM Career Tracker
The machine learning system for the IBM Career Tracker web application was created using Python and Flask. Follow the next steps to be able to run the machine learning python flask server:

Download the latest version of python from the official website https://www.python.org/downloads/ and then follow the installation instructions.

Then you need, in the root directory of the Flask server “IBM-CareerTracker/flask”, to create an “.env” file in which needs to include the following information (edit the info between < >, replace the <> with the information between "" and remove the <>):
```
USER_MAIL = <email of a user (ask the developer team for a user)>
USER_PASSWORD = <hashed password of the user (ask the developer team for a user)>
BACKEND_URL = "http://localhost:3001"
```

Once you have python installed and the .env file created, you need to install flask, which is the framework used by the application. You can install it by running:
```
pip install flask
```

Then, you need to install the dependencies of the application. You can do it by running:
```
pip install -r requirements.txt
```

Then, you need to run the server. You can do it by running:
```
python app.py
```

The server will be running on http://localhost:4000.