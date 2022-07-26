// get questions of quiz

import {
    getFirestore,
    getDocs,
    collection,
    doc,
    getDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";

const getQuestions = async (quizId: any): Promise<any> => {
    try {
        const db = getFirestore();
        const quizDoc = await getDoc(doc(db, `Quizzes/${quizId}`));
        const quiz = quizDoc.data();

        const questionsRef = collection(db, `Quizzes/${quizId}/Questions`);
        const questionsDocs = await getDocs(questionsRef);

        let questions: any[] = [];
        questionsDocs.forEach((question) => {
            questions.push({ ...question.data(), id: question.id });
        });
        return { quiz, questions };
    } catch (error) {
        toast.error("Can not get questions");
    }
};

export { getQuestions };
