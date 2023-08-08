/* eslint-disable react/prop-types */
import { FaTimes } from "react-icons/fa";
import horizonLogo from "../../assets/images/horizon-logo-black.png";
import "./sidebar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../AppContext";
import { useTranslation } from "react-i18next";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
    const { i18n } = useTranslation();
    const { categories } = useContext(AppContext);

    const getChildren = (parentId) => {
        return categories.filter((category) => category.parent === parentId);
    };

    return (
        <aside className={`sidebar ${isSidebarOpen ? "show-sidebar" : false}`}>
            <div className="sidebar-header">
                <Link to={"/home"}>
                    <img src={horizonLogo} alt="horizon" className="logo" />
                </Link>
                <button
                    aria-label="close sidebar"
                    className="close-btn"
                    onClick={toggleSidebar}
                >
                    <FaTimes />
                </button>
            </div>
            <div className="flex flex-col text-start">
                <h3 className="text-center bg-mainColor text-white py-3 text-lg">
                    Categories
                </h3>
                <ul className="links">
                    {categories.map((category) => {
                        if (category.parent === null) {
                            const children = getChildren(category.id);
                            return (
                                <li key={category.id} className="link">
                                    <Link
                                        to={`/categories/${category.id}`}
                                        className="flex items-center text-md capitalize py-4 px-6"
                                    >
                                        {i18n.language === "en"
                                            ? category.title.en
                                            : category.title.ar}
                                    </Link>
                                    {children.length > 0 && (
                                        <ul className={`border-l-2`}>
                                            {children.map((childCategory) => (
                                                <li key={childCategory.id} className="link child">
                                                    <Link
                                                        style={{ borderLeft: "1px solid #000" }}
                                                        to={`/categories/${childCategory.id}`}
                                                        className={`flex items-center text-md capitalize py-2 px-6 ${i18n.language === "en" ? "translate-x-10" : "-translate-x-10"} `}
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
                        return null; // Render nothing for subcategories
                    })}
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;
