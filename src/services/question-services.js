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
        console.log(error.code + error.message);
    }
};

export { getQuestions };
