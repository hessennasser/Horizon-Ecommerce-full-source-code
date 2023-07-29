import React, { useState, useEffect } from "react";
import TopHeader from "./TopHeader";
import MainHeader from "./MainHeader";
import NavHeader from "./NavHeader";
import "./header.css";

const Header = ({ toggleSidebar }) => {


    return (
        <>
            {/* top header */}
            {/* <div className="bg-mainColor text-white pt-3 relative z-[100]">
                <div className=" container min-w-[95%] flex flex-col">
                    <TopHeader />
                </div>
            </div> */}
            {/* sticky header */}
            <div className="bg-mainColor text-white pt-3 z-[100] sticky top-0">
                <div className="px-5 min-w-[95%] pt-2">
                    <MainHeader />
                </div>
                <NavHeader toggleSidebar={toggleSidebar} />
            </div>
        </>
    );
};

export default Header;
