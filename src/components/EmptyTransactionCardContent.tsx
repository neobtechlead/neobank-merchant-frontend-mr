import React from 'react';

type EmptyTransactionCardContentProps = {
    children: React.ReactNode,
    description?: string,
};

const EmptyTransactionCardContent: React.FC<EmptyTransactionCardContentProps> = ({
                                                                                     children,
                                                                                     customStyles,
                                                                                     backgroundImage,
                                                                                     description
                                                                                 }) => {
    return (
        <div className={`${customStyles}`} style={{backgroundImage: backgroundImage}}>
            {children}
            <div className="flex flex-col justify-center items-center">
                <h5 className="font-semibold">No Data Available</h5>
                <p className="font-normal text-xs text-center mt-1">{description ?? 'Perform disbursements to view recent transactions'}</p>
            </div>
        </div>
    );
};

export default EmptyTransactionCardContent;
