/* eslint-disable react-hooks/rules-of-hooks */
import { useTranslation } from "react-i18next";
import featureImg from "../../assets/images/Feature_img1.png"

function ImageCard() {
    const { i18n } = useTranslation();

    return (
        <div className={`bg-white grid grid-cols-2 grid-rows-2 gap-5 p-4 ${i18n.language === "ar" ? "md:rounded-r-xl" : "md:rounded-l-xl"} shadow-2xl h-full overflow-hidden`}>
            <img className="h-full object-cover rounded-lg shadow-lg" src={featureImg} alt="horizon" />
            <img className="h-full object-cover rounded-lg shadow-lg" src={featureImg} alt="horizon" />
            <img className="h-full object-cover rounded-lg shadow-lg" src={featureImg} alt="horizon" />
            <img className="h-full object-cover rounded-lg shadow-lg" src={featureImg} alt="horizon" />
        </div>
    );
}

export default ImageCard
