import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import apiUrl from '../apiUrl';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';
import { AppContext } from '../AppContext';

const ModalAd = ({ onOpen, onClose, modalVisible, showModal }) => {
    const [ad, setAd] = useState();
    const [loading, setLoading] = useState(false);
    const {completeInfoModal} = useContext(AppContext);
    const getAds = async () => {
        setLoading(true);
        try {
            const response = await axios(`${apiUrl}/add/modal`);
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

    if (!ad || completeInfoModal) {
        return null;
    }

    return (
        <div className={`modal-container ${modalVisible ? "open" : "close"} max-w-[75%] right-9 md:right-20`}>
            <div className="modal-content">
                <div className="flex items-center justify-between mb-4">
                    {
                        modalVisible ?
                            <button className="close-button end-1 h-10 w-10 p-2 text-xl" onClick={onClose}><AiOutlineArrowDown /></button>
                            :
                            <button className="close-button end-1 h-10 w-10 p-2 text-xl" onClick={onOpen}><AiOutlineArrowUp /></button>
                    }
                    {
                        modalVisible && <button className="text-xl absolute top-[6px] start-2 h-10 w-10 p-2 bg-red-400 text-white rounded-full flex items-center justify-center" onClick={() => showModal(false)}><FaTimes /></button>
                    }
                </div>
                <a href={ad[0]?.link}>
                    <img className='p-5 min-h-[400px] h-[400px] mx-auto' src={`https://admin.horriizon.com/public/${ad[0]?.image}`} alt="Horizon" />
                </a>
            </div>
        </div>
    );
};

export default ModalAd;
