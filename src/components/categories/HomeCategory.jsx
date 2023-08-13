import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const HomeCategory = ({ category }) => {
    const { i18n } = useTranslation();

    return (
        <div className="bg-white p-3 flex flex-col shadow-md rounded-lg hover:shadow-lg hover:-translate-y-2 transition-all duration-200 group">
            <div className="img flex-1 flex items-center justify-center w-48 mx-auto overflow-hidden">
                <img
                    className="h-full object-cover group-hover:scale-110 transition-all duration-200"
                    src={`https://admin.horriizon.com/public//${category.image}`}
                    alt="" />
            </div>
            <div className="flex items-center gap-2 justify-between mt-5">
                <h3 className="font-semibold">
                    {i18n.language === "en" ? category.title.en : category.title.ar}
                </h3>
                <Link
                    to={`/categories/${category.id}`}
                    aria-label="enter to category"
                    className="block w-fit bg-secondColor text-white text-xl p-2 rounded-full"
                >
                    <AiOutlineArrowRight />
                </Link>
            </div>
        </div>
    );
};

export default HomeCategory;
