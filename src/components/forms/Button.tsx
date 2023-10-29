import React from 'react';

interface ButtonProps {
    children: React.ReactNode;
    customStyles?: string;
    buttonType: 'submit' | 'button' | 'reset';
    styleType: string;
    disabled?: boolean;
}

const getBackgroundColor = (styleType: string) => {
    return styleType === 'secondary' ? '#EFEFEF' : styleType === 'tertiary' ? 'transparent' : '#652D90';
}

const getTextColor = (styleType: string, disabled: boolean | undefined) => {
    if (disabled) return styleType === 'secondary' ? '#4F4F4F' : styleType === 'tertiary' ? '#652D90' : '#FFFFFF';
    return styleType === 'primary' ? '#FFFFFF' : '#652D90';
}

const getHoverBackgroundColor = (styleType: string) => styleType === 'secondary' ? 'bg-gray-200 hover:bg-gray-300'
    : styleType === 'tertiary' ? 'bg-white hover:bg-white' : 'bg-purple-800 hover:bg-purple-900';

const getHoverTextColor = (styleType: string) => styleType === 'secondary' ? 'text-purple-800 hover:text-purple-900' : 'text-white hover:text-white';

const Button: React.FC<ButtonProps> = ({children, buttonType, styleType, customStyles, disabled}) => {
    const defaultStyles: React.CSSProperties = {
        width: '100%',
        height: '56px',
        padding: '16px 20px',
        borderRadius: '5px',
        display: 'flex',
        alignItems: 'center',
        cursor: disabled ? 'not-allowed' : 'pointer',
        background: getBackgroundColor(styleType),
        color: getTextColor(styleType, disabled),
        transition: 'background 0.3s, color 0.3s',
        opacity: disabled ? 0.5 : 1
    };

    return (
        <button
            type={buttonType}
            className={`${customStyles} ${disabled ? '' : getHoverBackgroundColor(styleType)} ${disabled ? '' : getHoverTextColor(styleType)}`}
            style={{...defaultStyles}}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;
