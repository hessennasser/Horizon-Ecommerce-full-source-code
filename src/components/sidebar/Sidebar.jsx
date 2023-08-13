/* eslint-disable react/prop-types */
import { FaTimes } from "react-icons/fa";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import horizonLogo from "../../assets/images/horizon-logo-black.png";
import "./sidebar.css";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AppContext } from "../../AppContext";
import { useTranslation } from "react-i18next";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
    const { i18n } = useTranslation();
    const { categories } = useContext(AppContext);

    const [showSubCat, setShowSubCat] = useState(false);
    const [subCategories, setSubCategories] = useState([]);
    const [parentCategoryName, setParentCategoryName] = useState("")
    const getChildren = (parentId) => {
        const children = categories.filter((category) => category.parent === parentId);
        console.log(children);
        setSubCategories(children);
        return;
    };

    return (
        <aside className={`sidebar ${isSidebarOpen ? "show-sidebar" : ""}`}>
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
            {
                !showSubCat ?
                    (
                        <div className="flex flex-col text-start">
                            <h3 className="text-center bg-mainColor text-white py-3 text-lg">
                                Categories
                            </h3>
                            <ul className="links">
                                {categories.map((category) => {
                                    if (category.parent === null) {
                                        return (
                                            <li key={category.id} className="link">
                                                <button
                                                    type="button"
                                                    className="w-full flex items-center justify-between text-md capitalize py-4 px-6"
                                                    onClick={() => {
                                                        getChildren(category.id);
                                                        setShowSubCat(true);
                                                        setParentCategoryName(i18n.language === "en" ? category.title.en : category.title.ar);
                                                    }}
                                                >
                                                    {i18n.language === "en"
                                                        ? category.title.en
                                                        : category.title.ar}
                                                    <span>
                                                        {
                                                            i18n.language === "en" ?<FiArrowRight /> : <FiArrowLeft />
                                                        }
                                                        </span>
                                                </button>
                                            </li>
                                        );
                                    }
                                    return null; // Render nothing for subcategories
                                })}
                            </ul>
                        </div>
                    )
                    :
                    (
                        <div className="flex flex-col text-start" >
                            <h3 className="flex px-5 items-center justify-between bg-mainColor text-white py-3 text-lg">
                                <button type="button" className="w-7 h-7 bg-secondColor rounded-full p-1" onClick={() => setShowSubCat(false)}>
                                    <FiArrowLeft />
                                </button>
                                <span className="flex-1 text-center">{parentCategoryName}</span>
                            </h3>
                            <ul className="links">
                                {
                                    subCategories.map((item) => {
                                        return <li key={item.id} className="link flex justify-start items-center">
                                            <Link to={`/categories/${item.id}`} className="flex items-center text-md capitalize py-4 px-6 hover:px-7 duration-300" >
                                                {i18n.language === "en" ? item.title.en : item.title.ar}
                                            </Link>
                                        </li>

                                    })
                                }
                            </ul>
                        </div>
                    )
            }
        </aside>
    );
};

export default Sidebar;
