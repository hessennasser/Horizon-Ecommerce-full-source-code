import React, { useContext, useEffect, useState } from 'react';
import apiUrl from '../../apiUrl';
import { AppContext } from '../../AppContext';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';
import { useTranslation } from 'react-i18next';
import Breadcrumbs from '../../components/Breadcrumbs';

const Payments = () => {
    const { mainRequest } = useContext(AppContext);
    const { i18n } = useTranslation();

    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(false);

    const userLogged = localStorage.getItem('userLogged');
    const userToken = JSON.parse(localStorage.getItem('userToken'));
    const navigate = useNavigate();

    if (!userLogged) {
        navigate('/customer-login');
        return null;
    }
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

        return <span style={{ backgroundColor: statusColor }} className='text-white text-sm px-2 shadow-lg'>{statusText}</span>;
    };

    const getAllPayments = async () => {
        setLoading(true);
        try {
            const res = await mainRequest.post(`${apiUrl}/userOrder`, {
                token: userToken
            });
            setPayments(res.data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllPayments();
    }, [userToken, userLogged]);

    if (loading) {
        return <Loading />;
    }

    console.log(payments);

    return (
        <div className="container py-10 min-h-[40dvh]">
            <div className="mb-10">
                <Breadcrumbs />
            </div>
            {payments?.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                    {payments.map(payment => (
                        <div key={payment.id} className="border rounded-lg p-4 bg-white shadow-md flex flex-col gap-2">
                            <h2 className="text-lg font-semibold">{i18n.language === 'en' ? 'Order' : 'طلب'} #{payment.id}</h2>
                            <p className='flex items-center gap-5'><span className='font-bold w-24'>{i18n.language === 'en' ? 'Total Price:' : 'السعر الكلي:'}</span> ${payment.total_price}</p>
                            <p className='flex items-center gap-5'><span className='font-bold w-24'>{i18n.language === 'en' ? 'Date:' : 'التاريخ:'}</span> {payment.date}</p>
                            <p className='flex items-center gap-5'><span className='font-bold w-24'>{i18n.language === 'en' ? 'Status:' : 'الحالة:'}</span> {getStatusDescription(payment.status)}</p>
                            {/* Order Data */}
                            <div className="mt-4">
                                <h3 className="text-md font-semibold text-center">{i18n.language === 'en' ? 'Order Content' : 'محتوى الطلب'}</h3>
                                <div className="overflow-x-auto mt-2">
                                    <table className="table-auto border w-full">
                                        <thead>
                                            <tr className="bg-gray-200">
                                                <th className="p-2 border border-gray-600 text-start">{i18n.language === 'en' ? 'Product' : 'المنتج'}</th>
                                                <th className="p-2 border border-gray-600 text-start">{i18n.language === 'en' ? 'Price' : 'السعر'}</th>
                                                <th className="p-2 border border-gray-600 text-start">{i18n.language === 'en' ? 'Quantity' : 'الكمية'}</th>
                                                <th className="p-2 border border-gray-600 text-start">{i18n.language === 'en' ? 'Total Price' : 'السعر الكلي'}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {payment.order_items.map(orderItem => (
                                                <tr key={orderItem.id} className="odd:bg-gray-100">
                                                    <td className="p-2 border border-gray-600">{orderItem.product.title[i18n.language]}</td>
                                                    <td className="p-2 border border-gray-600">{orderItem.product.total_price || orderItem.product.price}</td>
                                                    <td className="p-2 border border-gray-600">{orderItem.quantity}</td>
                                                    <td className="p-2 border border-gray-600">${orderItem.total_price}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-2xl font-bold text-red-600">
                        {i18n.language === 'en' ? "You Don't Have Any Orders Yet!" : 'ليس لديك اي طلبات بعد'}
                    </h1>
                </div>
            )}
        </div>
    );
};

export default Payments;
