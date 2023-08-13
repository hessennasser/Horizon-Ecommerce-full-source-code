import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import apiUrl from '../apiUrl';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';

const ModalAd = ({ onOpen, onClose, modalVisible, showModal }) => {
    const [ad, setAd] = useState();
    const [loading, setLoading] = useState(false);

    const getAds = async () => {
        setLoading(true);
        try {
            const response = await axios(`${apiUrl}/ads/modal`);
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

    if (!ad) {
        return null;
    }

    return (
        <div className={`modal-container ${modalVisible ? "open" : "close"}`}>
            <div className="modal-content">
                <div className="flex items-center justify-between">
                    {
                        modalVisible ?
                            <button className="close-button end-2" onClick={onClose}><AiOutlineArrowDown /></button>
                            :
                            <button className="close-button" onClick={onOpen}><AiOutlineArrowUp /></button>
                    }
                    {
                        modalVisible && <button className="text-xl p-2 bg-red-400 text-white rounded-full" onClick={() => showModal(false)}><FaTimes /></button>
                    }
                </div>
                <img className='p-5 min-h-[400px] h-[400px]' src={`https://admin.horriizon.com/public/${ad[0]?.image}`} alt="Horizon" />
            </div>
        </div>
    );
};

export default ModalAd;
