from flask import Flask, render_template, url_for, request

app = Flask(__name__)

@app.route('/')
def index():
	return render_template("index.html")
	#return "hello"

@app.route('/start',  methods=['GET', 'POST'])
def game():
    if request.method == 'POST':            
        return render_template("game.html")
 	
    elif request.method == 'GET':
        return render_template("game.html")

if __name__ == "__main__":
    app.run(debug = True)