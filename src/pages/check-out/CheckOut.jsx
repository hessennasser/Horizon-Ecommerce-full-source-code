import React, { useState, useRef, useContext, useEffect } from 'react';
import { HiPhotograph, HiTrash } from 'react-icons/hi';
import '../cart/style.css';
import { AppContext } from '../../AppContext';
import { useNavigate } from 'react-router-dom';
import CheckOutItem from './CheckOutItem';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import apiUrl from '../../apiUrl';
import { toast } from 'react-toastify';
import { Dna } from 'react-loader-spinner';
import { set } from 'react-hook-form';

const CheckOut = () => {
    const navigate = useNavigate();
    const { i18n } = useTranslation();
    const [cartItems, setCartItems] = useState([]);
    const userToken = JSON.parse(localStorage.getItem('userToken'));
    const userLogged = localStorage.getItem("userLogged");
    const [userInfoState, setUserInfo] = useState({})
    const [name, setName] = useState(userInfoState?.name);
    const [email, setEmail] = useState(userInfoState?.email);
    const [phone, setPhone] = useState(userInfoState?.phone);

    if (!userLogged) {
        navigate("/customer-login");
        return null;
    }

    const [selectedGovernorate, setSelectedGovernorate] = useState("");
    const [formData, setFormData] = useState({
        firstName: name,
        lastName: name,
        phoneNumber: phone,
        email: email,
        address: '',
        apartment: '',
        floor: '',
        street: '',
        building: '',
        selectedPaymentMethod: 'vodafone-cash',
        notes: ""
    });
    const [cashPhoto, setCashPhoto] = useState(null);
    const [cashNumber, setCashNumber] = useState(null);

    const { getCartItems, getTotalPriceInCart, total, governorates, getGovernorates, mainRequest, setCartItems: globalCartItems, getUserInfo } = useContext(AppContext);
    const photoInputRef = useRef(null);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handlePaymentMethodChange = (e) => {
        setFormData({
            ...formData,
            selectedPaymentMethod: e.target.value
        });
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        setCashPhoto(file);
    };

    const handleUpdatePhoto = () => {
        photoInputRef.current.click();
    };

    const handleDeletePhoto = () => {
        setCashPhoto(null);
    };

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Check if cash number is provided (required field)
        if (formData.selectedPaymentMethod !== 'cash-on-delivery' && !cashNumber) {
            toast.info(i18n.language === "en" ? "Please enter your cash number" : "من فضلك أدخل رقم المحفظة الالكترونية");
            setLoading(false);
            return;
        }

        const checkoutData = { ...formData, governorate_id: selectedGovernorate.value, city: selectedGovernorate.label, token: userToken };
        console.log(selectedGovernorate);

        const formReqData = new FormData();
        formReqData.append('token', checkoutData.token);
        formReqData.append('first_name', checkoutData.firstName);
        formReqData.append('last_name', checkoutData.lastName);
        formReqData.append('phone', checkoutData.phoneNumber);
        formReqData.append('email', checkoutData.email);
        formReqData.append('address', checkoutData.address);
        formReqData.append('apartment', checkoutData.apartment);
        formReqData.append('floor', checkoutData.floor);
        formReqData.append('street', checkoutData.street);
        formReqData.append('building', checkoutData.building);
        formReqData.append('governorate_id', checkoutData.governorate_id);
        formReqData.append('city', checkoutData.city);
        formReqData.append('notes', checkoutData.notes);
        formReqData.append('payment_method', checkoutData.selectedPaymentMethod === "cash-on-delivery" ? 0 : 1);
        formReqData.append('vodafone_cash_number', cashNumber);
        formReqData.append('photo', cashPhoto);
        console.log(selectedGovernorate);
        if (!Object.values(checkoutData).every(value => value) && checkoutData.selectedPaymentMethod !== 'cash-on-delivery') {
            toast.info(i18n.language === "en" ? "Please fill all fields" : "من فضلك ادخل جميع البيانات");
            setLoading(false);
            return;
        }
        
        // Create an array of keys to exclude from the check
        const keysToExclude = ['vodafone_cash_number', 'photo'];

        // Check if all values in checkoutData (excluding the excluded keys) are truthy
        if (checkoutData.selectedPaymentMethod === 'cash-on-delivery' && !Object.entries(checkoutData)
            .filter(([key, value]) => !keysToExclude.includes(key)) // Exclude specified keys
            .every(([key, value]) => value)) {
            toast.info(i18n.language === "en" ? "Please fill all fields" : "من فضلك ادخل جميع البيانات");
            setLoading(false);
            return;
        }

        try {
            const response = await mainRequest.post(`${apiUrl}/payment`, formReqData);
            toast.success(i18n.language === "en" ? "Your Oreder Succsesfly Done" : "تم ارسال طلبك بنجاح");
            navigate("/");
        } catch (error) {
            console.log(error);
            toast.error(i18n.language === "en" ? "Something went wrong" : "حدث خطأ ما, من فضلك حاول مرة اخري");
        } finally {
            setLoading(false);
            getTotalPriceInCart();
            getCartItems(userToken, globalCartItems);
        }
    }

    useEffect(() => {
        if (userLogged && userToken) {
            getTotalPriceInCart()
            getCartItems(userToken, setCartItems);
        }
    }, [userLogged, userToken, total]);

    useEffect(() => {
        if (userLogged) getUserInfo(userToken, setUserInfo, setName, setEmail, setPhone);
        setFormData({
            ...formData,
            firstName: name,
            lastName: name,
            phoneNumber: phone,
            email: email,
        })
        console.log(userInfoState);
        console.log(formData);
    }, [userLogged, userToken])

    useEffect(() => {
        if (userLogged) {
            getUserInfo(userToken, setUserInfo, setName, setEmail, setPhone);
        }
    }, [userLogged, userToken]);

    useEffect(() => {
        setFormData({
            ...formData,
            firstName: name,
            lastName: name,
            phoneNumber: phone,
            email: email,
        });
    }, [name, email, phone]);

    // Remove the previous useEffect that had an empty dependency array


    const engovernoratesOptions = governorates.map((gov) => ({
        value: gov.id,
        label: gov.title.en,
    }));

    const argovernoratesOptions = governorates.map((gov) => ({
        value: gov.id,
        label: gov.title.ar,
    }));

    useEffect(() => {
        getGovernorates()
    }, [])

    return (
        <div className="container py-10">
            {/* Loader */}
            {
                loading && (
                    <div className="fixed top-0 left-0 w-full h-full bg-[#F4F4F4] bg-opagovernorate_id-60 z-50">
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <Dna
                                visible={true}
                                height="260"
                                width="260"
                                ariaLabel="dna-loading"
                                wrapperStyle={{}}
                                wrapperClass="dna-wrapper"
                            />
                        </div>
                    </div>
                )
            }
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative">
                <div className="grid gap-3 lg:sticky top-0 h-fit">
                    <div>
                        <div className="flex flex-col gap-3">
                            <div>
                                <h2 className="text-mainColor font-bold text-lg">Payment Method</h2>
                                <p className="text-gray-500">Select the number for payment of your item</p>
                            </div>
                            <div className="flex justify-between items-center rounded-lg border border-gray-500 p-2">
                                <label className='flex-1 cursor-pointer' htmlFor="vodafone-cash">{i18n.language === "en" ? "vodafone Cash" : "فودافون كاش"}</label>
                                <input
                                    className='cursor-pointer'
                                    type="radio"
                                    name="selectedPaymentMethod"
                                    id="vodafone-cash"
                                    value="vodafone-cash"
                                    checked={formData.selectedPaymentMethod === 'vodafone-cash'}
                                    onChange={handlePaymentMethodChange}
                                />
                            </div>
                            <div className="flex justify-between items-center rounded-lg border border-gray-500 p-2">
                                <label className='flex-1 cursor-pointer' htmlFor="cash-on-delivery">{i18n.language === "en" ? "Cash on Delivery" : "الدفع عند الاستلام"}</label>
                                <input
                                    className='cursor-pointer'
                                    type="radio"
                                    name="selectedPaymentMethod"
                                    id="cash-on-delivery"
                                    value="cash-on-delivery"
                                    checked={formData.selectedPaymentMethod === 'cash-on-delivery'}
                                    onChange={handlePaymentMethodChange}
                                />
                            </div>
                        </div>
                        {formData.selectedPaymentMethod !== 'cash-on-delivery' && (
                            <div className="flex flex-col gap-3">
                                <div>
                                    <h2 className="text-mainColor font-bold text-lg">Transfer data</h2>
                                    <p className="text-gray-500">Select the image for the conversion</p>
                                </div>
                                <div className="flex items-center flex-col gap-2 justify-center">
                                    {/* cash number */}
                                    <div className="w-full flex gap-2 flex-col">
                                        <label htmlFor="cashNumber">Enter Your Cash Number</label>
                                        <input
                                            placeholder={i18n.language === 'ar' ? 'رقم المفظة الالكترونية' : "Cash Number"}
                                            className="rounded-lg border-gray-300 shadow-md"
                                            type='tel'
                                            id="cashNumber"
                                            name="cashNumber"
                                            value={cashNumber}
                                            onChange={(e) => {
                                                setCashNumber(e.target.value);
                                            }}
                                            required
                                        />
                                    </div>
                                    {/* transfare image */}
                                    <div className="w-2/3 bg-[#F8F8FF] text-center border-dashed border-2 rounded-lg border-gray-300 p-4">
                                        {cashPhoto ? (
                                            <div>
                                                <img src={URL.createObjectURL(cashPhoto)} alt="Transfer photo" className="w-20 h-20 mx-auto mb-2" />
                                                <span className="text-secondColor font-bold border-b border-b-secondColor">Photo Selected</span>
                                                <div className="flex justify-center mt-2">
                                                    <button
                                                        type="button"
                                                        className="bg-mainColor text-white py-1 px-2 rounded-lg mr-2"
                                                        onClick={handleUpdatePhoto}
                                                    >
                                                        Update Photo
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="bg-red-500 text-white py-1 px-2 rounded-lg"
                                                        onClick={handleDeletePhoto}
                                                    >
                                                        Delete Photo
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <label htmlFor="photoInput" className="flex flex-col items-center justify-center">
                                                <HiPhotograph className="text-[4rem]" />
                                                <span className="text-secondColor font-bold border-b border-b-secondColor cursor-pointer">Select Photo</span>
                                            </label>
                                        )}
                                        <input
                                            ref={photoInputRef}
                                            id="photoInput"
                                            type="file"
                                            accept=".jpg,.jpeg,.png"
                                            className="hidden"
                                            onChange={handlePhotoChange}
                                            required={formData.selectedPaymentMethod !== 'cash-on-delivery'}
                                        />
                                        <p className="text-gray-500 mt-2">Supported formats: JPEG, PNG</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div>
                        <h2 className="text-mainColor font-bold text-lg">Personal Details</h2>
                        <p className="text-gray-500">Complete personal details to continue the payment</p>
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                        <input
                            placeholder={i18n.language === "en" ? "First Name" : "الاسم الاول"}
                            className="rounded-lg border-gray-300 shadow-md"
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            placeholder={i18n.language === "en" ? "Last Name" : "الاسم الاخير"}
                            className="rounded-lg border-gray-300 shadow-md"
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            placeholder={i18n.language === "en" ? "Phone Number" : "رقم الهاتف"}
                            className="rounded-lg border-gray-300 shadow-md"
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            placeholder={i18n.language === "en" ? "Email" : "البريد الالكتروني"}
                            className="rounded-lg border-gray-300 shadow-md"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                        <Select
                            name="governorate"
                            id="governorate"
                            className="rounded-lg border-gray-300 shadow-md col-span-2"
                            onChange={(option) => setSelectedGovernorate(option)}
                            options={i18n.language === "en" ? engovernoratesOptions : argovernoratesOptions}
                            placeholder={i18n.language === 'ar' ? 'ادخل محافظتك' : 'enter your Governorate'}
                            isRtl={i18n.language === 'ar'}
                            isSearchable
                            required
                        />
                        <input
                            placeholder={i18n.language === 'ar' ? 'عنوانك' : "Address"}
                            className="rounded-lg border-gray-300 shadow-md col-span-2"
                            type='text'
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            placeholder={i18n.language === 'ar' ? 'الشارع' : "Street"}
                            className="rounded-lg border-gray-300 shadow-md col-span-2"
                            type='text'
                            name="street"
                            value={formData.street}
                            onChange={handleInputChange}
                            required
                        />
                        <div className="grid col-span-2 grid-cols-3 gap-2">
                            <input
                                placeholder={i18n.language === 'ar' ? 'المبنى' : "Building"}
                                className="rounded-lg border-gray-300 shadow-md"
                                type='text'
                                name="building"
                                value={formData.building}
                                onChange={handleInputChange}
                                required
                            />
                            <input
                                placeholder={i18n.language === 'ar' ? 'الشقة' : "floor"}
                                className="rounded-lg border-gray-300 shadow-md"
                                type='text'
                                name="floor"
                                value={formData.floor}
                                onChange={handleInputChange}
                                required
                            />
                            <input
                                placeholder={i18n.language === 'ar' ? 'الشقة' : "Apartment"}
                                className="rounded-lg border-gray-300 shadow-md"
                                type='text'
                                name="apartment"
                                value={formData.apartment}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <textarea name="notes" id="notes" value={formData.notes} onChange={handleInputChange} placeholder={i18n.language === "en" ? "enter short note" : "اترك ملاحظة"} className="rounded-lg border-gray-300 shadow-md col-span-2 resize-y min-h-[5rem] max-h-[10rem]"></textarea>
                    </div>
                </div>
                <div className="flex flex-col gap-3 sticky top-44 left-0 h-fit">
                    <div>
                        <h2 className="text-mainColor font-bold text-lg">Current Order</h2>
                        <p className="text-gray-500">The sum of all total payments for goods there</p>
                    </div>
                    {cartItems.map(item => {
                        const { id, title, images, price, quantity_of_cart } = item;
                        return (
                            <CheckOutItem key={id} quantity={quantity_of_cart.quantity} title={title} price={price} productTotalPrice={quantity_of_cart.total} image={`https://admin.horriizon.com/public/assets/${images[0].path}`} />
                        )
                    })}
                    <div className="flex justify-between items-center font-medium py-4 border-dotted border-b-2">
                        <h6>Subtotal</h6>
                        <p>{total} EGY</p>
                    </div>
                    <button type='submit' className='bg-secondColor text-white text-xl py-2 px-4 rounded-md' onClick={handleSubmit}>Pay {total} EGY</button>
                </div>
            </form>
        </div>
    );
};

export default CheckOut;
