import { Button, Modal } from 'flowbite-react';
import React, { useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import apiUrl from '../../../apiUrl';
import { toast } from 'react-toastify';
import { AppContext } from '../../../AppContext';

const DeleteModal = ({ deleteModal, setDeleteModal, productId, getSellerProducts, setAllProducts, setIsLoading: setLoadingAllProducts }) => {
    const { i18n } = useTranslation();

    const sellerToken = JSON.parse(localStorage.getItem('sellerToken'));
    const { mainRequest } = useContext(AppContext);

    const deleteProduct = async () => {
        try {
            const response = await mainRequest.post(`${apiUrl}/vendor/products/${productId}/delete`, {
                token: sellerToken
            });
            toast.success(i18n.language === "en" ? "the product successfully delete" : "تم حذف المنتج ");
        } catch (error) {
            console.log(error);
            toast.error(i18n.language === "en" ? "theres is an error, please try again" : "يوجد خطأ، برجاء المحاوله مره اخره");
        }
        finally {
            setDeleteModal(false);
            getSellerProducts(setAllProducts, setLoadingAllProducts);
            document.body.style.overflow = 'auto';
        }
    }

    useEffect(() => {
        document.body.style.overflow = 'auto';
    }, [deleteModal])

    return (
        <Modal className='z-[10000] modal' show={deleteModal} size="md" popup onClose={() => {
            setDeleteModal(false);
            document.body.style.overflow = 'auto';
        }}>
            <Modal.Header />
            <Modal.Body>
                <div className="text-center">
                    <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        {i18n.language === "en" ? "Are you sure you want to delete this product?" : "هل انت متاكد انك تريد حذف هذا المنتج؟"}
                    </h3>
                    <div className="flex justify-center gap-4">
                        <Button color="failure" onClick={deleteProduct}>
                            {i18n.language === "en" ? "Yes, I'm sure" : "نعم، انا متاكد"}
                        </Button>
                        <Button color="gray" onClick={() => {
                            document.body.style.overflow = 'auto';
                            setDeleteModal(false);
                        }}>
                            {i18n.language === "en" ? "No, cancel" : "لا، الغاء"}
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default DeleteModal