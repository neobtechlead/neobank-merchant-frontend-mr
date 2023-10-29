import React from 'react';
import MenuList from "@/components/menu/MenuList";
import ProfileDropdown from "@/components/profile/ProfileDropdown";

const Navbar = () => {

    return (
        <>
            <div className="px-5 bg-white shadow-4xl">
                <MenuList/>
                <ProfileDropdown/>
            </div>
        </>
    );
}

export default Navbar