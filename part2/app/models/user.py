from .basemodel import BaseModel
from app import db, bcrypt
from flask_login import UserMixin
import re

class User(UserMixin, db.Model):
    emails = set()

    def __init__(self, first_name, last_name, email, is_admin=False):
        super().__init__()
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.is_admin = is_admin
        self.places = []
        self.reviews = []
    
    @property
    def first_name(self):
        return self.__first_name
    
    @first_name.setter
    def first_name(self, value):
        if not isinstance(value, str):
            raise TypeError("First name must be a string")
        super().is_max_length('First name', value, 50)
        self.__first_name = value

    @property
    def last_name(self):
        return self.__last_name

    @last_name.setter
    def last_name(self, value):
        if not isinstance(value, str):
            raise TypeError("Last name must be a string")
        super().is_max_length('Last name', value, 50)
        self.__last_name = value

    @property
    def email(self):
        return self.__email

    @email.setter
    def email(self, value):
        if not isinstance(value, str):
            raise TypeError("Email must be a string")
        if not re.match(r"[^@]+@[^@]+\.[^@]+", value):
            raise ValueError("Invalid email format")
        if value in User.emails:
            raise ValueError("Email already exists")
        if hasattr(self, "_User__email"):
            User.emails.discard(self.__email)
        self.__email = value
        User.emails.add(value)

    @property
    def is_admin(self):
        return self.__is_admin
    
    @is_admin.setter
    def is_admin(self, value):
        if not isinstance(value, bool):
            raise TypeError("Is Admin must be a boolean")
        self.__is_admin = value

    def add_place(self, place):
        """Add an amenity to the place."""
        self.places.append(place)

    def add_review(self, review):
        """Add an amenity to the place."""
        self.reviews.append(review)

    def delete_review(self, review):
        """Add an amenity to the place."""
        self.reviews.remove(review)

    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email
        }

    __tablename__ = 'app_users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False, index=True)
    
    # 1. On renomme la colonne
    password = db.Column(db.String(128), nullable=False)
    
    is_admin = db.Column(db.Boolean, default=False, nullable=False)

    def hash_password(self, password_to_hash):
        """
        Hashes the password before storing it.
        """
        # L'énoncé stocke le résultat dans self.password
        self.password = bcrypt.generate_password_hash(password_to_hash).decode('utf-8')

    def verify_password(self, password_to_check):
        """
        Verifies if the provided password matches the hashed password.
        """
        # L'énoncé compare avec self.password
        return bcrypt.check_password_hash(self.password, password_to_check)

    def __repr__(self):
        """
        Représentation utile pour le débogage.
        """
        return f'<User {self.username}>'
