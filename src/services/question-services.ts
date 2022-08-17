// get questions of quiz

import {
    getFirestore,
    getDocs,
    collection,
    doc,
    getDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { QuestionType, QuizType } from "types/quiz.types";

export type getQuestionsType = { quiz: QuizType; questions: QuestionType[] };

const getQuestions = async (quizId: string): Promise<getQuestionsType> => {
    try {
        const db = getFirestore();
        const quizDoc = await getDoc(doc(db, `Quizzes/${quizId}`));
        const quiz = quizDoc.data() as QuizType;

        const questionsRef = collection(db, `Quizzes/${quizId}/Questions`);
        const questionsDocs = await getDocs(questionsRef);

        let questions: QuestionType[] = [];
        questionsDocs.forEach((question) => {
            questions.push({
                ...question.data(),
                id: question.id,
            } as QuestionType);
        });
        return { quiz, questions };
    } catch (error) {
        toast.error("Can not get questions");
        throw error;
    }
};

export { getQuestions };
