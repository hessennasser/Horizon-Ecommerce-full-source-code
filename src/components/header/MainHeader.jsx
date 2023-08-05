import { TextInput } from "flowbite-react";
import { AiOutlineMessage, AiOutlineSearch } from "react-icons/ai";
import horizonLogo from "../../assets/images/horizon-logo.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useContext, useEffect, useState, useRef } from "react";
import { AppContext } from "../../AppContext";
import { BsCart3 } from "react-icons/bs";
import { IoIosArrowDown, IoMdNotificationsOutline } from "react-icons/io";
import SubMenu from "./SubMenu";
import userImagePlaceholder from '../../assets/images/user-image-placeholder.png';
import NotificationMenuComponent from "./notificationMenuComponent";
import apiUrl from "../../apiUrl";
import MessagesMenuComponent from "./MessagesMenuComponent";

const MainHeader = () => {
    const { t, i18n } = useTranslation();
    const [cartItems, setCartItems] = useState([]);
    const userToken = JSON.parse(localStorage.getItem("userToken"));
    const userLogged = localStorage.getItem("userLogged");
    const sellerToken = JSON.parse(localStorage.getItem("sellerToken"));
    const sellerLogged = localStorage.getItem("sellerLogged");
    const { products, getCartItems, getTotalPriceInCart, total, mainRequest } = useContext(AppContext);
    const { showSubMenu, setShowSubMenu, notificationMenu, setNotificationMenu, messagesMenu, setMessagesMenu } = useContext(AppContext);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const searchResultsRef = useRef(null);

    const handleSubMenuClick = (e) => {
        e.stopPropagation();
        setShowSubMenu(!showSubMenu);
        setNotificationMenu(false);
    };
    const handelNotificationClick = (e) => {
        e.stopPropagation();
        setNotificationMenu(!notificationMenu);
        setShowSubMenu(false);
        setMessagesMenu(false);
    };
    const handelMessagesClick = (e) => {
        e.stopPropagation();
        setMessagesMenu(!messagesMenu);
        setNotificationMenu(false);
        setShowSubMenu(false);
    };

    // Handle Notification Menu 
    const [notificationsNumber, setNotificationsNumber] = useState(0);
    const [notifications, setNotifications] = useState([]);
    const [notificationLoading, setNotificationLoading] = useState(false);
    const [notificationError, setNotificationError] = useState(false);
    const getNotifications = async () => {
        setNotificationLoading(true);
        try {
            const response = await mainRequest.post(`${apiUrl}/vendorNotifications`, {
                token: sellerToken
            });
            const { data } = response;
            setNotifications(data.data);
            console.log(data.data.length);
            setNotificationsNumber(data.data.length);
        } catch (error) {
            console.log(error);
            setNotificationError(true);
        }
        finally {
            setNotificationLoading(false);
        }
    };
    useEffect(() => {
        if (sellerLogged) getNotifications()
    }, [sellerToken, notificationMenu === true]);

    // Handle Messages Menu
    const [messagesNumber, setMessagesNumber] = useState(0);
    const [messages, setMessages] = useState([]);
    const [messagesLoading, setMessagesLoading] = useState(false);
    const [messagesError, setMessagesError] = useState(false);
    const getMessages = async () => {
        setMessagesLoading(true);
        try {
            const response = await mainRequest.post(`${apiUrl}/vendorMessages`, {
                token: sellerToken
            });
            const { data } = response;
            setMessages(data.data);
            console.log(data.data.length);
            setMessagesNumber(data.data.length);
        } catch (error) {
            console.log(error);
            setMessagesError(true);
        }
        finally {
            setMessagesLoading(false);
        }
    };
    useEffect(() => {
        if (sellerLogged) getMessages()
    }, [sellerToken, messagesMenu]);



    useEffect(() => {
        if (userLogged && userToken) {
            getTotalPriceInCart();
            getCartItems(userToken, setCartItems, );
        }
    }, [userLogged, userToken, sellerLogged, sellerToken, total]);

    useEffect(() => {
        if (searchQuery.trim() !== "" && products) {
            const results = products.filter((product) =>
                product.title.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.title.ar.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setSearchResults(results);
        } else {
            setSearchResults([]);
        }
    }, [searchQuery, products]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showSubMenu && !event.target.closest(".sub-menu")) {
                setShowSubMenu(false);
            }

            if (searchResultsRef.current && !event.target.closest(".search-results")) {
                setSearchResults([]);
            }
        };

        window.addEventListener("click", handleClickOutside);

        return () => {
            window.removeEventListener("click", handleClickOutside);
        };
    }, [showSubMenu]);

    const [userInfoState, SetUserInfo] = useState({})
    const [sellerInfoState, setSellerInfo] = useState({})
    const { getUserInfo, getSellerInfo } = useContext(AppContext);

    useEffect(() => {
        if (userLogged) getUserInfo(userToken, SetUserInfo);
    }, [sellerLogged, sellerToken, userLogged, userToken, total])

    useEffect(() => {
        if (sellerLogged) getSellerInfo(sellerToken, setSellerInfo);
    }, [sellerLogged, sellerToken, userLogged, userToken, total])


    return (
        <div className="main-header flex items-center justify-between gap-5 flex-col md:flex-row">
            <div className="flex items-center gap-3 w-full flex-1">
                <Link to={"/home"} className="flex items-center">
                    <img className="w-16 md:w-24" src={horizonLogo} alt="horizon" />
                </Link>
                <div className="flex-1 w-full text-xs search-holder relative">
                    <TextInput
                        id="search"
                        type="text"
                        rightIcon={AiOutlineSearch}
                        placeholder={t("mainHeader.placeholder")}
                        required={false}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        autoComplete="off"
                    />
                    {searchResults.length > 0 && (
                        <div
                            ref={searchResultsRef}
                            className="search-results px-4 absolute top-12 left-0 w-full max-h-[300px] overflow-y-auto bg-white z-[10000] rounded-lg shadow-md text-secondColor"
                        >
                            {
                                searchResults.length > 0 ? (
                                    searchResults.map((result) => (
                                        <Link key={result.id} to={`/product/${result.id}`}>
                                            <div className="search-result-item flex items-center justify-between gap-5 border-b py-1">
                                                <img
                                                    src={`https://admin.horriizon.com/public/assets/${result.images[0].path}`}
                                                    alt={i18n.language === "en" ? result.title.en : result.title.ar}
                                                    className="w-20"
                                                />
                                                <h4>{i18n.language === "en" ? result.title.en : result.title.ar}</h4>
                                            </div>
                                        </Link>
                                    )))
                                    :
                                    (
                                        <div className="py-5">
                                            <h4 className="no-search-result text-lg text-center text-red-800 capitalize">{i18n.language === "en" ? "there is no search result to your search words" : "لا توجد نتيجه مطابقه لكلمات البحث"}</h4>
                                        </div>
                                    )
                            }
                        </div>
                    )}
                </div>
            </div>
            <div className="buttons-holder md:w-fit flex justify-evenly gap-3">
                {userLogged || sellerLogged ? (
                    <div className="flex items-center justify-center gap-4 relative w-full">
                        {
                            userLogged && (
                                <Link to="/cart">
                                    <div className="relative p-2">
                                        <BsCart3 className="text-xl" />
                                        <span className="text-lg absolute -top-4 -right-2 grid place-content-center w-7 h-7 rounded-full bg-white text-secondColor">
                                            {userLogged ? cartItems?.length || 0 : null}
                                        </span>
                                    </div>
                                </Link>
                            )
                        }
                        {
                            sellerLogged && (
                                <>
                                    <button button
                                        className="relative p-2"
                                        onClick={handelMessagesClick}
                                    >
                                        <AiOutlineMessage className="text-2xl" />
                                        {
                                            messagesNumber > 0 && (
                                                <span className="text-lg absolute -top-4 -right-2 grid place-content-center w-7 h-7 rounded-full bg-white text-secondColor">
                                                    {messagesNumber || 0}
                                                </span>
                                            )
                                        }
                                    </button>

                                    <button
                                        className="relative p-2"
                                        onClick={handelNotificationClick}
                                    >
                                        <IoMdNotificationsOutline className="text-2xl" />
                                        {
                                            notificationsNumber > 0 && (
                                                <span className="text-lg absolute -top-4 -right-2 grid place-content-center w-7 h-7 rounded-full bg-white text-secondColor">
                                                    {notificationsNumber || 0}
                                                </span>
                                            )
                                        }
                                    </button>
                                </>
                            )
                        }
                        {/* Messages Button And Menu */}
                        {messagesMenu && <MessagesMenuComponent messages={messages} messageLoading={messagesLoading} messageError={messagesError} />}
                        {/* Notification Button And Menu */}
                        {notificationMenu && <NotificationMenuComponent notifications={notifications} notificationLoading={notificationLoading} notificationError={notificationError} />}
                        {/* User info & menu */}
                        <button
                            className="flex items-center gap-2"
                            onClick={handleSubMenuClick}
                        >
                            <div className="flex gap-2">
                                <img
                                    src={
                                        userLogged ? userInfoState.image ? `https://admin.horriizon.com/public/assets/${userInfoState.image}` : userImagePlaceholder : sellerInfoState.image ? `https://admin.horriizon.com/public/assets/${sellerInfoState.image}` : userImagePlaceholder
                                    }
                                    className="w-12 h-12 bg-secondColor rounded-full"
                                    alt={userLogged ? userInfoState.name : sellerInfoState.name}
                                />
                                <div className="flex flex-col items-center justify-center">
                                    <p>{userLogged ? userInfoState.name : sellerInfoState.name}</p>
                                    {sellerLogged && <p>{"total"} EGY</p>}
                                </div>
                            </div>
                            <IoIosArrowDown className="text-xl" />
                        </button>
                        {showSubMenu && <SubMenu name={userLogged ? userInfoState.name : sellerInfoState.name} image={
                            userLogged ? userInfoState.image ? `https://admin.horriizon.com/public/assets/${userInfoState.image}` : userImagePlaceholder : sellerInfoState.image ? `https://admin.horriizon.com/public/assets/${sellerInfoState.image}` : userImagePlaceholder} />}

                    </div>
                ) : (
                    <>
                        <Link to="seller-signup">
                            <button
                                type="button"
                                className="bg-secondColor p-2 rounded-lg hover:brightness-110 text-xs md:text-sm"
                            >
                                {t("mainHeader.signUpSallerBtn")}
                            </button>
                        </Link>
                        <Link to="customer-signup">
                            <button
                                type="button"
                                className="border p-2 rounded-lg hover:brightness-110 text-xs md:text-sm"
                            >
                                {t("mainHeader.signUpCustomerBtn")}
                            </button>
                        </Link>
                    </>
                )}
            </div>
        </div >
    );
};

export default MainHeader;
