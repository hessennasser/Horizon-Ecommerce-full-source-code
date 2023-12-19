import React, { useContext, useEffect, useState } from 'react';
import PaymentMethods from '../../components/PaymentMethods';
import './style.css';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';
import { AppContext } from '../../AppContext';
import { useTranslation } from 'react-i18next';
import { Oval } from 'react-loader-spinner';
import DeleteModal from '../../dashboard/home/components/DeleteModal';
import { toast } from 'react-toastify';
import apiUrl from '../../apiUrl';

const Cart = () => {
    const { i18n } = useTranslation();
    const userToken = JSON.parse(localStorage.getItem('userToken'));
    const userLogged = localStorage.getItem("userLogged");
    const [totalPrice, setTotalPrice] = useState(0);
    const [coupon, setCoupon] = useState("");
    const [shipping, setShipping] = useState(0);
    const [mainLoading, setMainLoading] = useState();
    const [loading, setLoading] = useState();
    const { getCartItems, getTotalPriceInCart, total: itemsTotal, cartItems, setCartItems, mainRequest } = useContext(AppContext);

    useEffect(() => {
        if (userLogged && userToken) {
            getTotalPriceInCart();
            getCartItems(userToken, setCartItems, setLoading);
        }
    }, [userLogged, userToken, itemsTotal]);

    useEffect(() => {
        // Calculate subtotal when cart items or shipping change
        const calculateSubtotal = () => {
            setTotalPrice(itemsTotal + shipping);
        };

        calculateSubtotal();
    }, [cartItems, shipping]);

    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteProductId, setDeleteProductId] = useState(null);
    const openDeleteModal = () => {
        setDeleteModal(true)
    }

    const handleCoupon = async (e) => {
        e.preventDefault();
        if (!coupon) {
            toast.info(i18n.language === "en" ? "Enter the coupon" : "قم بإدخال القسيمه");
            return;
        }
        try {
            const request = await mainRequest.post(`${apiUrl}/coupon/${coupon}`, {
                token: userToken
            });
            if (request.data === "Coupon Not Found") {
                toast.info(i18n.language === "en" ? "Coupon Not Found" : "لم يتم العثور على القسيمة");
            }
        } catch (error) {
            toast.error(i18n.language === "en" ? "theres is an error, please try again" : "يوجد خطأ، برجاء المحاوله مره اخره");
            console.log(error);
        }
        getTotalPriceInCart();
        getCartItems(userToken, setCartItems, setLoading);
    };

    const handleShippingChange = e => {
        const shippingCost = parseInt(e.target.value);
        setShipping(shippingCost);
    };

    // if (mainLoading) return (
    //     <div className="container py-10 flex flex-col gap-5 items-center justify-center">
    //         <Oval
    //             visible={true}
    //             height="160"
    //             width="160"
    //             ariaLabel="Oval-loading"
    //             wrapperStyle={{}}
    //             wrapperClass="Oval-wrapper"
    //             color='#125ed4'
    //             secondaryColor='#060047'
    //         />
    //     </div>
    // )

    if (!loading && cartItems[1]?.length === 0) {
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
            {
                deleteModal && <DeleteModal setIsLoading={setLoading} deleteModal={deleteModal} setDeleteModal={setDeleteModal} productId={deleteProductId} />
            }
            <div className="container py-10">
                {loading && (
                    <div className="loading-overlay">
                        <Oval
                            visible={true}
                            height="160"
                            width="160"
                            ariaLabel="Oval-loading"
                            color='#125ed4'
                            secondaryColor='#060047'
                        />
                    </div>
                )}

                <div className="grid grid-cols-3 gap-5">
                    <div className="col-span-3 lg:col-span-2 flex flex-col gap-3">
                        {cartItems[1]?.map(item => {
                            return (
                                <CartItem
                                    key={item.id}
                                    id={item.id}
                                    setCartItems={setCartItems}
                                    title={i18n.language === "en" ? item?.title?.en : item?.title?.ar}
                                    image={item.images[0].path}
                                    price={item.price}
                                    productTotalPrice={item?.quantity_of_cart?.total}
                                    total_price={item.total_price}
                                    quantity={item.quantity_of_cart.quantity}
                                    quantityOnStock={item.quantity}
                                    openDeleteModal={openDeleteModal}
                                    setDeleteProductId={setDeleteProductId}
                                    cartItem={true}
                                />
                            )
                        })}
                    </div>
                    <div className="col-span-3 lg:col-span-1 lg:sticky top-0 h-fit">
                        <form className={`coupon-form relative overflow-hidden flex flex-col items-start gap-6 bg-[#F4DBE8] py-4 px-6 rounded-lg shadow-md ${totalPrice < cartItems[0] ? "before:absolute before:inset-0 before:bg-gray-400 before:bg-opacity-50" : ""}`} onSubmit={e => handleCoupon(e)}>
                            <label htmlFor="coupon" className="font-bold">
                                {i18n.language === "en" ? "Have a Coupon?" : "هل لديك قسيمة؟"}
                            </label>
                            <input
                                disabled={totalPrice < cartItems[0]}
                                className="w-full rounded-lg"
                                placeholder={i18n.language === "en" ? "add your coupon" : "أضف قسيمتك"}
                                type="text"
                                name="coupon"
                                id="coupon"
                                value={coupon}
                                onChange={(e) => setCoupon(e.target.value)}
                            />
                            <button
                                disabled={totalPrice < cartItems[0]}
                                onClick={e => handleCoupon(e)}
                                className="m-0 px-5 bg-secondColor py-2 rounded-md text-white hover:brightness-110"
                                type="submit"
                            >
                                {i18n.language === "en" ? "Apply Coupon" : "تطبيق القسيمة"}
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
                            {
                                totalPrice < cartItems[0] && <div className="flex justify-between items-center gap-6 text-red-500 line-through">
                                    <h3 className="">{i18n.language === "en" ? "Total products Price" : "مجموع المنتجات"}</h3>
                                    <p className="flex-1 text-end">{cartItems[0]} EGY</p>
                                </div>
                            }
                            {
                                totalPrice < cartItems[0] && (
                                    <div className="flex justify-between items-center gap-6">
                                        <h3 className="">{i18n.language === "en" ? "Discount" : "خصم"}</h3>
                                        <p className="flex-1 text-end">-{cartItems[0] - totalPrice} EGY</p>
                                    </div>
                                )
                            }
                            <div className="flex justify-between items-center gap-6">
                                <h3 className="">{i18n.language === "en" ? "Total" : "المجموع الكلي"}</h3>
                                <p className="flex-1 text-end">{totalPrice} EGY</p>
                            </div>
                            <Link
                                to="/checkout"
                                className="text-center m-0 px-5 bg-secondColor py-2 rounded-md text-white hover:bg-mainColor duration-200 hover:-translate-y-1"
                                type="button"
                            >
                                {i18n.language === "en" ? "Checkout" : "الدفع"}
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
