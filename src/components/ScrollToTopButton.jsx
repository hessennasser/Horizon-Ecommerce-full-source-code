import { useState, useEffect } from 'react';
import { BsArrowUp } from 'react-icons/bs';

function ScrollToTopButton() {
    const [showButton, setShowButton] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 200) {
            setShowButton(true);
        } else {
            setShowButton(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
                <button
                    onClick={scrollToTop}
                    data-toggle="back-to-top"
                    aria-label="Scroll To Top"
                    className={`z-[10000000000000000] fixed rounded-full end-5 h-14 w-14 text-center bg-secondColor bg-opacity-70 text-2xl grid place-content-center text-white justify-center items-center transition-all duration-300 animate-bounce ${showButton ? 'bottom-10' : '-bottom-18'} backdrop-blur-lg`}
                >
                    <BsArrowUp />
                </button>
        </>
    );
}

export default ScrollToTopButton;
