import horizonLogo from "../../assets/images/horizon-logo.png";
const BrandSide = () => {
    return (
        <div className="flex items-center justify-center flex-col text-white py-10">
            <img className="w-44" src={horizonLogo} alt="horizon" />
            <p className="px-10 sm:px-20 text-center mt-6">
                Amet minim mollit non deserunt
                ullamco est sit aliqua dolor do amet sintAmet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint
            </p>
        </div>
    )
}

export default BrandSide
