import { GoLocation } from 'react-icons/go';
import { BiPhone } from 'react-icons/bi';
import { AiFillFacebook, AiOutlineTwitter, AiFillYoutube, AiOutlineInstagram } from 'react-icons/ai';
import { GrLinkedinOption } from "react-icons/gr";
import logo from "../../assets/images/horizon-logo.png";
import { Link } from "react-router-dom";
import BottomFooter from './BottomFooter';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { AppContext } from '../../AppContext';

const MyFooter = () => {
    const { i18n } = useTranslation();
    const { websiteInfo } = useContext(AppContext);
    return (
        <footer className="bg-mainColor py-10 text-white">

            <div className="container">
                <div className="py-10 grid gap-5 grid-cols-1 sm:grid-cols-3 border-y border-y-gray-700">
                    <div className="flex items-center justify-start">
                        <img className='mx-auto w-52' src={logo} alt="horizon" />
                    </div>

                    <div className='col-span-2 grid '>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="flex items-center gap-2 col-span-2">
                                <GoLocation />
                                <p className='text-sm'>{i18n.language === "en" ? websiteInfo?.address?.en : websiteInfo?.address?.ar}</p>
                            </div>
                            <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                                <BiPhone />
                                <p className='text-sm' >{websiteInfo?.phone}</p>
                            </div>
                        </div>
                        <div className="mt-5 flex justify-between">
                            <p className='text-gray-400 mx-3'>Social Media</p>
                            <div className="flex-1 flex gap-3 text-2xl items-center justify-center">
                                <a href={websiteInfo.facebook} target='_blank' aria-label='facebook'>
                                    <AiFillFacebook />
                                </a>
                                <a href={websiteInfo.instagram} target='_blank' aria-label='instagram'>
                                    <AiOutlineInstagram />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <BottomFooter />
            </div>

        </footer>
    )
}

export default MyFooter
