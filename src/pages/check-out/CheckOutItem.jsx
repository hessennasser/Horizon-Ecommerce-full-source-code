import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next';
import { AppContext } from '../../AppContext';
import { AiFillDelete } from 'react-icons/ai';

const CheckOutItem = ({ id, title, price, productTotalPrice, quantity, image, openDeleteModal, setDeleteProductId }) => {
    const { i18n } = useTranslation();
    return (
        <div className="flex justify-between gap-3 border border-gray-300 py-3 px-2 rounded-md shadow-sm">

            <img className="w-20 h-20 object-cover" src={image} alt={i18n.language === 'en' ? title.en : title.ar} />

            <div className="grid flex-1 gap-5">
                <h3 className='font-medium'>{i18n.language === 'en' ? title.en : title.ar}</h3>
                <div className="flex justify-between items-center">
                    <p className='text-gray-500'>
                        {i18n.language === 'en' ? "Quantity : " : "الكمية : "}
                        <span>{quantity}</span>
                    </p>
                    <span>*</span>
                    <p className='text-gray-500'>
                        {i18n.language === 'en' ? "Price : " : "السعر : "}
                        <span>{price}</span>
                    </p>
                </div>
            </div>

            <span className='text-secondColor font-bold'>{`${i18n.language === 'ar' ? `جنية ${productTotalPrice}` : `${productTotalPrice} EGY`}`}</span>
            <button type='button' className="text-2xl text-secondColor border-s border-secondColor ps-1"
                onClick={
                    () => {
                        openDeleteModal();
                        setDeleteProductId(id);
                    }
                }

            >
                <AiFillDelete />
            </button>

        </div>
    )
}

export default CheckOutItem
