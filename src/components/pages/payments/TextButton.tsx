import React, {ButtonHTMLAttributes} from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    onClick: () => void;
    className?: string; // Additional CSS class for styling (optional)
}

const TextButton: React.FC<Props> = ({label, onClick, className, ...rest}) => {
    const buttonClass = `rounded-[5px] font-semibold ${className}`;

    return (
        <button type="button" className={buttonClass} onClick={onClick} {...rest}>
            {label}
        </button>
    );
};

export default TextButton;
