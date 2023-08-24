/* eslint-disable react/prop-types */
import { AiFillStar } from "react-icons/ai"
import { BsFillCartPlusFill } from "react-icons/bs"
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AppContext } from "../../AppContext";

const SingleProductCard = ({ background, id, title, total_price, price, quantity, image, category, allProducts }) => {
    const { i18n } = useTranslation();
    const [loading, setLoading] = useState(false)
    const { addToCart } = useContext(AppContext)
    return (
        <div loading="lazy" className={`product-card flex flex-col items-start justify-between min-h-[400px] relative bg-${background} ${background ? "py-3 px-2" : ""}`}>
            {/* <span className="absolute top-5 right-0 bg-secondColor text-white py-1 px-3">40% OFF</span> */}
            <div className="img-holder flex items-center justify-center w-full">
                <img loading="lazy" className="product-img object-contain h-44" src={`https://admin.horriizon.com/public/${image}`} alt={i18n.language === "ar" ? title?.ar : title?.en} />
            </div>
            <div className={`flex flex-col gap-2 w-full p-2  justify-end ${i18n.language === "ar" ? "text-end" : "text-start"}`}>
                <div className={`info flex flex-col gap-3 ${allProducts && "text-start"}`}>
                    <Link to={`/product/${id}`}>
                        <h3 className="product-name text-md font-bold">{i18n.language === "ar" ? title?.ar?.substring(0, 50) : title?.en?.substring(0, 50)}</h3>
                    </Link>
                    {category ? <Link to={`/categories/${category.id}`}><h4 className="vendor-name text-sm text-gray-400">{i18n.language === "ar" ? category.title?.ar : category.title?.en}</h4></Link> : ""}
                </div>
                <div className="details h-full flex flex-col items-start justify-end gap-5 flex-1 w-full mt-1">
                    <div className="prices">
                        <span className="text-secondColor font-bold mr-4">{total_price || `${i18n.language === "ar" ? `جنية ${price}` : `${price} EGY`} ` || "0 EGY"}</span>
                        {/* <span className="line-through text-sm text-gray-400">$2,999.00</span> */}
                    </div>
                    {
                        parseInt(quantity) > 1 ?
                            (
                                <button disabled={loading} onClick={() => { addToCart(id) }} aria-label='add to cart' className="duration-200 flex items-center justify-center gap-2 bg-secondColor hover:bg-mainColor text-white text-sm p-2 rounded-md w-full">
                                    {i18n.language === "en" ? "Add to cart" : "اضف الي السله"} <BsFillCartPlusFill />
                                </button>
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
        </div>
    )
}

export default SingleProductCard
