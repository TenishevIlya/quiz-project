// на один expect должен быть один it
// используем только '' кавычки, или `` если внутри переменные
describe("checkTheAnswer", function() {
	it("should check the accuracy of answer", function() {
		// пробел после запятых
		expect(checkTheAnswer("people","people")).toBe(true);
		expect(checkTheAnswer("Moscow","Moscow")).toBe(true);
		expect(checkTheAnswer("JS","JavaScript")).toBe(false);
	});
});
