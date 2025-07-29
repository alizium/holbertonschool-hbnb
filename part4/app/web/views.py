from flask import Blueprint, render_template

web = Blueprint('web', __name__, template_folder='../../templates')

@web.route('/')
def home():
    return render_template('index.html')

@web.route('/login')
def login():
    return render_template('login.html')

@web.route('/place')
def place():
    return render_template('place.html')

@web.route('/add_review')
def add_review():
    return render_template('add_review.html')
