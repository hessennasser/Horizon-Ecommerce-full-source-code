import { useState } from "react";
import RegisterCard from "./RegisterCard"
import WeeklyOffersCards from "./WeeklyOffersCards"
import ImageCard from "./imageCard";
import "./styles.css"
import axios from "axios";
import apiUrl from "../../apiUrl";

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
            console.log(data.data);
        } catch (error) {
            setWeeklyError(error);
            setWeeklyLoading(false);
            console.log(weeklyError);
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
        <div className={`px-5 md:-translate-y-20 relative z-10 grid grid-cols-1 md:grid-cols-3 mt-24 ${isMarginTop ? "md:-translate-y-36" : ""}`}>
            {imageCard ?
                <>
                    <ImageCard />
                    <WeeklyOffersCards titleEn={"Offers"} titleAr={"أجدد العروض"} getWeeklyOffers={getOffers} loading={offersLoading} error={offersError} products={offersProducts} imageCard={true} />
                </>
                :
                <>
                    <WeeklyOffersCards titleEn={"Weekly Offers"} titleAr={"العروض الأسبوعية"} getWeeklyOffers={getWeeklyOffers} loading={weeklyLoading} error={weeklyError} products={weeklyProducts} widthFull={userLogged || sellerLogged} />
                    {
                        (!userLogged && !sellerLogged) && <RegisterCard />
                    }
                </>
            }
        </div>
    )
}

export default weeklyOffers
