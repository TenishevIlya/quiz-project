// switch избыточен, достаточно if проверки на true и false
// и отдельно валидации входного параметра
// break не нужен, если есть return до него. Функция завершится
function yesOrNo(value) {
  switch(value) {
  	case true:
  	  return "yes";
  	  break;
  	case false: 
  	  return "no";
  	  break;
  	case null:
  	  return null;
  	  break;
  	case undefined: 
  	  return null;
  	  break;
  	defaut:
  	  break;        
  }
}

// в js только тождественное сравнение типа !==
// не давай самому языку делать сравнение за тебя, это его слабая сторона
// я бы лучше проверил Number.isInteger(total) например
// Также жду тест с проверкой на total=0
function counter(total) {
  if ((total != null) || (total != undefined)) {
    return (total <= 9) && (total >= 1) ? total : "9+";
  }
  else {
    return null;  
  }
}

// сложнааа, но направление хорошее. в js не надо алгоритмическим программированием увлекаться, лучше гуглить
// давай я погуглю за тебя
// https://stackoverflow.com/questions/4060004/calculate-age-given-the-birth-date-in-the-format-yyyymmdd
function calculateAge(date){
    if ((date != null) || (date != undefined)) {
      var now = new Date();
      var age = now.getFullYear() - date.getFullYear();
      if (now.getMonth()+1 > date.getMonth()) {
        return age;
      }
      if (now.getMonth()+1 < date.getMonth()) {
        return age-1;
      }
      if (now.getMonth()+1 == date.getMonth()) {
          if (now.getDate() >= date.getDate()) {
            return age; 
          }
          else {
            return age-1; 
          }
      }
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
