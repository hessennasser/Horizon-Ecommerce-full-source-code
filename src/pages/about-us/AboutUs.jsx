import React from 'react'
import img from "../../assets/images/whoUsImg.png"
import { Link } from 'react-router-dom'
const AboutUs = () => {
    return (
        <div className='container py-10'>
            <div className="grid grid-cols-2 gap-5">
                <div className="col-span-2 md:col-span-1">
                    <img src={img} alt="horizon" />
                </div>
                <div className="col-span-2 md:col-span-1 text-center flex flex-col items-center justify-center gap-3">
                    <h2 className='text-xl font-medium text-secondColor'>Who We Are</h2>
                    <p>
                        Lorem Ipsum is simply dummy text of
                        the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                    </p>
                    <Link className='text-secondColor font-bold px-4 py-2 border border-black rounded-2xl hover:bg-mainColor hover:text-white duration-200' aria-label='contact us' to="/contact-us">Contact Us</Link>
                    <hr className='w-full my-5 border-gray-600' />
                    <div className="grid gap-3">
                        <p className='text-gray-600'>Have any questions? <br />
                            Contact us!</p>
                        <p className='font-medium'>+996 (4343) 4325665</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUs
