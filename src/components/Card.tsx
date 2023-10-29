import React from 'react';

type CardProps = {
    children: React.ReactNode,
    backgroundColor?: string,
};

const Card: React.FC<CardProps> = ({children, backgroundImage, customStyles}) => {
    return (
        <div className={`overflow-hidden ${customStyles}`}
             style={{backgroundImage: backgroundImage}}>
            {children}
        </div>
    );
};

export default Card;
