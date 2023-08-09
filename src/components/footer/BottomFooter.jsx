import { Link } from "react-router-dom"

const BottomFooter = () => {
    return (
        <div className="flex gap-5 justify-between sm:items-center flex-col sm:flex-row pt-5">
            <ul className="links flex-col md:flex-row flex gap-3">
                <li>
                    <Link to="/" className="uppercase text-xs md:text-sm">
                        about us
                    </Link>
                </li>
                <li>
                    <Link to="/" className="uppercase text-xs md:text-sm">
                        Contact us
                    </Link>
                </li>
                <li>
                    <Link to="/" className="uppercase text-xs md:text-sm">
                        help
                    </Link>
                </li>
                <li>
                    <Link to="/" className="uppercase text-xs md:text-sm">
                        Privacy Policy
                    </Link>
                </li>
                <li>
                    <Link to="/" className="uppercase text-xs md:text-sm">
                        Disclaimer
                    </Link>
                </li>
            </ul>
            <p className="text-gray-400">
                Copyright © {new Date().getFullYear()} • <Link to="/" className="text-white">Horizon</Link> • Develop with ❤️ by <a href="https://sm8rtdev.online/" target="_blank" rel="noopener noreferrer" className="text-white">Hessen Nasser</a> All rights reserved.
            </p>
        </div>
    )
}

export default BottomFooter
