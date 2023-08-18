import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom"

const BottomFooter = () => {
    const { i18n, t } = useTranslation();
    const pages = t('mainHeader.pages');
    const sellerLogged = localStorage.getItem("sellerLogged");

    return (
        <div className="flex gap-5 justify-between sm:items-center flex-col sm:flex-row pt-5">
            <ul className="links flex-col md:flex-row flex gap-3">
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
            <p className="text-gray-400">
                Copyright © {new Date().getFullYear()} • <Link to="/" className="text-white">Horizon</Link> • All rights reserved.
            </p>
        </div>
    )
}

export default BottomFooter
