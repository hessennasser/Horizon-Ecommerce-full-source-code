import React, { useContext } from 'react'
import Breadcrumbs from '../components/Breadcrumbs'
import { AppContext } from '../AppContext';
import { SiGooglemessages } from 'react-icons/si';
import { Oval } from 'react-loader-spinner';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const AllNotifications = () => {
    const { notifications, notificationLoading, notificationError, readAllNotifications } = useContext(AppContext)

    const navigate = useNavigate();
    const sellerLogged = localStorage.getItem("sellerLogged");
    const { i18n } = useTranslation();

    if (!sellerLogged) {
        navigate("/seller-login");
        return null;
    }

    return (
        <section className='py-10 min-h-[50dvh]'>
            <div className="container">
                <Breadcrumbs />
                <div className=" py-2 border-b">
                    <div className="flex items-center">
                        <h6 className="font-semibold">Notifications</h6>
                        <div className="ms-auto">
                            <button type='button' onClick={() => {
                                readAllNotifications()
                            }} className="text-sm text-gray-600">
                                Mark all as read
                            </button>
                        </div>
                    </div>
                </div>
                <div className="notifications-body">
                    {
                        notificationLoading && <div className="flex justify-center items-center h-32">
                            <Oval height={50} width={50} color='#125ed4'
                                secondaryColor='#060047' />
                        </div>
                    }
                    {
                        !notificationLoading && notificationError && <div className="flex justify-center items-center h-32">
                            <p className="text-red-500">{i18n.language === "en" ? "Error loading notifications" : "يوجد خطأ، حاول مره اخري"}</p>
                        </div>
                    }
                    {
                        (!notificationError && !notificationLoading) && notifications.length > 0 ?
                            notifications?.slice().reverse().map((item, index) => {
                                return (
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
                                )
                            })
                            :
                            <div className="flex justify-center items-center h-32">
                                <p className="text-red-500">{i18n.language === "en" ? "No notifications yet" : "لا يوجد اشعارات بعد"}</p>
                            </div>
                    }
                </div>

            </div>
        </section>
    )
}

export default AllNotifications
