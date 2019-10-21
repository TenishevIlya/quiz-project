describe("Counter", function(){
    it("counter should return given number/more than given number/null/less than one", function(){
        expect(counter(4)).toEqual(4);
        expect(counter(9)).toBe(9);
        expect(counter(141)).toEqual("9+");
        expect(counter(0)).toBe("total is less than 1");
        expect(counter(null)).toBe(null);
        expect(counter(undefined)).toBe(null);   
    });
});