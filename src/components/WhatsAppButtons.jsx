import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { BsWhatsapp } from 'react-icons/bs';
import { FaTimes } from 'react-icons/fa';

const WhatsAppButtons = () => {
    const { i18n } = useTranslation();
    const [showButton, setShowButton] = useState(false);

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
                <div className="w-[300px] sticky bottom-24 start-2 sm:start-8 z-[10000] bg-white mb-20 rtl overflow-hidden flex flex-col border rounded border-green-500">
                <div className="bg-mainColor py-10 px-5 box-border text-white text-center">
                    {i18n.language === "en" ? "Contact us By Whatsapp" : "تواصل معنا من خلال واتساب"}
                    </div>
                <div className="py-10 px-5 box-border text-gray-85 text-center">
                {
                    i18n.language === "en" ?
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum exercitationem animi velit, soluta nesciunt eveniet iusto sint facere laudantium voluptatem."
                    :
                    "هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها."
                }
                </div>
                <a
                    href="https://api.whatsapp.com/send?phone="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block  box-border text-white bg-secondColor text-center cursor-pointer w-fit px-5 mx-auto my-10 rounded-full no-underline"
                >
                    {i18n.language === "en" ? "Contact Us" : "تواصل معنا"}
                </a>
            </div>
            )
        }

            <button
                onClick={openModal}
                data-toggle="back-to-top"
                aria-label="Scroll To Top"
                className={`fixed rounded-full z-10 start-5 h-9 w-9 text-center bg-secondColor bg-opacity-70 text-2xl grid place-content-center text-white justify-center items-center transition-all duration-300 animate-bounce ${showButton ? 'bottom-10' : '-bottom-16'} backdrop-blur-lg`}
            >
                {
                    showModal ? <FaTimes/> : <BsWhatsapp />
                }
            </button>
        </>
    )
}

export default WhatsAppButtons
