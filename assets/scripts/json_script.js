var obj = {};
var wrongAnswers = [];
var trueResults = 0; 
var startDate;
var endDate;
var timeForTestInMs = 10000;

function getData(resp) {
	return resp.json();	
}


function hasNextQuestion(obj,i) {
	return (obj[i] !== undefined) ? true : false;
}

function askNextQuestion(text) {
	var answer = prompt(text);
	return answer;
}

function checkTheAnswer(answer,value,i) {
	if (value === answer) {
		trueResults++;
	}
	else {
		wrongAnswers.push(i);
	}
}

function formatResults() {
	return "Вопросы с неправильными ответами: " + wrongAnswers; 	
}

function isTimerEnabled() {
	var now = new Date();
	return now <= endDate;
}

function quizEnding(data) {
	console.info(formatResults());
    console.info("Правильно: " + trueResults + "/" + data.questions.length);
}

function runApp() {
    fetch("../assets/scripts/sample.json")
    .then(function(resp) {
	   	return resp.json();
	})
	.then(function(data) {
		var i = 0;
		var realAnswer;
		var userAnswer;
		startDate = new Date();
		endDate = startDate.getTime() + timeForTestInMs;
        while (hasNextQuestion(data.questions,i) && isTimerEnabled()) {
        	realAnswer = data.questions[i].answer;
        	userAnswer = askNextQuestion(data.questions[i].question_text);
        	checkTheAnswer(realAnswer, userAnswer,i);
        	i++; 
        }
        quizEnding(data);
    });
}      
runApp();