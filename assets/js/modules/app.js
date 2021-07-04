import Question from './Question.js';
import Quiz from './Quiz.js';
import questions from './Questions.js';

// import getJson from './function.js';

const App = (() => {

    // GETTING REQUIRED ELEMENTS
    const quizDiv           = document.querySelector('.quiz');
    const question          = document.querySelector('#question');
    const questionProgress  = document.querySelector('.question-progress-ul');
    const codeDiv           = document.querySelector('.code');
    const codeText          = document.querySelector('.code-text');
    const answers           = document.querySelector('.answers');
    const btnReset          = document.querySelector('.btn-reset');
    const btnNext           = document.querySelector('.btn-next');
    const timer             = document.querySelector('.timer');
    const time              = document.querySelector('.time');
    const hr                = document.querySelector('#hr');
    const min               = document.querySelector('#min');
    const sc                = document.querySelector('#sc');
    const timeProgress      = document.querySelector('.time-progress');
    const innerProgress     = document.querySelector('#t-progress');

    // SET QUIZ QUESTIONS
    let questionsArray = [];

    // $.getJSON('assets/js/modules/Questions.json', function (data) {
    //     $.each(data, function (key,model) {
    //         const q = new Question(model.id, model.question, model.code, model.answers, model.correct, model.checked);
    //         questionsArray.push(q);
    //     });
    // });

    questions.forEach(function(data){
        const q = new Question(data.id, data.question, data.code, data.answers, data.correct, data.checked);
        questionsArray.push(q);
    });

    const quiz =  new Quiz(questionsArray);

    const setValue = (elem, value) => {
        elem.innerHTML = value;
    }

    const renderQuestionProgress = () => {
        let markUp = '';

        //GREEN :: <i class="fas fa-check-circle"></i>
        //RED   :: <i class="fas fa-times-circle"></i>
        //OTHER :: <i class="far fa-circle"></i>

        quiz.questions.forEach( (question) => {
            markUp += `
                <li>
                    <a href="" class="q-no q-border" id="cr_${question.correct}">
                        <i class="far fa-circle"></i>
                    </a>
                </li>
            `;
        });

        setValue(questionProgress, markUp);
    }

    const renderQuestion = () => {
        const curQuestion = quiz.getCurrentQuestion();
        setValue(question, curQuestion.question);
        if(curQuestion.code != null){
            codeDiv.style.display = "block";
            setValue(codeText, curQuestion.code);
        }
        else{
            codeDiv.style.display = "none";
        }
    }

    const renderChoices = () => {
        let markUp = '';

        $.each(quiz.getCurrentQuestion().answers, function(k, v) {
            let val = '';
            markUp += `
                <div class="col-md-6">
                    <label for="choice">
                        <input type="radio" class="option-input radio" name="choice" id="${k}" data-order="${k}"/>
                        ${v}
                    </label>
                </div>
            `;
        });
        setValue(answers, markUp);
    };


    // BUTTON LISTENERS
    const btnListeners = () => {
        btnNext.addEventListener('click',function(){
            const guessElement = document.querySelector('input[name="choice"]:checked');
            if(guessElement){
                const answer = guessElement.getAttribute('data-order');
                const result = quiz.checkAnswer(answer);
                if(result){
                    var text = document.getElementById('cr_' + answer);
                    text.classList.add('success');
                    console.log(text);
                }
                else{
                    document.getElementById('cr_' + answer).classList.add('danger');
                    console.log(document.getElementById('cr_' + answer).classList);
                }
                renderAll();
            }
            else{
                alert("WRONG");
            }
        });

        btnReset.addEventListener('click',function(){
            quiz.reset();
        });
    }
    
    const renderAll = () => {
        if(quiz.hasEnded()){

        }
        else{
            // Render Question
            renderQuestion();

            // Render Question Progress
            renderQuestionProgress();

            // Render Answer Choice
            renderChoices();

            // Render Time

            // Render Time Progress

        }
    };

    return {
        renderAll: renderAll(),
        btnListeners: btnListeners()
    };

})();

App.renderAll;
App.btnListeners;

