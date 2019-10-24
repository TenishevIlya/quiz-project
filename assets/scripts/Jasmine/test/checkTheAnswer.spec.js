describe("checkTheAnswer", function() {
	it("should check the accuracy of answer", function() {
		expect(checkTheAnswer("people","people")).toBe(true);
		expect(checkTheAnswer("Moscow","Moscow")).toBe(true);
		expect(checkTheAnswer("JS","JavaScript")).toBe(false);
	});
});