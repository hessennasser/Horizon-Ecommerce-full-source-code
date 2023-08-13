import React, { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { AppContext } from '../../../AppContext';
import { toast } from 'react-toastify';
import apiUrl from '../../../apiUrl';
import { FaPlus, FaTimes } from 'react-icons/fa';

const UpdateImagesModal = ({ productId, productData, getProductData, setIsLoading, getSellerProducts, setAllProducts, setLoadingAllProducts }) => {
    const { mainRequest } = useContext(AppContext);
    const sellerToken = JSON.parse(localStorage.getItem('sellerToken'));
    const [selectedImage, setSelectedImage] = useState(null);
    const { i18n } = useTranslation();
    // Function to handle image creation/update
    const uploadImage = async (imageFile) => {
        setIsLoading(true)
        try {
            const formData = new FormData();
            formData.append('token', sellerToken);
            formData.append('product_id', productId);
            formData.append('image', imageFile);

            const response = await mainRequest.post(`${apiUrl}/product/image/create`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            // Handle success...
            getProductData();
            toast.success(i18n.language === "en" ? "The product has been updated" : "تم تعديل المنتج بنجاح")
        } catch (error) {
            toast.error(i18n.language === "en" ? "There is an error, please try again later" : "يوجد خطأ ما، الرجاء المحاولة مره اخري");
        }
        finally {
            setIsLoading(false);
            getSellerProducts(setAllProducts, setLoadingAllProducts);
        }
    };

    // Function to handle new image selection
    const handleImageSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(file);
            uploadImage(file); // Automatically upload the selected image
        }
    };

    // Function to handle adding a new image
    const handleAddImage = () => {
        document.getElementById('image').click();
    };
    // Function to handle image deletion
    const deleteImage = async (imageId) => {
        setIsLoading(true);
        try {
            const response = await mainRequest.post(`${apiUrl}/product/image/delete`, {
                token: sellerToken,
                id: imageId,
            });
            // Handle success...
            getProductData();
            toast.success(i18n.language === "en" ? "The product has been updated" : "تم تعديل المنتج بنجاح")

        } catch (error) {
            toast.error(i18n.language === "en" ? "There is an error, please try again later" : "يوجد خطأ ما، الرجاء المحاولة مره اخري");
        }
        finally {
            setIsLoading(false);
            getSellerProducts(setAllProducts, setLoadingAllProducts);
        }
    };

    return (
        <div className='space-y-6 grid grid-cols-2 grid-rows-2 gap-3 w-full'>
            {productData && productData.images.length > 0 && (
                <div className='col-span-2'>
                    <div className='grid grid-cols-2 gap-2 justify-center'>
                        {productData.images.map((image, index) => (
                            <div key={index} className='relative p-2 border-2 min-h-[228px] '>
                                <img
                                    src={`https://admin.horriizon.com/public/${image.path}`}
                                    alt={`Image ${index}`}
                                    className='object-contain'
                                />
                                {
                                    productData.images.length > 1 && (
                                        <button
                                            className='absolute top-0 right-0 text-red-600 p-1 bg-white rounded-full hover:bg-red-100'
                                            onClick={() => deleteImage(image.id)}
                                        >
                                            <FaTimes />
                                        </button>
                                    )
                                }
                            </div>
                        ))}
                        {productData.images.length < 4 && (
                            <button
                                className=' min-h-[228px] flex items-center justify-center rounded-md border-dotted border-2 border-secondColor hover:bg-gray-300'
                                onClick={handleAddImage}
                            >
                                <FaPlus />
                                <input
                                    type='file'
                                    id='image'
                                    accept='image/*'
                                    hidden
                                    onChange={handleImageSelect}
                                />
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default UpdateImagesModal;
