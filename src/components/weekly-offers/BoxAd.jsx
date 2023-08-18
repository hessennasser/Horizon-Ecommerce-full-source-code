import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import apiUrl from '../../apiUrl';
import { Link } from 'react-router-dom';
import Loading from '../Loading';

const BoxAd = () => {
    const { i18n, t } = useTranslation();
    const [ad, setAd] = useState([]);
    const [loading, setLoading] = useState(false);

    const getAds = async () => {
        setLoading(true);
        try {
            const response = await axios(`${apiUrl}/add/login`);
            const { data } = response;
            setAd(data.data);
        } catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        getAds();
    }, [])



    return (
        <div className={`bg-white flex flex-col items-center justify-center ${i18n.language === "ar" ? "md:rounded-l-xl" : "md:rounded-r-xl"} shadow-2xl overflow-hidden relative`}>
            {loading ?
                <Loading />
                :
                ad.length >= 2 &&
                <>
                    <div className="w-full flex items-center justify-center">
                        <a href={ad[0]?.link} target='_self'>
                            <img className='p-5 w-56 h-56' src={`https://admin.horriizon.com/public/${ad[0]?.image}`} alt="Horizon" />
                        </a>
                    </div>
                    <div className="w-full h-[2px] bg-gray-500"></div>
                    <div className="w-full flex items-center justify-center">
                        <a href={ad[1]?.link} target='_self'>
                            <img className='p-5 w-56 h-56' src={`https://admin.horriizon.com/public/${ad[1]?.image}`} alt="Horizon" />
                        </a>
                    </div>
                </>
            }
        </div>
    )
}

export default BoxAd
