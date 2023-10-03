import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import apiUrl from '../../apiUrl';
import { useTranslation } from 'react-i18next';
import { BsCart4, BsFillCartCheckFill } from "react-icons/bs"
import "../cart/style.css"
import { AppContext } from '../../AppContext';
import { Oval } from 'react-loader-spinner';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import SingleProductCard from '../../components/products/SingleProductCard';
import { FaEye, FaStar, FaShippingFast } from 'react-icons/fa';
import { MdSystemSecurityUpdateGood } from 'react-icons/md';
import { TbTruckDelivery } from 'react-icons/tb';



const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { i18n } = useTranslation();
    const { addToCart, mainRequest, chosenDelivery, handleDeliveryChange, websiteInfo } = useContext(AppContext);
    const [userQuantity, setUserQuantity] = useState(1);
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(false);

    console.log(product);
    const { images, title, price, quantity, start_date, total_price, fake_visitor, visitor, category, category_id, stars = 5, small_description, discount

    } = product;

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
    const getProductsInCategory = async () => {
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
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-10 relative">
                            {images && images.length > 0 && (
                                <div className="img-holder lg:sticky top-0 h-fit p-5 col-span-1 md:col-span-2 lg:col-span-1 flex justify-center rounded-lg max-h-[400px]">
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
                                                <img className='w-full h-full max-h-[400px] object-contain' src={`https://admin.horriizon.com/public/${image.path}`} alt={i18n.language === "en" ? title?.en : title?.ar} />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>

                                </div>
                            )}
                            <div className="product-details bg-[#e5e5e5] grid grid-cols-1 gap-5 p-5 rounded-lg">
                                <h2 className='text-2xl font-bold text-secondColor'>{i18n.language === "en" ? title?.en : title?.ar}</h2>
                                {
                                    small_description && (
                                        <h3 className='text-sm'>{i18n.language === "en" ? small_description?.en : small_description?.ar}</h3>
                                    )
                                }
                                <Link to={`/categories/${category_id}`}>
                                    <h3 className='text-lg font-bold underline'>{i18n.language === "en" ? category?.title?.en : category?.title?.ar}</h3>
                                </Link>

                                <div className="flex gap-5 items-center font-bold">
                                    <p className="flex items-center gap-2">
                                        <FaEye /> {fake_visitor ? fake_visitor : visitor} {i18n.language === "en" ? "Visitor" : "زائر"}
                                    </p>
                                    {
                                        stars && (
                                            <p className="flex items-center gap-2">
                                                {
                                                    Array.from({ length: parseInt(stars) }).map((_, index) => (
                                                        <FaStar key={index} className='text-yellow-400' />
                                                    ))
                                                }
                                                {stars}
                                            </p>
                                        )
                                    }

                                </div>

                                <div className="flex items-center gap-3">
                                    <h3 className='text-3xl font-bold text-secondColor'>
                                        {total_price || `${i18n.language === "ar" ? `جنية ${price}` : `${price} EGY`} ` || "0 EGY"}
                                    </h3>
                                    <span className='text-md text-red-400 line-through opacity-70'>{`${i18n.language === "ar" ? `جنية ${discount}` : `${discount} EGY`} `}</span>
                                </div>
                                {
                                    quantity > 1 && <p className='text-2xl font-bold text-secondColor flex items-center'>
                                        {i18n.language === 'en' ? `in stock :` : `الكميه المتاحه :`}
                                        <span className='text-black mx-2'>{quantity}</span>
                                    </p>
                                }

                                <div className='flex justify-between  py-5 border-y'>
                                    <p>{i18n.language === 'en' ? "Expiration date" : "تاريخ الانتهاء"}</p>
                                    <p className='border w-3/5 text-center px-6 py-1'>{start_date}</p>
                                </div>
                                <div className="actions grid grid-cols-1 justify-items-center items-center gap-3">
                                    {
                                        parseInt(quantity) > 1 ?
                                            (
                                                <>
                                                    <div className="w-full flex justify-between  border-b">
                                                        <p>{i18n.language === 'en' ? "Quntaty" : "الكمية"}</p>
                                                        <div>
                                                            <button className="quantity-button py-2 px-3 text-xl font-medium" onClick={() => {
                                                                if (userQuantity === 1) {
                                                                    return;
                                                                }
                                                                setUserQuantity((prev) => prev - 1);
                                                            }}>
                                                                -
                                                            </button>
                                                            <input
                                                                type="number"
                                                                name="quantity"
                                                                min={1}
                                                                max={quantity}
                                                                id="quantity"
                                                                className="border-none focus:outline-none bg-transparent w-20 text-center"
                                                                value={userQuantity}
                                                                onChange={(e) => {
                                                                    if (e.target.value > quantity) {
                                                                        return;
                                                                    }
                                                                    setUserQuantity(parseInt(e.target.value));
                                                                }}
                                                            />
                                                            <button className="quantity-button py-2 px-3 text-xl font-medium" onClick={() => {
                                                                if (userQuantity === quantity) {
                                                                    return;
                                                                }
                                                                setUserQuantity((prev) => prev + 1);
                                                            }}>
                                                                +
                                                            </button>

                                                        </div>
                                                    </div>

                                                    <div className="quantity-control flex items-center gap-5">
                                                        <button
                                                            onClick={() => { addToCart(id, userQuantity) }}
                                                            className="m-0 text-sm text-center flex items-center justify-center gap-2 px-5 py-2 rounded-md border border-black text-black duration-200 hover:bg-secondColor hover:text-white"
                                                            type="button"
                                                        >
                                                            <BsCart4 /> {i18n.language === "en" ? "Add to Cart" : "أضف الي عربة التسوق"}
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                addToCart(id, userQuantity);
                                                                setTimeout(() => {
                                                                    navigate("/checkout")
                                                                }, 3000);
                                                            }}
                                                            className="m-0 text-sm text-center flex items-center justify-center gap-2 px-5 py-2 rounded-md border bg-secondColor text-white hover:brightness-125"
                                                            type="button"
                                                        >
                                                            <BsFillCartCheckFill /> {i18n.language === "en" ? "Buy Now" : "إشتري الان"}
                                                        </button>
                                                    </div>

                                                </>
                                            )
                                            :
                                            (
                                                <button disabled aria-label='out of stock' className=" duration-200 flex items-center justify-center gap-2 bg-red-500 text-white text-sm p-2 rounded-md w-full">
                                                    {118n.language === "en" ? "Out Of Stock" : "غير متوفر"}
                                                </button>
                                            )
                                    }
                                </div>
                            </div>
                            <div className="col-span-3 lg:col-span-1 h-fit">
                                <div className='bg-white p-5 rounded-md'>
                                    <h2 className='text-lg font-medium mb-5 text-center'>{i18n.language === "en" ? "Choose Delivery package" : "اختر طريقة التسليم"}</h2>
                                    <div className="flex flex-col gap-3">
                                        <div className="flex items-center justify-between border-2 border-secondColor p-1 px-3 rounded-lg">
                                            <div className="flex flex-col gap-2">
                                                <label htmlFor="package-1" className='flex items-center gap-3'>
                                                    <input
                                                        type="radio"
                                                        name="delivery"
                                                        id="package-1"
                                                        value="Fast delivery"
                                                        checked={chosenDelivery === "Fast delivery"}
                                                        onChange={handleDeliveryChange}
                                                        className='bg-mainColor'
                                                    />
                                                    {i18n.language === "en" ? "Fast delivery" : "توصيل سريع"}
                                                </label>
                                                {/* <span>{i18n.language === "en" ? "4 day" : "4 أيام"}</span> */}
                                            </div>
                                            <span className='text-secondColor'>{websiteInfo?.fast_charging} EGY</span>
                                        </div>
                                        <div className="flex items-center justify-between border-2 border-secondColor p-1 px-3 rounded-lg">
                                            <div className="flex flex-col gap-2">
                                                <label htmlFor="package-2" className='flex items-center gap-3'>
                                                    <input
                                                        type="radio"
                                                        name="delivery"
                                                        id="package-2"
                                                        value="Standard delivery"
                                                        checked={chosenDelivery === "Standard delivery"}
                                                        onChange={handleDeliveryChange}
                                                        className='bg-mainColor'
                                                    />
                                                    {i18n.language === "en" ? "Standard delivery" : "توصيل عادي"}
                                                </label>
                                                {/* <span>{i18n.language === "en" ? "7 day" : "7 أيام"}</span> */}
                                            </div>
                                            <span className='text-secondColor'>{websiteInfo?.normal_charging} EGY</span>
                                        </div>
                                    </div>
                                </div>
                                <a href={""}>
                                    <img className='p-5 min-h-[400px] h-[400px] mx-auto' src={`https://admin.horriizon.com/public/images/ads/1696177825250.jpg`} alt="Horizon" />
                                </a>
                            </div>
                            <div className="col-span-3 w-full flex flex-wrap items-center justify-between my-5">
                                <div className="item flex flex-col gap-2 text-center text-lg justify-center items-center">
                                    <MdSystemSecurityUpdateGood  className='text-3xl text-secondColor'/>
                                    <p className='font-bold'>{i18n.language === "en" ? "Receipt and delivery" : "الدفع عند الاستلام"}</p>
                                </div>
                                <div className="item flex flex-col gap-2 text-center text-lg justify-center items-center">
                                    <MdSystemSecurityUpdateGood  className='text-3xl text-secondColor'/>
                                    <p className='font-bold'>{i18n.language === "en" ? "Secure payment" : "دفع امن"}</p>
                                </div>
                                <div className="item flex flex-col gap-2 text-center text-lg justify-center items-center">
                                    <TbTruckDelivery  className='text-3xl text-secondColor'/>
                                    <p className='font-bold'>{i18n.language === "en" ? "Safe delivery" : "توصيل امن"}</p>
                                </div>
                                <div className="item flex flex-col gap-2 text-center text-lg justify-center items-center">
                                    <FaShippingFast  className='text-3xl text-secondColor'/>
                                    <p className='font-bold'>{i18n.language === "en" ? "Fast delivery" : "سرعة التوصيل"}</p>
                                </div>
                            </div>
                            {
                                product?.description && (
                                    <div className='col-span-3 bg-[#e5e5e5] p-4'>
                                        <h2>{i18n.language === "en" ? "About Product" : "عن المنتج"}</h2>
                                        <p className='text-lg py-5 border-y '>
                                            {
                                                i18n.language === "en" ? product?.description?.en : product?.description?.ar
                                            }
                                        </p>
                                    </div>
                                )
                            }
                        </div>
                        {categoryProducts.length > 1 && (
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
                                            <SingleProductCard id={product?.id} title={product?.title} quantity={product.quantity} price={product?.price} image={product?.images[0].path} category={product.category} total_price={product.total_price} background={"white"} />
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
