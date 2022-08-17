export type ResultType = {
    quizId: string;
    quizTitle: string;
    score: number;
    totalScore: number;
};

export type AnswersType = {
    currentQuestionCounter: number;
    currentScore: number;
    selectedAnswers: number[];
};
