let checkTheAnswer = (answer,value) => {
  return value === answer;  
}

let askNextQuestion = (text) => {
  let answer = prompt(text);
  return answer;
}

let hasNextQuestion = (obj,key) => {
  return obj.hasOwnProperty(key);
}


let json = '[{"user_name":"jdeanesy0","first_name":"Joyan","last_name":"De Anesy","birth_date":"1999-06-27T08:49:07Z"},{"user_name":"lmincini1","first_name":"Lowe","last_name":"Mincini","birth_date":"1999-02-04T00:49:27Z"},{"user_name":"ahoult2","first_name":"Aggie","last_name":"Hoult","birth_date":"1999-05-10T04:12:57Z"},{"user_name":"uaxe3","first_name":"Upton","last_name":"Axe","birth_date":"1998-04-12T04:21:39Z"},{"user_name":"bmahaddie4","first_name":"Basilio","last_name":"Mahaddie","birth_date":"1997-02-11T08:23:53Z"},{"user_name":"mvalentetti5","first_name":"Maximo","last_name":"Valentetti","birth_date":"1997-02-10T19:23:16Z"}]';

let data = JSON.parse(json);

console.info('Initial data', data);

let toUser = (item, birthday) => {
	return {
    name: `${item.first_name} ${item.last_name}`,
    birthday
	}
}

let extract = (data) => {
  return data.reduce((prev, current) => {
    let birthday = new Date(current.birth_date);
    let year = birthday.getUTCFullYear();
    return {
      ...prev,
      [year]: [
        ...prev[year] || [],
        toUser(current, birthday)
      ]
    };
  }, {})
}



let prepared = extract(data);

console.info('prepared', prepared);