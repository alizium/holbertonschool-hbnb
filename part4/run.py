from flask import render_template
from flask_cors import CORS
from app import create_app

app = create_app()
CORS(app)  # <= Ajoute cette ligne juste après la création de app

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login')
def login():
    return render_template('login.html')

if __name__ == '__main__':
    app.run(debug=True)
