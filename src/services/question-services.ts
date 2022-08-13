// get questions of quiz

import {
    getFirestore,
    getDocs,
    collection,
    doc,
    getDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { questionType, quizType } from "types/quiz.types";

export type getQuestionsType = { quiz: quizType; questions: questionType[] };

const getQuestions = async (quizId: string): Promise<getQuestionsType> => {
    try {
        const db = getFirestore();
        const quizDoc = await getDoc(doc(db, `Quizzes/${quizId}`));
        const quiz = quizDoc.data() as quizType;

        const questionsRef = collection(db, `Quizzes/${quizId}/Questions`);
        const questionsDocs = await getDocs(questionsRef);

        let questions: questionType[] = [];
        questionsDocs.forEach((question) => {
            questions.push({
                ...question.data(),
                id: question.id,
            } as questionType);
        });
        return { quiz, questions };
    } catch (error) {
        toast.error("Can not get questions");
        throw error;
    }
};

export { getQuestions };
