import React, { useContext, useState } from 'react';
import { HiLocationMarker } from "react-icons/hi";
import { BiPhoneCall } from "react-icons/bi";
import { AiOutlineMail } from "react-icons/ai";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import apiUrl from '../../apiUrl';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { Spinner } from 'flowbite-react';
import { AppContext } from '../../AppContext';
import Breadcrumbs from '../../components/Breadcrumbs';

const ContactUs = () => {
    const { i18n } = useTranslation();
    const { websiteInfo } = useContext(AppContext);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        message: '',
    });
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.message.length < 10) {
            toast.info(i18n.language === "en" ? "The message must be at least 10 characters." : "يجب أن تتكون الرسالة من 10 أحرف على الأقل.");
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post(`${apiUrl}/contact`, formData);
            toast.success(i18n.language === "en" ? "Your message was sent successfully" : "تم ارسال رسالتك بنجاح")
        }
        catch (error) {
            toast.error(i18n.language === "en" ? "theres is an error, please try again" : "يوجد خطأ، برجاء المحاوله مره اخره");
        } finally {
            setLoading(false);
        }
    };

    const containerStyle = {
        height: '300px',
    };

    const center = {
        lat: 40.7128,
        lng: -74.0060,
    };
    return (
        <div className='container py-10'>
            <Breadcrumbs />

            <LoadScript googleMapsApiKey="YOUR_API_KEY">
                <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
                    <Marker position={center} />
                </GoogleMap>
            </LoadScript>

            <div className="grid grid-cols-2 gap-5 shadow-lg rounded-lg p-3">
                <div className="info col-span-2 md:col-span-1">
                    {
                        i18n.language === "en" ?
                            <h3 className='text-2xl font-bold'>
                                Feel free to <span className='text-secondColor'>contact us </span><br />
                                for any query
                            </h3>
                            :
                            <h3 className='text-2xl font-bold'>
                                لا تتردد في <span className='text-secondColor'>الاتصال بنا </span><br />
                                لأي استفسار
                            </h3>
                    }
                    <div className="flex flex-col gap-3 my-5">
                        <div className="flex gap-3 items-center justify-between">
                            <span className='text-2xl bg-secondColor text-white w-10 h-10 grid place-content-center rounded-full'><HiLocationMarker /></span>
                            <p className='flex-1'>{i18n.language === "en" ? websiteInfo?.address?.en : websiteInfo?.address?.ar}</p>
                        </div>
                        <div className="flex gap-3 items-center justify-between">
                            <span className='text-2xl bg-secondColor text-white w-10 h-10 grid place-content-center rounded-full'><BiPhoneCall /></span>
                            <p className='flex-1'>{websiteInfo?.phone}</p>
                        </div>
                        {
                            websiteInfo.email && (
                                <div className="flex gap-3 items-center justify-between">
                                    <span className='text-2xl bg-secondColor text-white w-10 h-10 grid place-content-center rounded-full'><AiOutlineMail /></span>
                                    <p className='flex-1 text-sm'>{websiteInfo?.email}</p>
                                </div>
                            )
                        }
                    </div>
                </div>

                <div className="form col-span-2 md:col-span-1">
                    <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
                        <div className="col-span-2 flex justify-between flex-col md:flex-row gap-3">
                            <input
                                className="w-full rounded-lg px-3 py-2 focus:outline-none border-none bg-gray-200"
                                type="text"
                                id="first_name"
                                name="first_name"
                                placeholder={i18n.language === "en" ? "First Name" : "الأسم الاول"}
                                value={formData.first_name}
                                required
                                onChange={handleInputChange}
                            />
                            <input
                                className="w-full rounded-lg px-3 py-2 focus:outline-none border-none bg-gray-200"
                                type="text"
                                id="last_name"
                                name="last_name"
                                placeholder={i18n.language === "en" ? "Last Name" : "الأسم الاخير"}
                                value={formData.last_name}
                                required
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="col-span-2 flex justify-between flex-col md:flex-row gap-3">
                            <input
                                className="w-full rounded-lg px-3 py-2 focus:outline-none border-none bg-gray-200"
                                type="email"
                                id="email"
                                name="email"
                                placeholder={i18n.language === "en" ? "Email" : "البريد الالكتروني"}
                                value={formData.email}
                                required
                                onChange={handleInputChange}
                            />
                            <input
                                className="w-full rounded-lg px-3 py-2 focus:outline-none border-none bg-gray-200"
                                type="text"
                                id="phone"
                                name="phone"
                                placeholder={i18n.language === "en" ? "Phone" : "الهاتف"}
                                value={formData.phone}
                                required
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="col-span-2">
                            <textarea
                                className="w-full rounded-lg px-3 py-2 focus:outline-none border-none bg-gray-200 min-h-[4rem]"
                                id="message"
                                name="message"
                                rows="4"
                                placeholder={i18n.language === "en" ? "Your Message" : "رسالتك"}
                                value={formData.message}
                                required
                                onChange={handleInputChange}
                            ></textarea>
                        </div>
                        <div className="col-span-2 flex">
                            <button disabled={loading} className="w-1/2 bg-secondColor hover:bg-mainColor duration-200 text-white py-2 rounded-lg mx-auto" type="submit">
                                {loading ?
                                    <>
                                        <Spinner aria-label="loading..." color="purple" />
                                    </>
                                    :
                                    i18n.language === "en" ? "Submit" : "تأكيد"
                                }
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
