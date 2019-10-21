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