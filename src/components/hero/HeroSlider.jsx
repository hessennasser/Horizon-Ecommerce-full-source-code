// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import { Autoplay } from "swiper";
import { useEffect, useState } from "react";
import axios from "axios";
import apiUrl from "../../apiUrl";
import { useTranslation } from "react-i18next";

const HeroSlider = () => {
    const {i18n} = useTranslation()
    const [silder, setSilder] = useState([]);

    // get all Silder
    const getAllSilder = async () => {
        try {
            const response = await axios(`${apiUrl}/slider`);
            const { data } = response;
            setSilder(data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllSilder()
    }, [])

    return (
        <div className="w-full select-none">
            <Swiper
                modules={[Autoplay]}
                autoplay={{ delay: 3000 }}
                loop={true}
                className="heroSlider w-full"
                style={{ direction: "ltr" }}
            >
                {
                    silder.map(slide => {
                        return (
                            <SwiperSlide key={slide.id}>
                                <img className="w-full h-[350px] object-cover" src={`https://admin.horriizon.com/public/assets/${slide.image}`} alt={`${i18n.language === "en" ? slide.title.en : slide.title.ar }`} />
                            </SwiperSlide>
                        )
                    })
                }

            </Swiper>
        </div>
    );
}

export default HeroSlider
