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

const getQuizzes = async (categoryId: any): Promise<any> => {
    try {
        const db = getFirestore();

        const q = query(
            collection(db, "Quizzes"),
            where("categoryId", "==", categoryId)
        );
        const quizzesDocs = await getDocs(q);
        let quizzes: any[] = [];
        quizzesDocs.forEach((quiz) =>
            quizzes.push({ ...quiz.data(), id: quiz.id })
        );
        return quizzes;
    } catch (error) {
        toast.error("Can not get quizzes.");
    }
};

const getQuiz = async (quizId: any): Promise<any> => {
    try {
        const db = getFirestore();
        const quizRef = doc(db, `Quizzes/${quizId}`);
        const quizDoc = await getDoc(quizRef);

        return quizDoc.exists() ? { ...quizDoc.data(), id: quizDoc.id } : null;
    } catch (error) {
        toast.error("Can not get quiz data.");
    }
};

export { getQuizzes, getQuiz };
