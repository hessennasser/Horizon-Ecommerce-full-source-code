import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Oval } from 'react-loader-spinner';

const NotificationMenuComponent = ({ setNotificationsNumber, notifications, notificationLoading, notificationError }) => {
    const { i18n } = useTranslation();
    return (
        <div className={`submenu z-[10000] absolute rounded-lg shadow-lg bg-white w-[340px] max-w-[90%] sm:max-w-[340px] p-8 ${i18n.language === "en" ? "right-2" : "left-2"} top-12 text-black`}>
            <div className="mb-2 pb-2 border-b">
                <div className="flex items-center">
                    <h6 className="mt-1 mb-0 text-sm font-semibold">Notifications</h6>
                    <div className="ms-auto">
                        <button type='button' className="text-sm text-gray-600">Mark all as read</button>
                    </div>
                </div>
            </div>
            <div className="notifications-body overflow-y-auto max-h-[50dvh]">
                {/* Your notifications content goes here */}

                {
                    notificationLoading && <div className="flex justify-center items-center h-32">
                        <Oval color="#0d6efd" height={50} width={50} />
                    </div>
                }
                {
                    !notificationLoading && notificationError && <div className="flex justify-center items-center h-32">
                        <p className="text-red-500">{i18n.language === "en" ? "Error loading notifications" : "يوجد خطأ، حاول مره اخري"}</p>
                    </div>
                }
                {
                    (!notificationError && !notificationLoading) && notifications.length > 0 ?
                        notifications?.map((item, index) => {
                            return (
                                <div key={item.id} className="mb-2 flex  justify-between border-b pb-2" dir='ltr'>
                                    <p className="text-sm font-medium text-gray-900 mx-2 w-fit">{`${index + 1} - `}{item.title}</p>
                                </div>
                            )
                        })
                        :
                        <div className="flex justify-center items-center h-32">
                            <p className="text-red-500">{i18n.language === "en" ? "No notifications yet" : "لا يوجد اشعارات بعد"}</p>
                        </div>
                }
            </div>
            {/* <button type='button' className="mt-2 pt-2 border-t dropdown-item text-center text-gray-600">View all Notification</button> */}
        </div>
    );
};

export default NotificationMenuComponent
