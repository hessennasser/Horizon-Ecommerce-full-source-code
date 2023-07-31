import { useTranslation } from "react-i18next";
import { FcGoogle } from "react-icons/fc";
import { MdFacebook } from "react-icons/md";
import { BsApple } from "react-icons/bs";
import { Link } from "react-router-dom";

const StartedCard = () => {
    const { t, i18n } = useTranslation();
    return (
        <div className="wrapper ">
            <div className='grid grid-col-1 md:grid-cols-2 bg-[#125ed424]'>
                <div className="text-mainColor flex flex-col justify-center items-center py-20">
                    <h2 className="font-semibold text-3xl sm:text-[2rem] md:text-[3rem] mb-10">Let's get started</h2>
                    <p className="px-10 text-gray-700">We need some basic information about you so we can contact you about your booking ✌️</p>
                </div>
                <div className="bg-white py-20">

                    <div className="buttons-holder flex flex-col items-center gap-3">
                        <Link to="/seller-login" className="bg-secondColor w-48 text-white p-2 rounded-lg hover:brightness-110 text-xs md:text-sm text-center">
                            {t('weeklyOffers.registerCard.sugnInButtons.seller')}
                        </Link>
                        <Link to="/customer-login" type="button" className="border border-mainColor text-mainColor w-48 p-2 rounded-lg text-xs md:text-sm text-center">
                            {t('weeklyOffers.registerCard.sugnInButtons.customer')}
                        </Link>
                        <div className="flex gap-5 text-2xl text-white">
                            <div className="facebook bg-[#1877F2] px-8 py-2 rounded-lg shadow-xl">
                                <button aria-label="facebook" type="button">
                                    <MdFacebook />
                                </button>
                            </div>
                            <div className="google px-8 py-2 rounded-lg shadow-xl">
                                <button type="button" aria-label="google">
                                    <FcGoogle />
                                </button>
                            </div>
                            <div className="apple bg-black px-8 py-2 rounded-lg shadow-xl">
                                <button type="button" aria-label="apple">
                                    <BsApple />
                                </button>
                            </div>
                        </div>
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
                        <Link to="/customer-signup" className="text-secondColor font-bold">{t(`weeklyOffers.registerCard.footer.1`)}</Link>
                    </p>

                </div>
            </div>
        </div>
    )
}

export default StartedCard
