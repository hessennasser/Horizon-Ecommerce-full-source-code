import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import apiUrl from '../../apiUrl';
import { useTranslation } from 'react-i18next';
import { BsCart4 } from "react-icons/bs"
import "../cart/style.css"
import { AppContext } from '../../AppContext';
import { Oval } from 'react-loader-spinner';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import SingleProductCard from '../../components/products/SingleProductCard';
import { FaEye } from 'react-icons/fa';



const ProductDetails = () => {
    const { id } = useParams();
    const { i18n } = useTranslation();
    const { addToCart, mainRequest } = useContext(AppContext);
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(false);

    const { images, title, price, quantity, start_date, total_price, fake_visitor, category_id } = product;

    const fetchData = async () => {
        setLoading(true);
        try {
            const [productResponse, visitorResponse] = await Promise.all([
                axios.post(`${apiUrl}/product?id=${id}`),
                axios.post(`${apiUrl}/product_visitor`, { id: id })
            ]);
            const productData = productResponse.data.data;
            setProduct(productData);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    const [categoryProducts, setCategoryProducts] = useState([]);
    const getProductsInCategory = async () =>{
        try {
            const response = await mainRequest(`${apiUrl}/productWithCategory/${category_id}`);
            const { data } = response;
            setCategoryProducts(data.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getProductsInCategory();
    }, [category_id, id]);

    
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
                            color='#125ed4'
                            secondaryColor='#060047'
                        />
                    </div>
                ) : (
                    <div className='container py-10'>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-10">
                            {images && images.length > 0 && (
                                <div className="img-holder p-5 col-span-1 flex items-center justify-center rounded-lg">
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
                                                <img className='h-96 w-full object-contain' src={`https://admin.horriizon.com/public/${image.path}`} alt={i18n.language === "en" ? title?.en : title?.ar} />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>

                                </div>
                            )}
                            <div className="product-details flex flex-col gap-5 px-5 mt-5 md:col-span-2">

                                <h2 className='text-xl font-bold'>{i18n.language === "en" ? title?.en : title?.ar}</h2>

                                <div className="flex flex-col gap-5 font-bold">
                                    {fake_visitor &&
                                        <p className="flex items-center gap-2">
                                            {fake_visitor} {i18n.language === "en" ? "Visitor" : "زائر"} <FaEye />
                                        </p>
                                    }
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
                        {categoryProducts.length > 0 && (
                            <div className="swiper-container">
                                <h2 className='text-2xl mb-5 text-secondColor font-bold'>{i18n.language === "en" ? "Related Products" : "منتجات مشابهه"}</h2>
                                <Swiper
                                    slidesPerView={1}
                                    spaceBetween={30}
                                    pagination={{
                                        clickable: true,
                                    }}
                                    autoplay={{
                                        delay: 3000,
                                        disableOnInteraction: false,
                                        reverseDirection: true,
                                    }}
                                    navigation={true}
                                    modules={[Pagination, Navigation, Autoplay]}
                                    className="mySwiper"
                                    style={{ direction: "ltr" }}
                                    breakpoints={{
                                        0: {
                                            slidesPerView: 1,
                                            spaceBetween: 10,
                                        },
                                        440: {
                                            slidesPerView: 2,
                                            spaceBetween: 20,
                                        },

                                        991: {
                                            slidesPerView: 3,
                                            spaceBetween: 20,
                                        },
                                        1200: {
                                            slidesPerView: 5,
                                            spaceBetween: 20,
                                        }
                                    }}

                                >
                                    {categoryProducts?.filter(item => item?.id != id)?.map(product => {
                                        return <SwiperSlide key={product.id}>
                                            <SingleProductCard id={product?.id} title={product?.title} price={product?.price} image={product?.images[0].path} category={product.category} total_price={product.total_price} background={"white"} />
                                        </SwiperSlide>
                                    })}
                                </Swiper>
                            </div>
                        )}

                    </div>
                )
            }

        </>
    )
}

export default ProductDetails
