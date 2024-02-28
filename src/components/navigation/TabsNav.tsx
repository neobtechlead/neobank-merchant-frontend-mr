import React from 'react';
import Button from "@/components/forms/Button";

const TabsNav: React.FC<ITabsNavProps> = ({handleClick, tabs, customClasses, activeTab}) => {

    return (
        <div className={`flex justify-between focus:outline-none border-gray-100 rounded text-center w-full ${customClasses}`}>
            {tabs.map(tab => (
                <Button key={tab.item} buttonType="button" styleType={`${activeTab === tab.item ? 'primary' : 'tertiary'}`}
                        customStyles={`p-0 md:p-2 w-full px-2 py-0 rounded-lg h-[40px] capitalize ${activeTab === tab.item ? 'bg-purple-900 text-white' : 'text-gray-900'}`}
                        onClick={() => handleClick(tab.item)}>
                    <span className={`${activeTab === tab.item ? 'text-white' : 'text-gray-900'}`}>{tab.label}</span>
                </Button>
            ))}
        </div>
    );
};

export default TabsNav;
