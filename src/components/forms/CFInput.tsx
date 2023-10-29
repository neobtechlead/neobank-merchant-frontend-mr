import React, {useState, ChangeEvent} from 'react';

interface CFInputProps {
    type: string;
    label: string;
    placeholder: string;
    onInputChange: (value: string) => void;
    width: number;
    height: number;
    borderRadius: number;
}

const CFInput: React.FC<CFInputProps> = ({
                                             type,
                                             label,
                                             placeholder,
                                             onInputChange,
                                             width,
                                             height,
                                             borderRadius,
                                             labelLeft,
                                             labelRight,
                                             labelClasses,
                                         }) => {
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setInputValue(newValue);
        onInputChange(newValue);
    };

    const handleBlur = () => {
        if (type === 'email' && !isValidEmail(inputValue)) {
            setError('Please enter a valid email address.');
        } else {
            setError(null);
        }
    };

    const isValidEmail = (email: string): boolean => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(email);
    };

    const inputStyles = {
        width,
        height,
        // padding: '15px',
        borderRadius: borderRadius ?? '10px',
        border: '1px solid #E6E6E6',
        gap: '232px',
        background:
            'linear-gradient(0deg, #FFFFFF, #FFFFFF), linear-gradient(0deg, #E6E6E6, #E6E6E6)',
    };

    return (
        <div className={`flex mt-8 ${labelLeft ? 'flex-col' : 'flex-row items-center'}`}>
            {labelLeft && <label htmlFor={label} className={`text-lg capitalize ${labelClasses}`}>
                {label}
            </label>}
            <input
                type={type}
                id={label}
                placeholder={placeholder}
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    error ? 'border-red-500' : ''
                }`}
                style={inputStyles}
            />
            {labelRight && <label htmlFor={label} className={`text-lg ${labelClasses}`}>
                {label}
            </label>}
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );
};

export default CFInput;
