import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSSR, useTranslation } from "react-i18next";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import SingleProductCard from "../products/SingleProductCard";
import { useEffect, useState } from "react";
import axios from "axios";
import apiUrl from "../../apiUrl";
import { Link } from "react-router-dom";
import { Oval } from "react-loader-spinner";


const WeeklyOffersCards = ({ imageCard, widthFull,getWeeklyOffers, products, setProducts, loading, error, titleEn, titleAr }) => {
    const { i18n, t } = useTranslation();
    // ${i18n.language === "en" || !imageCard ? "md:rounded-l-xl" : "md:rounded-r-xl"}

    useEffect(() => {
        getWeeklyOffers();
    }, []);

    if (loading) {
        return (
            <div className={`p-3 ${widthFull ? "col-span-3" : "col-span-2"} bg-[#F4F4F4]  shadow-2xl overflow-hidden`}>
                <div className="flex flex-col md:flex-row gap-5 justify-between items-start mb-5">
                    <div className="flex-1">
                        <h2 className="font-bold text-2xl mb-2">{i18n.language === "en" ? titleEn : titleAr}</h2>
                        <p className="w-full md:w-2/3 text-gray-800">{t('weeklyOffers.descraption')}</p>
                    </div>
                    <Link to="/all-products" className="flex items-center gap-3 text-lg ">
                        {t('weeklyOffers.allButton')}
                        {
                            i18n.language === "ar" ? <AiOutlineArrowLeft /> : <AiOutlineArrowRight />
                        }
                    </Link>
                </div>
                {/* Loader */}
                <div className="flex flex-col gap-5 items-center justify-center">
                    <Oval
                        visible={true}
                        height="160"
                        width="160"
                        ariaLabel="Oval-loading"
                        wrapperStyle={{}}
                        wrapperClass="Oval-wrapper"
                    />
                </div>
            </div>
        )
    }

    if (error) {
        return <div className={`p-3 ${widthFull ? "col-span-3" : "col-span-2"} bg-[#F4F4F4]  shadow-2xl overflow-hidden`}>
            <div className="flex flex-col md:flex-row gap-5 justify-between items-start mb-5">
                <div className="flex-1">
                    <h2 className="font-bold text-2xl mb-2">{i18n.language === "en" ? titleEn : titleAr}</h2>
                    <p className="w-full md:w-2/3 text-gray-800">{t('weeklyOffers.descraption')}</p>
                </div>
                <Link to="/all-products" className="flex items-center gap-3 text-lg ">
                    {t('weeklyOffers.allButton')}
                    {
                        i18n.language === "ar" ? <AiOutlineArrowLeft /> : <AiOutlineArrowRight />
                    }
                </Link>
            </div>
            <h1>There is an error</h1>
        </div>
    }

    return (
        <div className={`p-3 ${widthFull ? "col-span-3" : "col-span-2"} bg-[#F4F4F4]  shadow-2xl overflow-hidden`}>
            <div className="flex flex-col md:flex-row gap-5 justify-between items-start mb-5">
                <div className="flex-1">
                    <h2 className="font-bold text-2xl mb-2">{i18n.language === "en" ? titleEn : titleAr}</h2>
                    <p className="w-full md:w-2/3 text-gray-800">{t('weeklyOffers.descraption')}</p>
                </div>
                <Link to="/all-products" className="flex items-center gap-3 text-lg ">
                    {t('weeklyOffers.allButton')}
                    {
                        i18n.language === "ar" ? <AiOutlineArrowLeft /> : <AiOutlineArrowRight />
                    }
                </Link>
            </div>
            <Swiper
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false
                }}
                // loop={true}
                navigation={true}
                slidesPerView={1}
                spaceBetween={10}
                modules={[Navigation, Autoplay]}
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                    640: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    960: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                    },
                    1600: {
                        slidesPerView: 5,
                        spaceBetween: 20,
                    }
                }}
                className="weekly-offers-swiper py-5"
                style={{ direction: i18n.language === "ar" ? "ltr" : "initial" }}

            >
                {
                    products.map(product => {
                        return (
                            <SwiperSlide key={product.id}>
                                <SingleProductCard
                                    productDetails={product}
                                    id={product.id}
                                    title={product.title}
                                    total_price={product.total_price}
                                    price={product.price}
                                    quantity={product.quantity}
                                    image={product.images[0].path}
                                    category={product.category} />
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        </div>
    )
}

export default WeeklyOffersCards
