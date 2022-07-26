import { getFirestore, getDocs, collection } from "firebase/firestore";
import { toast } from "react-toastify";

const getCategories = async (): Promise<any> => {
    try {
        const db = getFirestore();
        const categoriesDocs = await getDocs(collection(db, "Categories"));
        let categories: any = [];
        categoriesDocs.forEach((doc) =>
            categories.push({ ...doc.data(), id: doc.id })
        );
        return categories;
    } catch (error) {
        toast.error("Can not get categories.");
    }
};

export { getCategories };
