import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { doc, getFirestore, setDoc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const signup = async ({ email, password, firstName, lastName }) => {
    const auth = getAuth();
    const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
    );

    const db = getFirestore();
    await setDoc(doc(db, `Users/${user.uid}`), {
        firstName,
        lastName,
    });
};

const login = async ({ email, password }) => {
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
    );
    return userCredential;
};

const signout = async () => {
    const auth = getAuth();
    await signOut(auth);
};

const getUserData = async () => {
    try {
        const { currentUser } = getAuth();
        if (!currentUser) {
            return;
        }
        const uid = currentUser.uid;

        const db = getFirestore();
        const userData = await getDoc(doc(db, `Users/${uid}`));
    } catch (error) {
        toast.error("Can get user data");
    }
};

export { signup, login, signout, getUserData };
