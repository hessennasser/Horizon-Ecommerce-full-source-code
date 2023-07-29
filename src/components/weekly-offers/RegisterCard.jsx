import { useTranslation } from "react-i18next";
import loginImage from "../../assets/images/login.gif";
import { Link } from "react-router-dom";

const RegisterCard = () => {
    const { i18n, t } = useTranslation();

    return (
        <div className={`bg-white flex flex-col ${i18n.language === "ar" ? "md:rounded-l-xl" : "md:rounded-r-xl"} shadow-2xl overflow-hidden`}>

            <div className="flex flex-col items-center justify-center gap-5 flex-1">
                <img src={loginImage} alt="horizon" />
                <h4 className="text-md font-bold text-center">{t(`weeklyOffers.registerCard.header.0`)}<span className="text-secondColor">{t(`weeklyOffers.registerCard.header.1`)}</span></h4>
                <Link className="w-full flex items-center justify-center" to="/seller-login">
                    <button type="button" className="w-2/3 border border-secondColor text-secondColor p-2 rounded-lg hover:brightness-110 text-xs md:text-sm shadow-lg font-bold">
                        {t('weeklyOffers.registerCard.sugnInButtons.seller')}
                    </button>
                </Link>
                <Link className="w-full flex items-center justify-center" to="/customer-login">
                    <button type="button" className="w-2/3 bg-secondColor p-2 rounded-lg hover:brightness-110 text-xs md:text-sm shadow-lg text-white font-bold">
                        {t('weeklyOffers.registerCard.sugnInButtons.customer')}
                    </button>
                </Link>

            </div>

            <div className="flex items-center justify-center my-5">
                <div className="w-1/2 border-t border-gray-300"></div>
                <p className="mx-4 text-gray-500 font-semibold uppercase">
                    {i18n.language === "en" ? "OR" : "أو"}
                </p>
                <div className="w-1/2 border-t border-gray-300"></div>
            </div>
            <p className="text-center pb-5">
                {t(`weeklyOffers.registerCard.footer.0`)}
                <Link className="text-secondColor font-bold" to="/customer-signup">{t(`weeklyOffers.registerCard.footer.1`)}</Link>
            </p>
        </div>
    )
}

export default RegisterCard
