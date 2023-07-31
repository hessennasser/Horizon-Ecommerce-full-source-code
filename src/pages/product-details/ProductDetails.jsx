import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import apiUrl from '../../apiUrl';
import { useTranslation } from 'react-i18next';
import { AiFillStar } from "react-icons/ai"
import { BsCart4 } from "react-icons/bs"
import "../cart/style.css"
import { AppContext } from '../../AppContext';
import { Oval } from 'react-loader-spinner';
import ImagesGallery from './ImagesGallery';

const ProductDetails = () => {
    const { id } = useParams()
    const { i18n } = useTranslation();
    const { addToCart } = useContext(AppContext)
    const [product, setProduct] = useState({})
    const [loading, setLoading] = useState(false);

    const getProduct = async () => {
        setLoading(true);
        try {
            const response = await axios.post(`${apiUrl}/product?id=${id}`);
            const { data } = response;
            setProduct(data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getProduct();
    }, [id, product.category_id])

    console.log(product);
    const { images, title, price, quantity, start_date, total_price } = product;

    return (
        <>
            {
                loading ? (
                    <div className="container py-10 flex flex-col gap-5 items-center justify-center">
                        <h2 className="text-xl font-bold">{i18n.language === "en" ? "Loading..." : "جاري التحميل..."}</h2>
                        <Oval
                            visible={true}
                            height="160"
                            width="160"
                            ariaLabel="Oval-loading"
                            wrapperStyle={{}}
                            wrapperClass="Oval-wrapper"
                        />
                    </div>
                ) : (
                    <div className='container py-10'>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                            {images && images.length > 0 && (
                                <div className="img-holder col-span-1 p-5 bg-gray-200 flex items-center justify-center rounded-lg shadow-md">
                                    <img className='h-72 w-full object-contain' src={`https://admin.horriizon.com/public/assets/${images[0]?.path}`} alt={i18n.language === "en" ? title?.en : title?.ar} />
                                </div>
                            )}
                            <div className="product-details flex flex-col gap-5 px-5 mt-5 md:col-span-2">

                                <h2 className='text-xl font-bold'>{i18n.language === "en" ? title?.en : title?.ar}</h2>

                                <div className="flex gap-5">
                                    <div className="flex gap-3">
                                        <span className="flex items-center gap-2"><AiFillStar className="text-[#FFC831]" />5.0 (10)</span>
                                    </div>
                                    <p>{i18n.language === 'en' ? `quantity in stock : ${quantity}` : `الكميه المتاحه : ${quantity}`}</p>
                                </div>

                                <h3 className='2xl font-bold'>
                                    {total_price || `${i18n.language === "ar" ? `جنية ${price}` : `${price} EGY`} ` || "0 EGY"}
                                </h3>

                                <p className='text-xl text-secondColor'>
                                    {i18n.language === 'en' ? `in stock : ${quantity}` : `الكميه المتاحه : ${quantity}`}
                                </p>

                                <div className='flex justify-between '>
                                    <p>{i18n.language === 'en' ? "in stock" : "الكميه المتاحه"}</p>
                                    <p>{quantity}</p>
                                </div>

                                <div className='flex justify-between text-gray-400 py-5 border-y'>
                                    <p>{i18n.language === 'en' ? "Expiration date" : "تاريخ الانتهاء"}</p>
                                    <p className='border w-3/5 text-center px-6 py-1'>{start_date}</p>
                                </div>
                                <div className="actoins grid grid-cols-1 justify-items-center items-center gap-3">
                                    <button
                                        onClick={() => { addToCart(id) }}
                                        className="m-0 text-sm text-center flex items-center justify-center gap-2 px-5 py-2 rounded-md border border-black text-black duration-200 hover:bg-secondColor hover:text-white"
                                        type="button"
                                    >
                                        <BsCart4 /> {i18n.language === "en" ? "Add to Cart" : "أضف الي عربة التسوق"}
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                )
            }

        </>
    )
}

export default ProductDetails
