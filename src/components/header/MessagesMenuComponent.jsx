import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Oval } from 'react-loader-spinner';

const MessagesMenuComponent = ({ setMessagesNumber, messages, messageLoading, messageError }) => {
    const { i18n } = useTranslation();

    return (
        <div className={`submenu z-[10000] absolute rounded-lg shadow-lg bg-white w-[340px] max-w-[90%] sm:max-w-[340px] p-8 ${i18n.language === "en" ? "right-2" : "left-2"} top-12 text-black`}>
            <div className="mb-2 pb-2 border-b">
                <div className="flex items-center">
                    <h6 className="mt-1 mb-0 text-sm font-semibold">messages</h6>
                    <div className="ms-auto">
                        <button type='button' className="text-sm text-gray-600">Mark all as read</button>
                    </div>
                </div>
            </div>
            <div className="messages-body overflow-y-auto max-h-[50dvh]">
                {/* Your messages content goes here */}

                {
                    messageLoading && <div className="flex justify-center items-center h-32">
                        <Oval height={50} width={50} color='#125ed4'
                            secondaryColor='#060047' />
                    </div>
                }
                {
                    !messageLoading && messageError && <div className="flex justify-center items-center h-32">
                        <p className="text-red-500">{i18n.language === "en" ? "Error loading messages" : "يوجد خطأ، حاول مره اخري"}</p>
                    </div>
                }
                {
                    !messageError && !messageLoading && messages.length > 0 ?
                        messages?.map((item, index) => {
                            return (
                                <div key={item.id} className="mb-2 flex  justify-between border-b pb-2" dir='ltr'>
                                    <p className="text-sm font-medium text-gray-900 mx-2 w-fit">{item.title}</p>
                                </div>
                            )
                        })
                        :
                        <div className="flex justify-center items-center h-32">
                            <p className="text-red-500">{i18n.language === "en" ? "No messages yet" : "لا يوجد رسائل بعد"}</p>
                        </div>
                }
            </div>
            {/* <button type='button' className="mt-2 pt-2 border-t dropdown-item text-center text-gray-600">View all messages</button> */}
        </div>
    );
};

export default MessagesMenuComponent
