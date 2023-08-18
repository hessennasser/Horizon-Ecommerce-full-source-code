import React from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { BsCardImage } from 'react-icons/bs';
import { Link } from 'react-router-dom';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


const SingleCard = ({ id, openEditModal, openDeleteModal, openOrderModal, category, title, images, price, quantity, start_date, setDeleteProductId, setEditProductId, setOrderId }) => {
    const { i18n } = useTranslation();
    return (
        <div className='bg-white p-3 rounded-lg shadow-md'>
            <div className="img-holder flex justify-center items-center">
                <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    loop={true}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
                    style={{ direction: "ltr" }}

                >
                    {images.map((image) => (
                        <SwiperSlide key={image.id}>
                            <img className='w-32 h-32 mx-auto mb-5 object-contain' src={`https://admin.horriizon.com/public/${image.path}`} alt={i18n.language === "en" ? title?.en : title?.ar} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="info grid gap-y-3">
                <div className="grid grid-cols-2 gap-2">
                    <span>Category :</span>
                    <p className='font-bold'>{i18n.language === "en" ? `${category.title?.en.substr(0, 10)}..` : `${category.title?.ar.substr(0, 10)}..`}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <span>Product Name :</span>
                    <p className='font-bold'>{i18n.language === "en" ? `${title?.en.substr(0, 15)}...` : `${title?.ar.substr(0, 15)}...`}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <span>Price :</span>
                    <p className='font-bold'>{price}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <span>Quantity :</span>
                    <p className='font-bold'>{quantity}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <span>End Date :</span>
                    <p className='font-bold'>{start_date}</p>
                </div>
            </div>
            <div className='grid gap-2 mt-2'>
                <button
                    type='button'
                    className='flex items-center justify-center gap-2 bg-secondColor hover:bg-blue-800 duration-200 py-1 px-4 rounded-md hover:brightness-110 text-white'
                    onClick={() => {
                        openOrderModal(id);
                    }}
                >
                    Show Orders <AiOutlineArrowRight />
                </button>
                <div className="buttons-holder grid grid-cols-2 gap-2 items-end">
                    <button
                        type='button'
                        className='flex items-center justify-center gap-2 border border-secondColor text-secondColor py-1 px-4 rounded-md transition-all hover:bg-mainColor hover:text-white hover:border-white duration-200 hover:brightness-110'
                        onClick={() => {
                            openEditModal();
                            setEditProductId(id);
                        }}
                    >
                        Edit
                    </button>
                    <button
                        type='button'
                        className='flex items-center justify-center gap-2 border border-secondColor text-secondColor py-1 px-4 rounded-md transition-all hover:bg-mainColor hover:text-white hover:border-white duration-200 hover:brightness-110'
                        onClick={
                            () => {
                                openDeleteModal();
                                setDeleteProductId(id);
                            }
                        }
                    >
                        Delete
                    </button>
                </div>
                {/* <Link
                    to={`/product/${id}`}
                    className='flex items-center justify-center gap-2 bg-secondColor hover:bg-blue-800 duration-200 py-1 px-4 rounded-md hover:brightness-110 text-white'
                >
                    See Details
                </Link> */}
            </div>
        </div>
    )
}

export default SingleCard
