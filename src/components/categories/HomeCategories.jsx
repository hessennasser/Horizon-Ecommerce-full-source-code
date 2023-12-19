import React from "react";
import { HomeCategory } from "./HomeCategory";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const HomeCategories = ({ categories }) => {
    const { i18n } = useTranslation();

    if (categories.length == 0) {
        return;
    }

    return (
        <>
            <div className="container py-10 flex flex-wrap gap-4 justify-center">
                {categories.map((category) => {
                    if (category.parent === null) {
                        return <HomeCategory key={category.id} category={category} />
                    }
                }
                )}
            </div>
            <Link className="block w-fit mb-5 mx-auto
             bg-secondColor text-white px-3 py-1 rounded-md text-lg hover:brightness-110" to="/all-categories">{i18n.language === "en" ? "All categories" : "جميع الفئات"}</Link>
        </>
    );
};

export default HomeCategories;
