import { FileInput, Label, Spinner, TextInput } from 'flowbite-react';
import Select from 'react-select';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { AppContext } from '../../../AppContext';
import apiUrl from '../../../apiUrl';
import { FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';

const EditModal = ({
    productId,
    editModal,
    setEditModal,
    setSelectedGovernorate,
    encategoriesOptions,
    arcategoriesOptions,
    getSellerProducts,
    setAllProducts,
    setIsLoading: setLoadingAllProducts
}) => {
    const { i18n } = useTranslation();
    const { mainRequest } = useContext(AppContext);
    const sellerToken = JSON.parse(localStorage.getItem('sellerToken'));

    const [productData, setProductData] = useState(null);
    const [oldImg, setOldImg] = useState(null);
    const getProductData = async () => {
        try {
            const response = await mainRequest.post(`${apiUrl}/vendor/products/get`, {
                token: sellerToken,
                id: productId
            });
            const { data } = response;
            setProductData(data.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getProductData();
    }, [productId]);

    const [formData, setFormData] = useState({
        image: null,
        title_en: '',
        title_ar: '',
        category: null,
        quantity: '',
        price: '',
        start_date: '',
    });

    useEffect(() => {
        if (productData) {
            setOldImg(productData.images[0].path);
            setFormData({
                image: null,
                title_en: productData.title.en,
                title_ar: productData.title.ar,
                category: productData.category,
                quantity: productData.quantity,
                price: productData.price,
                start_date: productData.start_date,
            });
        }
    }, [productData, productId]);

    const [selectedImage, setSelectedImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // edit product in dashboard
    const editProduct = async (formData, setEditModal, productId) => {
        setIsLoading(true);
        try {
            const response = await mainRequest.post(
                `${apiUrl}/vendor/products/${productId}/update`,
                formData,
                {
                    headers: {
                        accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${sellerToken}`,
                    },
                }
            );
            console.log(response.data);
            toast.success(i18n.language === "en" ? "The product has been updated" : "تم تعديل المنتج بنجاح")
        } catch (error) {
            console.log(error);
            toast.error(i18n.language === "en" ? "There is an error, please try again later" : "يوجد خطأ ما، الرجاء المحاولة مره اخري");
        } finally {
            setIsLoading(false);
            setEditModal(false);
            getSellerProducts(setAllProducts, setLoadingAllProducts);
        }
    };

    const handleEdit = () => {
        if (selectedImage) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const blob = new Blob([reader.result], { type: selectedImage.type });
                const updatedFormData = new FormData();
                updatedFormData.append('images', blob);
                updatedFormData.append('title_en', formData.title_en);
                updatedFormData.append('title_ar', formData.title_ar);
                updatedFormData.append('category_id', formData.category.value || productData.category.id);
                updatedFormData.append('quantity', formData.quantity);
                updatedFormData.append('price', formData.price);
                updatedFormData.append('start_date', formData.start_date);
                editProduct(updatedFormData, blob, setIsLoading, setEditModal, productId, getSellerProducts, setAllProducts);
            };
            reader.readAsArrayBuffer(selectedImage);
        } else {
            const updatedFormData = new FormData();
            updatedFormData.append('title_en', formData.title_en);
            updatedFormData.append('title_ar', formData.title_ar);
            updatedFormData.append('category_id', formData.category.value || productData.category.id);
            updatedFormData.append('quantity', formData.quantity);
            updatedFormData.append('price', formData.price);
            updatedFormData.append('start_date', formData.start_date);
            updatedFormData.append('images', formData.image);
            editProduct(updatedFormData, setIsLoading, setEditModal, productId, getSellerProducts, setAllProducts);
        }
    };


    return (
        <div className="fixed z-[10000] inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 bg-opacity-90"></div>
                </div>

                <div className="modal-app relative bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    {/* Fixed Header */}
                    <div className="sticky z-10 top-0 left-0 right-0 bg-white px-4 py-2 shadow-md flex justify-between">
                        <h3 className='text-xl font-medium text-secondColor'>
                            {i18n.language === 'en' ? 'Edit Product' : 'تعديل المنتج'}
                        </h3>
                        <button
                            className='border border-secondColor text-secondColor py-1 px-4 rounded-md hover:brightness-110'
                            onClick={() => {
                                setEditModal(false);
                                // document.body.style.overflow = 'auto';
                            }}
                        >
                            <FaTimes />
                        </button>
                    </div>

                    {/* Modal content goes here */}
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 flex items-center justify-center">

                        <div className='space-y-6 grid grid-cols-2 gap-3 w-full'>
                            <div className='col-span-2'>
                                {productData && (
                                    <div className='mb-2 flex items-center justify-center'>
                                        <img src={`https://admin.horriizon.com/public/assets/${oldImg}`} alt={i18n.language === "en" ? formData.title_en : formData.title_ar} className='w-32 h-32' />
                                    </div>
                                )}
                                <div className='mb-2 block'>
                                    <Label
                                        htmlFor='image'
                                        value={i18n.language === 'en' ? 'Image ' : 'الصوره '}
                                    />
                                </div>
                                <FileInput
                                    id='image'
                                    onChange={(e) => setSelectedImage(e.target.files[0])}
                                />
                            </div>
                            <div className='col-span-2'>
                                <div className='mb-2 block'>
                                    <Label
                                        htmlFor='title_en'
                                        value={
                                            i18n.language === 'en'
                                                ? 'Product Name English '
                                                : 'اسم المنتج بالانجليزية '
                                        }
                                    />
                                </div>
                                <TextInput
                                    id='title_en'
                                    type='text'
                                    value={formData.title_en}
                                    onChange={(e) =>
                                        setFormData({ ...formData, title_en: e.target.value })
                                    }
                                />
                            </div>
                            <div className='col-span-2'>
                                <div className='mb-2 block'>
                                    <Label
                                        htmlFor='title_ar'
                                        value={
                                            i18n.language === 'en'
                                                ? 'Product Name Arabic '
                                                : 'اسم المنتج بالعربية '
                                        }
                                    />
                                </div>
                                <TextInput
                                    id='title_ar'
                                    type='text'
                                    value={formData.title_ar}
                                    onChange={(e) =>
                                        setFormData({ ...formData, title_ar: e.target.value })
                                    }
                                />
                            </div>
                            <div className='col-span-2'>
                                <div className='mb-2 block'>
                                    <Label
                                        htmlFor='category'
                                        value={
                                            i18n.language === 'en'
                                                ? 'Product Category '
                                                : 'تصنيف المنتج '
                                        }
                                    />
                                </div>
                                <Select
                                    name='category'
                                    id='category'
                                    className='w-full'
                                    options={
                                        i18n.language === 'en'
                                            ? encategoriesOptions
                                            : arcategoriesOptions
                                    }
                                    placeholder={
                                        i18n.language === 'en'
                                            ? 'Product Category'
                                            : 'تصنيف المنتج'
                                    }
                                    isRtl={i18n.language === 'ar'}
                                    isSearchable
                                    value={formData.category}
                                    onChange={(selectedOption) =>
                                        setFormData({ ...formData, category: selectedOption })
                                    }
                                />
                            </div>
                            <div className='col-span-1'>
                                <div className='mb-2 block'>
                                    <Label
                                        htmlFor='quantity'
                                        value={i18n.language === 'en' ? 'Quantity ' : ' الكمية'}
                                    />
                                </div>
                                <TextInput
                                    id='quantity'
                                    type='number'
                                    min={1}
                                    value={formData.quantity}
                                    onChange={(e) =>
                                        setFormData({ ...formData, quantity: e.target.value })
                                    }
                                />
                            </div>
                            <div className='col-span-1'>
                                <div className='mb-2 block'>
                                    <Label
                                        htmlFor='Price'
                                        value={i18n.language === 'en' ? 'Price ' : ' السعر'}
                                    />
                                </div>
                                <TextInput
                                    id='Price'
                                    type='number'
                                    min={1}
                                    value={formData.price}
                                    onChange={(e) =>
                                        setFormData({ ...formData, price: e.target.value })
                                    }
                                />
                            </div>
                            <div className='col-span-2'>
                                <div className='mb-2 block'>
                                    <Label
                                        htmlFor='expiry-date'
                                        value={
                                            i18n.language === 'en' ? 'Expiry date ' : 'تاريخ الانتهاء '
                                        }
                                    />
                                </div>
                                <TextInput
                                    id='expiry-date'
                                    type='date'
                                    value={formData.start_date}
                                    onChange={(e) =>
                                        setFormData({ ...formData, start_date: e.target.value })
                                    }
                                />
                            </div>
                        </div>

                    </div>
                    {/* Modal actions */}
                    <div className=" sticky z-10 bottom-0 left-0 right-0 bg-gray-50 px-4 py-3 shadow-md flex items-center gap-2">
                        <button
                            className='bg-secondColor py-1 px-4 rounded-md hover:brightness-110 text-white mx-2'
                            onClick={handleEdit}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <Spinner aria-label='loading...' color='purple' />
                            ) : i18n.language === 'en' ? (
                                'Save'
                            ) : (
                                'حفظ'
                            )}
                        </button>

                        <button
                            className='border border-secondColor text-secondColor py-1 px-4 rounded-md hover:brightness-110'
                            onClick={() => {
                                setEditModal(false);
                                // document.body.style.overflow = 'auto';
                            }}
                        >
                            {i18n.language === 'en' ? 'Cancel' : 'الغاء'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditModal;
