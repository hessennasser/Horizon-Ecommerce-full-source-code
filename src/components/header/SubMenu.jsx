import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { FaUserAlt } from 'react-icons/fa';
import { AiOutlineRight, AiOutlineLeft, AiFillSetting } from 'react-icons/ai';
import { BsCreditCardFill } from 'react-icons/bs';
import { SiGoogleanalytics } from 'react-icons/si';
import { MdSupport } from 'react-icons/md';
import { BiLogOutCircle } from 'react-icons/bi';
import { AppContext } from '../../AppContext';
import { useTranslation } from 'react-i18next';

const SubMenu = ({ image, name }) => {
    const { logout } = useContext(AppContext);
    const { i18n } = useTranslation();
    const sellerLogged = localStorage.getItem("sellerLogged");
    return (
        <div className={`submenu z-[10000] absolute rounded-lg shadow-lg bg-white w-[340px] max-w-[90%] sm:max-w-[340px] p-8 ${i18n.language === "en" ? "right-2" : "left-2"} top-12 text-black`}>
            <div className="flex flex-col gap-5">
                <div className="flex items-center gap-5 pb-4 border-b border-b-gray-300">
                    <img src={image || "https://lh3.googleusercontent.com/Xsvl-X4MBLASFz1ha2-zl_LV3Hj4-f1sy73yWwg3QcDiJ-WKWmkQajdiolJ5Sv4oF4QtnQiuBwUsBJQsSEspLYszs1UFXf-rUhIx-00T"} className="w-12 h-12 bg-secondColor rounded-full" alt={name} />
                    <p className='font-bold'>{name}</p>
                </div>
                <div className="flex flex-col gap-3 pb-4 border-b border-b-gray-300">
                    <Link to="/profile" className="flex items-center justify-between font-medium">
                        <div className="flex items-center gap-2"><FaUserAlt /> {i18n.language === "en" ? "My account" : "حسابي"}</div>
                        {i18n.language === "en" ? <AiOutlineRight /> : <AiOutlineLeft />}
                    </Link>
                    {sellerLogged && <Link to="/dashboard" className="flex items-center justify-between font-medium">
                        <div className="flex items-center gap-2"><SiGoogleanalytics /> {i18n.language === "en" ? "Dashbaord" : "لوحة التحكم"}</div>
                        {i18n.language === "en" ? <AiOutlineRight /> : <AiOutlineLeft />}
                    </Link>}
                    {
                        sellerLogged ?
                            <Link to="/orders" className="flex items-center justify-between font-medium">
                                <div className="flex items-center gap-2"><BsCreditCardFill /> {i18n.language === "en" ? "My Orders" : "الطلبات"}</div>
                                {i18n.language === "en" ? <AiOutlineRight /> : <AiOutlineLeft />}
                            </Link>
                            :
                            <Link to="/payments" className="flex items-center justify-between font-medium">
                                {
                                    sellerLogged ? 
                                    <div className="flex items-center gap-2"><BsCreditCardFill /> {i18n.language === "en" ? "Payments" : "المدفوعات"}</div>
                                    :
                                    <div className="flex items-center gap-2"><BsCreditCardFill /> {i18n.language === "en" ? "purchases" : "المشتريات"}</div>
                                }
                                {i18n.language === "en" ? <AiOutlineRight /> : <AiOutlineLeft />}
                            </Link>
                    }
                    <Link to="/profile" className="flex items-center justify-between font-medium">
                        <div className="flex items-center gap-2"><AiFillSetting /> {i18n.language === "en" ? "Settings" : "الاعدادات"}</div>
                        {i18n.language === "en" ? <AiOutlineRight /> : <AiOutlineLeft />}
                    </Link>
                </div>
                <div className="flex flex-col gap-3">
                    <Link to="/contact-us" className="flex items-center justify-between font-medium">
                        <div className="flex items-center gap-2"><MdSupport /> {i18n.language === "en" ? "Support" : "الدعم"}</div>
                        {i18n.language === "en" ? <AiOutlineRight /> : <AiOutlineLeft />}
                    </Link>
                    <button onClick={logout} className="flex items-center justify-between font-medium">
                        <div className="flex items-center gap-2"><BiLogOutCircle /> {i18n.language === "en" ? "Logout" : "تسجيل الخروج"}</div>
                        {i18n.language === "en" ? <AiOutlineRight /> : <AiOutlineLeft />}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SubMenu
