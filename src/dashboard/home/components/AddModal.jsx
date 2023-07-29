import { FileInput, Label, Spinner, TextInput } from 'flowbite-react';
import Select from 'react-select';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { AppContext } from '../../../AppContext';
import { FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import apiUrl from '../../../apiUrl';
import FormData from 'form-data';

const AddModal = ({ addModal, setAddModal, setSelectedGovernorate, encategoriesOptions, arcategoriesOptions, getSellerProducts, setAllProducts, setIsLoading: setLoadingAllProducts }) => {
    const { i18n } = useTranslation();
    const { mainRequest, removeBackground } = useContext(AppContext);
    const sellerToken = JSON.parse(localStorage.getItem('sellerToken'));

    // add new product in dashboard
    const addNewProduct = async ({ title_ar, title_en, start_date, category, quantity, price, image }, setIsLoading, setAddModal) => {
        try {
            // Create the form data with the modified image
            const formData = new FormData();
            formData.append('token', sellerToken);
            formData.append('title_ar', title_ar);
            formData.append('title_en', title_en);
            formData.append('category_id', category?.value);
            formData.append('quantity', quantity);
            formData.append('price', price);
            formData.append('start_date', start_date);
            formData.append('images', image, image.name);

            const response = await mainRequest.post(`${apiUrl}/vendor/products/create`, formData, {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${sellerToken}`,
                },
            });

            toast.success(
                i18n.language === 'en' ? 'The product has been uploaded' : 'تم رفع المنتج بنجاح'
            );
            getSellerProducts(setAllProducts);
        } catch (error) {
            console.log(error);
            toast.error(i18n.language === "en" ? "There is an error, please try again later" : "يوجد خطأ ما، الرجاء المحاولة مره اخري");
        }
        finally {
            setIsLoading(false);
            setAddModal(false);
            getSellerProducts(setAllProducts, setLoadingAllProducts);
        }
    };

    const [formData, setFormData] = useState({
        image: null,
        title_en: '',
        title_ar: '',
        category: null,
        quantity: '',
        price: '',
        start_date: '',
    });

    const [selectedImage, setSelectedImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleAddNew = () => {
        if (!selectedImage || !formData.title_ar || !formData.category || !formData.quantity || !formData.price || !formData.start_date) {
            toast.error(i18n.language === 'en' ? 'Please enter all required fields' : 'برجاء إدخال جميع الحقول المطلوبة');
            return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
            const blob = new Blob([reader.result], { type: selectedImage.type });
            const updatedFormData = {
                ...formData,
                image: blob
            };
            console.log(updatedFormData);
            addNewProduct(updatedFormData, setIsLoading, setAddModal, getSellerProducts, setAllProducts);
        };
        reader.readAsArrayBuffer(selectedImage);

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
                            {i18n.language === 'en' ? 'Add Product' : 'اضافة منتج جديد'}
                        </h3>
                        <button
                            className='border border-secondColor text-secondColor py-1 px-4 rounded-md hover:brightness-110'
                            onClick={() => {
                                setAddModal(false);
                                // document.body.style.overflow = 'auto';
                            }}
                        >
                            <FaTimes />
                        </button>
                    </div>

                    {/* Modal content goes here */}
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 flex items-center justify-center">
                        <div className='space-y-6 w-full grid grid-cols-2 gap-3'>
                            <div className='col-span-2'>
                                <div className='mb-2 block'>
                                    <Label
                                        htmlFor='image'
                                        value={i18n.language === 'en' ? 'Image *' : 'الصوره *'}
                                    />
                                </div>
                                <FileInput
                                    id='image'
                                    required
                                    onChange={(e) => setSelectedImage(e.target.files[0])}
                                />
                            </div>
                            <div className='col-span-2'>
                                <div className='mb-2 block'>
                                    <Label
                                        htmlFor='title_en'
                                        value={
                                            i18n.language === 'en'
                                                ? 'Product Name English'
                                                : 'اسم المنتج بالانجليزية'
                                        }
                                    />
                                </div>
                                <TextInput
                                    id='title_en'
                                    type='text'
                                    required
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
                                                ? 'Product Name Arabic *'
                                                : 'اسم المنتج بالعربية *'
                                        }
                                    />
                                </div>
                                <TextInput
                                    id='title_ar'
                                    type='text'
                                    required
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
                                                ? 'Product Category *'
                                                : 'تصنيف المنتج *'
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
                                    required
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
                                        value={i18n.language === 'en' ? 'Quantity *' : '* الكمية'}
                                    />
                                </div>
                                <TextInput
                                    id='quantity'
                                    type='number'
                                    required
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
                                        value={i18n.language === 'en' ? 'Price *' : ' *السعر'}
                                    />
                                </div>
                                <TextInput
                                    id='Price'
                                    type='number'
                                    required
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
                                            i18n.language === 'en' ? 'Expiry date *' : 'تاريخ الانتهاء *'
                                        }
                                    />
                                </div>
                                <TextInput
                                    id='expiry-date'
                                    type='date'
                                    required
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
                            onClick={handleAddNew}
                            disabled={isLoading}
                        >
                            {
                                isLoading ? <Spinner aria-label="loading..." color="purple" /> : i18n.language === 'en' ? 'Save' : 'حفظ'
                            }
                        </button>

                        <button
                            className='border border-secondColor text-secondColor py-1 px-4 rounded-md hover:brightness-110'
                            onClick={() => {
                                setAddModal(false);
                                // document.body.style.overflow = 'auto';
                            }}
                        >
                            {i18n.language === 'en' ? 'Cancel' : 'الغاء'}
                        </button>
                        <span className='text-xs text-red-600 font-bold'>{i18n.language === "en" ? "Please Enter All Data*" : "برجاء ادخال جميع البيانات المطلوبه*"}</span>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default AddModal
