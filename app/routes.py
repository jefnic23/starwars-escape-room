from flask import render_template
from random import shuffle
from app import app

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/quiz')
def quiz():
    pics = ['cantina_band.png', 'force_theme.png', 'leia_theme.png', 'main_theme.png', 'rebel_theme.png']
    answers = pics
    shuffle(answers)
    music = [f[:-3] + 'mp3' for f in answers]
    return render_template('quiz.html', pics=pics, answers=answers, music=music)

@app.route('/escaped')
def escaped():
    return render_template('escaped.html')

if __name__ == '__main__':
    app.run()