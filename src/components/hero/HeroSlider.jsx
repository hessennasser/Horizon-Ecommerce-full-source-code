// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import { Autoplay, Navigation } from "swiper/modules"
import { useEffect, useState } from "react";
import axios from "axios";
import apiUrl from "../../apiUrl";
import { useTranslation } from "react-i18next";

const HeroSlider = () => {
    const { i18n } = useTranslation()
    const [slider, setSlider] = useState([]);

    // get all Slider
    const getAllSlider = async () => {
        try {
            const response = await axios(`${apiUrl}/slider`);
            const { data } = response;
            setSlider(data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllSlider()
    }, [])

    return (
        <div className="w-full select-none">
            <Swiper
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false
                }}
                navigation={true}
                modules={[Navigation, Autoplay]}
                className="heroSlider w-full"
                style={{ direction: i18n.language === "ar" ? "ltr" : "initial" }}
            >
                {
                    slider.map(slide => {
                        return (
                            <SwiperSlide key={slide.id}>
                                <img className="w-full h-[350px] object-cover" src={`https://admin.horriizon.com/public/${slide.image}`} alt={`${i18n.language === "en" ? slide.title.en : slide.title.ar}`} />
                            </SwiperSlide>
                        )
                    })
                }

            </Swiper>
        </div>
    );
}

export default HeroSlider
