import Question from './Question.js';

export default function Quiz(questions){
    this.questions = questions;
    this.score = 0;
    this.currentIndex = 0;
}

Quiz.prototype.getCurrentQuestion = function(){
    return this.questions[this.currentIndex];
}

Quiz.prototype.addQuestion = function(question){
    this.questions = [...this.questions, question];
}

Quiz.prototype.setQuestions = function(questions){
    this.questions = questions;
}

Quiz.prototype.getQuestions = function(){
    return this.questions;
}

Quiz.prototype.nextIndex = function(){
    return this.currentIndex++;
}

Quiz.prototype.hasEnded = function(){
    return this.questions.length === this.currentIndex;
}

Quiz.prototype.increaseScore = (guess) => {
    const currentQuestion = this.getCurrentQuestion();
    if(currentQuestion.isCorrect(guess)){
        this.score++;
    }
    this.nextIndex();
}

Quiz.prototype.isChecked = function(question){
    return question.isChecked() === true;
}

Quiz.prototype.checkAnswer = function(guess) {
    const curQuestion = this.getCurrentQuestion();
    const result = curQuestion.isCorrect(guess);
    if(result){
        this.score++;
    }
    this.nextIndex();
    return result;
}

Quiz.prototype.reset = function(){
    this.score = 0;
    this.currentIndex = 0;
}