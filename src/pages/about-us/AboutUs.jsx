import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import apiUrl from '../../apiUrl';
import { useTranslation } from 'react-i18next';
import Loading from '../../components/Loading';
const AboutUs = () => {
    const { i18n } = useTranslation();
    const [info, setInfo] = useState({});
    const [loading, setLoading] = useState(true);
    const getInfo = async () => {
        try {
            const response = await axios(`${apiUrl}/about`);
            const { data } = response;
            setInfo(data.data);
        } catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        getInfo();
    }, [])

    if (loading) {
        return <Loading />
    }
    console.log(info);
    return (
        <div className='container py-10'>
            <div className="grid grid-cols-2 gap-5">
                <div className="col-span-2 md:col-span-1">
                    <img src={`https://admin.horriizon.com/public/${info?.image}`} alt="horizon" />
                </div>
                <div className="col-span-2 md:col-span-1 text-center flex flex-col items-center justify-center gap-3">
                    <h2 className='text-xl font-medium text-secondColor'>{i18n.language === "en" ? info?.title?.en : info?.title?.ar}</h2>
                    <p>
                        {i18n.language === "en" ? info?.description?.en : info?.description?.ar}
                    </p>
                    <Link className='text-secondColor font-bold px-4 py-2 border border-black rounded-2xl hover:bg-mainColor hover:text-white duration-200' aria-label='contact us' to="/contact-us">
                        {i18n.language === "en" ? "Contact Us" : "تواصل معنا"}
                    </Link>
                    {/* <hr className='w-full my-5 border-gray-600' />
                    <div className="grid gap-3">
                        <p className='text-gray-600'>Have any questions? <br />
                            Contact us!</p>
                        <p className='font-medium'>+996 (4343) 4325665</p>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default AboutUs
