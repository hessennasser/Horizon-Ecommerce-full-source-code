import React from "react";
import { HomeCategory } from "./HomeCategory";

const HomeCategories = ({ categories }) => {
    return (
        <div className="container py-10 flex flex-wrap gap-4 justify-center">
                {categories.map((category) => (
                    <HomeCategory key={category.id} category={category} />
                ))}
        </div>
    );
};

export default HomeCategories;
