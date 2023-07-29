import React from 'react'
import { useTranslation } from 'react-i18next'
import { AiOutlineArrowRight } from 'react-icons/ai'

const SingleCard = ({ id, openEditModal, openDeleteModal,openOrderModal, category, title, image, price, quantity, start_date, setDeleteProductId, setEditProductId, setOrderId }) => {
    const { i18n } = useTranslation();
    return (
        <div className='grid gap-2 bg-white p-3 rounded-lg shadow-md'>
            <div className="img-holder  flex justify-center items-center">
                <img className='w-32 object-contain' src={`https://admin.horriizon.com/public/assets/${image}`} alt={i18n.language === "en" ? title?.en : title?.ar} />
            </div>
            <div className="info grid gap-y-3">
                <div className="grid grid-cols-2 gap-2">
                    <span>Category :</span>
                    <p className='font-bold'>{i18n.language === "en" ? category.title?.en : category.title?.ar}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <span>Product Name :</span>
                    <p className='font-bold'>{i18n.language === "en" ? title?.en : title?.ar}</p>
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
            <div className='grid gap-2'>
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
                        className='flex items-center justify-center gap-2 bg-secondColor hover:bg-mainColor duration-200 py-1 px-4 rounded-md hover:brightness-110 text-white'
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
            </div>
        </div>
    )
}

export default SingleCard
