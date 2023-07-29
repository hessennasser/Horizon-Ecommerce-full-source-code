import banner1 from "../../assets/images/banner-1.png";

const HomeBanner = () => {
    return (
        <div className="py-5 text-white bg-mainColor bg-gradient-to-r from-indigo-900 to-purple-900">
            <div className="container grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="text col-span-2">
                    <div>
                        <h3 className="text-2xl font-bold">CYBER LINIO</h3>
                        <p className="text-gray-100">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sintAmet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint</p>
                    </div>
                    <div className="mt-5 flex flex-col items-start gap-3">

                        <p className="text-[3.5rem] font-extrabold text-secondColor">
                            40%<span className="text-xs text-gray-100">DSCNT</span>
                        </p>

                        <button type="button" className="bg-secondColor py-2 px-4 rounded-lg hover:brightness-110 text-xs md:text-sm capitalize">
                            free shipping
                        </button>
                    </div>
                </div>
                <div className="img">
                    <img src={banner1} alt="horizon" />
                </div>
            </div>
        </div>
    )
}

export default HomeBanner
