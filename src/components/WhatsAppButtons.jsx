import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { BsWhatsapp } from 'react-icons/bs';
import { FaTimes } from 'react-icons/fa';
import apiUrl from '../apiUrl';
import axios from 'axios';
import { AppContext } from '../AppContext';

const WhatsAppButtons = () => {
    const { i18n } = useTranslation();
    const [showButton, setShowButton] = useState(false);
    const {whatsApp:info } = useContext(AppContext);
    const handleScroll = () => {
        if (window.scrollY > 200) {
            setShowButton(true);
        } else {
            setShowButton(false);
            setShowModal(false)
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(!showModal);
    };

    return (
        <>
            {
                showModal && (
                    <div className="w-[300px] fixed bottom-10 start-4 sm:start-8 z-[10000] bg-white mb-20 rtl overflow-hidden flex flex-col border rounded border-green-500">
                        <div className="bg-mainColor py-10 px-5 box-border text-white text-center">
                            {i18n.language === "en" ? info.title.en : info.title.ar}
                        </div>
                        <div className="py-10 px-5 box-border text-gray-85 text-center">
                            {
                                i18n.language === "en" ?
                                info.description.en
                                :
                                info.description.ar
                            }
                        </div>
                        <a
                            href={`https://api.whatsapp.com/send?phone=20${info.number}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block box-border text-white bg-secondColor text-center cursor-pointer w-fit px-5 mx-auto my-10 rounded-full no-underline"
                        >
                            {i18n.language === "en" ? info.button.en : info.button.ar}
                        </a>
                    </div>
                )
            }

            <button
                onClick={openModal}
                data-toggle="back-to-top"
                aria-label="Scroll To Top"
                className={`z-[10000000000000000] fixed rounded-full start-5 h-14 w-14 text-center bg-secondColor bg-opacity-70 text-2xl grid place-content-center text-white justify-center items-center transition-all duration-300 animate-bounce ${showButton ? 'bottom-10' : '-bottom-18'} backdrop-blur-lg`}
            >
                {
                    showModal ? <FaTimes /> : <BsWhatsapp />
                }
            </button>
        </>
    )
}

export default WhatsAppButtons
