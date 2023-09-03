import React, { useContext, useEffect, useState } from 'react';
import { Label, Spinner, TextInput } from 'flowbite-react';
import { useTranslation } from 'react-i18next';
import { FaTimes } from 'react-icons/fa';
import { AppContext } from '../../AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import apiUrl from '../../apiUrl';
import Select from 'react-select';

export default function CompleteProfile({ completeInfoModal, setCompleteInfoModal }) {
    const [phone, setPhone] = useState('');
    const { i18n } = useTranslation();
    const complete = localStorage.getItem("complete");
    const userToken = JSON.parse(localStorage.getItem("userToken"));
    const sellerToken = JSON.parse(localStorage.getItem("sellerToken"));
    const role = localStorage.getItem("role");
    const { governorates, getGovernorates } = useContext(AppContext);
    const [isProfileSubmitting, setIsProfileSubmitting] = useState(false);
    const [selectedGovernorate, setSelectedGovernorate] = useState("");
    const [cashNumber, setCashNumber] = useState("");

    if (completeInfoModal === false) {
        return;
    }

    const engovernoratesOptions = governorates.map((gov) => ({
        value: gov.id,
        label: gov.title.en,
    }));

    const argovernoratesOptions = governorates.map((gov) => ({
        value: gov.id,
        label: gov.title.ar,
    }));

    useEffect(() => {
        role === "seller" ? getGovernorates() : null
    }, [role])

    const handelUpdate = async () => {
        try {
            if (role === "user") {
                if (!phone) {
                    toast.info(i18n.language === "en" ? "Please Enter Your Phone Number" : "من فضلك قم بادخال رقم الهاتف")
                    return
                }
                setIsProfileSubmitting(true);
                try {
                    const updatedProfile = {
                        token: userToken,
                        phone: phone,
                        name: "null",
                        email: "null",
                    };
                    const response = await axios.post(`${apiUrl}/auth/user-update`, updatedProfile);
                    toast.success(i18n.language === "en" ? "The profile completed successfully" : "تم إكمال الملف الشخصي بنجاح");
                    localStorage.removeItem("complete");
                    localStorage.setItem("complete", true);
                    setCompleteInfoModal(false);
                    location.href = "/"
                } catch (error) {
                    toast.error(i18n.language === "en" ? "There is an error, please try again later" : "يوجد خطأ ما، الرجاء المحاولة مره اخري");
                    console.log(error);
                } finally {
                    setIsProfileSubmitting(false);
                }
            }
            if (role === "seller") {
                if (!phone || !selectedGovernorate || !cashNumber) {
                    toast.info(i18n.language === "en" ? "Please Enter All Data" : "من فضلك قم بادخال جميع البيانات")
                    return
                }
                setIsProfileSubmitting(true);
                try {
                    const updatedProfile = {
                        token: sellerToken,
                        phone: phone,
                        governorate_id: selectedGovernorate,
                        cash_number: cashNumber,
                        name: "null",
                        email: "null",
                        image: "null",
                    };
                    const response = await axios.post(`${apiUrl}/vendor/auth/vendor-update`, updatedProfile);
                    toast.success(i18n.language === "en" ? "The profile completed successfully" : "تم إكمال الملف الشخصي بنجاح");
                    localStorage.removeItem("complete");
                    localStorage.setItem("complete", true);
                    setCompleteInfoModal(false);
                    location.href = "/"
                } catch (error) {
                    toast.error(i18n.language === "en" ? "There is an error, please try again later" : "يوجد خطأ ما، الرجاء المحاولة مره اخري");
                    console.log(error);
                } finally {
                    setIsProfileSubmitting(false);
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="fixed z-[10000] inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 bg-opacity-90"></div>
                </div>

                <div className="modal-app relative bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    {/* Fixed Header */}
                    <div className="sticky z-10 top-0 left-0 bg-white px-4 py-2 shadow-md flex justify-between">
                        <h3 className='text-xl font-medium text-secondColor'>
                            {i18n.language === "en" ? "Complete Your Profile Info" : "أكمل بياناتك"}
                        </h3>
                        {complete === true && <button
                            className='border border-secondColor text-secondColor py-1 px-4 rounded-md hover:brightness-110'
                            onClick={() => {
                                setCompleteInfoModal(false);
                            }}
                        >
                            <FaTimes />
                        </button>
                        }
                    </div>
                    {/* Modal content goes here */}
                    <div className={`bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 flex flex-col items-start justify-start gap-3 ${role === "seller" ? "min-h-[70dvh]" : null} overflow-y-auto`}>
                        {
                            (role === "user" || role === "seller") &&
                            <div className="flex w-full gap-2 justify-between flex-col">
                                <div className="mb-2 block">
                                    <Label htmlFor="phone" value={i18n.language === "en" ? "Your Phone" : "رقم الهاتف"} />
                                </div>
                                <TextInput id="phone" placeholder="+2010000000" type='tel' required className='w-full' value={phone} onChange={e => setPhone(e.target.value)} />
                            </div>

                        }
                        {
                            role === "seller" && (
                                <>
                                    <div className='flex w-full gap-2 justify-between flex-col'>
                                        <Label htmlFor='cashNumber'>{i18n.language === "ar" ? "رقم المحفظة الالكترونية" : "Cash Number"}</Label>
                                        <TextInput
                                            placeholder="+2010000000"
                                            id='cashNumber'
                                            type='tel'
                                            value={cashNumber}
                                            onChange={(e) => setCashNumber(e.target.value)}
                                        />
                                    </div>
                                    <div className='flex w-full gap-2 justify-between flex-col'>
                                        <label htmlFor='email'>{i18n.language === "ar" ? "المحافظة" : "Governorate"}</label>
                                        <Select
                                            name="governorate"
                                            id="governorate"
                                            className="rounded-lg border-gray-300 shadow-md col-span-2"
                                            onChange={(option) => setSelectedGovernorate(option.value)}
                                            options={i18n.language === "en" ? engovernoratesOptions : argovernoratesOptions}
                                            placeholder={i18n.language === 'ar' ? 'ادخل محافظتك' : 'enter your Governorate'}
                                            isRtl={i18n.language === 'ar'}
                                            isSearchable
                                            required
                                        />
                                    </div>

                                </>
                            )
                        }
                    </div>
                    {/* Modal actions */}
                    <div className=" sticky z-10 bottom-0 left-0 right-0 bg-gray-50 px-4 py-3 shadow-md flex items-center gap-2">
                        <button
                            onClick={handelUpdate}
                            className='bg-secondColor py-1 px-4 rounded-md hover:brightness-110 text-white mx-2'
                            disabled={isProfileSubmitting}
                        >
                            {
                                isProfileSubmitting ? <Spinner aria-label="loading..." color="purple" /> : i18n.language === 'en' ? 'Save' : 'حفظ'
                            }
                        </button>

                        {complete === true && <button
                            className='border border-secondColor text-secondColor py-1 px-4 rounded-md hover:brightness-110'
                            onClick={() => {
                                setCompleteInfoModal(false);
                            }}
                        >
                            {i18n.language === 'en' ? 'Cancel' : 'الغاء'}
                        </button>
                        }
                    </div>
                </div>
            </div>
        </div>

    );
}
