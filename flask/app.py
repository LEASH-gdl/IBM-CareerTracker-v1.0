from flask import Flask
from routes.files import routes_files
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": ["http://localhost:3000"]}}) # CORS
app.register_blueprint(routes_files)

if __name__ == '__main__':
    app.run(debug = True, port= "4000", host="0.0.0.0")
