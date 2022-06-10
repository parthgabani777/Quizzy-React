// get user result
// post user result
import { getAuth } from "firebase/auth";
import {
    addDoc,
    collection,
    doc,
    getFirestore,
    setDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";

const saveResult = async ({
    quizId,
    quizTitle = "temp",
    score,
    totalScore,
}) => {
    const { currentUser } = getAuth();
    const db = getFirestore();
    try {
        const userResultsRef = collection(
            db,
            `Users/${currentUser.uid}/Results`
        );
        await addDoc(userResultsRef, { quizId, quizTitle, score, totalScore });
    } catch (error) {
        toast.error("Can not save resutl");
    }
};

export { saveResult };
