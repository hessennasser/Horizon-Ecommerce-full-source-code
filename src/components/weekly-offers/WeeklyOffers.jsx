import { useState } from "react";
import RegisterCard from "./RegisterCard"
import WeeklyOffersCards from "./WeeklyOffersCards"
import ImageCard from "./imageCard";
import "./styles.css"
import axios from "axios";
import apiUrl from "../../apiUrl";
import { useTranslation } from "react-i18next";
import BoxAd from "./BoxAd";

const weeklyOffers = ({ imageCard, isMarginTop, titleEn, titleAr }) => {
    const userLogged = localStorage.getItem("userLogged");
    const sellerLogged = localStorage.getItem("sellerLogged");
    // get weekly offers
    const [weeklyProducts, setWeeklyProducts] = useState([]);
    const [weeklyLoading, setWeeklyLoading] = useState(false);
    const [weeklyError, setWeeklyError] = useState(null);

    const getWeeklyOffers = async () => {
        setWeeklyLoading(true);
        try {
            const response = await axios.post(`${apiUrl}/section/weeklyOffers`);
            const { data } = response;
            setWeeklyProducts(data.data);
            setWeeklyLoading(false);
        } catch (error) {
            setWeeklyError(error);
            setWeeklyLoading(false);
        }
    };
    // get offers
    const [offersProducts, setOffersProducts] = useState([]);
    const [offersLoading, setLoading] = useState(false);
    const [offersError, setError] = useState(null);
    const getOffers = async () => {
        setLoading(true);
        try {
            const response = await axios.post(`${apiUrl}/section/offers`);
            const { data } = response;
            setOffersProducts(data.data);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
            console.log(error);
        }
    };

    return (
        <div className={`px-5 relative z-10 grid grid-cols-1 md:grid-cols-3 mt-10 ${isMarginTop ? "md:-translate-y-36" : ""} min-h-[400px]`}>
            {imageCard ?
                <>
                    <ImageCard />
                    <WeeklyOffersCards titleEn={"Offers"} titleAr={"أجدد العروض"} getWeeklyOffers={getOffers} loading={offersLoading} error={offersError} products={offersProducts} imageCard={true} link={"/offers"} />
                </>
                :
                <>
                    <WeeklyOffersCards titleEn={"Weekly Offers"} titleAr={"العروض الأسبوعية"} getWeeklyOffers={getWeeklyOffers} loading={weeklyLoading} error={weeklyError} products={weeklyProducts} link={"/dally-offers"} />
                    {
                        (!userLogged && !sellerLogged) ?
                            (
                                <RegisterCard />
                            )
                            :
                            (
                                <BoxAd />
                            )
                    }
                </>
            }
        </div>
    )
}

export default weeklyOffers
