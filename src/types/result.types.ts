export type resultType = {
    quizId: string;
    quizTitle: string;
    score: number;
    totalScore: number;
};

export type answersType = {
    currentQuestionCounter: number;
    currentScore: number;
    selectedAnswers: number[];
};
