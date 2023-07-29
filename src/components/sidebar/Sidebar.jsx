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
    const { categories } = useContext(AppContext)

    return (
        <aside className={`sidebar ${isSidebarOpen ? "show-sidebar" : false}`}>
            <div className="sidebar-header">
                <Link to={"/home"}>
                    <img src={horizonLogo} alt="horizon" className='logo' />
                </Link>
                <button aria-label="close sidebar" className='close-btn' onClick={toggleSidebar}>
                    <FaTimes />
                </button>
            </div>
            <div className="flex flex-col text-start">
                <h3 className="text-center bg-mainColor text-white py-3 text-lg">Categories</h3>
                <ul className="links">

                    {
                        categories.map(category => {
                            return (
                                <li key={category.id} className="link flex justify-start items-center">
                                    <Link to={`/categories/${category.id}`} className="flex items-center text-md capitalize py-4 px-6 hover:px-10 duration-300" >
                                        {i18n.language === "en" ? category.title.en : category.title.ar}
                                    </Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </aside>
    )
}

export default Sidebar
