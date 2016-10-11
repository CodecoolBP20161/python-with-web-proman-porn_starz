from flask import Flask, render_template, url_for

app = Flask(__name__)


@app.route('/')
def trello():
    return render_template('trello.html')


if __name__ == '__main__':
    app.run(debug=True)
