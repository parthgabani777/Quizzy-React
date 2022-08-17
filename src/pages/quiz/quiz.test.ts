import { getUpdatedAnswer } from "./quiz";

test("getUpdatedAnswer with wrong answer", () => {
    const oldAnswers = {
        currentQuestionCounter: 1,
        currentScore: 1,
        selectedAnswers: [2],
    };
    const selectedAnswer = 3;
    const correctAnswer = 2;

    const expectedAnswers = {
        currentQuestionCounter: 2,
        currentScore: 1,
        selectedAnswers: [2, 3],
    };

    expect(
        getUpdatedAnswer(selectedAnswer, correctAnswer, oldAnswers)
    ).toStrictEqual(expectedAnswers);
});

test("getUpdatedAnswer with right answer", () => {
    const oldAnswers = {
        currentQuestionCounter: 1,
        currentScore: 1,
        selectedAnswers: [2],
    };
    const selectedAnswer = 2;
    const correctAnswer = 2;

    const expectedAnswers = {
        currentQuestionCounter: 2,
        currentScore: 2,
        selectedAnswers: [2, 2],
    };

    expect(
        getUpdatedAnswer(selectedAnswer, correctAnswer, oldAnswers)
    ).toStrictEqual(expectedAnswers);
});
