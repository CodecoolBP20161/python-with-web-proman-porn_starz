from flask import Flask, render_template, url_for, request
from model import *
from api import *

app = Flask(__name__)


@app.route('/')
def trello():
    return render_template('home.html')


@app.route('/api', methods=['POST'])
def update():
    incoming_request = request.json
    manager = apiManager(incoming_request, 'post')
    response = manager.handle_request()
    return response


@app.route('/api/<info>',  methods=['GET'])
def request_handling(info):
    incoming_request = info
    manager = apiManager(incoming_request, 'get')
    response = manager.handle_request()
    return response


if __name__ == '__main__':
    init_db()
    app.run(debug=True)
