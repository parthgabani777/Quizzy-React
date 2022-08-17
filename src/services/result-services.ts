// get user result
// post user result
import { getAuth } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
import { ResultType } from "types/result.types";

const saveResult = async ({
    quizId,
    quizTitle,
    score,
    totalScore,
}: ResultType) => {
    const { currentUser } = getAuth();
    const db = getFirestore();
    try {
        const userResultsRef = collection(
            db,
            `Users/${currentUser?.uid}/Results`
        );
        await addDoc(userResultsRef, { quizId, quizTitle, score, totalScore });
        toast.success("Result saved");
    } catch (error) {
        toast.error("Can not save result");
    }
};

export { saveResult };
