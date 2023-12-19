import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SiGooglemessages } from 'react-icons/si';
import { Oval } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { AppContext } from '../../AppContext';

const MessagesMenuComponent = () => {
    const { messages, messageLoading, messageError, readAllMessages } = useContext(
        AppContext
    );
    const { i18n } = useTranslation();

    return (
        <div
            className={`messages submenu z-[10000] absolute rounded-lg overflow-hidden shadow-lg bg-white w-[340px] max-w-[90%] sm:max-w-[340px] ${i18n.language === 'en' ? 'right-2' : 'left-2'
                } top-12 text-black`}
        >
            <div className="px-8 py-2 border-b">
                <div className="flex items-center">
                    <h6 className="font-semibold">messages</h6>
                    <div className="ms-auto">
                        <button
                            type="button"
                            onClick={readAllMessages}
                            className="text-sm text-gray-600"
                        >
                            Mark all as read
                        </button>
                    </div>
                </div>
            </div>
            <div className="messages-body overflow-y-auto max-h-[50dvh]">
                {/* Your messages content goes here */}
                {messageLoading && (
                    <div className="flex justify-center items-center h-32">
                        <Oval height={50} width={50} color="#125ed4" secondaryColor="#060047" />
                    </div>
                )}
                {!messageLoading && messageError && (
                    <div className="flex justify-center items-center h-32">
                        <p className="text-red-500">
                            {i18n.language === 'en'
                                ? 'Error loading messages'
                                : 'يوجد خطأ، حاول مره اخري'}
                        </p>
                    </div>
                )}
                {!messageError && !messageLoading && messages.length > 0 ? (
                    messages.slice().reverse().slice(0, 3).map((item, index) => {
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
                    })
                ) : (
                    <div className="flex justify-center items-center h-32">
                        <p className="text-red-500">
                            {i18n.language === 'en' ? 'No messages yet' : 'لا يوجد رسائل بعد'}
                        </p>
                    </div>
                )}
            </div>
            <Link
                to="/all-messages"
                className="block w-full py-2 border-t dropdown-item text-center text-gray-600 bg-secondColor/20 hover:bg-secondColor/40 duration-150"
            >
                View all messages
            </Link>
        </div>
    );
};

export default MessagesMenuComponent;
