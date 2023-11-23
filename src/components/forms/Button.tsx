import React from 'react';
import {ButtonType} from "@/utils/types/ButtonType";

const Button: React.FC<ButtonType> = ({
                                          children,
                                          buttonType,
                                          styleType,
                                          customStyles,
                                          disabled,
                                          onClick
                                      }) => {
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

    const defaultStyles: React.CSSProperties = {
        width: '100%',
        maxHeight: '56px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;
