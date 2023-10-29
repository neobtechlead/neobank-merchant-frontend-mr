import React from 'react';

interface CFButtonProps {
    buttonClasses: String;
    borderRadius: Number;
    onClick: (event) => void;
}

const CFButton: React.FC<CFButtonProps> = ({onClick, buttonClasses, borderRadius= 5, children}) => {
    const handleClick = (event) => {
        onClick(event);
    };

    return (
        <button
            className={`w-full p-3 ${buttonClasses}`}
            onClick={handleClick}
            style={{borderRadius: borderRadius}}
        >
            {children}
        </button>
    );
};

export default CFButton;
