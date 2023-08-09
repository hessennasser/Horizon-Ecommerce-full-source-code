import React, { useContext, useEffect, useState } from 'react';
import PaymentMethods from '../../components/PaymentMethods';
import './style.css';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';
import { AppContext } from '../../AppContext';
import { useTranslation } from 'react-i18next';
import { Oval } from 'react-loader-spinner';

const Cart = () => {
    const { i18n } = useTranslation();
    const userToken = JSON.parse(localStorage.getItem('userToken'));
    const userLogged = localStorage.getItem("userLogged");
    const [totalPrice, settotalPrice] = useState(0);
    const [shipping, setShipping] = useState(0);
    const [loading, setLoading] = useState();
    const { getCartItems, getTotalPriceInCart, total: itemsTotal, cartItems, setCartItems } = useContext(AppContext);

    useEffect(() => {
        if (userLogged && userToken) {
            getTotalPriceInCart();
            getCartItems(userToken, setCartItems, setLoading);
        }
    }, [userLogged, userToken, itemsTotal]);

    useEffect(() => {
        // Calculate subtotal when cart items or shipping change
        const calculateSubtotal = () => {
            settotalPrice(itemsTotal + shipping);
        };

        calculateSubtotal();
    }, [cartItems, shipping]);



    const handleCoupon = e => {
        e.preventDefault();
        // TODO: Apply the coupon logic here
    };

    const handleShippingChange = e => {
        const shippingCost = parseInt(e.target.value);
        setShipping(shippingCost);
    };

    if (loading) return (
        <div className="container py-10 flex flex-col gap-5 items-center justify-center">
            <h2 className="text-xl font-bold">{i18n.language === "en" ? "Loading..." : "جاري التحميل..."}</h2>
            <Oval
                visible={true}
                height="160"
                width="160"
                ariaLabel="Oval-loading"
                wrapperStyle={{}}
                wrapperClass="Oval-wrapper"
                color='#125ed4'
                secondaryColor='#060047'
            />
        </div>
    )

    if (cartItems?.length === 0) {
        return (
            <>
                <div className="container py-10 flex flex-col gap-5 items-center justify-center">
                    <h2 className="text-xl font-bold">{i18n.language === "en" ? "Your Cart Is Empty!" : "عربة التسوق فارغة!"}</h2>
                    <img
                        className='w-1/4'
                        src="https://img.icons8.com/?size=512&id=108807&format=png"
                        alt="empty cart"
                    />
                    <Link
                        to="/all-products"
                        className="bg-mainColor text-white px-5 py-2 shadow-lg rounded-lg hover:bg-secondColor duration-200 hover:translate-x-4"
                    >
                        {i18n.language === "en" ? "Go to All Products" : "جميع المنتجات"}
                    </Link>
                </div>
                <PaymentMethods />
            </>
        );
    }


    return (
        <>
            <div className="container py-10">
                <div className="grid grid-cols-3 gap-5">
                    <div className="col-span-3 lg:col-span-2 flex flex-col gap-3">
                        {cartItems?.map(item => {
                            return (
                                <CartItem
                                    key={item.id}
                                    id={item.id}
                                    setCartItems={setCartItems}
                                    title={i18n.language === "en" ? item.title.en : item.title.ar}
                                    image={item.images[0].path}
                                    price={item.price}
                                    productTotalPrice={item.quantity_of_cart.total}
                                    total_price={item.total_price}
                                    quantity={item.quantity_of_cart.quantity}
                                    quantityOnStock={item.quantity}
                                />
                            )
                        })}
                    </div>
                    <div className="col-span-3 lg:col-span-1 lg:sticky top-0 h-fit">
                        <form className="coupon-form flex flex-col items-start gap-6 bg-[#F4DBE8] py-4 px-6 rounded-lg shadow-md">
                            <label htmlFor="coupon" className="font-bold">
                                Have a Coupon?
                            </label>
                            <input
                                className="w-full rounded-lg"
                                placeholder="add your coupon"
                                type="text"
                                name="coupon"
                                id="coupon"
                            />
                            <button
                                onClick={handleCoupon}
                                className="m-0 px-5 bg-secondColor py-2 rounded-md text-white hover:brightness-110"
                                type="submit"
                            >
                                Apply Coupon
                            </button>
                        </form>
                        <div className="cart-total flex flex-col gap-6 py-4 px-6 mt-5">
                            <>
                                {/* <div className="flex justify-between items-center gap-6">
                                <h3 className="w-1/5">Subtotal</h3>
                                <p className="flex-1 text-end">{itemsTotal} EGY</p>
                            </div> */}
                                {/* <div className="flex justify-between gap-6">
                                <h3 className="w-1/5">Shipping</h3>
                                <div className="flex flex-1 flex-col">
                                    <label className="flex items-center gap-3">
                                        <input
                                            type="radio"
                                            name="shipping"
                                            value="10"
                                            onChange={handleShippingChange}

                                        />
                                        Method One
                                    </label>
                                    <label className="flex items-center gap-3">
                                        <input
                                            type="radio"
                                            name="shipping"
                                            value="15"
                                            onChange={handleShippingChange}
                                        />
                                        Method Two
                                    </label>
                                </div>
                            </div> */}
                            </>
                            <div className="flex justify-between items-center gap-6">
                                <h3 className="w-1/5">Total</h3>
                                <p className="flex-1 text-end">{totalPrice} EGY</p>
                            </div>
                            <Link
                                to="/checkout"
                                className="text-center m-0 px-5 bg-secondColor py-2 rounded-md text-white hover:bg-mainColor duration-200 hover:-translate-y-1"
                                type="button"
                            >
                                Checkout
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <PaymentMethods />
        </>
    );
};

export default Cart;
