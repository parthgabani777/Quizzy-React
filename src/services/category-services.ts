import { getFirestore, getDocs, collection } from "firebase/firestore";
import { toast } from "react-toastify";
import { CategoryType } from "types/category.types";

const getCategories = async (): Promise<CategoryType[]> => {
    try {
        const db = getFirestore();
        const categoriesDocs = await getDocs(collection(db, "Categories"));
        let categories: CategoryType[] = [];
        categoriesDocs.forEach((doc) =>
            categories.push({ ...doc.data(), id: doc.id } as CategoryType)
        );
        return categories;
    } catch (error) {
        toast.error("Can not get categories.");
        throw error;
    }
};

export { getCategories };
