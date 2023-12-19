import React, { lazy, useContext, useEffect, useState } from 'react'
import Breadcrumbs from '../../components/Breadcrumbs'
import SingleCard from './components/SingleCard'
import { Link, useNavigate } from 'react-router-dom';
import "../style.css"
import { AppContext } from '../../AppContext';
import { useTranslation } from 'react-i18next';
import { Oval } from 'react-loader-spinner';
import OrderModal from './components/OrderModal';
import apiUrl from '../../apiUrl';

const AddModal = lazy(() => import('./components/AddModal'));
const EditModal = lazy(() => import('./components/EditModal'));
const DeleteModal = lazy(() => import('./components/DeleteModal'));

const Dashboard = () => {
    const { i18n } = useTranslation();
    const { mainRequest } = useContext(AppContext);
    const sellerLogged = localStorage.getItem("sellerLogged");
    const sellerToken = JSON.parse(localStorage.getItem('sellerToken'));

    const navigate = useNavigate();
    if (!sellerLogged) {
        navigate("/seller-login");
        return;
    }

    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [orderModal, setOrderModal] = useState(false);
    const [allProducts, setAllProducts] = useState([]);

    const [deleteProductId, setDeleteProductId] = useState(null);
    const [editProductId, setEditProductId] = useState(null);
    const [productOrders, setProductOrders] = useState([]);
    const [orderId, setOrderId] = useState(null);

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false)

    const openAddModal = () => {
        setAddModal(true)
    }
    const openEditModal = () => {
        setEditModal(true)
    }
    const openDeleteModal = () => {
        setDeleteModal(true)
    }
    const openOrderModal = (orderId) => {
        setOrderId(orderId);
        setOrderModal(true);
    };


    const { getAllCategories, categories, getSellerProducts } = useContext(AppContext);
    const encategoriesOptions = categories
        .filter(item => !item.parent)
        .map(gov => ({
            value: gov.id,
            label: gov.title.en,
        }));

    const arcategoriesOptions = categories
        .filter(item => !item.parent)
        .map(gov => ({
            value: gov.id,
            label: gov.title.ar,
        }));

    const getProductOrders = async () => {
        setIsLoading(true);
        try {
            const res = await mainRequest.post(`${apiUrl}/vendor/order/orderByProductId/${orderId}`, { token: sellerToken });
            setProductOrders(res.data.data);
        } catch (error) {
            console.log(error);
            setIsError(error)
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getSellerProducts(setAllProducts, setIsLoading);
        getAllCategories();
    }, [sellerLogged])

    useEffect(() => {
        if (orderId) {
            getProductOrders();
        }
    }, [orderId])

    if (isLoading) {
        return (
            <div className="container py-10 flex flex-col gap-5 items-center justify-center">
                <h2 className="text-xl font-bold">{i18n.language === "en" ? "Loading..." : "جاري التحميل..."}</h2>
                <Oval
                    visible={true}
                    height="160"
                    width="160"
                    ariaLabel="Oval-loading"
                    wrapperStyle={{}}
                    wrapperClass="Oval-wrapper"
                    color='#125ed4'
                    secondaryColor='#060047'
                />
            </div>
        )
    }

    if (isError) {
        return (
            <div className="container py-10 flex flex-col gap-5 items-center justify-center">
                <div className="flex flex-col items-center justify-center min-h-[40dvh]">
                    <h1 className="text-2xl font-bold text-red-600">{i18n.language === "en" ? "There Is An Error While Loading ZYour Products!" : "يوجد خطأ ما اثناء تحميل منتجاتك، برجاء إعادة المحاوله مرة اخرى!!"}</h1>
                    <button type='button' onClick={openAddModal} className='bg-secondColor py-2 px-4 rounded-lg hover:brightness-110 text-white mt-5'>{i18n.language === "en" ? "Add Product" : "اضافة منتج جديد"}</button>
                </div>
            </div>
        )
    }



    return (
        <div className='container py-10'>
            <div className="mb-10 flex flex-col items-start gap-2 sm:flex-row sm:items-center justify-between">
                <Breadcrumbs />
                <div className="flex items-center gap-5">
                    <Link to="/orders" className='bg-secondColor hover:bg-mainColor duration-200 py-2 px-4 rounded-lg hover:brightness-110 text-white'>{i18n.language === "en" ? "Show Orders" : "الطلبات"}</Link>
                    <button type='button' onClick={openAddModal} className='bg-secondColor hover:bg-mainColor duration-200 py-2 px-4 rounded-lg hover:brightness-110 text-white'>{i18n.language === "en" ? "Add Product" : "اضافة منتج جديد"}</button>
                </div>
            </div>
            {
                allProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl::grid-cols-5 gap-5">
                        {
                            allProducts.map(item => {
                                const { id, category, title, images, price, quantity, start_date, fake_visitor, visitor } = item;
                                return (
                                    <SingleCard key={id} fake_visitor={fake_visitor} visitor={visitor} openEditModal={openEditModal} openDeleteModal={openDeleteModal} openOrderModal={openOrderModal} setOrderId={setOrderId} id={id} title={title} images={images} category={category} price={price} quantity={quantity} start_date={start_date} setDeleteProductId={setDeleteProductId} setEditProductId={setEditProductId} />
                                )
                            })
                        }
                    </div>
                )
                    :
                    (
                        <div className="flex flex-col items-center justify-center min-h-[40dvh]">
                            <h1 className="text-2xl font-bold text-red-600">{i18n.language === "en" ? "You have not added any products yet!" : "انت لم تقم باضافة اي منتجات بعد!"}</h1>
                            <button type='button' onClick={openAddModal} className='bg-secondColor py-2 px-4 rounded-lg hover:brightness-110 text-white mt-5'>{i18n.language === "en" ? "Add Product" : "اضافة منتج جديد"}</button>
                        </div>
                    )
            }
            {
                addModal && <AddModal getSellerProducts={getSellerProducts} setAllProducts={setAllProducts} setIsLoading={setIsLoading} addModal={addModal} setAddModal={setAddModal} encategoriesOptions={encategoriesOptions} arcategoriesOptions={arcategoriesOptions} />
            }
            {
                editModal && <EditModal getSellerProducts={getSellerProducts} setAllProducts={setAllProducts} setIsLoading={setIsLoading} editModal={editModal} setEditModal={setEditModal} encategoriesOptions={encategoriesOptions} arcategoriesOptions={arcategoriesOptions} productId={editProductId} />
            }
            {
                deleteModal && <DeleteModal getSellerProducts={getSellerProducts} setAllProducts={setAllProducts} setIsLoading={setIsLoading} deleteModal={deleteModal} setDeleteModal={setDeleteModal} productId={deleteProductId} />
            }
            {
                orderModal && <OrderModal setOrderModal={setOrderModal} productOrders={productOrders} isLoading={isLoading} />
            }
        </div>
    )
}

export default Dashboard
