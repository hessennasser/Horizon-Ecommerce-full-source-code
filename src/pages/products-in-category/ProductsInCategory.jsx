import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../AppContext';
import SingleProductCard from '../../components/products/SingleProductCard';
import { useTranslation } from 'react-i18next';
import 'rc-slider/assets/index.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import apiUrl from '../../apiUrl';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Loading from '../../components/Loading';

const ProductsInCategory = () => {
    const { } = useContext(AppContext)
    const categoryId = useParams().id;
    const [categoryData, setCategoryData] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getCategoryData = async () => {
            setLoading(true);
            try {
                const request = await axios(`${apiUrl}/categorySections/${categoryId}`);
                setCategoryData(request.data.data[0]);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        getCategoryData()
    }, [categoryId])

    const { i18n } = useTranslation();

    if (loading) {
        return <Loading />
    }

    return (
        <div className="flex flex-col container py-5 min-h-[300px] relative">
            <h2 className='font-bold text-xl mb-4'>{i18n.language === "en" ? categoryData?.title?.en : categoryData?.title?.ar}</h2>
            <div className="flex flex-col gap-5">
                {
                    categoryData?.sections?.map(cat => {
                        return (
                            <div className="py-4 px-2 ">
                                <h2 className='mb-4 text-lg font-bold text-center'>{cat.title}</h2>
                                <Swiper
                                    slidesPerView={1}
                                    spaceBetween={30}
                                    autoplay={{
                                        delay: 3000,
                                        disableOnInteraction: false,
                                        reverseDirection: true,
                                    }}
                                    navigation={true}
                                    modules={[Navigation, Autoplay]}
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
                                    {cat?.products?.map(product => {
                                        // image={product?.images[0].path}
                                        return <SwiperSlide key={product.id}>
                                            <SingleProductCard id={product?.id} image={product.images[0].path} title={product?.title}  quantity={product?.quantity} price={product?.price} category={product?.category} total_price={product?.total_price} background={"white"} />
                                        </SwiperSlide>
                                    })}
                                </Swiper>
                                {
                                    cat?.products?.map(product => {
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default ProductsInCategory;