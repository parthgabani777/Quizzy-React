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
import { quizType } from "types/quiz.types";

const getQuizzes = async (categoryId: string): Promise<quizType[]> => {
    try {
        const db = getFirestore();

        const q = query(
            collection(db, "Quizzes"),
            where("categoryId", "==", categoryId)
        );
        const quizzesDocs = await getDocs(q);
        let quizzes: quizType[] = [];
        quizzesDocs.forEach((quiz) =>
            quizzes.push({ ...quiz.data(), id: quiz.id } as quizType)
        );
        return quizzes;
    } catch (error) {
        toast.error("Can not get quizzes.");
        throw error;
    }
};

const getQuiz = async (quizId: string): Promise<quizType | null> => {
    try {
        const db = getFirestore();
        const quizRef = doc(db, `Quizzes/${quizId}`);
        const quizDoc = await getDoc(quizRef);

        return quizDoc.exists()
            ? ({ ...quizDoc.data(), id: quizDoc.id } as quizType)
            : null;
    } catch (error) {
        toast.error("Can not get quiz data.");
        throw error;
    }
};

export { getQuizzes, getQuiz };
