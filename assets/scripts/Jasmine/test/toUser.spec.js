describe("toUser", function() {
	let obj = {"user_name":"bmahaddie4","first_name":"Basilio","last_name":"Mahaddie","birth_date":"1997-02-11T08:23:53Z"};
	it("should give user in name/birthday format", function() {
		expect(toUser(obj, obj.birth_date)).toEqual({name: 'Basilio Mahaddie', birthday: '1997-02-11T08:23:53Z'});
	});
});