import { GoLocation } from 'react-icons/go';
import { BiPhone } from 'react-icons/bi';
import { RiFacebookCircleLine } from 'react-icons/ri';
import { FiInstagram, FiYoutube } from 'react-icons/fi';

const TopHeader = () => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between gap-2 md:gap-0 w-full">
            <div className='flex gap-2 md:gap-10 items-center'>
                <div className="flex items-center gap-2">
                    <GoLocation />
                    <p className='text-[8px] md:text-sm'>256 B Street 45 Newyork, Newyork</p>
                </div>
                <div className="flex items-center gap-2">
                    <BiPhone />
                    <p className='text-[8px] md:text-sm' >+92 31304754657</p>
                </div>
            </div>

            <div className="social-icons flex gap-3">
                <a href="" target="_blank" rel="noopener noreferrer" className='text-2xl' aria-label='youtube'>
                    <FiYoutube />
                </a>
                <a href="" target="_blank" rel="noopener noreferrer" className='text-2xl' aria-label='facebook'>
                    <RiFacebookCircleLine />
                </a>
                <a href="" target="_blank" rel="noopener noreferrer" className='text-2xl' aria-label='instagram'>
                    <FiInstagram />
                </a>
            </div>
        </div>
    )
}

export default TopHeader
