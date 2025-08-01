from flask import render_template
from flask_cors import CORS
from app import create_app

# Crée l'application Flask depuis la factory
app = create_app()

# Ajoute CORS sur l'app AVANT de lancer le serveur
CORS(app, origins=["http://localhost:5001", "http://127.0.0.1:5001"], supports_credentials=True)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login')
def login():
    return render_template('login.html')

if __name__ == '__main__':
    app.run(debug=True)
