function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function populateQuestions(answers) {
    let used = [];
    let questions = [];
    for (var i = 0; i < answers.length; i++) {
        let wrong_answers = shuffleArray(pics.filter(pic => pic !== answers[i] && !used.includes(pic))).slice(0,3);
        questions.push(shuffleArray(wrong_answers.concat(answers[i])));
        // used.push(answers[i]);
    }
    return questions;
}

function enableExcerpts() {
    for (var i=0; i < c.length; i++) {
        c[i].className = 'excerpt';
        c[i]['children'][1].setAttribute('onClick', `checkAnswer('answer${i+1}', 'icon${i+1}');`);
    }
}

function disableExcerpts() {
    for (var i=0; i < c.length; i++) {
        c[i].className = 'excerpt-disabled';
        c[i]['children'][1].setAttribute('onClick', '');
    }
}

function disableExcerpt(i) {
    c[i].className = 'excerpt-disabled';
    c[i]['children'][1].setAttribute('onClick', '');
}

function playAudio() {
    if (!audio_played) {
        audio.load();
        audio.play();
        play_audio.className = "far fa-play-circle playing";
    }
}

function fadeAudio() {
    var fade = setInterval(() => {
        if (audio.volume > 0.1) {
            audio.volume -= 0.1;
        } else {
            clearInterval(fade);
        }
    }, 25);
}

function checkAnswer(answer, ele) {
    let guess = document.getElementById(answer).getAttribute('src').slice(7);
    let icon = document.getElementById(ele);
    if (guess === answers[current_question]) {
        disableExcerpts();
        fadeAudio();
        icon.className = "far fa-check-circle fade-in";
        icon.style = "font-size: 72px; color: lime;";
        current_question++;
        correct++;
        guesses = 0;
        progress = progress + 20;
        bar.style = `width: ${progress}%`;
        audio_played = false;
        let i = 0;
        var shrink = setInterval(() => {
            if (i === 4) {
                clearInterval(shrink);
            } else {
                c[i].style.transform = 'scale(0)';
                i++;
            }
        }, 250);
        if (correct === 5) {
            setTimeout(() => {
                document.getElementById('main').classList.add('fade-out');
            }, 1250);
            setTimeout(() => {
                window.location.replace("escaped");
            }, 2000);
        } else {
            setTimeout(() => {
                document.getElementById('clip').src = 'static/' + music[current_question];
                document.getElementById('audio').load();
                audio.volume = 1;
                play_audio.className = "far fa-play-circle stopped";
                for (var i=0; i < c.length; i++) {
                    disableExcerpt(i);
                    c[i]['children'][0].className = '';
                    c[i]['children'][1].className = '';
                    c[i]['children'][1].src = 'static/' + questions[current_question][i];
                    c[i].style.transform = 'scale(1)';
                    c[i].style.transform = '';
                }
            }, 1250);
        }
    } else {
        icon.className = "far fa-times-circle fade-in";
        icon.style = "font-size: 72px; color: red;";
        disableExcerpt(answer.slice(-1) - 1);
        guesses++;
        if (guesses === 2) {
            disableExcerpts();
            audio_played = false;
            let i = 0;
            var shrink = setInterval(() => {
                if (i === 4) {
                    clearInterval(shrink);
                } else {
                    c[i].style.transform = 'rotate(13deg) translateY(1000%)';
                    i++;
                }
            }, 250);
            current_question++;
            setTimeout(() => {
                document.getElementById('clip').src = 'static/' + music[current_question];
                document.getElementById('audio').load();
                audio.volume = 1;
                play_audio.className = "far fa-play-circle stopped";
                for (var i=0; i < c.length; i++) {
                    c[i]['children'][0].className = '';
                    c[i]['children'][1].className = '';
                    c[i]['children'][1].src = 'static/' + questions[current_question][i];
                    c[i].style.transform = 'scale(1)';
                    c[i].style.transform = '';
                    guesses = 0;
                }
            }, 1250);
        } 
        if (guesses === 2 && current_question === 5) {
            disableExcerpts();
            audio_played = false;
            let i = 0;
            var shrink = setInterval(() => {
                if (i === 4) {
                    clearInterval(shrink);
                } else {
                    c[i].style.transform = 'rotate(13deg) translateY(1000%)';
                    i++;
                }
            }, 250);
            setTimeout(() => {
                document.getElementById('main').className = 'fade-out';
                location.reload();
            }, 750);
        }
    }
}