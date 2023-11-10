import React, {useState} from 'react';
import Button from "@/components/forms/Button";

const TabsNav: React.FC = ({handleClick, tabs, customClasses}) => {
    const [activeTab, setActiveTab] = useState<string>(tabs[0]);

    const handleButtonClick = (tab: string) => {
        setActiveTab(tab);
        handleClick(tab);
    };

    return (
        <div className={`flex justify-between focus:outline-none border-gray-100 rounded-lg text-center w-full ${customClasses}`}>
            {tabs.map(tab => (
                <Button key={tab} buttonType="button" styleType={`${activeTab === tab ? 'primary' : 'tertiary'}`}
                        customStyles={`p-0 md:p-2 w-full px-2 py-0 rounded-xl h-[40px] capitalize ${activeTab === tab ? 'bg-purple-900 text-white' : 'text-gray-900'}`}
                        onClick={() => handleButtonClick(tab)}>
                    <span className="">{tab}</span>
                </Button>
            ))}
        </div>
    );
};

export default TabsNav;
