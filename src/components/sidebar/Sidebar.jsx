import React, { useState, useEffect, useContext } from "react";
import { FaArrowDown, FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa";
import horizonLogo from "../../assets/images/horizon-logo.png";
import "./sidebar.css";
import { Link } from "react-router-dom";
import { AppContext } from "../../AppContext";
import { useTranslation } from "react-i18next";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
    const { i18n, t } = useTranslation();
    const { categories, userName } = useContext(AppContext);
    const userLogged = localStorage.getItem("userLogged");
    const sellerLogged = localStorage.getItem("sellerLogged");

    const [expandedCategories, setExpandedCategories] = useState([]);

    const toggleCategory = (categoryId) => {
        if (expandedCategories.includes(categoryId)) {
            setExpandedCategories(expandedCategories.filter(id => id !== categoryId));
        } else {
            setExpandedCategories([...expandedCategories, categoryId]);
        }
    };

    const getChildren = (parentId) => {
        return categories.filter((category) => category.parent === parentId);
    };

    return (
        <aside className={`sidebar ${isSidebarOpen ? "show-sidebar" : false}`}>
            <div className="sidebar-header bg-mainColor text-white">
                <Link>
                    <img src={horizonLogo} alt="" className="w-16 md:w-24 mx-auto mb-4" />
                </Link>
                <div className="flex items-center justify-between gap-2">
                    <button
                        aria-label="close sidebar"
                        className="close-btn"
                        onClick={toggleSidebar}
                    >
                        <FaTimes />
                    </button>
                    {userLogged || sellerLogged ? (
                        <>
                            <h3 className="text-sm md:text-lg">{i18n.language === "en" ? `Welcome Back.${userName}` : `مرحباً بعودتك، ${userName}`}</h3>
                        </>
                    ) : (
                        <>
                            <Link to="seller-signup">
                                <button
                                    type="button"
                                    className="bg-secondColor p-2 rounded-lg hover:brightness-110 text-xs md:text-sm"
                                >
                                    {t("mainHeader.signUpSellerBtn")}
                                </button>
                            </Link>
                            <Link to="customer-signup">
                                <button
                                    type="button"
                                    className="border p-2 rounded-lg hover:brightness-110 text-xs md:text-sm"
                                >
                                    {t("mainHeader.signUpCustomerBtn")}
                                </button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
            <div className="flex flex-col text-start">
                <h3 className="text-center bg-secondColor text-white py-3 text-lg">
                    Categories
                </h3>
                <ul className="links">
                    {categories.map((category) => {
                        if (category.parent === null) {
                            const children = getChildren(category.id);
                            return (
                                <li key={category.id} className="link font-bold">
                                    <button
                                        className="flex items-center justify-between w-full text-md capitalize py-4 px-8 text-secondColor"
                                        onClick={() => toggleCategory(category.id)}
                                    >
                                        {i18n.language === "en"
                                            ? category.title.en
                                            : category.title.ar}
                                        <span>
                                            {expandedCategories.includes(category.id) ? <FaArrowDown /> : i18n.language === "en" ? <FaArrowRight /> : <FaArrowLeft />}
                                        </span>
                                    </button>
                                    {children.length > 0 && expandedCategories.includes(category.id) && (
                                        <ul>
                                            {children.map((childCategory) => (
                                                <li key={childCategory.id} className="link child">
                                                    <Link
                                                        to={`/categories/${childCategory.id}`}
                                                        className={`flex items-center text-md capitalize py-2 px-6 ${i18n.language === "en" ? "translate-x-14 border-l-2" : "-translate-x-14 border-r-2"} `}
                                                    >
                                                        {i18n.language === "en"
                                                            ? childCategory.title.en
                                                            : childCategory.title.ar}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            );
                        }
                        return null;
                    })}
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;
