import {
    getFirestore,
    getDocs,
    collection,
    doc,
    query,
    where,
    getDoc,
} from "firebase/firestore";

const getQuizzes = async (categoryId) => {
    try {
        const db = getFirestore();

        const q = query(
            collection(db, "Quizzes"),
            where("categoryId", "==", categoryId)
        );
        const quizzesDocs = await getDocs(q);
        let quizzes = [];
        quizzesDocs.forEach((quiz) =>
            quizzes.push({ ...quiz.data(), id: quiz.id })
        );
        return quizzes;
    } catch (error) {
        console.log(error.code + error.message);
    }
};

const getQuiz = async (quizId) => {
    try {
        const db = getFirestore();
        const quizRef = doc(db, "Quizzes", quizId);
        const quizDoc = await getDoc(quizRef);

        return quizDoc.exists() ? { ...quizDoc.data(), id: quizDoc.id } : null;
    } catch (error) {
        console.log(error.code + error.message);
    }
};

export { getQuizzes, getQuiz };
