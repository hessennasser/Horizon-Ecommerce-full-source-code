import { useState, useEffect } from 'react';
import { BsArrowUp } from 'react-icons/bs';

function ScrollToTopButton() {
    const [showButton, setShowButton] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 300) {
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
                    className={`fixed rounded-full z-10 end-5 h-9 w-9 text-center bg-secondColor bg-opacity-70 text-2xl grid place-content-center text-white justify-center items-center transition-all duration-300 animate-bounce ${showButton ? 'bottom-10' : '-bottom-16'} backdrop-blur-lg`}
                >
                    <BsArrowUp />
                </button>
        </>
    );
}

export default ScrollToTopButton;
