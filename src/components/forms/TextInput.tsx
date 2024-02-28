import React, {ChangeEvent, WheelEventHandler, useState} from 'react';
import Svg from '@/components/Svg';
import {EyeOpened, EyeClosed} from '@/assets/icons/eye';
import {ITextInput} from "@/utils/interfaces/ITextInput";
import {camelCaseToWords, isValidEmail} from "@/utils/lib";

const TextInput: React.FC<ITextInput> = ({
                                             label,
                                             id,
                                             name,
                                             type,
                                             autoComplete,
                                             required,
                                             placeholder,
                                             onInputChange,
                                             hasError,
                                             passwordIcon,
                                             height = 56,
                                             disabled = false,
                                             children,
                                             customClasses,
                                             customInputClasses,
                                             customLabelClasses = 'capitalize',
                                             min,
                                             max
                                         }) => {
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputValue(value);
        if (inputValue !== '') handleBlur();
        if (onInputChange) onInputChange(event);
    };

    const handleBlur = () => {
        if (inputValue === '' && required) {
            setError(`${capitalize(camelCaseToWords(name))} is required!`);
            if (hasError) hasError(true);
        } else if (type === 'email' && !isValidEmail(inputValue)) {
            setError('Please enter a valid email address.');
            if (hasError) hasError(true);
        } else {
            setError('');
            if (hasError) hasError(false);
        }
    };

    const capitalize = (value: string): string => value.charAt(0).toUpperCase() + value.slice(1);

    const togglePassword = () => {
        return setShowPassword(!showPassword);
    };

    const isNumberInput = () => {
        return type === 'number'
    };

    const numberInputOnWheelPreventChange: WheelEventHandler<HTMLInputElement> = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const input = event.currentTarget;
        input.blur();
        setTimeout(() => input.focus(), 0);
    }

    return (
        <div className={`mb-4 ${customClasses}`}>
            <label htmlFor={id} className={`block text-sm font-medium leading-6 text-gray-900 ${customLabelClasses}`}>
                {label}
            </label>
            <div className=" mt-2 flex flex-col gap-y-2">
                <div className="sm:col-span-12 rounded-md">
                    <div
                        className={`flex rounded-md border border-gray-100 sm:min-w-md ${
                            error ? 'border-red-400' : 'focus:border-purple-900'
                        } focus-within:border-purple-900 relative`} style={{backgroundColor: "#EFEFEF"}}>
                        {children?.left}
                        <input
                            id={id}
                            name={name}
                            type={showPassword ? 'text' : type}
                            step="any"
                            autoComplete={autoComplete}
                            placeholder={placeholder}
                            onBlur={handleBlur}
                            onInput={handleInputChange}
                            min={isNumberInput() ? min : ''}
                            max={isNumberInput() ? max : ''}
                            className={`block w-full rounded-md py-1.5 px-3 text-gray-900 placeholder-gray-900
                                    border-gray-300 placeholder:text-gray-600 focus:outline-none
                                    sm:text-sm sm:leading-6 h-[${height}px] ${disabled ? 'cursor-not-allowed' : ''} 
                                    ${customInputClasses}`}
                            disabled={disabled}
                            style={{backgroundColor: "#EFEFEF"}}
                            onWheel={numberInputOnWheelPreventChange}
                        />

                        {children?.right && (
                            <div className="absolute right-0 flex truncate h-full z-20">
                                {children?.right}
                            </div>
                        )}

                        {type === 'password' && passwordIcon && (
                            <div
                                className="absolute inset-y-0 right-1 flex items-center cursor-pointer bg-transparent m-2"
                                onClick={togglePassword}
                            >
                                <Svg fill={error ? "#F87171" : "#4F4F4F"} path={showPassword ? EyeClosed : EyeOpened}/>
                            </div>
                        )}
                    </div>
                    {error && <p className="flex text-red-400 text-sm mt-2">{error}</p>}
                </div>
            </div>
        </div>
    );
};

export default TextInput;
