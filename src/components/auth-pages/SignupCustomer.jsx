import { useState } from "react";
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
import GoogleSignInButton from "./GoogleSignInButton";

const SignupCustomer = () => {
    const navigate = useNavigate();
    const { i18n } = useTranslation();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const userLogged = localStorage.getItem("userLogged");
    const [agreedToPolicy, setAgreedToPolicy] = useState(false);

    if (userLogged) {
        navigate("/profile");
        return;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        const fullName = e.target.fullName.value;
        const email = e.target.email.value;
        const phone = e.target.phone.value;
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;

        const data = {
            name: fullName,
            email: email,
            phone: phone,
            password: password,
            password_confirmation: confirmPassword
        };

        // Regular expression for Egyptian phone numbers
        const egyptianPhoneRegex = /^(?:01)(?:0|1|2|5)[0-9]{8}$/;
        if (!egyptianPhoneRegex.test(phone)) {
            toast.error(i18n.language === "en" ? "Invalid Egyptian phone number" : "رقم هاتف مصري غير صالح");
            setIsLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            toast.error(i18n.language === "en" ? "passwords do not match" : "كلمات المرور غير متطابقه");
            setIsLoading(false);
            return;
        }

        if (!agreedToPolicy) {
            toast.error(i18n.language === "en" ? "Please agree to our policies" : "برجاء الموافقة على سياساتنا");
            setIsLoading(false);
            return;
        }


        axios.post(`${apiUrl}/auth/register`, data)
            .then((response) => {
                toast.success(i18n.language === "en" ? "You have successfully registered" : "لقد تم تسجيلك بنجاح");
                setTimeout(() => {
                    navigate("/customer-login");
                }, 2000);
                setIsLoading(false);
            })
            .catch((error) => {
                toast.error(i18n.language === "en" ? "theres is an error, please try again" : "يوجد خطأ، برجاء المحاوله مره اخره");
                setIsLoading(false);
            });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className="bg-mainColor">
            <div className="min-h-screen grid grid-cols-1 sm:grid-cols-2 gap-5">
                <BrandSide />
                <div className={`bg-white ${i18n.language === "en" ? "md:rounded-l-xl" : "md:rounded-r-xl"} flex flex-col items-center justify-center py-20`}>
                    <div className="flex flex-col items-center justify-center w-2/3">
                        <div className="relative mb-7">
                            <h2 className="font-bold text-2xl text-center sm:text-3xl">
                                {i18n.language === "ar" ? "سجل معنا كمستخدم" : "Sign Up as a Customer"}
                            </h2>
                            {/* <img className={`absolute w-2/3 hidden md:block ${i18n.language === "en" ? "-top-16 -right-11" : "-top-12 -left-9"}`} src={circle} alt="horizon" /> */}
                        </div>
                        <p className="mb-2 text-secondColor">{i18n.language === "en" ? "For better purchasing experience" : "لتجربة شراء افضل"}</p>
                        <form
                            id="customer-signup-form"
                            className="flex flex-col gap-4 w-full"
                            onSubmit={handleSubmit}
                        >
                            <input
                                placeholder={i18n.language === "ar" ? "الاسم الكامل" : "Full Name"}
                                type="text"
                                name="fullName"
                                id="fullName"
                                required
                            />
                            <input
                                placeholder={i18n.language === "ar" ? "البريد الاللكتروني" : "Email"}
                                type="email"
                                name="email"
                                id="email"
                            />
                            <input
                                placeholder={i18n.language === "ar" ? "رقم الهاتف" : "Phone"}
                                type="tel"
                                name="phone"
                                id="phone"
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
                            <div className="w-full flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    id="policyCheckbox"
                                    name="policyCheckbox"
                                    style={{ border: "1px solid gray" }}
                                    checked={agreedToPolicy}
                                    onChange={() => setAgreedToPolicy(!agreedToPolicy)}
                                />
                                <label htmlFor="policyCheckbox">
                                    {
                                        i18n.language === "en" ? (
                                            <>
                                                I have read and agree to <Link to="/privacy" className="text-secondColor underline">the Privacy Policy</Link>
                                            </>
                                        )
                                            :
                                            (
                                                <>
                                                    لقد قرأت ووافقت على <Link to="/privacy" className="text-secondColor underline">سياسة الخصوصية</Link>
                                                </>
                                            )
                                    }
                                </label>
                            </div>

                            <button className="w-full" type="submit" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Spinner aria-label="loading..." color="purple" />
                                    </>
                                ) : (
                                    i18n.language === "ar" ? "اشترك" : "Sign up"
                                )}
                            </button>
                        </form>
                        <div className="flex items-center justify-center my-5 w-full">
                            <div className="w-1/2 border-t border-gray-300"></div>
                            <p className="mx-4 text-gray-500 font-semibold uppercase">
                                {i18n.language === "en" ? "OR" : "أو"}
                            </p>
                            <div className="w-1/2 border-t border-gray-300"></div>
                        </div>
                        <GoogleSignInButton role={"user"} />

                        <p className="mt-4 text-lg">
                            {i18n.language === "ar" ? "هل لديك حساب بالفعل؟" : "Already have an account?"}{" "}
                            <Link to="/customer-login" className="text-secondColor font-bold">
                                {i18n.language === "ar" ? "تسجيل الدخول" : "Login"}
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupCustomer;
