describe("App", function () {
    // почему array объявлен здесь и почему он без var?
    array = [1,2,3,4,5];

    // на один expect должен быть один it, т.е. здесь 4 теста, это правило для юнит тестов
    // соответственно у тебя для этой домашки должно быть 4 отдельных файла, по файлу на каждый describe
    it("should say yes/no etc.", function() {
    	expect(yesOrNo(true)).toBe("yes");
    	expect(yesOrNo(false)).toBe("no");
    	expect(yesOrNo(null)).toBe(null);
    	expect(yesOrNo(undefined)).toBe(null);
    });

    // плохое описание, не понятно по описанию теста что тестируется именно counter
    // за этим и пишут отдельные describe
    it("should return total or more than total", function(){
        expect(counter(4)).toEqual(4);
        expect(counter(9)).toBe(9);
        expect(counter(141)).toEqual("9+");
        expect(counter(null)).toBe(null);
        expect(counter(undefined)).toBe(null);   
    });

    // тот самый случай :(
    describe('counter', function () {
        it("should be correct for 0", function(){
            expect(counter(0)).toBe(0);
        });
    });

    it("should return age", function(){
        expect(calculateAge(new Date(1990,12,12))).toEqual(28);
        expect(calculateAge(new Date(1999,9,22))).toEqual(20);
        expect(calculateAge(null)).toBe(null);
        expect(calculateAge(undefined)).toBe(null);
    });

    describe('calculateAge', function () {
        it("should be null for 12.01.2039", function(){
            expect(calculateAge(new Date(2039, 1, 12))).toBeNull(); // -20 ?!?!
        });
    });

    it("should return random item",function() {
        // плохо, лучше проверить например getRandomItem([1,2,3]) expect(item >= 1 && item <= 3).toBeTruthy();
        expect(array.indexOf(getRandomItem(array))).not.toBe(-1);

        // плохие тесты, не относятся к функции
        expect(array).not.toBe(null);
        expect(array).not.toBe(undefined);  
    });
});
