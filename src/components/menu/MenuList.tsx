import React, {useState} from 'react';
import MenuItem from "@/components/menu/MenuItem";

const menuItems = [
    {iconSrc: "/assets/icons/home.svg", name: 'overview'},
    {iconSrc: "/assets/icons/upload.svg", name: 'disbursement'},
    {iconSrc: "/assets/icons/hand-coins.svg", name: 'collections'},
    {iconSrc: "/assets/icons/reports.svg", name: 'reports'},
];
const MenuList: React.FC = () => {
    const [activeTab, setActiveTab] = useState(1);

    return (
        <div className="mx-1">
            <ul className="flex w-full flex-wrap items-center">
                {menuItems.map((item, index) => (
                    <MenuItem
                        key={index}
                        iconSrc={item.iconSrc}
                        name={item.name}
                        active={activeTab === index}
                        onClick={() => setActiveTab(index)}
                        to={item.name}
                    />
                ))}
            </ul>
        </div>
    );
};

export default MenuList;
