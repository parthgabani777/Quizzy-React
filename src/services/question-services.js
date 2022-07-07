// get questions of quiz

import {
    getFirestore,
    getDocs,
    collection,
    doc,
    query,
    where,
    getDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";

const getQuestions = async (quizId) => {
    try {
        const db = getFirestore();
        const quizDoc = await getDoc(doc(db, `Quizzes/${quizId}`));
        const quiz = quizDoc.data();

        const questionsRef = collection(db, `Quizzes/${quizId}/Questions`);
        const questionsDocs = await getDocs(questionsRef);

        let questions = [];
        questionsDocs.forEach((question) => {
            questions.push({ ...question.data(), id: question.id });
        });
        return { quiz, questions };
    } catch (error) {
        toast.error("Can not get questions");
    }
};

export { getQuestions };
