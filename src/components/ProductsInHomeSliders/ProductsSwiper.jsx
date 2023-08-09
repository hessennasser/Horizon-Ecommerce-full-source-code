import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css/pagination";
import "./styles.css";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";
import SingleProductCard from "../products/SingleProductCard";
import { useTranslation } from "react-i18next";
import Loading from "../Loading";
import Error from "../Error";

const ProductsSwiper = ({ products, loading, error }) => {
    const { i18n, t } = useTranslation();

    if (loading) {
        return (
            <Loading />
        )
    }

    if (error) {
        return (
            <Error />
        )
    }

    return (
        <div className="max-w-[98%] mx-auto py-10 select-none">
            <Swiper
                pagination={{
                    dynamicBullets: true,
                    clickable: true,
                    reverseDirection: true,
                }}
                modules={[Pagination, Autoplay]}
                className="productsSwiper w-full"
                loop={true}
                // centeredSlides={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                    reverseDirection: true,
                }}
                // slidesPerView={1}
                spaceBetween={10}
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                    440: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    660: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                    991: {
                        slidesPerView: 4,
                        spaceBetween: 30,
                    },
                    1200: {
                        slidesPerView: 5,
                        spaceBetween: 20,
                    }
                }}
                style={{ direction: i18n.language === "ar" ? "ltr" : "initial" }}
            >
                {
                    products?.map((product) => {
                        return (
                            <SwiperSlide key={product.id}>
                                <SingleProductCard
                                    background={"white"}
                                    productDetails={product}
                                    id={product.id}
                                    title={product.title}
                                    total_price={product.total_price}
                                    price={product.price}
                                    quantity={product.quantity}
                                    image={product.images[0].path}
                                    category={product.category}
                                />
                            </SwiperSlide>
                        );
                    })
                }
            </Swiper>
        </div>
    );
}

export default ProductsSwiper
