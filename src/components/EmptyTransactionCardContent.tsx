import React from 'react';
import Image from "next/image";

type EmptyTransactionCardContentProps = {
    children: React.ReactNode,
    showContent: boolean,
    description?: string,
};

const EmptyTransactionCardContent: React.FC<EmptyTransactionCardContentProps> = ({
                                                                                     children,
                                                                                     customStyles,
                                                                                     backgroundImage,
                                                                                     title,
                                                                                     description,
                                                                                     showContent,
                                                                                     iconPath,
                                                                                     iconWidth,
                                                                                     iconHeight,
                                                                                     iconCustomStyle,
                                                                                 }) => {
    return (
        <div className={`${customStyles} flex flex-col items-center justify-center`}
             style={{backgroundImage: backgroundImage}}>
            {iconPath &&
                <Image src={iconPath} alt="disbursement" className={`flex justify-center ${iconCustomStyle}`}
                       width={iconWidth}
                       height={iconHeight}/>}
            {showContent && <div className="flex flex-col justify-center items-center">
                {title && <h5 className="font-semibold">{title ?? "No data available"}</h5>}
                {description &&
                    <p className="font-normal text-xs text-center mt-1 lg:w-2/3 md:w-2/3 sm:w-1/3 sm:mx-6">{description}</p>}
            </div>}
            {children}
        </div>
    );
};

export default EmptyTransactionCardContent;
