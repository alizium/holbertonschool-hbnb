from flask import render_template
from app import create_app

app = create_app()

@app.route('/login')
def login():
    return render_template('login.html')

if __name__ == '__main__':
    app.run()
