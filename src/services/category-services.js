import { getFirestore, getDocs, collection } from "firebase/firestore";
import { toast } from "react-toastify";

const getCategories = async () => {
    try {
        const db = getFirestore();
        const categoriesDocs = await getDocs(collection(db, "Categories"));
        let categories = [];
        categoriesDocs.forEach((doc) =>
            categories.push({ ...doc.data(), id: doc.id })
        );
        return categories;
    } catch (error) {
        toast.error("Can not get categories.");
    }
};

export { getCategories };
