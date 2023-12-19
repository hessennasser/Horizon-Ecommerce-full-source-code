import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import apiUrl from '../../apiUrl';
import { AppContext } from '../../AppContext';
import Breadcrumbs from '../../components/Breadcrumbs';
import DataTable from 'react-data-table-component';
import Loading from '../../components/Loading';

const Order = () => {
    const { i18n } = useTranslation();
    const sellerLogged = localStorage.getItem('sellerLogged');
    const sellerToken = JSON.parse(localStorage.getItem('sellerToken'));
    const navigate = useNavigate();
    if (!sellerLogged) {
        navigate('/seller-login');
        return null;
    }

    const { mainRequest } = useContext(AppContext);

    const [allOrders, setAllOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filteredData, setFilteredData] = useState([]);
    const getAllOrders = async () => {
        setIsLoading(true);
        try {
            const res = await mainRequest.post(`${apiUrl}/vendor/order`, { token: sellerToken });
            setAllOrders(res.data.data);
            setFilteredData(res.data.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Function to get the status description based on status value
    const getStatusDescription = (status) => {
        const statusValue = parseInt(status);

        const getStatusText = (statusValue) => {
            switch (statusValue) {
                case 0:
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
            };
        }

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
    const calculateDueDate = (currentDate) => {
        const dueDate = new Date(currentDate);
        dueDate.setDate(dueDate.getDate() + 20); // Add 20 days
        return dueDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    };

    // Table columns for English and Arabic
    const tableColumnsEN = [
        {
            name: 'Order ID',
            selector: 'id',
            sortable: true,
        },
        {
            name: 'Product ID',
            selector: 'product_id',
            sortable: true,
        },
        {
            name: 'Product Name',
            selector: 'product.title.en',
            sortable: true,
        },
        {
            name: 'Product Price',
            selector: 'product.price',
            sortable: true,
        },
        {
            name: 'Quantity',
            selector: 'quantity',
            sortable: true,
        },
        {
            name: 'Total Price',
            selector: 'total_price',
            sortable: true,
        },
        {
            name: 'Date',
            selector: 'order.date',
            sortable: true,
        },
        {
            name: 'Due Date',
            selector: 'order.date',
            sortable: true,
            cell: (row) => calculateDueDate(row?.order?.date),
        },
        {
            name: 'Status',
            selector: 'order?.status',
            sortable: true,
            cell: (row) => getStatusDescription(row?.order?.status)
        },
    ];
    const tableColumnsAR = [
        {
            name: 'رقم الطلب',
            selector: 'id',
            sortable: true,
        },
        {
            name: 'رقم المنتج',
            selector: 'product_id',
            sortable: true,
        },
        {
            name: 'اسم المنتج',
            selector: 'product.title.ar', // Use appropriate selector for Arabic
            sortable: true,
        },
        {
            name: 'سعر المنتج',
            selector: 'product.price',
            sortable: true,
        },
        {
            name: 'الكمية',
            selector: 'quantity',
            sortable: true,
        },
        {
            name: 'السعر الكلي',
            selector: 'total_price',
            sortable: true,
        },
        {
            name: 'التاريخ',
            selector: 'order.date',
            sortable: true,
        },
        {
            name: 'تاريخ الأستحقاق',
            selector: 'order.date',
            sortable: true,
            cell: (row) => calculateDueDate(row?.order?.date),
        },
        {
            name: 'الحالة',
            selector: 'order?.status',
            sortable: true,
            cell: (row) => getStatusDescription(row?.order?.status),
        },
    ];
    // Use the appropriate set of columns based on the current language
    const columns = i18n.language === 'en' ? tableColumnsEN : tableColumnsAR;


    const [keyword, setKeyword] = useState("");

    useEffect(() => {
        getAllOrders();
    }, [sellerToken, sellerLogged]);

    useEffect(() => {
        setFilteredData(allOrders)
        if (keyword.length == 0) {
            setFilteredData(allOrders);
        } else {
            const filteredResults = allOrders.filter((order) => {
                return (
                    order?.id?.toString().toLowerCase().includes(keyword) ||
                    order?.product_id?.toString().toLowerCase().includes(keyword) ||
                    order?.product.title.en?.toString().toLowerCase().includes(keyword) ||
                    order?.product.title.ar?.toString().toLowerCase().includes(keyword) ||
                    order?.user_id?.toString().toLowerCase().includes(keyword)
                );
            });
            setFilteredData(filteredResults);
        }
    }, [keyword, sellerLogged, sellerToken])

    if (isLoading) {
        return (
            <Loading />
        )
    }

    console.log(allOrders);

    return (
        <div className="container py-10 min-h-[40dvh]">
            {allOrders.length > 0 ? (
                <div>
                    <div className="mb-10 flex flex-col items-start gap-2 sm:flex-row sm:items-center justify-between">
                        <Breadcrumbs />
                    </div>
                    {/* Add the search bar */}
                    <input
                        type="text"
                        placeholder="Search by Order ID, Product ID or Product Title ..."
                        value={keyword}
                        onChange={(e) => { setKeyword(e.target.value) }}
                        className="px-4 py-2 w-full mb-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    />
                    <DataTable columns={columns} data={filteredData} className='order-table' />
                </div>
            ) : (
                <>
                    <Breadcrumbs />
                    <div className="flex flex-col items-center justify-center">
                        <h1 className="text-2xl font-bold text-red-600">
                            {i18n.language === 'en'
                                ? "You Don't Have Any Orders Yet!"
                                : 'ليس لديك اي طلبات بعد'}
                        </h1>
                    </div>
                </>
            )}
        </div>
    );
};

export default Order;
