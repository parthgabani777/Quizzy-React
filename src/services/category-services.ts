import { getFirestore, getDocs, collection } from "firebase/firestore";
import { toast } from "react-toastify";
import { categoryType } from "types/category.types";

const getCategories = async (): Promise<categoryType[]> => {
    try {
        const db = getFirestore();
        const categoriesDocs = await getDocs(collection(db, "Categories"));
        let categories: categoryType[] = [];
        categoriesDocs.forEach((doc) =>
            categories.push({ ...doc.data(), id: doc.id } as categoryType)
        );
        return categories;
    } catch (error) {
        toast.error("Can not get categories.");
        throw error;
    }
};

export { getCategories };
