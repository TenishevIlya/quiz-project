describe("hasNextQuestion", function () {
	var array = [1,2,3,4,5];
    it("should check the existence of next element", function() {
    	expect(hasNextQuestion(array,1)).toBe(true);
    	expect(hasNextQuestion(array,9)).toBe(false);
    	expect(hasNextQuestion(array)).toBe(false);	
    	expect(hasNextQuestion(9)).toBe(false);	
    });
});