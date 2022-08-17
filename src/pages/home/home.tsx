import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./home.css";
import { getCategories } from "../../services/category-services";
import { useLoader } from "../../context/loader-context";
import { LoaderContextType } from "types/loader.context.types";
import { CategoryType } from "types/category.types";

function Home() {
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const { setLoading } = useLoader() as LoaderContextType;

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            const categories = await getCategories();
            setCategories(categories);
            setLoading(false);
        };
        getData();
    }, [setLoading]);

    return (
        <>
            <p className="category-title">Select the Category</p>

            <div className="card-grid">
                {categories.map((category) => (
                    <Link
                        to={`/quizzes/${category.id}`}
                        className="card"
                        key={category.id}
                    >
                        <img
                            src={category.imageUrl}
                            alt={category.categoryName}
                            className="card-img"
                        />
                        <div className="card-content">
                            <p className="card-title">
                                {category.categoryName}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
}

export { Home };
