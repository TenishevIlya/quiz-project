describe("hasNextQuestion", function () {
	var array = [1,2,3,4,5];
    it("should check the existence of next to first element", function() {
    	expect(hasNextQuestion(array,1)).toBe(true);
    });
    it("should check the existence of next to ninth element", function() {
    	expect(hasNextQuestion(array,9)).toBe(false);
    });
    it("should check the existence of next to array element", function() {
    	expect(hasNextQuestion(array)).toBe(false);	
    });
});