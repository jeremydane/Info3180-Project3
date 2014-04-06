""" main.py is the top level script.

Return "Hello World" at the root URL.
"""

import os
import sys

# sys.path includes 'server/lib' due to appengine_config.py
from flask import Flask
from flask import render_template
app = Flask(__name__.split('.')[0])


# declare values
DATABASE = './flaskr.db' 
DEBUG = True 
SECRET_KEY = 'development key' 
USERNAME = 'admin' 
PASSWORD = 'default'

#detect values using config.from_object:
app = Flask(__name__)
app.config.from_object(__name__)

#use a value
username = app.config['USERNAME']


@app.route('/')
@app.route('/<name>')
def hello(name=None):
  return render_template('cards.html', name=name)

@app.route('/login', methods=['GET', 'POST']) 
def login():
    error = None 
    if request.method == 'POST':
        if request.form['username'] != app.config['USERNAME']:
            error = 'Invalid username' 
        elif request.form['password'] != app.config['PASSWORD']:
            error = 'Invalid password' 
        else: 
            session['logged_in'] = True
            flash('You were logged in') 
            return redirect(url_for('show_entries')) 
    return render_template('login.html', error=error)

@app.route('/logout')
def logout(): 
    session.pop('logged_in', None)
    flash('You were logged out') 
    return  redirect(url_for('show_entries'))

@app.errorhandler(404)
def page_not_found(e):
    """Return a custom 404 error."""
    return 'Sorry, Nothing at this URL.', 404
