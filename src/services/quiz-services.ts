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
import { QuizType } from "types/quiz.types";

const getQuizzes = async (categoryId: string): Promise<QuizType[]> => {
    try {
        const db = getFirestore();

        const q = query(
            collection(db, "Quizzes"),
            where("categoryId", "==", categoryId)
        );
        const quizzesDocs = await getDocs(q);
        let quizzes: QuizType[] = [];
        quizzesDocs.forEach((quiz) =>
            quizzes.push({ ...quiz.data(), id: quiz.id } as QuizType)
        );
        return quizzes;
    } catch (error) {
        toast.error("Can not get quizzes.");
        throw error;
    }
};

const getQuiz = async (quizId: string): Promise<QuizType | null> => {
    try {
        const db = getFirestore();
        const quizRef = doc(db, `Quizzes/${quizId}`);
        const quizDoc = await getDoc(quizRef);

        return quizDoc.exists()
            ? ({ ...quizDoc.data(), id: quizDoc.id } as QuizType)
            : null;
    } catch (error) {
        toast.error("Can not get quiz data.");
        throw error;
    }
};

export { getQuizzes, getQuiz };
