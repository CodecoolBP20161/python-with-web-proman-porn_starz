from flask import Flask, render_template, redirect, url_for, request

app = Flask(__name__)
app.config.from_object(__name__)


@app.route('/', methods=['GET', 'POST'])
def start():
    return render_template('test.html')

if '__main__' == __name__:
    app.run(debug=True)
