import { useEffect, useState } from "react";
import banner1 from "../../assets/images/banner-1.png";
import axios from "axios";
import apiUrl from "../../apiUrl";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const HomeBanner = () => {
    const { i18n } = useTranslation();
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const getData = async () => {
        setLoading(true);
        try {
            const response = await axios(`${apiUrl}/section/banner`);
            const { data } = response.data;
            console.log(data);
            setData(data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getData();
    }, [])
    return (
        <div className="py-5 text-white bg-gradient-to-r from-mainColor to-secondColor">
            <div className="container grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="text col-span-2">
                    <div>
                        <h3 className="text-2xl font-bold">{i18n.language === "en" ? data?.title?.en : data?.title?.ar}</h3>
                        <p className="text-gray-100">{i18n.language === "en" ? data?.description?.en : data?.description?.ar}</p>
                    </div>
                    <div className="mt-5 flex flex-col items-start gap-3">

                        <p className="text-[3.5rem] font-extrabold text-secondColor">
                            {data?.discount}%<span className="text-xs text-gray-100">DSCNT</span>
                        </p>

                        <Link to={data.link} className="bg-secondColor py-2 px-4 rounded-lg hover:brightness-110 text-xs md:text-sm capitalize">
                            {i18n.language === "en" ? "Get Discount Now" : "احصل علي الخصم الان"}
                        </Link>
                    </div>
                </div>
                <div className="img">
                    <img src={`https://admin.horriizon.com/public/${data?.image}`} alt="horizon" />
                </div>
            </div>
        </div>
    )
}

export default HomeBanner
