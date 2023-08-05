/* eslint-disable react/prop-types */
import { createContext, useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import apiUrl from './apiUrl';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import FormData from 'form-data';
import { get, set } from 'react-hook-form';

export const AppContext = createContext();
export const AppProvider = ({ children }) => {
    const navigate = useNavigate();
    const savedLanguage = localStorage.getItem('language');
    const userToken = JSON.parse(localStorage.getItem('userToken'));
    const sellerToken = JSON.parse(localStorage.getItem('sellerToken'));
    const userLogged = localStorage.getItem("userLogged");
    const [showSubMenu, setShowSubMenu] = useState(false);
    const [notificationMenu, setNotificationMenu] = useState(false);
    const [messagesMenu, setMessagesMenu] = useState(false);
    const [total, setTotal] = useState(0);
    const [governorates, setGovernorates] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    // Sidebar
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

    // Setup react-i18next --------------------------------------------------------------
    i18n
        .use(initReactI18next)
        .init({
            resources: {
                en: {
                    translation: {
                        mainHeader: {
                            placeholder: "Search by product name",
                            signUpSallerBtn: "Sign up as a seller",
                            signUpCustomerBtn: "Sign up as a Customer",
                            pages: [
                                { id: 1, name: "Home", link: "home" },
                                { id: 2, name: "All Products", link: "all-products" },
                                { id: 3, name: "contact us", link: "contact-us" },
                                { id: 4, name: "about us", link: "about-us" },
                                { id: 5, name: "Dashboard", link: "dashboard" }
                            ]
                        },
                        weeklyOffers: {
                            headering: "Weekly Offers",
                            descraption: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sintVelit officia",
                            allButton: "View All",
                            registerCard: {
                                sugnInButtons: {
                                    seller: "Sign In as seller",
                                    customer: "Sign In as Customer"
                                },
                                header: ["Sign up for your best ", "experience"],
                                footer: ["Don't have an account? ", "Sign Up"]
                            }
                        }
                    },
                },
                ar: {
                    translation: {
                        mainHeader: {
                            placeholder: "اخل اسم المنتج للبحث",
                            signUpSallerBtn: "سجل معنا كبائع",
                            signUpCustomerBtn: "سجل معنا كمستخدم",
                            pages: [
                                { id: 1, name: "الصفحه الرئيسية", link: "home" },
                                { id: 2, name: "جميع المنتجات", link: "all-products" },
                                { id: 3, name: "تواصل معنا", link: "contact-us" },
                                { id: 4, name: "من نحن", link: "about-us" },
                                { id: 5, name: "لوحة التحكم", link: "dashboard" }
                            ]
                        },
                        weeklyOffers: {
                            headering: "العروض الأسبوعية",
                            descraption: "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى",
                            allButton: "مشاهدة الكل",
                            registerCard: {
                                sugnInButtons: {
                                    seller: "سجل دخول كبائع",
                                    customer: "سجل دخول كمستخدم"
                                },
                                header: ["سجل للحصول على ", "أفضل تجربة لك"],
                                footer: ["ليس لديك حساب؟  ", "اشتراك"]
                            }
                        }
                    },
                },
            },
            lng: savedLanguage || 'en', // Default language
            fallbackLng: 'en', // Fallback language
            interpolation: {
                escapeValue: false, // React already escapes variables
            },
            returnObjects: true,
        });
    // End react-i18next ---------------------------------------------------------------

    // Create an instance of Axios
    const mainRequest = axios.create({
        baseURL: apiUrl,
    });
    // Add a request interceptor
    mainRequest.interceptors.request.use(
        (config) => {
            // Modify the request config if needed (e.g., add headers, authentication tokens, etc.)
            return config;
        },
        (error) => {
            // Handle request error
            return Promise.reject(error);
        }
    );
    // Add a response interceptor
    mainRequest.interceptors.response.use(
        (response) => {
            // Handle successful responses
            return response;
        },
        (error) => {
            // Handle error responses
            if (error.response && error.response.status === 401) {
                localStorage.clear()
                console.log('Unauthorized request');
            }
            return Promise.reject(error);
        }
    );
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // refresh token
    const refreshToken = async () => {
        const userToken = JSON.parse(localStorage.getItem('userToken'));
        const refreshData = {
            token: userToken.token
        };

        try {
            // Request a new token using the refresh token
            const refreshResponse = await mainRequest.post(`${apiUrl}/auth/refresh`, refreshData);
            localStorage.setItem('userToken', JSON.stringify(refreshResponse.data.access_token));
        } catch (error) {
            throw new Error("Failed to refresh token");
        }
    };
    // logout
    const logout = async () => {
        const data = {
            token: userToken
        };

        try {
            const response = await mainRequest.post(`${apiUrl}/auth/logout`, data);
            console.log(response);
            toast.success(
                i18n.language === "en" ? "Logged Out" : "تم تسجيل الخروج"
            );
            localStorage.clear();
            navigate("/home");

        } catch (error) {
            toast.success(
                i18n.language === "en" ? "Logged Out" : "تم تسجيل الخروج"
            );
            localStorage.clear();
            navigate("/home");
        }
    };
    // get governorates
    const getGovernorates = async () => {
        try {
            const response = await mainRequest(`${apiUrl}/governorates`);
            const { data } = response;
            setGovernorates(data.data);
        } catch (error) {
            // 
        }
    }
    // get all products
    const getAllProducts = async () => {
        try {
            const response = await mainRequest.get(`${apiUrl}/productWithCategory`);
            const { data } = response;
            setProducts(data.data);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };
    // get all categories
    const getAllCategories = async () => {
        try {
            const response = await mainRequest(`${apiUrl}/categories`);
            const { data } = response;
            setCategories(data.data);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };
    // add product to cart
    const addToCart = async (id) => {
        if (!userLogged && !userToken) {
            toast.info("Please Sign In");
            navigate("/customer-login");
            return;
        }

        const payload = {
            product_id: id,
            token: userToken,
        };

        try {
            const response = await mainRequest.post(`${apiUrl}/cart/add`, payload);
            toast.success(i18n.language === "en" ? "The product has been added to the cart" : "تم اضافة المنتج لعربة التسوق");
            getTotalPriceInCart()
        } catch (error) {
            console.log(error);
            toast.error(error.response.data?.product_id[0] || "There is an error");
        }
    };
    // get products in single category
    const getProductsForCategory = async (categoryId, setProducts) => {
        try {
            const response = await mainRequest(`${apiUrl}/productWithCategory/${categoryId}`);
            const { data } = response;
            setProducts(data.data)
        } catch (error) {
            console.log(error);
        }
    };
    // get items in cart
    const getCartItems = async (userToken, setCartItems, setLoading) => {
        if (setLoading) setLoading(true);
        try {
            const response = await mainRequest.post(`${apiUrl}/cart`, {
                token: userToken
            });
            const { data } = response;
            setCartItems(data.data);
        } catch (error) {
            console.log(error);
        }
        finally {
            if (setLoading) setLoading(false);
        }
    };
    // get Total Price In Cart
    const getTotalPriceInCart = async () => {
        try {
            const response = await mainRequest.post(`${apiUrl}/cart/total`, {
                token: userToken
            })
            setTotal(response.data.data?.total);
        } catch (error) {
            console.log(error);
        }
    }
    // update product quantity in cart
    const handelUpdateQuantity = async (id, quantity, setCartItems) => {
        try {
            const response = await mainRequest.post(`${apiUrl}/cart/update`, {
                token: userToken,
                product_id: id,
                quantity: quantity + 1
            })
            // toast.success(i18n.language === "en" ? "Update Successfully" : "تم تعديل الكمية");
            getTotalPriceInCart();
            getCartItems(userToken, setCartItems);

        } catch (error) {
            console.log(error);
        }
    }
    // get user profile info
    const getUserInfo = async (userToken, setUserInfo) => {
        try {
            const response = await mainRequest(`${apiUrl}/auth/user-profile?token=${userToken}`);
            const { data } = response;
            setUserInfo(data);
        } catch (error) {
            console.log(error);
        }
    };
    // get seller profile info
    const getSellerInfo = async (SallerToken, setSallerInfo, setName, setEmail, setPhone) => {
        try {
            const response = await mainRequest(`${apiUrl}/vendor/auth/user-profile?token=${SallerToken}`);
            const { data } = response;
            setSallerInfo(data);
        } catch (error) {
            console.log(error);
        }
    };
    // get seller products
    const getSellerProducts = async (setAllProducts, setIsLoading) => {
        setIsLoading(true);
        try {
            const response = await mainRequest.post(`${apiUrl}/vendor/products`, {
                token: sellerToken
            });
            const { data } = response;
            setAllProducts(data.data);
        } catch (error) {
            console.log(error);
        }
        finally {
            setIsLoading(false);
        }
    };
    // Remove background from image
    const removeBackground = async (image) => {
        const imageData = new FormData();
        imageData.append('image_file', image);

        try {
            const response = await axios.post('https://api.remove.bg/v1.0/removebg', imageData, {
                headers: {
                    'X-Api-Key': '5AiCw7sa75Gm6gS3z85NhJt1',
                },
                responseType: 'blob'
            });

            // Assuming the API response is successful, the response.data will contain the modified image data.
            return response.data;
        } catch (error) {
            console.log(error);
            throw new Error('Failed to remove background from image');
        }
    };
    useEffect(() => {
        getAllProducts();
        getAllCategories();
        setNotificationMenu(false)
    }, [userToken, userLogged]);

    return (
        <AppContext.Provider value={{ isSidebarOpen, setIsSidebarOpen, toggleSidebar, showSubMenu, setShowSubMenu, notificationMenu, setNotificationMenu, messagesMenu, setMessagesMenu, products, getAllCategories, categories, getAllProducts, getProductsForCategory, logout, getUserInfo, getSellerInfo, refreshToken, addToCart, handelUpdateQuantity, getCartItems, getTotalPriceInCart, total, governorates, getGovernorates, getSellerProducts, removeBackground, mainRequest, cartItems, setCartItems }}>
            {children}
        </AppContext.Provider>
    );
};

AppProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
