import React, { useContext } from 'react'
import Breadcrumbs from '../components/Breadcrumbs'
import { AppContext } from '../AppContext';
import { SiGooglemessages } from 'react-icons/si';
import { Oval } from 'react-loader-spinner';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

const AllMessages = () => {
    const navigate = useNavigate();
    const sellerLogged = localStorage.getItem("sellerLogged");
    const userLogged = localStorage.getItem("userLogged");

    const { i18n } = useTranslation();
    const { messages, messageLoading, messageError, readAllMessages } = useContext(AppContext);

    if (!sellerLogged && !userLogged) {
        navigate("/customer-login");
        return null;
    }

    return (
        <section className='py-10 min-h-[50dvh]'>
            <div className="container">
                <Breadcrumbs />
                <div className="py-2 border-b">
                    <div className="flex items-center">
                        <h6 className="font-semibold">messages</h6>
                        <div className="ms-auto">
                            <button type='button' onClick={() => {
                                readAllMessages()
                            }} className="text-sm text-gray-600">
                                Mark all as read
                            </button>
                        </div>
                    </div>
                </div>
                <div className="messages-body">
                    {/* Your messages content goes here */}

                    {
                        messageLoading && <div className="flex justify-center items-center h-32">
                            <Oval height={50} width={50} color='#125ed4'
                                secondaryColor='#060047' />
                        </div>
                    }
                    {
                        messageError && <div className="flex justify-center items-center h-32">
                            <p className="text-red-500">{i18n.language === "en" ? "Error loading messages" : "يوجد خطأ، حاول مره اخري"}</p>
                        </div>
                    }
                    {
                        !messageError && !messageLoading && messages.length > 0 ?
                            messages?.slice().reverse().map((item, index) => {
                                return item?.title.includes('New Order') ? (
                                    <Link
                                        to="/orders"
                                        key={item.id}
                                        className="relative flex items-center text-green-500 bg-white hover:bg-blue-400/10 px-8 py-2"
                                    >
                                        <div className="me-3 h-10 w-10 grid items-center justify-center bg-primary brround box-shadow-primary">
                                            <SiGooglemessages className="text-2xl" />
                                        </div>
                                        <div className="w-full">
                                            <h5 className="notification-label mb-1">{item.title}</h5>
                                            <div className="flex items-center justify-end w-full">
                                                {item.read_at === null && (
                                                    <span className=" absolute bottom-2 end-2 bg-secondColor text-white text-xs p-1 rounded-lg">
                                                        New
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </Link>
                                ) : (
                                    <div
                                        key={item.id}
                                        className="relative flex items-center bg-white hover:bg-blue-400/10 px-8 py-2"
                                    >
                                        <div className="me-3 h-10 w-10 grid items-center justify-center bg-primary brround box-shadow-primary">
                                            <SiGooglemessages className="text-2xl" />
                                        </div>
                                        <div className="w-full">
                                            <h5 className="notification-label mb-1">{item.title}</h5>
                                            <div className="flex items-center justify-end w-full">
                                                {item.read_at === null && (
                                                    <span className=" absolute bottom-2 end-2 bg-secondColor text-white text-xs p-1 rounded-lg">
                                                        New
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            }) :
                            <div className="flex justify-center items-center h-32">
                                <p className="text-red-500">{i18n.language === "en" ? "No messages yet" : "لا يوجد رسائل بعد"}</p>
                            </div>
                    }
                </div>
            </div>
        </section>
    )
}

export default AllMessages
