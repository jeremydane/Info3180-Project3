""" main.py is the top level script.

Return "Hello World" at the root URL.
"""

import os
import sys

# sys.path includes 'server/lib' due to appengine_config.py
from flask import Flask, url_for
from flask import request
from flask import render_template
app = Flask(__name__.split('.')[0])

@app.route('/')
@app.route('/<name>')
def hello(name=None):
    return render_template('cards.html', name=name)


@app.route('/login')#, methods=['POST', 'GET'])
@app.route('/login/<name>')
def login():
    error = None
    session['logged_in'] = True
    #flash('You were logged in')
    # the code below is executed if the request method
    # was GET or the credentials were invalid
    return render_template('cards.html', error=error)

def logout():
    # remove the username from the session if it's there
    session.pop('username', None)
    return redirect(url_for('index'))

@app.errorhandler(404)
def page_not_found(e):
     return 'Sorry, Nothing at this URL.', 404
