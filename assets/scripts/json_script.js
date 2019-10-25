var obj = {};
var testResults = [];
var trueResults = 0; 
var startDate, endDate;
var timeForTestInMs = 10000;


function hasNextQuestion(obj,i) {
	return (obj[i] !== undefined) ? true : false;
}

function askNextQuestion(text) {
	var answer = prompt(text);
	return answer;
}

function checkTheAnswer(answer,value) {
	if (value === answer) {
		trueResults++;
		testResults.push("Верно");
	}
	else {
		testResults.push("Ошибка");
	}
}

function showResults() {
	return "Результаты теста: " + testResults; 	
}

function isTimerEnabled() {
	var now = new Date();
	return now <= endDate;
}

function run_quiz() {
    fetch("../assets/scripts/sample.json")
    .then(function(resp) {
	   	return resp.json();
	})
	.then(function(data) {
		var i = 0;
		startDate = new Date();
		endDate = startDate.getTime() + timeForTestInMs;
        while (hasNextQuestion(data.questions,i) && isTimerEnabled()) {
        	checkTheAnswer(data.questions[i].answer, askNextQuestion(data.questions[i].question_text)); 
        	i++; 
        }
        console.info(showResults());
        console.info("Правильно: " + trueResults + "/" + data.questions.length);
        trueResults = 0;
        testResults.length = 0;
    });
}      


var btn = document.getElementById("start");
btn.addEventListener('click', run_quiz);