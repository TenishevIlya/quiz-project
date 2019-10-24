describe("Convert_date_from_iso8601", function(){
	it("should correctly convert to Date object", function() {
    	expect(convert_date_from_iso8601("1999-06-27T08:49:07Z")).toEqual(new Date("Sun Jun 27 1999 12:49:07 GMT+0400 (Москва, летнее время)"));      
    	expect(convert_date_from_iso8601("1997-10-27T13:56:42Z")).toEqual(new Date("Mon Oct 27 1997 16:56:42 GMT+0300 (Москва, стандартное время)"));
    });
});