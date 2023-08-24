import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaTimes } from 'react-icons/fa';
import { AppContext } from '../../../AppContext';

const OrderModal = ({ setOrderModal, productOrders, isLoading }) => {
    console.log(productOrders);
    const { i18n } = useTranslation();

    // Function to get the status description based on status value
    const getStatusDescription = (status) => {
        const statusValue = parseInt(status);

        const getStatusText = (statusValue) => {
            switch (statusValue) {
                case 0:
                    return i18n.language === 'en' ? 'Prepared' : 'قيد التحضير';
                case 1:
                    return i18n.language === 'en' ? 'Prepared' : 'قيد التحضير';
                case 2:
                    return i18n.language === 'en' ? 'At the Store' : 'قيد التخزين';
                case 3:
                    return i18n.language === 'en' ? 'At the Delivery Stage' : 'قيد مرحلة التوصيل';
                case 4:
                    return i18n.language === 'en' ? 'Delivered' : 'تم التوصيل';
                default:
                    return '';
            }
        };

        const statusText = getStatusText(statusValue);
        const statusColor =
            statusValue === 0
                ? 'blue' // Under Revision - Orange color
                : statusValue === 1
                    ? 'blue' // Prepared - Blue color
                    : statusValue === 2
                        ? 'green' // At the Store - Green color
                        : statusValue === 3
                            ? 'purple' // At the Delivery Stage - Purple color
                            : statusValue === 4
                                ? 'teal' // Delivered - Teal color
                                : 'black'; // Default - Black color

        return <span style={{ backgroundColor: statusColor }} className='text-white p-2 rounded-xl shadow-lg'>{statusText}</span>;
    };

    return (
        <div className="fixed z-[10000] inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 bg-opacity-90"></div>
                </div>
                <div className="modal-app relative bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full">
                    {/* Fixed Header */}
                    <div className="sticky z-10 top-0 left-0 right-0 bg-white px-4 py-2 shadow-md flex justify-between">
                        <h3 className="text-xl font-medium text-secondColor">
                            {i18n.language === 'en' ? 'Orders' : 'اوردر'}
                        </h3>
                        <button
                            className="border border-secondColor text-secondColor py-1 px-4 rounded-md hover:brightness-110"
                            onClick={() => {
                                setOrderModal(false);
                            }}
                        >
                            <FaTimes />
                        </button>
                    </div>
                    {/* Modal Body */}
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 flex items-center justify-center">
                        {isLoading ? (
                            <p className="text-center">Loading orders...</p>
                        ) : productOrders?.length > 0 ? (
                            <div className="overflow-x-auto w-full">
                                <table className="table-auto w-full">
                                    <thead>
                                        <tr>
                                            <th className="border min-w-[120px] px-4 py-3">{i18n.language === "en" ? "Number" : "ترتيب"}</th>
                                            <th className="border min-w-[120px] px-4 py-3">{i18n.language === "en" ? "user ID" : "معرف المستخدم"}</th>
                                            <th className="border min-w-[120px] px-4 py-3">{i18n.language === "en" ? "Order ID" : "رقم الطلب"}</th>
                                            <th className="border min-w-[120px] px-4 py-3">{i18n.language === "en" ? "Quantity" : "الكمية"}</th>
                                            <th className="border min-w-[120px] px-4 py-3">{i18n.language === "en" ? "Total Price" : "السعر الكلي"}</th>
                                            <th className="border min-w-[120px] px-4 py-3">{i18n.language === "en" ? "Status" : "الحالة"}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {productOrders?.map((order, index) => (
                                            <tr key={order.id}>
                                                <td className="border min-w-[120px] px-4 py-3">{index + 1}</td>
                                                <td className="border min-w-[120px] px-4 py-3">{order.user_id}</td>
                                                <td className="border min-w-[120px] px-4 py-3">{order.id}</td>
                                                <td className="border min-w-[120px] px-4 py-3">{order.quantity}</td>
                                                <td className="border min-w-[120px] px-4 py-3">{order.total_price}</td>
                                                <td className="border min-w-[220px] px-4 py-3 flex justify-center items-center">{ getStatusDescription(order.status) }</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-center">No orders found for this product.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderModal;
