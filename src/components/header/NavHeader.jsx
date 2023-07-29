/* NavHeader.js */

import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaGlobe } from "react-icons/fa";
import { Dropdown } from "flowbite-react";
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";

const NavHeader = ({ toggleSidebar }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const sellerLogged = localStorage.getItem("sellerLogged");
    const toggleMenuHeader = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    const { i18n, t } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        localStorage.setItem("language", lng); // Save selected language to localStorage
    };

    useEffect(() => {
        const savedLanguage = localStorage.getItem("language");
        if (savedLanguage) {
            i18n.changeLanguage(savedLanguage); // Apply saved language when the component mounts
        }
    }, []);

    const pages = t('mainHeader.pages');

    return (
        <nav className="container w-full max-w-[100%] py-3 mt-3 bg-[#44406AEB] flex items-center justify-between gap-3 overflow-hidden">
            <div className="bg-mainColor p-2 rounded-lg hover:brightness-125 flex items-center" onClick={toggleSidebar}>
                <button className="flex gap-2 items-center" aria-label={i18n.language === "en" ? "categories" : "الفئات"}>
                    <FaBars /> {i18n.language === "en" ? "categories" : "الفئات"}
                </button>
            </div>
            <ul className={`flex items-center gap-5 absolute duration-300 -top-full md:relative md:top-0 transition-all ${isMenuOpen ? "openMenuHeader" : ""}`}>
                <button type="button" className="md:hidden absolute top-5 right-1/2 translate-x-1/2 text-xl bg-secondColor p-2" onClick={toggleMenuHeader} aria-label={i18n.language === "en" ? "languge" : "الللغه"}>
                    <FaTimes />
                </button>
                {
                    pages.map(page => {
                        if (!sellerLogged) {
                            if (page.id === 5) {
                                return null
                            }
                        }
                        return (
                            <li key={page.id}>
                                <Link to={page.link}>{page.name}</Link>
                            </li>
                        );
                    })
                }
            </ul>
            <button type="button" className="md:hidden" aria-label={i18n.language === "en" ? "menu" : "القائمه"} onClick={toggleMenuHeader}>
                <FaBars />
            </button>
            <div className="lang-toggler">
                <Dropdown label={<FaGlobe />} aria-label="languge">
                    <Dropdown.Item onClick={() => changeLanguage("en")}>
                        English
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => changeLanguage("ar")}>
                        Arabic
                    </Dropdown.Item>
                </Dropdown>
            </div>
        </nav>
    );
};

export default NavHeader;
