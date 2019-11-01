let yesOrNo = (value) => {
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

let counter = (total) => {
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

let calculateAge = (date) => {
    if ((date !== null) && (date !== undefined) && (date.getTime() < Date.now())) {
      let ageDifMs = Date.now() - date.getTime();
      let ageDate = new Date(ageDifMs);
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
    else {
      return null;  
    }
  }

let getRandomItem = (list) => {
  let count = list.length;
  let randomItem = Math.floor(Math.random() * count);
  return list[randomItem];
}



let groupingUsersByYear = (json) => {
  let jsonParse = JSON.parse(json);
  let object = new Object();              
  let years = [];

  let unique_years = jsonParse.reduce((last,current) => {
    let current_date = convertDateFromIso8601(current.birth_date);
      if (!years.includes(current_date.getFullYear())) {
        years.push(current_date.getFullYear());
        object[String(current_date.getFullYear())] = [];
      }
    return years;
  },0);

  let result = unique_years.reduce((start,now) => {
    let current_array = [];
      jsonParse.reduce((last,current) => {
        let current_date = convertDateFromIso8601(current.birth_date); 
          if ((String(current_date.getFullYear()) in object) && (now === current_date.getFullYear())) {
            let full_name = current.first_name+current.last_name;
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