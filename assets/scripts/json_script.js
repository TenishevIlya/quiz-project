let obj = {};
let wrongAnswers = [];
let trueResults = 0; 
let startDate;
let endDate;
let timeForTestInMs = 10000;

let getData = (resp) => {
	return resp.json();	
}


let hasNextQuestion = (obj,i) => {
	return (obj[i] !== undefined) ? true : false;
}

let askNextQuestion = (text) => {
	let answer = prompt(text);
	return answer;
}

let checkTheAnswer = (answer,value,i) => {
	if (value === answer) {
		trueResults++;
	}
	else {
		wrongAnswers.push(i);
	}
}

let formatResults = () => {
	return "Вопросы с неправильными ответами: " + wrongAnswers; 	
}

let isTimerEnabled = () => {
	let now = new Date();
	return now <= endDate;
}

let quizEnding = (data) => {
	console.info(formatResults());
    console.info("Правильно: " + trueResults + "/" + data.questions.length);
}

let runApp = () => {
    fetch("../assets/scripts/sample.json")
    .then((resp) => {
	   	return resp.json();
	})
	.then((data) => {
		let i = 0;
		let realAnswer;
		let userAnswer;
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
