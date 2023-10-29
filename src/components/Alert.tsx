import React from 'react';
import Image from "next/image";

interface AlertProps {
    children: React.ReactNode;
    backgroundColor: string;
    iconSrc: string;
}

const Alert: React.FC<AlertProps> = ({children, backgroundColor, customClasses, iconSrc}) => {
    return (
        <div className={`py-4 p-2 ${backgroundColor} ${customClasses}`}>
            <div className="flex items-center justify-between">
                <div className="flex-shrink-0">
                    <Image src={iconSrc} alt="icon" width={24} height={24}/>
                </div>
                <div className="ml-3 flex-1 md:flex md:justify-between">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Alert;
