import { FileInput, Label, Spinner, TextInput } from 'flowbite-react';
import Select from 'react-select';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { AppContext } from '../../../AppContext';
import { FaPlus, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import apiUrl from '../../../apiUrl';
import FormData from 'form-data';

const AddModal = ({ addModal, setAddModal, setSelectedGovernorate, encategoriesOptions, arcategoriesOptions, getSellerProducts, setAllProducts, setIsLoading: setLoadingAllProducts }) => {
    const { i18n } = useTranslation();
    const { mainRequest, removeBackground } = useContext(AppContext);
    const sellerToken = JSON.parse(localStorage.getItem('sellerToken'));

    // add new product in dashboard
    const addNewProduct = async ({ title_ar, title_en, start_date, category, quantity, price, images }, setIsLoading, setAddModal) => {
        setIsLoading(true);
        try {
            // Create the form data with the modified images
            const formData = new FormData();
            formData.append('token', sellerToken);
            formData.append('title_ar', title_ar);
            formData.append('title_en', title_en);
            formData.append('category_id', category?.value);
            formData.append('quantity', quantity);
            formData.append('price', price);
            formData.append('start_date', start_date);

            for (let i = 0; i < images.length; i++) {
                formData.append(`images[${i}]`, images[i], images[i].name);
            }

            const response = await mainRequest.post(`${apiUrl}/vendor/products/create`, formData, {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
            });

            toast.success(
                i18n.language === 'en' ? 'The product has been uploaded' : 'تم رفع المنتج بنجاح'
            );
            getSellerProducts(setAllProducts);
        } catch (error) {
            console.log(error);
            toast.error(i18n.language === "en" ? "There is an error, please try again later" : "يوجد خطأ ما، الرجاء المحاولة مرة أخرى");
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

    const [selectedImages, setSelectedImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleAddNew = () => {

        if (!selectedImages || selectedImages.length === 0 || !formData.title_ar || !formData.category || !formData.quantity || !formData.price || !formData.start_date) {
            toast.error(i18n.language === 'en' ? 'Please enter all required fields' : 'برجاء إدخال جميع الحقول المطلوبة');
            return;
        }

        const readerPromises = [];
        const imageBlobs = [];

        for (let i = 0; i < selectedImages?.length; i++) {
            const reader = new FileReader();
            readerPromises.push(
                new Promise((resolve) => {
                    reader.onloadend = () => {
                        const blob = new Blob([reader.result], { type: selectedImages[i].type });
                        imageBlobs.push(blob);
                        resolve();
                    };
                })
            );
            reader.readAsArrayBuffer(selectedImages[i]);
        }

        Promise.all(readerPromises).then(() => {
            const updatedFormData = {
                ...formData,
                title_en: formData.title_en?.trim() || formData.title_ar.trim(),
                images: imageBlobs
            };
            addNewProduct(updatedFormData, setIsLoading, setAddModal, getSellerProducts, setAllProducts);
        });
    };

    const handleRemovePhoto = (index) => {
        const updatedImages = [...selectedImages];
        updatedImages.splice(index, 1);
        setSelectedImages(updatedImages);
    };


    return (
        <div className="fixed z-[10000] inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 bg-opacity-90"></div>
                </div>

                <div className="modal-app relative bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    {/* Fixed Header */}
                    <div className="sticky z-10 top-0 left-0 bg-white px-4 py-2 shadow-md flex justify-between">
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
                                    multiple // Allow multiple file selection
                                    accept='image/*' // Limit to only image files
                                    onChange={(e) => {
                                        const files = e.target.files;
                                        const updatedImages = [...selectedImages];
                                        for (let i = 0; i < files.length; i++) {
                                            if (updatedImages.length >= 4) {
                                                toast.error(i18n.language === 'en' ? 'You can only upload up to 4 photos' : 'يمكنك تحميل ما يصل إلى 4 صور فقط');
                                                break;
                                            }
                                            updatedImages.push(files[i]);
                                        }
                                        setSelectedImages(updatedImages);
                                    }}
                                />
                                {selectedImages.length < 1 && <span className='text-xs text-red-600 font-bold mt-2 block'>{i18n.language === "en" ? "This Field Is Requeued" : "هذا الحقل مطلوب"}</span>}
                            </div>

                            {selectedImages.length > 0 && (
                                <div className='col-span-2'>
                                    <div className="flex flex-wrap gap-2 justify-center">
                                        {/* Plus button */}
                                        {selectedImages.length < 4 && (
                                            <button
                                                className='h-20 w-20 flex items-center justify-center rounded-md border-dotted border-2 border-secondColor hover:bg-gray-300'
                                                onClick={() => {
                                                    document.getElementById('image').click();
                                                }}
                                            >
                                                <FaPlus />
                                            </button>
                                        )}
                                        {selectedImages.map((image, index) => (
                                            <div key={index} className="relative">
                                                <img
                                                    src={URL.createObjectURL(image)}
                                                    alt={`Image ${index}`}
                                                    className="h-20 w-20 object-contain rounded-md"
                                                />
                                                <button
                                                    className="absolute top-0 right-0 text-red-600 p-1 bg-white rounded-full hover:bg-red-100"
                                                    onClick={() => handleRemovePhoto(index)}
                                                >
                                                    <FaTimes />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

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
                                {formData.title_ar.length < 1 && <span className='text-xs text-red-600 font-bold mt-2 block'>{i18n.language === "en" ? "This Field Is Requeued" : "هذا الحقل مطلوب"}</span>}
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
                                {!formData.category && <span className='text-xs text-red-600 font-bold mt-2 block'>{i18n.language === "en" ? "This Field Is Requeued" : "هذا الحقل مطلوب"}</span>}
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
                                    min={1}
                                    required
                                    value={formData.quantity}
                                    onChange={(e) =>
                                        setFormData({ ...formData, quantity: e.target.value })
                                    }
                                />
                                {formData.quantity < 1 && <span className='text-xs text-red-600 font-bold mt-2 block'>{i18n.language === "en" ? "This Field Is Requeued" : "هذا الحقل مطلوب"}</span>}
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
                                    min={1}
                                    required
                                    value={formData.price}
                                    onChange={(e) =>
                                        setFormData({ ...formData, price: e.target.value })
                                    }
                                />
                                {formData.price < 1 && <span className='text-xs text-red-600 font-bold mt-2 block'>{i18n.language === "en" ? "This Field Is Requeued" : "هذا الحقل مطلوب"}</span>}
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
                                {!formData.start_date && <span className='text-xs text-red-600 font-bold mt-2 block'>{i18n.language === "en" ? "This Field Is Requeued" : "هذا الحقل مطلوب"}</span>}
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
                    </div>
                </div>
            </div>
        </div>

    )
}

export default AddModal
