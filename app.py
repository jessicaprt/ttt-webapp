from flask import Flask, render_template, url_for, request

app = Flask(__name__)

@app.route('/')
def index():
	return render_template("index.html")
	#return "hello"

@app.route('/start',  methods=['GET', 'POST'])
def game():
    if request.method == 'POST':
        #button 0
        if request.form['block0'] == "1":
            print("hi")
        elif request.form['block0'] == "2":
            print("hey")
        else:
            b0=False

        #button 1
        '''if request.form['block1']  == " ":
            b1=True
        elif request.form['block1'] == "X":
            b1=False
        else:
            b1=False'''
            
        return render_template("game.html")
 	
    elif request.method == 'GET':
        return render_template("game.html")

if __name__ == "__main__":
    app.run(debug = True)