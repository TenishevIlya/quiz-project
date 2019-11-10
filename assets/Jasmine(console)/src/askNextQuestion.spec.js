const askNextQuestion = require('./askNextQuestion');
describe("askNextQuestion", function () {

    it("should ask a prompt question", function() {
    	expect(askNextQuestion('word')).toBe('word');
    });
});