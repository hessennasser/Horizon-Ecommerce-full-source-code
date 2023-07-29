import React, { useState } from 'react';
import { HiLocationMarker } from "react-icons/hi";
import { BiPhoneCall } from "react-icons/bi";
import { AiOutlineMail } from "react-icons/ai";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform form submission or other actions here
        console.log(formData); // Example: Log the form data to the console
    };

    const containerStyle = {
        height: '300px',
    };

    const center = {
        lat: 40.7128,
        lng: -74.0060,
    };

    return (
        <div className='container py-10'>
            <h2 className='mb-5 font-bold'>Contact us</h2>

            <LoadScript googleMapsApiKey="YOUR_API_KEY">
                <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
                    <Marker position={center} />
                </GoogleMap>
            </LoadScript>

            <div className="grid grid-cols-2 gap-5 shadow-lg rounded-lg p-3">
                <div className="info col-span-2 md:col-span-1">
                    <h3 className='text-2xl font-bold'>
                        Feel free to <span className='text-secondColor'>contact us </span><br />
                        for any query
                    </h3>
                    <div className="flex flex-col gap-3 my-5">
                        <div className="flex gap-3 items-center justify-between">
                            <span className='text-2xl bg-secondColor text-white w-10 h-10 grid place-content-center rounded-full'><HiLocationMarker /></span>
                            <p className='flex-1'>NYC, United States</p>
                        </div>
                        <div className="flex gap-3 items-center justify-between">
                            <span className='text-2xl bg-secondColor text-white w-10 h-10 grid place-content-center rounded-full'><BiPhoneCall /></span>
                            <p className='flex-1'>000111222333</p>
                        </div>
                        <div className="flex gap-3 items-center justify-between">
                            <span className='text-2xl bg-secondColor text-white w-10 h-10 grid place-content-center rounded-full'><AiOutlineMail /></span>
                            <p className='flex-1 text-sm'>somebody@gmail.com</p>
                        </div>
                    </div>
                </div>

                <div className="form col-span-2 md:col-span-1">
                    <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
                        <div className="col-span-2 flex justify-between flex-col md:flex-row gap-3">
                            <input
                                className="w-full rounded-lg px-3 py-2 focus:outline-none border-none bg-gray-200"
                                type="text"
                                id="firstName"
                                name="firstName"
                                placeholder="First Name"
                                value={formData.firstName}
                                onChange={handleInputChange}
                            />
                            <input
                                className="w-full rounded-lg px-3 py-2 focus:outline-none border-none bg-gray-200"
                                type="text"
                                id="lastName"
                                name="lastName"
                                placeholder="Last Name"
                                value={formData.lastName}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="col-span-2 flex justify-between flex-col md:flex-row gap-3">
                            <input
                                className="w-full rounded-lg px-3 py-2 focus:outline-none border-none bg-gray-200"
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                            <input
                                className="w-full rounded-lg px-3 py-2 focus:outline-none border-none bg-gray-200"
                                type="text"
                                id="phone"
                                name="phone"
                                placeholder="Phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="col-span-2">
                            <textarea
                                className="w-full rounded-lg px-3 py-2 focus:outline-none border-none bg-gray-200 min-h-[4rem]"
                                id="message"
                                name="message"
                                rows="4"
                                placeholder="Message"
                                value={formData.message}
                                onChange={handleInputChange}
                            ></textarea>
                        </div>
                        <div className="col-span-2 flex">
                            <button className="w-1/2 bg-secondColor hover:bg-mainColor duration-200 text-white py-2 rounded-lg mx-auto" type="submit">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
