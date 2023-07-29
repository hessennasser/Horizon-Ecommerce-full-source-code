import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AiFillDelete } from 'react-icons/ai';
import apiUrl from '../../apiUrl';
import { toast } from 'react-toastify';
import { AppContext } from '../../AppContext';

const CartItem = ({ id, title, image, price, quantity, quantityOnStock, productTotalPrice, setCartItems }) => {
    const { i18n } = useTranslation();
    const [userQuantity, setQuantity] = useState(quantity);
    const userToken = JSON.parse(localStorage.getItem('userToken'));
    const { getTotalPriceInCart, handelUpdateQuantity, getCartItems, total: itemsTotal } = useContext(AppContext);

    const handleIncrement = () => {
        if (userQuantity === quantityOnStock) return;
        setQuantity((prev) => prev + 1);
        handelUpdateQuantity(id, userQuantity, setCartItems)
    };

    const handleDecrement = () => {
        if (userQuantity === 1) return;
        setQuantity((prev) => prev - 1);
        handelUpdateQuantity(id, userQuantity, setCartItems)
    };

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value);
        if (isNaN(value) || value < 1 || value > quantityOnStock) return;
        setQuantity(value);
    };

    const deleteItemFromCart = async (id) => {
        try {
            const response = await axios.post(`${apiUrl}/cart/delete_product/${id}`, {
                token: userToken
            });
            toast.success(i18n.language === "en" ? "the product successfully delete from cart" : "تم حذف المنتج من عربة التسوق");
            getTotalPriceInCart()
        } catch (error) {
            toast.error(i18n.language === "en" ? "theres is an error, please try again" : "يوجد خطأ، برجاء المحاوله مره اخره");
        }
    }

    return (
        <div className="cart-item w-full flex flex-col md:flex-row justify-between gap-3 border-b " key={id}>
            <div className="img-holder w-48 h-48">
                <img className="w-full h-full object-cover" src={`https://admin.horriizon.com/public/assets/${image}`} alt={i18n.language === 'en' ? title.en : title.ar} />
            </div>
            <div className="details flex-1 grid gap-3">
                <h3 className="font-bold text-xl">{title}</h3>
                <p>{i18n.language === 'en' ? `quantity in stock : ${quantityOnStock}` : `الكميه المتاحه : ${quantityOnStock}`}</p>
                <div className="flex items-center justify-between gap-2">
                    <label className="font-bold" htmlFor="quantity">
                        {i18n.language === 'en' ? 'Quantity:' : 'الكمية:'}
                    </label>
                    <div className="quantity-control flex items-center">
                        <button className="quantity-button py-2 px-3 text-xl font-medium" onClick={handleDecrement}>
                            -
                        </button>
                        <input
                            type="number"
                            name="quantity"
                            min={1}
                            max={quantityOnStock}
                            id="quantity"
                            className="border-none focus:outline-none bg-transparent w-20 text-center"
                            value={userQuantity}
                            onChange={handleQuantityChange}
                        />
                        <button className="quantity-button py-2 px-3 text-xl font-medium" onClick={handleIncrement}>
                            +
                        </button>
                        {/* <button onClick={() => handelUpdateQuantity(id, userQuantity, setCartItems)} className='text-secondColor border border-secondColor px-4 py-1'>{i18n.language === 'en' ? "Update Quantity" : "تحديث الكميه"}</button> */}
                    </div>
                </div>
                <div className="flex justify-between">
                    <h4 className="text-xl font-bold text-secondColor">
                        {`${i18n.language === 'ar' ? `جنية ${productTotalPrice}` : `${productTotalPrice} EGY`} ` || '0 EGY'}
                    </h4>
                    <div className="actions">
                        <button className="text-2xl text-secondColor p-1 border border-secondColor hover:bg-mainColor hover:border-mainColor hover:text-white duration-200 hover:scale-125" onClick={() => {
                            deleteItemFromCart(id)
                        }}>
                            <AiFillDelete />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
