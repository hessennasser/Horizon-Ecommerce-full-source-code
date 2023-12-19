import React, { useContext, useEffect, useState } from 'react'
import Breadcrumbs from '../components/Breadcrumbs'
import apiUrl from '../apiUrl';
import axios from 'axios';
import Loading from '../components/Loading';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { BsCheck2All } from 'react-icons/bs';
import { AppContext } from '../AppContext';

const Packages = () => {
    const { i18n } = useTranslation();
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(false);
    const {whatsApp:info} = useContext(AppContext);
    const getPackages = async () => {
        setLoading(true);
        try {
            const request = await axios(`${apiUrl}/plans`);
            setPackages(request.data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        getPackages()
    }, []);

    if (loading) {
        return <Loading />
    }

    return (
        <section className='py-10'>
            <div className="container">
                <Breadcrumbs />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                    {
                        packages.map((item) => {
                            console.log(item);
                            return (
                                <div key={item.id} className="card flex flex-col gap-3 bg-white px-2 pt-4 rounded-lg shadow-md">
                                    <img src={`https://admin.horriizon.com/public/${item?.image}`} alt={i18n.language === "en" ? item.title.en : item.title.ar} className='w-24 h-24 mx-auto object-contain' />
                                    <h2 className='text-center text-xl font-bold'>{i18n.language === "en" ? item.title.en : item.title.ar}</h2>

                                    {
                                        item.description.map(item => (
                                            <p key={item.id} className='flex items-center gap-2 '>
                                                <BsCheck2All className='text-xl text-green-500' />
                                                <span>{i18n.language === "en" ? item.description.en : item.description.ar}</span>
                                            </p>
                                        ))
                                    }
                                    <p className='flex items-center gap-3 w-fit mx-auto text-lg font-medium px-3 py-2 rounded-sm text-secondColor mt-5'>
                                        <span>{i18n.language === "en" ? "Price:" : "السعر:"}</span>
                                        <span>{i18n.language === "en" ? item.price : item.price}</span>
                                    </p>
                                    <a
                                        href={`https://api.whatsapp.com/send?phone=20${info.number}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full box-border text-white bg-secondColor text-center cursor-pointer py-2 px-5 mx-auto mb-3 rounded-sm no-underline"
                                    >
                                        {i18n.language === "en" ? "contact us to subscribe" : "تواصل معنا للاشتراك"}
                                    </a>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}

export default Packages
