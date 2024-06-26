import { useEffect, useState } from "react";
import banner1 from "../../assets/images/banner-1.png";
import axios from "axios";
import apiUrl from "../../apiUrl";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const HomeBanner = () => {
    const { i18n } = useTranslation();
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(true);
    const getData = async () => {
        setLoading(true);
        try {
            const response = await axios(`${apiUrl}/section/banner`);
            const { data } = response.data;
            setData(data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setError(true);
            setLoading(false);
        }
        setLoading(false);
        setError(false);
    }
    useEffect(() => {
        getData();
    }, []);

    if (loading || error) {
        return;
    }

    return (
        <div className="py-5 text-white bg-mainColor bg-gradient-to-r from-indigo-900 to-purple-900">
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
                <div className="flex items-center gap-2">
                    {
                        data?.images?.map(image => (
                            <div className="img">
                                <img src={`https://admin.horriizon.com/public/${image?.image}`} alt="horizon" />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default HomeBanner
