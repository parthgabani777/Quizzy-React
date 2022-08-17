import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { doc, getFirestore, setDoc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import {
    LoginCredentialsType,
    SignupCredentialsType,
    UserDataType,
} from "types/auth.types";

const signup = async ({
    email,
    password,
    firstName,
    lastName,
}: SignupCredentialsType) => {
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

const login = async ({ email, password }: LoginCredentialsType) => {
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

const getUserData = async (): Promise<UserDataType | undefined> => {
    try {
        const { currentUser } = getAuth();
        if (!currentUser) {
            return;
        }
        const uid = currentUser.uid;

        const db = getFirestore();
        const userData = (await (
            await getDoc(doc(db, `Users/${uid}`))
        ).data()) as UserDataType;
        return userData;
    } catch (error) {
        toast.error("Can get user data");
        throw error;
    }
};

export { signup, login, signout, getUserData };
