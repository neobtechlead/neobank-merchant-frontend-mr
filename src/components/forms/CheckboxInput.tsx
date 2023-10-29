import React, {useState} from 'react';
import Svg from '@/components/Svg';

interface CheckboxProps {
    label: string;
}

const CheckboxInput: React.FC<CheckboxProps> = ({
                                                    label,
                                                    width = 28,
                                                    height = 28,
                                                }) => {
    const [checked, setChecked] = useState(false);

    const handleCheckboxClick = () => {
        setChecked(!checked);
    };

    return (
        <div className="flex items-center cursor-pointer"
             onClick={handleCheckboxClick}>
            <div
                className={`rounded text-purple-600 bg-purple-${checked ? '950' : 'transparent border'}  border-gray-10 focus:ring-purple-500 flex justify-center items-center`}
                style={{height: height, width: width, background: checked ? "#652D90" : "#FFFFFF"}}
            >
                {checked && (
                    <Svg
                        fill="#FFFFFF"
                        path="M21.5306 7.28063L9.53063 19.2806C9.46098 19.3504 9.37826 19.4057 9.28721 19.4434C9.19616 19.4812 9.09857 19.5006 9 19.5006C8.90144 19.5006 8.80385 19.4812 8.7128 19.4434C8.62175 19.4057 8.53903 19.3504 8.46938 19.2806L3.21938 14.0306C3.07865 13.8899 2.99959 13.699 2.99959 13.5C2.99959 13.301 3.07865 13.1101 3.21938 12.9694C3.36011 12.8286 3.55098 12.7496 3.75001 12.7496C3.94903 12.7496 4.1399 12.8286 4.28063 12.9694L9 17.6897L20.4694 6.21938C20.6101 6.07865 20.801 5.99959 21 5.99959C21.199 5.99959 21.3899 6.07865 21.5306 6.21938C21.6714 6.36011 21.7504 6.55098 21.7504 6.75001C21.7504 6.94903 21.6714 7.1399 21.5306 7.28063Z"
                    />
                )}
            </div>
            <h5 className="ml-3 block text-md leading-6 text-gray-700">
                {label}
            </h5>
        </div>
    );
};

export default CheckboxInput;
