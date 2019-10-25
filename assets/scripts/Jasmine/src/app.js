function yesOrNo(value) {
  if ((value !== null) && (value !== undefined)) {
    if (value === true) {
      return "yes";
    }
    if (value === false) {
      return "no";
    }
  }
  else {
    return null; 
  }
}

function counter(total) {
  if (Number.isInteger(total)) {
    if ((total >= 1) && (total <= 9)) {
      return total;
    }
    if (total > 9) {
      return "9+";
    }
    else {
      return "total is less than 1";
    }
  }
  if ((total === null) || (total === undefined)) {
    return null;
  }
}

function calculateAge(date){
    if ((date !== null) && (date !== undefined) && (date.getTime() < Date.now())) {
      var ageDifMs = Date.now() - date.getTime();
      var ageDate = new Date(ageDifMs);
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
    else {
      return null;  
    }
  }

function getRandomItem(list) {
  var count = list.length;
  var randomItem = Math.floor(Math.random() * count);
  return list[randomItem];
}

// почему в этом же файле, почему не создать новый?
// имена функций в camelCase, откуда dashed?
function convert_date_from_iso8601(date) {
  return new Date(date);
}

// слишком сложно, если уж на то пошло, то это множество отдельных функций, этот комбайн ни к чему
// трудно с чего то начать, вернусь минут через 10
// ...
// вот решение
// https://jsfiddle.net/78sc9rfn/
// разбери и спроси если неясно, соответственно тесты надо переписать
function grouping_users_by_year(json) {
  var jsonParse = JSON.parse(json);
  var object = new Object(); // можно просто var obj = {}
  var years = [];

  // излишне совсем, reduce на это изначально направлен, чтобы обойтись им один раз
  var unique_years = jsonParse.reduce(function(last,current) {
    var current_date = convert_date_from_iso8601(current.birth_date); // лучше уж просто new Date(date), твоя функция излишняя здесь
      if (!years.includes(current_date.getFullYear())) {
        years.push(current_date.getFullYear());
        object[String(current_date.getFullYear())] = [];
      }
    return years;
  },0);

  var result = unique_years.reduce(function(start,now) {
    var current_array = [];
      jsonParse.reduce(function(last,current) {
        var current_date = convert_date_from_iso8601(current.birth_date); 
          if ((String(current_date.getFullYear()) in object) && (now === current_date.getFullYear())) {
            var full_name = current.first_name+current.last_name;
            current['name'] = full_name;
            current.birth_date = current_date;
            delete current.first_name;
            delete current.last_name;  
            current_array.push(current);
          }
      },0);
    object[String(now)] = current_array;
    return object;    
  },0);
  //return result;
  console.log(result);
}

// почему функции квиза находятся здесь? им место в проекте, у тебя должно быть несколько раздельных файлов скриптов
function checkTheAnswer(answer,value) {
  // return value === answer; и всё
  if (value === answer) {
    return true;
  }
  else {
    return false;
  }
}

function askNextQuestion(text) {
  var answer = prompt(text);
  return answer;
}

function hasNextQuestion(obj,i) {
  return (obj[i] !== undefined) ? true : false;
}
