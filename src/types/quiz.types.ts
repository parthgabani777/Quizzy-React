export type QuestionType = {
    id?: string | null;
    question: string;
    Options: string[];
    answer: number;
};

export type QuizType = {
    id?: string | null;
    categoryId: string;
    categoryName: string;
    title: string;
    imageUrl: string;
    totalQuestions: number;
    totalTime: number;
    Questions: QuestionType[];
};
