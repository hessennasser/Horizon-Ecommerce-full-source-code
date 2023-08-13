import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import apiUrl from '../../apiUrl';

const BoxAd = () => {
    const { i18n, t } = useTranslation();
    const [ad, setAd] = useState([]);
    const [loading, setLoading] = useState(false);

    const getAds = async () => {
        setLoading(true);
        try {
            const response = await axios(`${apiUrl}/ads/login`);
            const { data } = response;
            setAd(data.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    useEffect(() => {
        getAds();
    }, [])

    return (
        <div className={`bg-white flex flex-col items-center justify-center ${i18n.language === "ar" ? "md:rounded-l-xl" : "md:rounded-r-xl"} shadow-2xl overflow-hidden relative`}>
            {ad.length >= 2 &&
                <>
                    <div className="w-full flex items-center justify-center">
                        <img className='p-5 w-56 h-56' src={`https://admin.horriizon.com/public/${ad[0]?.image}`} alt="Horizon" />
                    </div>
                    <div className="w-full h-[2px] bg-gray-500"></div>
                    <div className="w-full flex items-center justify-center">
                        <img className='p-5 w-56 h-56' src={`https://admin.horriizon.com/public/${ad[1]?.image}`} alt="Horizon" />
                    </div>
                </>
            }
        </div>
    )
}

export default BoxAd
