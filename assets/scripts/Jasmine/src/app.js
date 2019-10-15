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

function counter(total) {
  if ((total != null) || (total != undefined)) {
    return (total <= 9) && (total >= 1) ? total : "9+";
  }
  else {
    return null;  
  }
}

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