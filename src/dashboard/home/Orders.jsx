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
    const [isLoading, setIsLoading] = useState(false);
    const [filteredData, setFilteredData] = useState([]);

    const getAllOrders = async () => {
        setIsLoading(true);
        try {
            const res = await mainRequest.post(`${apiUrl}/vendor/order`, { token: sellerToken });
            setAllOrders(res.data);
            setFilteredData(res.data); // Initially, set filtered data to all orders
            console.log(res.data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getAllOrders();
    }, [sellerToken, sellerLogged]);

    // Function to get the status description based on status value
    const getStatusDescription = (status) => {
        const statusValue = parseInt(status);

        const getStatusText = (statusValue) => {
            switch (statusValue) {
                case 0:
                    return i18n.language === 'en' ? 'Under Revision' : 'قيد المراجعة';
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
                ? 'orange' // Under Revision - Orange color
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
            name: 'User ID',
            selector: 'user_id',
            sortable: true,
        },
        {
            name: 'Date',
            selector: 'date',
            sortable: true,
        },
        {
            name: i18n.language === 'en' ? 'Status' : 'الحالة', // Conditionally select column name based on language
            selector: 'status',
            sortable: true,
            cell: (row) => getStatusDescription(row.status)
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
            name: 'رقم المستخدم',
            selector: 'user_id',
            sortable: true,
        },
        {
            name: 'التاريخ',
            selector: 'date',
            sortable: true,
        },
        {
            name: i18n.language === 'en' ? 'Status' : 'الحالة', // Conditionally select column name based on language
            selector: 'status',
            sortable: true,
            cell: (row) => getStatusDescription(row.status),
        },
    ];
    // Use the appropriate set of columns based on the current language
    const columns = i18n.language === 'en' ? tableColumnsEN : tableColumnsAR;


    // Function to handle the search filter
    const handleFilter = (e) => {
        const keyword = e.target.value;
        if (keyword.trim() === '') {
            setFilteredData(allOrders);
        } else {
            const filteredResults = allOrders.filter((order) => {
                // Here, it will search in the 'id', 'product_id', and 'user_id' fields
                return (
                    order.id.toString().includes(keyword) ||
                    order.product_id.toString().includes(keyword) ||
                    order.product.title.en.toString().includes(keyword) ||
                    order.product.title.ar.toString().includes(keyword) ||
                    order.user_id.toString().includes(keyword)
                );
            });
            setFilteredData(filteredResults);
        }
    };
    if (isLoading) {
        return (
            <Loading />
        )
    }
    return (
        <div className="container py-10 min-h-[40dvh]">
            {allOrders?.length > 0 ? (
                <div>
                    <div className="mb-10 flex flex-col items-start gap-2 sm:flex-row sm:items-center justify-between">
                        <Breadcrumbs />
                    </div>
                    {/* Add the search bar */}
                    <input
                        type="text"
                        placeholder="Search by Order ID, Product ID, Product Title or User ID..."
                        onChange={handleFilter}
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
