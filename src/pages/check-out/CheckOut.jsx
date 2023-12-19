import React, { useState, useRef, useContext, useEffect } from 'react';
import { HiPhotograph } from 'react-icons/hi';
import '../cart/style.css';
import { AppContext } from '../../AppContext';
import { Link, useNavigate } from 'react-router-dom';
import CheckOutItem from './CheckOutItem';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import apiUrl from '../../apiUrl';
import { toast } from 'react-toastify';
import { Oval } from 'react-loader-spinner';
import DeleteModal from '../../dashboard/home/components/DeleteModal';
import PaymentMethods from '../../components/PaymentMethods';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const CheckOut = () => {
    const navigate = useNavigate();
    const { i18n } = useTranslation();
    const [cartItems, setCartItems] = useState([]);
    const userToken = JSON.parse(localStorage.getItem('userToken'));
    const userLogged = localStorage.getItem("userLogged");
    const [userInfoState, setUserInfo] = useState({})

    if (!userLogged) {
        navigate("/customer-login");
        return null;
    }

    const [selectedGovernorate, setSelectedGovernorate] = useState("");
    const [formData, setFormData] = useState({
        firstName: userInfoState?.name?.split(' ')[0] || '',
        lastName: userInfoState?.name?.split(' ').slice(1).join(' ') || '',
        phoneNumber: userInfoState?.phone || "",
        email: userInfoState?.email || "",
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

    const { getCartItems, getTotalPriceInCart, total, governorates, getGovernorates, mainRequest, setCartItems: globalCartItems, getUserInfo, chosenDelivery, websiteInfo, handleDeliveryChange } = useContext(AppContext);
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
        const checkoutData = { ...formData, governorate_id: selectedGovernorate.value, city: selectedGovernorate.label, token: userToken };

        // Check if cash number is provided (required field)
        const egyptianPhoneNumberPattern = /^(010|011|012|015)[0-9]{8}$/;
        if (formData.selectedPaymentMethod === 'vodafone-cash' && !cashNumber) {
            toast.info(i18n.language === "en" ? "Please enter your cash number" : "من فضلك أدخل رقم المحفظة الالكترونية");
            setLoading(false);
            return;
        }
        if (formData.selectedPaymentMethod === 'vodafone-cash' && !egyptianPhoneNumberPattern.test(cashNumber)) {
            toast.info(i18n.language === "en" ? "Wallet number should be 11 digits and start with 010, 011, 012, or 015." : "يجب أن يتكون رقم المحفظة من 11 رقمًا ويبدأ بـ 010 أو 011 أو 012 أو 015.");
            setLoading(false);
            return;
        }
        if (!egyptianPhoneNumberPattern.test(checkoutData.phoneNumber)) {
            toast.info(i18n.language === "en" ? "Phone number should be 11 digits and start with 010, 011, 012, or 015." : "يجب أن يتكون رقم الهاتف من 11 رقمًا ويبدأ بـ 010 أو 011 أو 012 أو 015.");
            setLoading(false);
            return;
        }

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
        formReqData.append('charging', chosenDelivery === "Fast delivery" ? "fast" : "normal");
        formReqData.append('photo', cashPhoto);

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
            // Show a success alert
            Swal.fire({
                icon: 'success',
                title: i18n.language === "en" ? 'Success' : 'نجاح',
                text: i18n.language === "en" ? 'Your order has been received successfully. The product is being prepared' : 'تم استلام طلبكم بنجاح جاري تجهيز المنتج',
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/");
                }
            });
            setLoading(false);
        } catch (error) {
            console.log(error);
            // Show an error alert
            Swal.fire({
                icon: 'error',
                title: i18n.language === "en" ? 'Error' : 'خطأ',
                text: i18n.language === "en" ? 'Something went wrong' : 'حدث خطأ ما, من فضلك حاول مرة أخرى',
            });
            setLoading(false);
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
        if (userLogged) getUserInfo(userToken, setUserInfo);
        setFormData({
            ...formData,
            firstName: userInfoState?.name?.split(' ')[0] || '',
            lastName: userInfoState?.name?.split(' ').slice(1).join(' ') || '',
            phoneNumber: userInfoState.phone,
            email: userInfoState.email,
        })
    }, [userLogged, userToken, userInfoState.name])

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
    }, []);

    const [totalPrice, setTotalPrice] = useState(0);
    const [shipping, setShipping] = useState(0);
    const [coupon, setCoupon] = useState("");

    useEffect(() => {
        // Calculate subtotal when cart items or shipping change
        const calculateSubtotal = () => {
            setTotalPrice(total + shipping);
        };

        calculateSubtotal();
    }, [cartItems, shipping, chosenDelivery]);

    const handleCoupon = async (e) => {
        e.preventDefault();
        if (!coupon) {
            toast.info(i18n.language === "en" ? "Enter the coupon" : "قم بإدخال القسيمه");
            return;
        }
        try {
            const request = await mainRequest.post(`${apiUrl}/coupon/${coupon}`, {
                token: userToken
            });
            if (request.data === "Coupon Not Found") {
                toast.info(i18n.language === "en" ? "Coupon Not Found" : "لم يتم العثور على القسيمة");
            }
        } catch (error) {
            toast.error(i18n.language === "en" ? "theres is an error, please try again" : "يوجد خطأ، برجاء المحاوله مره اخره");
            console.log(error);
        }
        getTotalPriceInCart();
        getCartItems(userToken, setCartItems, setLoading);
    };

    useEffect(() => {
        if (chosenDelivery === "Fast delivery") {
            setShipping(Math.floor(websiteInfo?.fast_charging));
        } else if (chosenDelivery === "Standard delivery") {
            setShipping(Math.floor(websiteInfo?.normal_charging));
        }
    }, [chosenDelivery, websiteInfo])

    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteProductId, setDeleteProductId] = useState(null);
    const openDeleteModal = () => {
        setDeleteModal(true)
    }


    if (loading) return (
        <div className="container py-10 flex flex-col gap-5 items-center justify-center">
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
    )

    if (!loading && cartItems[1]?.length === 0) {
        return (
            <>
                <div className="container py-10 flex flex-col gap-5 items-center justify-center">
                    <h2 className="text-xl font-bold">{i18n.language === "en" ? "Your Cart Is Empty!" : "عربة التسوق فارغة!"}</h2>
                    <img
                        className='w-1/4'
                        src="https://img.icons8.com/?size=512&id=108807&format=png"
                        alt="empty cart"
                    />
                    <Link
                        to="/all-products"
                        className="bg-mainColor text-white px-5 py-2 shadow-lg rounded-lg hover:bg-secondColor duration-200 hover:translate-x-4"
                    >
                        {i18n.language === "en" ? "Go to All Products" : "جميع المنتجات"}
                    </Link>
                </div>
                <PaymentMethods />
            </>
        );
    }

    return (
        <>
            {
                deleteModal && <DeleteModal setIsLoading={setLoading} deleteModal={deleteModal} setDeleteModal={setDeleteModal} productId={deleteProductId} page={"pay"} />
            }
            <div className="container py-10">
                {/* Loader */}
                {
                    loading && (
                        <div className="fixed top-0 left-0 w-full h-full bg-[#F4F4F4] bg-opagovernorate_id-60 z-50">
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <Oval
                                    visible={true}
                                    height="260"
                                    width="260"
                                    ariaLabel="Oval-loading"
                                    wrapperStyle={{}}
                                    wrapperClass="Oval-wrapper"
                                    color='#125ed4'
                                    secondaryColor='#060047'
                                />
                            </div>
                        </div>
                    )
                }
                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="grid gap-3 lg:sticky top-0 right-0 h-fit">
                        <div>
                            <div className="flex flex-col gap-3">
                                <div>
                                    <h2 className="text-mainColor font-bold text-lg">{i18n.language === "en" ? "Payment Method" : "طريقة الدفع"}</h2>
                                    <p className="text-gray-500">{i18n.language === "en" ? "Choose the appropriate payment method for you and complete the information" : "اختر طريقة الدفع المناسبه لك واكمل البيانات"}</p>
                                </div>
                                <div className="flex justify-between items-center rounded-lg border border-gray-500 p-2">
                                    <label className='flex-1 cursor-pointer' htmlFor="vodafone-cash">{i18n.language === "en" ? "E-Pay" : "المحافظ الالكترونية"}</label>
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
                                    <label className='flex-1 cursor-pointer' htmlFor="cash-on-delivery">{i18n.language === "en" ? "Paiement when recieving" : "الدفع عند الاستلام"}</label>
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
                                <div className="flex flex-col gap-3 mt-4">
                                    <div>
                                        <h2 className="text-mainColor font-bold text-lg">{i18n.language === "en" ? "Transfer data" : "بيانات الدفع"}</h2>
                                        <p className="text-gray-500">{i18n.language === "en" ? "Enter the required data below and make sure the image is clear" : "ادخل البيانات المطلوبه بالاسفل وتأكد من وضوح الصوره"}</p>
                                    </div>
                                    <div className="flex items-center flex-col gap-2 justify-center">
                                        {/* cash number */}
                                        <div className="w-full flex gap-2 flex-col">
                                            <label htmlFor="cashNumber" className='my-2 text-xl font-bold'>{i18n.language === "en" ? "Enter the wallet number" : "أدخل رقم المحفظة"}</label>
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
                                        {/* transfer image */}
                                        <label htmlFor="photoInput" className='w-full my-2 text-xl font-bold'>{i18n.language === "en" ? "Transfer receipt" : "إيصال التحويل"}</label>
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
                                                <label htmlFor="photoInput" className="flex flex-col items-center justify-center cursor-pointer">
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
                                            <p className="text-gray-500 mt-2">{i18n.language === "en" ? "Supported formats" : "الإمتدادات المدعومه"}: JPEG, PNG</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div>
                            <h2 className="text-mainColor font-bold text-lg">{i18n.language === "en" ? "Personal Details" : "البيانات الشخصية"}</h2>
                            <p className="text-gray-500">{i18n.language === "en" ? "Complete personal details to continue the payment" : "أكمل التفاصيل الشخصية لمواصلة الدفع"}</p>
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
                    <div className="lg:sticky top-44 left-0 h-fit">
                        <div className='mb-3'>
                            <h2 className='text-lg font-medium mb-5'>{i18n.language === "en" ? "Choose Delivery package" : "اختر طريقة التسليم"}</h2>
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
                                    </div>
                                    <span className='text-secondColor'>{websiteInfo?.normal_charging} EGY</span>
                                </div>
                            </div>
                        </div>
                        <form className={`coupon-form relative mb-3 overflow-hidden flex flex-col items-start gap-6 bg-[#F4DBE8] py-4 px-6 rounded-lg shadow-md ${total < cartItems[0] ? "before:absolute before:inset-0 before:bg-gray-400 before:bg-opacity-50" : ""}`} onSubmit={e => handleCoupon(e)}>
                            <label htmlFor="coupon" className="font-bold">
                                {i18n.language === "en" ? "Have a Coupon?" : "هل لديك قسيمة؟"}
                            </label>
                            <input
                                disabled={total < cartItems[0]}
                                className="w-full rounded-lg"
                                placeholder={i18n.language === "en" ? "add your coupon" : "أضف قسيمتك"}
                                type="text"
                                name="coupon"
                                id="coupon"
                                value={coupon}
                                onChange={(e) => setCoupon(e.target.value)}
                            />
                            <button
                                disabled={total < cartItems[0]}
                                onClick={e => handleCoupon(e)}
                                className="m-0 px-5 bg-secondColor py-2 rounded-md text-white hover:brightness-110"
                                type="submit"
                            >
                                {i18n.language === "en" ? "Apply Coupon" : "تطبيق القسيمة"}
                            </button>
                        </form>
                        <div className='flex flex-col gap-3'>
                            <div>
                                <h2 className="text-mainColor font-bold text-lg">{i18n.language === "en" ? "Current Order" : "الطلب الحالي"}</h2>
                                <p className="text-gray-500">{i18n.language === "en" ? "The sum of all total payments for your current order" : "مجموع المدفوعات الإجمالية لطلبك الحالي"}</p>
                            </div>
                            {cartItems[1]?.map(item => {
                                const { id, title, images, price, quantity_of_cart } = item;
                                return (
                                    <CheckOutItem openDeleteModal={openDeleteModal} setDeleteProductId={setDeleteProductId} key={id} id={id} quantity={quantity_of_cart.quantity} title={title} price={price} productTotalPrice={quantity_of_cart.total} image={`https://admin.horriizon.com/public/${images[0].path}`} />
                                )
                            })}
                            {
                                total < cartItems[0] && <div className="flex justify-between items-center gap-6 text-red-500 line-through">
                                    <h3 className="">{i18n.language === "en" ? "Total products Price" : "مجموع المنتجات"}</h3>
                                    <p className="flex-1 text-end">{cartItems[0]} EGY</p>
                                </div>
                            }
                            {
                                total < cartItems[0] && (
                                    <div className="flex justify-between items-center gap-6">
                                        <h3 className="">{i18n.language === "en" ? "Discount" : "خصم"}</h3>
                                        <p className="flex-1 text-end">-{cartItems[0] - total} EGY</p>
                                    </div>
                                )
                            }
                            {
                                shipping && (
                                    <div className="flex justify-between items-center gap-6">
                                        <h3 className="">{i18n.language === "en" ? "Delevary" : "سعر التوصيل"}</h3>
                                        <p className="flex-1 text-end">{shipping} EGY</p>
                                    </div>

                                )
                            }
                            <div className="flex justify-between items-center gap-6">
                                <h3 className="">{i18n.language === "en" ? "Total" : "المجموع الكلي"}</h3>
                                <p className="flex-1 text-end">{total + shipping} EGY</p>
                            </div>
                            <button type='submit' className='bg-secondColor text-white text-xl py-2 px-4 rounded-md' onClick={handleSubmit}>{i18n.language === "en" ? "Pay" : "إدفع"} {total + shipping} EGY</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default CheckOut;
