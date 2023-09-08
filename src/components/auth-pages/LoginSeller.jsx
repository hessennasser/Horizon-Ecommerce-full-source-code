import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import BrandSide from "./BrandSide";
import "./styles.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import circle from "../../assets/images/circle-1.png";
import { useTranslation } from "react-i18next";
import axios from 'axios';
import apiUrl from "../../apiUrl";
import { Spinner } from 'flowbite-react';
import { toast } from "react-toastify";
import GoogleSignInButton from "./GoogleSignInButton";
import { AppContext } from "../../AppContext";

const LoginSeller = () => {
    const navigate = useNavigate();
    const { i18n } = useTranslation();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const sellerLogged = localStorage.getItem("sellerLogged");
    const {whatsApp} = useContext(AppContext)
    if (sellerLogged) {
        navigate("/dashboard");
        return;
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        const data = {
            email: email,
            password: password
        };

        setIsLoading(true);

        if (!password || !email) {
            toast.error(i18n.language === "en" ? "please fill all fields" : "برجاء ملئ جميع الحقول");
            setIsLoading(false);
            return;
        }
        if (password.length < 6) {
            toast.error(i18n.language === "en" ? "password must be at least 6 characters" : "كلمة المرور يجب ان تكون علي الاقل 6 احرف");
            setIsLoading(false);
            return;
        }

        axios.post(`${apiUrl}/vendor/auth/login`, data)
            .then((response) => {
                toast.success("Logged in");
                const user = response.data.user;
                user.token = response.data.access_token;
                localStorage.clear();
                localStorage.setItem("sellerToken", JSON.stringify(user.token)); // Save user information in local storage
                localStorage.setItem("sellerLogged", true)
                navigate("/dashboard");
                setIsLoading(false);
            })
            .catch((error) => {
                toast.error(i18n.language === "en" ? "the email or password is incorrect" : "البريد الالكتروني او كلمة المرور غير صحيحه");
                setIsLoading(false);
            });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="bg-mainColor">
            <div className="min-h-screen grid grid-cols-1 sm:grid-cols-2 gap-5">
                <BrandSide />
                <div className={`bg-white ${i18n.language === "en" ? "md:rounded-l-xl" : "md:rounded-r-xl"} flex flex-col items-center justify-center py-20`}>
                    <div className="flex flex-col items-center justify-center w-2/3">
                        <div className="relative mb-7">
                            <h2 className="font-bold text-2xl text-center sm:text-3xl">{i18n.language === "en" ? "Log in as a Seller" : "سجل دخولك كبائع"}</h2>
                            {/* <img className={`absolute w-2/3 hidden md:block ${i18n.language === "en" ? "-top-16 -right-11" : "-top-10 -left-9"}`} src={circle} alt="horizon" /> */}
                        </div>
                        <p className="mb-2 text-secondColor">{i18n.language === "en" ? "For a unique selling experience" : "لتجربة بيع مميزه"}</p>
                        <form
                            id="customer-login-form"
                            className="flex flex-col gap-4 w-full"
                            onSubmit={handleSubmit}
                        >
                            <input placeholder={i18n.language === "ar" ? "البريد الاللكتروني" : "Email"} type="email" name="email" id="email" />
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
                            <a href={`https://api.whatsapp.com/send?phone=20${whatsApp.number}`} target="_blank">
                                <span className="flex justify-end text-red-600">{i18n.language === "en" ? "Forget Password? contact with support" : "هل نسيت كلمة المرور؟ تواصل مع الدعم"}</span>
                            </a>
                            <button className="w-full" type="submit" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Spinner aria-label="loading..." color="purple" />
                                        <span className="pl-3">Loading...</span>
                                    </>
                                ) : (
                                    i18n.language === "ar" ? "تسجيل الدخول " : "Sign in"
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
                        <GoogleSignInButton role={"seller"} />
                        <p className="mt-4 text-lg">
                            {i18n.language === "ar" ? "ليس لديك حساب؟ " : "Don't have an account?"}
                            <Link to="/seller-signup" className="text-secondColor font-bold">{i18n.language === "ar" ? "اشترك معنا" : "Signup"}</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginSeller;
