import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { AppContext } from '../../AppContext';
import { AiOutlineEdit } from "react-icons/ai"
import { BiLogOutCircle } from "react-icons/bi"
import Breadcrumbs from '../../components/Breadcrumbs';
import { toast } from 'react-toastify';
import apiUrl from '../../apiUrl';
import axios from 'axios';
import { Spinner } from 'flowbite-react';
import Select from 'react-select';
import userImagePlaceholder from '../../assets/images/user-image-placeholder.png';
import Loading from '../../components/Loading';

const ProfilePage = () => {
    const userLogged = localStorage.getItem("userLogged");
    const userToken = JSON.parse(localStorage.getItem('userToken'));
    const [userInfoState, setUserInfo] = useState({})
    const [loading, setLoading] = useState(false)

    const sellerLogged = localStorage.getItem("sellerLogged");
    const sellerToken = JSON.parse(localStorage.getItem('sellerToken'));
    const [sellerInfoState, setSellerInfo] = useState({})

    const navigate = useNavigate();
    const { i18n } = useTranslation();
    const { getUserInfo, getSellerInfo, logout, governorates, getGovernorates } = useContext(AppContext);

    if (!userLogged && !sellerLogged) {
        navigate("/customer-login");
        return null;
    }
    const [isProfileSubmitting, setIsProfileSubmitting] = useState(false);
    const [iPasswordSubmitting, setIPasswordSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [editingProfile, setEditingProfile] = useState(false);
    const [editingPassword, setEditingPassword] = useState(false);
    const [name, setName] = useState(userLogged ? userInfoState?.name : sellerInfoState?.name);
    const [email, setEmail] = useState(userLogged ? userInfoState?.email : sellerInfoState?.email);
    const [phone, setPhone] = useState(userLogged ? userInfoState?.phone : sellerInfoState?.phone);
    const [cashNumber, setCashNumber] = useState(sellerInfoState?.cash_number);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [selectedGovernorate, setSelectedGovernorate] = useState("");

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const toggleEditProfile = () => {
        setEditingProfile(!editingProfile);
        setEditingPassword(false);
    };
    const toggleEditPassword = () => {
        setEditingPassword(!editingPassword);
        setEditingProfile(false);
    };
    const handleNameChange = (e) => {
        setName(e.target.value);
    };
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    };
    const handleCashNumberChange = (e) => {
        setCashNumber(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };
    const handleEditProfile = async (event) => {
        event.preventDefault();
        setIsProfileSubmitting(true);
        // Validate if the phone number is an Egyptian number
        const egyptianPhoneNumberPattern = /^(010|011|012|015)[0-9]{8}$/;
        if (!egyptianPhoneNumberPattern.test(userLogged ? phone || userInfoState.phone : phone || sellerInfoState.phone)) {
            toast.info(i18n.language === "en" ? "Phone number should be 11 digits and start with 010, 011, 012, or 015." : "يجب أن يتكون رقم الهاتف من 11 رقمًا ويبدأ بـ 010 أو 011 أو 012 أو 015.");
            setIsProfileSubmitting(false);
            return;
        }
        if (sellerLogged && !egyptianPhoneNumberPattern.test(sellerInfoState.cashNumber)) {
            toast.info(i18n.language === "en" ? "Wallet number should be 11 digits and start with 010, 011, 012, or 015." : "يجب أن يتكون رقم المحفظة من 11 رقمًا ويبدأ بـ 010 أو 011 أو 012 أو 015.");
            setIsProfileSubmitting(false);
            return;
        }
        try {
            const updatedProfile = {
                token: userLogged ? userToken : sellerToken,
                name: userLogged ? name || userInfoState.name : name || sellerInfoState.name,
                email: userLogged ? email || userInfoState.email : email || sellerInfoState.email,
                phone: userLogged ? phone || userInfoState.phone : phone || sellerInfoState.phone,
                governorate_id: selectedGovernorate || sellerInfoState.governorate_id,
                cash_number: cashNumber
            };
            const response = await axios.post(`${apiUrl}${userLogged ? "/auth/user-update" : "/vendor/auth/vendor-update"}`, updatedProfile);
            toast.success(i18n.language === "en" ? "The profile updated successfully" : "تم تحديث الملف الشخصي بنجاح");
        } catch (error) {
            toast.error(i18n.language === "en" ? "There is an error, please try again later" : "يوجد خطأ ما، الرجاء المحاولة مره اخري");
        } finally {
            setIsProfileSubmitting(false);
            setEditingProfile(false);
            userLogged ? getUserInfo(userToken, setUserInfo, setLoading, setName) : getSellerInfo(sellerToken, setSellerInfo, setLoading, setName);
        }
    };
    const handleEditPassword = async (event) => {
        event.preventDefault();
        if (!password) {
            toast.info(i18n.language === "en" ? "please enter new password" : "ادخل كلمة المرور الجديده");
            return;
        }
        if (!confirmPassword) {
            toast.info(i18n.language === "en" ? "please enter confirmation password" : "ادخل تاكيد كلمة المرور");
            return;
        }
        if (password !== confirmPassword) {
            toast.info(i18n.language === "en" ? "password and confirmation password not match" : "كلمة المرور وتاكيد كلمة المرور غير متطابقين");
            return;
        }
        setIPasswordSubmitting(true);
        try {
            const updatedData = {
                token: userLogged ? userToken : sellerToken,
                name: userLogged ? name || userInfoState.name : name || sellerInfoState.name,
                email: userLogged ? email || userInfoState.email : email || sellerInfoState.email,
                phone: userLogged ? phone || userInfoState.phone : phone || sellerInfoState.phone,
                governorate_id: sellerInfoState.governorate_id,
                cash_number: cashNumber,
                password: password,
                password_confirmation: confirmPassword,
            };
            const response = await axios.post(`${apiUrl}${userLogged ? "/auth/user-update" : "/vendor/auth/vendor-update"}`, updatedData);
            toast.success("The password updated successfully");
        } catch (error) {
            toast.error(i18n.language === "en" ? "There is an error, please try again later" : "يوجد خطأ ما، الرجاء المحاولة مره اخري");
        } finally {
            setIPasswordSubmitting(false);
            setEditingPassword(false);
            userLogged ? getUserInfo(userToken, setUserInfo, setName, setEmail, setPhone) : getSellerInfo(sellerToken, setSellerInfo, setName);
        }
    };

    const photoInputRef = useRef(null);
    const [image, setImage] = useState(null);
    const [imageSubmitting, setImageSubmitting] = useState(false);
    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        setImage({
            ...image,
            photo: file
        });
    };
    const submitImageUpdate = async (e) => {
        e.preventDefault();
        setImageSubmitting(true);
        const updatedData = {
            token: userLogged ? userToken : sellerToken,
            image: image.photo,
            name: userLogged ? name || userInfoState.name : name || sellerInfoState.name,
            email: userLogged ? email || userInfoState.email : email || sellerInfoState.email,
            phone: userLogged ? phone || userInfoState.phone : phone || sellerInfoState.phone,
            governorate_id: sellerInfoState.governorate_id,
            cash_number: cashNumber,
        };

        try {
            const response = await axios.post(`${apiUrl}${userLogged ? "/auth/user-update" : "/vendor/auth/vendor-update"}`, updatedData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            toast.success(i18n.language === "en" ? "The photo updated successfully" : "تم تحديث الصورة بنجاح");
        } catch (error) {
            toast.error(i18n.language === "en" ? "There is an error, please try again later" : "يوجد خطأ ما، الرجاء المحاولة مره اخري");
        } finally {
            setIPasswordSubmitting(false);
            setEditingPassword(false);
            setImageSubmitting(false);
            userLogged ? getUserInfo(userToken, setUserInfo, setName, setEmail, setPhone) : getSellerInfo(sellerToken, setSellerInfo, setName);
        }
    }
    const handleDeletePhoto = () => {
        setImage({
            ...image,
            photo: null
        });
    };

    useEffect(() => {
        if (userLogged) getUserInfo(userToken, setUserInfo, setLoading, setName);
    }, [userLogged, userToken])

    useEffect(() => {
        if (sellerLogged) getSellerInfo(sellerToken, setSellerInfo, setLoading, setName);
    }, [sellerLogged, sellerToken])

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


    if (loading) return <Loading />

    // the content that render
    if (userLogged) {
        return (
            <div className='container py-10'>
                <div className="mb-10">
                    <Breadcrumbs />
                </div>
                <div className="grid grid-cols-3 gap-5 my-5">
                    <div className="user-info col-span-3 md:col-span-1 bg-white p-3 shadow-lg rounded-md h-fit">
                        {
                            imageSubmitting ?
                                <div className='mb-3 flex items-ce justify-center py-3'>
                                    <Spinner aria-label="loading..." color="purple" />
                                </div>
                                :
                                <div className="grid mb-3">
                                    {
                                        !image?.photo ?
                                            <>
                                                <div className="img-holder relative -top-10 overflow-hidden w-32 h-32 bg-secondColor text-white grid place-content-center rounded-[50%] mx-auto">
                                                    <img src={userInfoState.image ? `https://admin.horriizon.com/public/${userInfoState.image}` : userImagePlaceholder}
                                                        className='h-full w-full' alt={userInfoState.name} />
                                                </div>
                                                <label htmlFor="photoInput" className="flex flex-col items-center justify-center">
                                                    <span className="text-secondColor font-bold border-b border-b-secondColor cursor-pointer">{i18n.language === "en" ? "Upload New Image" :
                                                        "تحديث الصورة"}</span>
                                                </label>
                                                <input
                                                    ref={photoInputRef}
                                                    id="photoInput"
                                                    type="file"
                                                    accept=".jpg,.jpeg,.png"
                                                    className="hidden"
                                                    onChange={handlePhotoChange}
                                                />
                                            </>
                                            :
                                            (
                                                <>
                                                    <div className="img-holder relative -top-10 overflow-hidden w-32 h-32 bg-secondColor text-white grid place-content-center rounded-[50%] mx-auto">
                                                        <img src={URL.createObjectURL(image?.photo)} alt="Transfer photo" className='h-full w-full' />
                                                    </div>
                                                    {/* <span className="text-secondColor w-fit mx-auto font-bold border-b border-b-secondColor">Photo Selected</span> */}
                                                </>
                                            )
                                    }
                                    {image?.photo && (
                                        <div>
                                            <div className="flex justify-center gap-3">
                                                <button
                                                    type="button"
                                                    className="bg-mainColor text-white py-1 px-2 rounded-lg mr-2"
                                                    onClick={submitImageUpdate}
                                                >
                                                    {i18n.language === "en" ? "Save" : "حفظ"}
                                                </button>
                                                <button
                                                    type="button"
                                                    className="bg-red-500 text-white py-1 px-2 rounded-lg"
                                                    onClick={handleDeletePhoto}
                                                >
                                                    {i18n.language === "en" ? "Close" : "اغلاق"}
                                                </button>
                                            </div>
                                        </div>)
                                    }
                                </div>
                        }
                        <div className="info flex flex-col justify-center items-center gap-3">
                            <h3>{userInfoState.name}</h3>
                            <h3 className='text-sm md:text-md'>{userInfoState.email}</h3>
                        </div>
                        <div className="actions mt-10 flex flex-col justify-center items-center gap-3">
                            <button className='flex items-center gap-2' onClick={toggleEditProfile}>
                                <AiOutlineEdit /> {i18n.language === "en" ? "Edit Profile" : "تعديل بياناتك"}
                            </button>
                            <button className='flex items-center gap-2' onClick={toggleEditPassword}>
                                <AiOutlineEdit /> {i18n.language === "en" ? "Edit Password" : "تغيير كلمة المرور"}
                            </button>
                            <button onClick={logout} className="flex items-center gap-2">
                                <BiLogOutCircle />{i18n.language === "en" ? "Logout" : "تسجيل الخروج"}
                            </button>
                        </div>
                    </div>
                    <div className={`col-span-3 md:col-span-2 bg-white p-3 shadow-lg rounded-md h-fit`}>
                        <h2 className='text-xl font-medium'>{i18n.language === "ar" ? "الملف الشخصي" : "Profile"}</h2>
                        <form className='flex flex-col gap-5 items-center my-5' onSubmit={handleEditProfile}>
                            <div className='flex w-full gap-2 justify-between flex-col'>
                                <label htmlFor='name'>{i18n.language === "ar" ? "الاسم" : "Full Name"}</label>
                                <input
                                    className={`w-full bg-gray-300`}
                                    id='name'
                                    type='text'
                                    value={editingProfile ? name : userInfoState.name}
                                    readOnly={!editingProfile}
                                    onChange={(e) => {
                                        if (editingProfile) {
                                            handleNameChange(e)
                                        }
                                    }}
                                />
                            </div>
                            <div className='flex w-full gap-2 justify-between flex-col'>
                                <label htmlFor='phone'>{i18n.language === "ar" ? "رقم الهاتف" : "Phone"}</label>
                                <input
                                    className={`w-full bg-gray-300`}
                                    id='phone'
                                    type='tel'
                                    value={editingProfile ? phone : userInfoState.phone}
                                    readOnly={!editingProfile}
                                    onChange={(e) => {
                                        if (editingProfile) {
                                            handlePhoneChange(e)
                                        }
                                    }}
                                />
                            </div>
                            <div className='flex w-full gap-2 justify-between flex-col'>
                                <label htmlFor='email'>{i18n.language === "ar" ? "البريد الالكتروني" : "Email"}</label>
                                <input
                                    className={`w-full bg-gray-300`}
                                    id='email'
                                    type='email'
                                    value={editingProfile ? email : userInfoState.email}
                                    readOnly={!editingProfile}
                                    onChange={(e) => {
                                        if (editingProfile) {
                                            handleEmailChange(e)
                                        }
                                    }}

                                />
                            </div>
                            {editingProfile && (
                                <div className='w-full grid grid-cols-2 gap-3'>
                                    <button onClick={handleEditProfile} className='m-0 bg-secondColor py-2 rounded-xl text-white' type='submit'>
                                        {
                                            isProfileSubmitting ? <Spinner aria-label="loading..." color="purple" /> : i18n.language === "ar" ? "حفظ التعديلات" : "Save Changes"
                                        }
                                    </button>
                                    <button className='py-2 rounded-xl border border-secondColor text-secondColor' type='button' onClick={toggleEditProfile}>{i18n.language === "ar" ? "الغاء" : "Cancel"}</button>
                                </div>
                            )}
                        </form>
                        {editingPassword && (
                            <form className='flex flex-col gap-5 items-center my-5' onSubmit={handleEditPassword}>
                                <div className='flex w-full gap-2 justify-between flex-col relative'>
                                    <label htmlFor='new-password'>{i18n.language === "ar" ? "كلمة المرور الجديده" : "New Password"}</label>
                                    <input
                                        className={`w-full bg-gray-300`}
                                        id='new-password'
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={handlePasswordChange}
                                    />
                                    {showPassword ? (
                                        <FaEyeSlash
                                            className={`absolute ${i18n.language === "en" ? "right-3" : "left-3"} top-1/2 transform translate-y-1/2 cursor-pointer`}
                                            onClick={togglePasswordVisibility}
                                        />
                                    ) : (
                                        <FaEye
                                            className={`absolute ${i18n.language === "en" ? "right-3" : "left-3"} top-1/2 transform translate-y-1/2 cursor-pointer`}
                                            onClick={togglePasswordVisibility}
                                        />
                                    )}
                                </div>
                                <div className='flex w-full gap-2 justify-between flex-col relative'>
                                    <label htmlFor='confirm-password'>{i18n.language === "ar" ? "اعد كتابة كلمة المرور" : "Confirm Password"}</label>
                                    <input
                                        className={`w-full bg-gray-300`}
                                        id='confirm-password'
                                        type={showPassword ? "text" : "password"}
                                        value={confirmPassword}
                                        onChange={handleConfirmPasswordChange}
                                    />
                                </div>
                                <div className='w-full grid grid-cols-2 gap-3'>
                                    <button onClick={handleEditPassword} className='m-0 bg-secondColor py-2 rounded-xl text-white' type='submit'>
                                        {
                                            iPasswordSubmitting ? <Spinner aria-label="loading..." color="purple" /> : i18n.language === "ar" ? "حفظ كلمة المرور" : "Uptade Password"
                                        }
                                    </button>
                                    <button className='py-2 rounded-xl border border-secondColor text-secondColor' type='button' onClick={toggleEditPassword}>{i18n.language === "ar" ? "الغاء" : "Cancel"}</button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        );
    }
    if (sellerLogged) {
        const sellerGovernorate = governorates.find((governorate) => governorate.id === sellerInfoState.governorate_id);
        return (
            <div className='container py-10'>
                <div className="mb-10">
                    <Breadcrumbs />
                </div>
                <div className="grid grid-cols-3 gap-5 my-5">
                    <div className="user-info col-span-3 md:col-span-1 bg-white p-3 shadow-lg rounded-md h-fit">
                        {
                            imageSubmitting ?
                                <div className='mb-3 flex items-ce justify-center py-3'>
                                    <Spinner aria-label="loading..." color="purple" />
                                </div>
                                :
                                <div className="grid mb-3">
                                    {
                                        !image?.photo ?
                                            <>
                                                <div className="img-holder relative -top-10 overflow-hidden w-32 h-32 bg-secondColor text-white grid place-content-center rounded-[50%] mx-auto">
                                                    <img src={userInfoState.image ? `https://admin.horriizon.com/images/${userInfoState.image}` : userImagePlaceholder}
                                                        className='h-full w-full' alt={userInfoState.name} />
                                                </div>
                                                <label htmlFor="photoInput" className="flex flex-col items-center justify-center">
                                                    <span className="text-secondColor font-bold border-b border-b-secondColor cursor-pointer">{i18n.language === "en" ? "Upload New Image" :
                                                        "تحديث الصورة"}</span>
                                                </label>
                                                <input
                                                    ref={photoInputRef}
                                                    id="photoInput"
                                                    type="file"
                                                    accept=".jpg,.jpeg,.png"
                                                    className="hidden"
                                                    onChange={handlePhotoChange}
                                                />
                                            </>
                                            :
                                            (
                                                <>
                                                    <div className="img-holder relative -top-10 overflow-hidden w-32 h-32 bg-secondColor text-white grid place-content-center rounded-[50%] mx-auto">
                                                        <img src={URL.createObjectURL(image?.photo)} alt="Transfer photo" className='h-full w-full' />
                                                    </div>
                                                    {/* <span className="text-secondColor w-fit mx-auto font-bold border-b border-b-secondColor">Photo Selected</span> */}
                                                </>
                                            )
                                    }
                                    {image?.photo && (
                                        <div>
                                            <div className="flex justify-center gap-3">
                                                <button
                                                    type="button"
                                                    className="bg-mainColor text-white py-1 px-2 rounded-lg mr-2"
                                                    onClick={submitImageUpdate}
                                                >
                                                    {i18n.language === "en" ? "Save" : "حفظ"}
                                                </button>
                                                <button
                                                    type="button"
                                                    className="bg-red-500 text-white py-1 px-2 rounded-lg"
                                                    onClick={handleDeletePhoto}
                                                >
                                                    {i18n.language === "en" ? "Close" : "اغلاق"}
                                                </button>
                                            </div>
                                        </div>)
                                    }
                                </div>
                        }
                        <div className="info flex flex-col justify-center items-center gap-3">
                            <h3>{sellerInfoState.name}</h3>
                            <h3 className='text-sm md:text-md'>{sellerInfoState.email}</h3>
                        </div>
                        <div className="actions mt-10 flex flex-col justify-center items-center gap-3">
                            <button className='flex items-center gap-2' onClick={toggleEditProfile}>
                                <AiOutlineEdit /> {i18n.language === "en" ? "Edit Profile" : "تعديل بياناتك"}
                            </button>
                            <button className='flex items-center gap-2' onClick={toggleEditPassword}>
                                <AiOutlineEdit /> {i18n.language === "en" ? "Edit Password" : "تغيير كلمة المرور"}
                            </button>
                            <button onClick={logout} className="flex items-center gap-2">
                                <BiLogOutCircle />{i18n.language === "en" ? "Logout" : "تسجيل الخروج"}
                            </button>
                        </div>
                    </div>
                    <div className={`col-span-3 md:col-span-2 bg-white p-3 shadow-lg rounded-md h-fit`}>
                        <h2 className='text-xl font-medium'>{i18n.language === "ar" ? "الملف الشخصي" : "Profile"}</h2>
                        <form className='flex flex-col gap-5 items-center my-5' onSubmit={handleEditProfile}>
                            <div className='flex w-full gap-2 justify-between flex-col'>
                                <label htmlFor='name'>{i18n.language === "ar" ? "الاسم" : "Full Name"}</label>
                                <input
                                    className={`w-full bg-gray-300`}
                                    id='name'
                                    type='text'
                                    value={editingProfile ? name : sellerInfoState.name}
                                    readOnly={!editingProfile}
                                    onChange={(e) => {
                                        if (editingProfile) {
                                            handleNameChange(e)
                                        }
                                    }}
                                />
                            </div>
                            <div className='flex w-full gap-2 justify-between flex-col'>
                                <label htmlFor='phone'>{i18n.language === "ar" ? "رقم الهاتف" : "Phone"}</label>
                                <input
                                    className={`w-full bg-gray-300`}
                                    id='phone'
                                    type='tel'
                                    value={editingProfile ? phone : sellerInfoState.phone}
                                    readOnly={!editingProfile}
                                    onChange={(e) => {
                                        if (editingProfile) {
                                            handlePhoneChange(e)
                                        }
                                    }}
                                />
                            </div>
                            <div className='flex w-full gap-2 justify-between flex-col'>
                                <label htmlFor='email'>{i18n.language === "ar" ? "البريد الالكتروني" : "Email"}</label>
                                <input
                                    className={`w-full bg-gray-300`}
                                    id='email'
                                    type='email'
                                    value={editingProfile ? email : sellerInfoState.email}
                                    readOnly={!editingProfile}
                                    onChange={(e) => {
                                        if (editingProfile) {
                                            handleEmailChange(e)
                                        }
                                    }}
                                />
                            </div>
                            <div className='flex w-full gap-2 justify-between flex-col'>
                                <label htmlFor='cashNumber'>{i18n.language === "ar" ? "رقم المحفظة الالكترونية" : "Cash Number"}</label>
                                <input
                                    className={`w-full bg-gray-300`}
                                    id='cashNumber'
                                    type='tel'
                                    value={editingProfile ? cashNumber : sellerInfoState.cash_number}
                                    readOnly={!editingProfile}
                                    onChange={(e) => {
                                        if (editingProfile) {
                                            handleCashNumberChange(e)
                                        }
                                    }}
                                />
                            </div>
                            <div className='flex w-full gap-2 justify-between flex-col'>
                                <label htmlFor='email'>{i18n.language === "ar" ? "المحافظة" : "Governorate"}</label>
                                {
                                    !editingProfile ? (
                                        <input
                                            className={`w-full bg-gray-300`}
                                            id='governorate'
                                            type='text'
                                            value={"" || i18n.language === "en" ? sellerGovernorate?.title.en : sellerGovernorate?.title.ar}
                                            readOnly={!editingProfile}
                                            onChange={(e) => {
                                                if (editingProfile) {
                                                    handleEmailChange(e)
                                                }
                                            }}
                                        />
                                    ) : (
                                        <Select
                                            name="governorate"
                                            id="governorate"
                                            className="rounded-lg border-gray-300 shadow-md col-span-2"
                                            onChange={(option) => setSelectedGovernorate(option.value)}
                                            options={i18n.language === "en" ? engovernoratesOptions : argovernoratesOptions}
                                            placeholder={i18n.language === 'ar' ? 'ادخل محافظتك' : 'enter your Governorate'}
                                            isRtl={i18n.language === 'ar'}
                                            readOnly={!editingProfile}
                                            isSearchable
                                            required
                                        />
                                    )
                                }
                            </div>
                            {editingProfile && (
                                <div className='w-full grid grid-cols-2 gap-3'>
                                    <button onClick={handleEditProfile} className='m-0 bg-secondColor py-2 rounded-xl text-white' type='submit'>
                                        {
                                            isProfileSubmitting ? <Spinner aria-label="loading..." color="purple" /> : i18n.language === "ar" ? "حفظ التعديلات" : "Save Changes"
                                        }
                                    </button>
                                    <button className='py-2 rounded-xl border border-secondColor text-secondColor' type='button' onClick={toggleEditProfile}>{i18n.language === "ar" ? "الغاء" : "Cancel"}</button>
                                </div>
                            )}
                        </form>
                        {editingPassword && (
                            <form className='flex flex-col gap-5 items-center my-5' onSubmit={handleEditPassword}>
                                <div className='flex w-full gap-2 justify-between flex-col relative'>
                                    <label htmlFor='new-password'>{i18n.language === "ar" ? "كلمة المرور الجديده" : "New Password"}</label>
                                    <input
                                        className={`w-full bg-gray-300`}
                                        id='new-password'
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={handlePasswordChange}
                                    />
                                    {showPassword ? (
                                        <FaEyeSlash
                                            className={`absolute ${i18n.language === "en" ? "right-3" : "left-3"} top-1/2 transform translate-y-1/2 cursor-pointer`}
                                            onClick={togglePasswordVisibility}
                                        />
                                    ) : (
                                        <FaEye
                                            className={`absolute ${i18n.language === "en" ? "right-3" : "left-3"} top-1/2 transform translate-y-1/2 cursor-pointer`}
                                            onClick={togglePasswordVisibility}
                                        />
                                    )}
                                </div>
                                <div className='flex w-full gap-2 justify-between flex-col relative'>
                                    <label htmlFor='confirm-password'>{i18n.language === "ar" ? "اعد كتابة كلمة المرور" : "Confirm Password"}</label>
                                    <input
                                        className={`w-full bg-gray-300`}
                                        id='confirm-password'
                                        type={showPassword ? "text" : "password"}
                                        value={confirmPassword}
                                        onChange={handleConfirmPasswordChange}
                                    />
                                </div>
                                <div className='w-full grid grid-cols-2 gap-3'>
                                    <button onClick={handleEditPassword} className='m-0 bg-secondColor py-2 rounded-xl text-white' type='submit'>
                                        {
                                            iPasswordSubmitting ? <Spinner aria-label="loading..." color="purple" /> : i18n.language === "ar" ? "حفظ كلمة المرور" : "Uptade Password"
                                        }
                                    </button>
                                    <button className='py-2 rounded-xl border border-secondColor text-secondColor' type='button' onClick={toggleEditPassword}>{i18n.language === "ar" ? "الغاء" : "Cancel"}</button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div >
        );
    }
};

export default ProfilePage;
