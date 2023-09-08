import { useContext, useEffect, useState } from "react";
import BrandSide from "./BrandSide";
import "./styles.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import circle from "../../assets/images/circle-1.png";
import { useTranslation } from "react-i18next";
import axios from 'axios';
import apiUrl from "../../apiUrl";
import { Spinner } from 'flowbite-react';
import { toast } from 'react-toastify';
import { AppContext } from "../../AppContext";
import Select from 'react-select';
import GoogleSignInButton from "./GoogleSignInButton";

const SignupSeller = () => {
    const navigate = useNavigate();
    const { i18n } = useTranslation();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const sellerLogged = localStorage.getItem("sellerLogged");
    const [selectedGovernorate, setSelectedGovernorate] = useState("");

    const { governorates, getGovernorates } = useContext(AppContext);
    const engovernoratesOptions = governorates.map((gov) => ({
        value: gov.id,
        label: gov.title.en,
    }));

    const argovernoratesOptions = governorates.map((gov) => ({
        value: gov.id,
        label: gov.title.ar,
    }));

    if (sellerLogged) {
        navigate("/profile");
        return null;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const fullName = e.target.fullName.value;
        const email = e.target.email.value;
        const phone = e.target.phone.value;
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;
        const governorate = selectedGovernorate;
        const data = {
            name: fullName,
            email: email,
            phone: phone,
            password: password,
            password_confirmation: confirmPassword,
            governorate_id: governorate,
            cash_number: phone
        };


        // Regular expression for Egyptian phone numbers
        const egyptianPhoneRegex = /^(?:01)(?:0|1|2|5)[0-9]{8}$/;
        if (!egyptianPhoneRegex.test(phone)) {
            toast.error(i18n.language === "en" ? "Invalid Egyptian phone number" : "رقم هاتف مصري غير صالح");
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        if (password !== confirmPassword) {
            toast.error(i18n.language === "en" ? "passwords do not match" : "كلمات المرور غير متطابقه");
            setIsLoading(false);
            return;
        }

        axios.post(`${apiUrl}/vendor/auth/register`, data)
            .then((response) => {
                toast.success(i18n.language === "en" ? "you have successfully registered" : "تم التسجيل بنجاح");
                setTimeout(() => {
                    navigate("/seller-login");
                }, 2000);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                toast.error(i18n.language === "en" ? "theres is an error, please try again" : "يوجد خطأ، برجاء المحاوله مره اخره");
                setIsLoading(false);
            });
        setIsLoading(false);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    useEffect(() => {
        getGovernorates()
    }, [])

    return (
        <div className="bg-mainColor">
            <div className="min-h-screen grid grid-cols-1 sm:grid-cols-2 gap-5">
                <BrandSide />
                <div className={`bg-white ${i18n.language === "en" ? "md:rounded-l-xl" : "md:rounded-r-xl"} flex flex-col items-center justify-center py-20`}>
                    <div className="flex flex-col items-center justify-center w-2/3">
                        <div className="relative mb-7">
                            <h2 className="font-bold text-2xl text-center sm:text-3xl">{i18n.language === "ar" ? "قم بالتسجيل كبائع" : "Sign Up as a Seller"}</h2>
                            {/* <img className={`absolute w-2/3 hidden md:block ${i18n.language === "en" ? "-top-16 -right-11" : "-top-8 -left-20"}`} src={circle} alt="horizon" /> */}
                        </div>
                        <p className="mb-2 text-secondColor">{i18n.language === "en" ? "For a unique selling experience" : "لتجربة بيع مميزه"}</p>
                        <form
                            id="seller-signup-form"
                            className="flex flex-col gap-4 w-full"
                            onSubmit={handleSubmit}
                        >
                            <input placeholder={i18n.language === "ar" ? "الاسم الكامل" : "Full Name"} type="text" name="fullName" id="fullName" required />
                            <input placeholder={i18n.language === "ar" ? "البريد الإلكتروني" : "Email"} type="email" name="Phone" id="email" required />
                            <input placeholder={i18n.language === "ar" ? "رقم الهاتف" : "Phone"} type="tel" name="phone" id="phone" required />
                            <Select
                                name="governorate"
                                id="governorate"
                                className="w-full"
                                onChange={(option) => setSelectedGovernorate(option.value)}
                                options={i18n.language === "en" ? engovernoratesOptions : argovernoratesOptions}
                                placeholder={i18n.language === 'ar' ? 'اختر المحافظة' : 'Select Governorate'}
                                isRtl={i18n.language === 'ar'}
                                isSearchable
                                required
                            />

                            <div className="relative">
                                <input
                                    placeholder={i18n.language === "ar" ? "كلمة المرور" : "Password"}
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    id="password"
                                    className="w-full"
                                    required
                                />
                                {showPassword ? (
                                    <FaEyeSlash
                                        className={`absolute ${i18n.language === "en" ? "right-3" : "left-3"} top-1/2 transform -translate-y-1/2 cursor-pointer`}
                                        onClick={togglePasswordVisibility}
                                    />
                                ) : (
                                    <FaEye
                                        className={`absolute ${i18n.language === "en" ? "right-3" : "left-3"} top-1/2 transform -translate-y-1/2 cursor-pointer`}
                                        onClick={togglePasswordVisibility}
                                    />
                                )}
                            </div>
                            <div className="relative">
                                <input
                                    placeholder={i18n.language === "ar" ? "تأكيد كلمة المرور" : "Confirm Password"}
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    className="w-full"
                                    required
                                />
                                {showConfirmPassword ? (
                                    <FaEyeSlash
                                        className={`absolute ${i18n.language === "en" ? "right-3" : "left-3"} top-1/2 transform -translate-y-1/2 cursor-pointer`}
                                        onClick={toggleConfirmPasswordVisibility}
                                    />
                                ) : (
                                    <FaEye
                                        className={`absolute ${i18n.language === "en" ? "right-3" : "left-3"} top-1/2 transform -translate-y-1/2 cursor-pointer`}
                                        onClick={toggleConfirmPasswordVisibility}
                                    />
                                )}
                            </div>
                            <button className="w-full" type="submit" disabled={isLoading}>
                                {isLoading ?
                                    <>
                                        <Spinner aria-label="loading..." color="purple" />
                                        <span className="pl-3">
                                            {i18n.language === "ar" ? "جاري التحميل..." : "Loading..."}
                                        </span>
                                    </>
                                    : i18n.language === "ar" ? "سجل" : "Sign up"}
                            </button>
                        </form>
                        <div className="flex items-center justify-center my-5 w-full">
                            <div className="w-1/2 border-t border-gray-300"></div>
                            <p className="mx-4 text-gray-500 font-semibold uppercase">
                                {i18n.language === "en" ? "OR" : "أو"}
                            </p>
                            <div className="w-1/2 border-t border-gray-300"></div>
                        </div>
                        <GoogleSignInButton role={"seller"} />

                        <p className="mt-4 text-lg">
                            {i18n.language === "ar" ? "هل لديك حساب؟" : "Already have an account?"} <Link to="/seller-login" className="text-secondColor font-bold">{i18n.language === "ar" ? "تسجيل الدخول" : "Login"}</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupSeller;
