describe("checkTheAnswer", function() {
	it("should check people is equal to people", function() {
		expect(checkTheAnswer('people', 'people')).toBe(true);
	});
	it("should check Moscow is equal to Moscow", function() {
		expect(checkTheAnswer('Moscow', 'Moscow')).toBe(true);
	});
	it("should check JS is not equal to JavaScript", function() {
		expect(checkTheAnswer('JS', 'JavaScript')).toBe(false);
	});	
});