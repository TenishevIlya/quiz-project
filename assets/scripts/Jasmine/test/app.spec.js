describe("App", function () {
    array = [1,2,3,4,5];

    it("should say yes/no etc.", function() {
    	expect(yesOrNo(true)).toBe("yes");
    	expect(yesOrNo(false)).toBe("no");
    	expect(yesOrNo(null)).toBe(null);
    	expect(yesOrNo(undefined)).toBe(null);
    });

    it("should return total or more than total", function(){
        expect(counter(4)).toEqual(4);
        expect(counter(9)).toBe(9);
        expect(counter(141)).toEqual("9+");
        expect(counter(null)).toBe(null);
        expect(counter(undefined)).toBe(null);   
    });

    it("should return age", function(){
        expect(calculateAge(new Date(1990,12,12))).toEqual(28);
        expect(calculateAge(new Date(1999,9,22))).toEqual(20);
        expect(calculateAge(null)).toBe(null);
        expect(calculateAge(undefined)).toBe(null);
    });

    it("should return random item",function() {
        expect(array.indexOf(getRandomItem(array))).not.toBe(-1);
        expect(array).not.toBe(null);
        expect(array).not.toBe(undefined);  
    });
});
