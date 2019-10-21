describe("calculateAge", function(){
	it("calculateAge should return age", function(){
        expect(calculateAge(new Date(1990,12,12))).toEqual(28);
        expect(calculateAge(new Date(1999,8,22))).toEqual(20);
        expect(calculateAge(new Date(2039, 1, 12))).toEqual(null);
        expect(calculateAge(null)).toBe(null);
        expect(calculateAge(undefined)).toBe(null);
    });
});