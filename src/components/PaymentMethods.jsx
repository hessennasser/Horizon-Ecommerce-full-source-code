import gpay from "../assets/images/payment-methods/gpay.png";
import masterCard from "../assets/images/payment-methods/masterCard.png";
import payPal from "../assets/images/payment-methods/payPal.png";
import hsbc from "../assets/images/payment-methods/hsbc.png";
import epay from "../assets/images/payment-methods/epay.png";
import dki from "../assets/images/payment-methods/dki.png";

const PaymentMethods = () => {
    return (
        <div className="payment-methods py-10">

            <div className='container mb-5'>
                <h3 className='text-2xl font-semibold'>Payment Method</h3>
            </div>

            <div className="bg-[#F4DBE8] container max-w-full grid grid-cols-3 md:grid-cols-6 gap-10 py-10 items-center justify-items-center">
                <img src={gpay} alt="horizon" />
                <img src={masterCard} alt="horizon" />
                <img src={payPal} alt="horizon" />
                <img src={hsbc} alt="horizon" />
                <img src={epay} alt="horizon" />
                <img src={dki} alt="horizon" />
            </div>

            <div className='container mt-5'>

                <div className="flex flex-col gap-3 mb-5">
                    <h3 className='text-xl font-semibold'>Horizon</h3>
                    <p className="text-gray-500">Aims to make it easier for every community in the world to carry out various buying and selling transactions online. Is one of the world's online buying and selling sites whose development is relatively fast. You can sell products online at the slabshop besides being able to enjoy the process of buying various products more quickly and effectively. You can sign up for the exclusive slabshop Seller community if you want to launch your own business.</p>
                </div>

                <div className="flex flex-col gap-3">
                    <h3 className='text-xl font-semibold'>Advantages of joining Horizon</h3>
                    <p className="text-gray-500">Festive advertising In addition to offering all available product categories, Slabshop also regularly runs attractive promotions with prices you can access on the promo page. There are many options for promotions with different validity periods for various products, from smartphone promotions to promotions for inexpensive train tickets. The process is also very simple; all you have to do is enter the current coupon code or promotional code for the item you want to buy. festive advertising In addition to offering all available product categories, Slabshop also regularly runs attractive promotions with prices you can access on the promo page. There are many options for promotions with different validity periods for various products, from smartphone promotions to promotions for inexpensive train tickets. The process is also very simple, Readmore</p>
                </div>

            </div>
        </div>
    )
}

export default PaymentMethods
