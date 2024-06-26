import React, { useState, useEffect } from "react";
import { FaBars, FaTimes, FaGlobe } from "react-icons/fa";
import { Dropdown } from "flowbite-react";
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation } from "react-router-dom";

const NavHeader = ({ toggleSidebar }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const sellerLogged = localStorage.getItem("sellerLogged");
    const toggleMenuHeader = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    const { i18n, t } = useTranslation();
    const location = useLocation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        localStorage.setItem("language", lng);
    };

    useEffect(() => {
        const savedLanguage = localStorage.getItem("language");
        if (savedLanguage) {
            i18n.changeLanguage(savedLanguage);
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
            <ul className={`flex items-center gap-5 absolute duration-300 -top-full lg:relative lg:top-0 transition-all ${isMenuOpen ? "openMenuHeader" : ""}`}>
                <button type="button" className="lg:hidden absolute top-5 right-1/2 translate-x-1/2 text-xl bg-secondColor p-2" onClick={toggleMenuHeader} aria-label={i18n.language === "en" ? "language" : "اللغة"}>
                    <FaTimes />
                </button>
                {
                    pages.map(page => {
                        if (!sellerLogged) {
                            if (page.id === pages.length) {
                                return null;
                            }
                        }
                        const isActive = location.pathname === page.link;
                        return (
                            <li key={page.id}>
                                <NavLink onClick={() => setIsMenuOpen(false)} to={page.link} className={({ isActive }) => isActive ? "border-b border-[#0096ff] text-[#0096ff]" : ""}>{page.name}</NavLink>
                            </li>
                        );
                    })
                }
            </ul>
            <button type="button" className="lg:hidden" aria-label={i18n.language === "en" ? "menu" : "القائمة"} onClick={toggleMenuHeader}>
                <FaBars />
            </button>
            <div className="lang-toggler">
                <Dropdown label={<FaGlobe />} aria-label="language">
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
