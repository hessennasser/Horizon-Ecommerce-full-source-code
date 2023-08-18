/* eslint-disable react-hooks/rules-of-hooks */
import { useTranslation } from "react-i18next";
import featureImg from "../../assets/images/Feature_img1.png"
import axios from "axios";
import apiUrl from "../../apiUrl";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ImageCard() {
    const { i18n } = useTranslation();
    const [data, setData] = useState([]);
    const getWeeklyOffers = async () => {
        try {
            const response = await axios.post(`${apiUrl}/section/lastProduct`);
            const { data } = response;
            setData(data.data)
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getWeeklyOffers()
    }, [])
    return (
        <div className={`bg-white flex flex-wrap gap-5 p-4 ${i18n.language === "ar" ? "md:rounded-r-xl" : "md:rounded-l-xl"} shadow-2xl h-full overflow-hidden`}>
            {
                data.map((item) => {
                    return (
                        <Link to={`/categories/${item.id}`} className="w-[calc(50%-20px)]">
                            <img src={`https://admin.horriizon.com/public/${item.image}`} alt={i18n.language === "en" ? item.title.en : item.title.ar} className=" h-full w-full rounded-lg shadow-lg" />
                        </Link>
                    )
                })
            }
        </div>
    );
}

export default ImageCard
