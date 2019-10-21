describe("yesOrNo", function () {

    it("yesOrNo should say yes/no etc.", function() {
    	expect(yesOrNo(true)).toBe("yes");
    	expect(yesOrNo(false)).toBe("no");
    	expect(yesOrNo(null)).toBe(null);
    	expect(yesOrNo(undefined)).toBe(null);
    });
});
