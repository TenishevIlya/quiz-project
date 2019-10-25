var obj = {}; // читер, мы не проходили объекты
var testResults = [];
var trueResults = 0; 
var startDate, endDate; // нет, один var - одна переменная
var timeForTestInMs = 10000;

// лучше return object.hasOwnProperty(key)
// i это итератор, а ты проверяешь ключ объекта
function hasNextQuestion(obj,i) {
	return (obj[i] !== undefined) ? true : false;
}

function askNextQuestion(text) {
	var answer = prompt(text);
	return answer;
}

// плохо, зачем хранить массив строк? достаточно инкрементальной переменной.
// если хочется показать юзеру, что он ошибся в вопросе N, то ок, можно хранить массив wrongAnswers = [1, 13, 135] из неправильных ответов,
// твой вариант избыточен, даже в твоём случае достаточно хранить true/false уж тогда в качестве значений
function checkTheAnswer(answer,value) {
	if (value === answer) {
		trueResults++;
		testResults.push("Верно");
	}
	else {
		testResults.push("Ошибка");
	}
}

// функция противоречит содержимому, конкретно эта функция форматирует вывод, а не ПОКАЗЫВАЕТ его
function showResults() {
	return "Результаты теста: " + testResults; 	
}

function isTimerEnabled() {
	var now = new Date();
	return now <= endDate;
}

// runApp(), в camelCase
// в любом случае эта функция делает слишком много, это множество отдельных подфункций
// получение данных
// завершение квиза
// проверка таймера
// в итоге хорошие функции checkTheAnswer, askNextQuestion объявлены в другом файле, плохо.
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
        	// идею я понял, а зачем такое длинной объявление, лучше разбить на несколько отдельных переменных
			// это не то место где стоит оптимизировать
        	checkTheAnswer(data.questions[i].answer, askNextQuestion(data.questions[i].question_text)); 
        	i++; 
        }
        console.info(showResults());
        console.info("Правильно: " + trueResults + "/" + data.questions.length);
        trueResults = 0; // зачем? GC встроен в движок браузера
        testResults.length = 0; // зачем? GC встроен в движок браузера
    });
}      

// нельзя, ты только что уничтожил весь смысл этого файла, предполагается консольный квиз
// если хочется запускать по кнопке, то ок, будь добр всю работу с браузером делать в другом файле
// здесь чисто логика квиза
var btn = document.getElementById("start");
btn.addEventListener('click', run_quiz);
