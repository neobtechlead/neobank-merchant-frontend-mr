import React, {useState} from 'react';
import Svg from "@/components/Svg";
import {Copy} from "@/assets/icons/Copy";
import {useCopyToClipboard} from "usehooks-ts";

const CopyButton: React.FC<ICopyProps> = ({
                                              text = '',
                                              getTooltipText,
                                              getCopiedValue
                                          }) => {
    const [value, copy] = useCopyToClipboard()
    const [tooltipText, setTooltipText] = useState<string>('Copy')

    const handleCopyPaymentLink = async (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault()
        try {
            await copy(text).then(response => {
                setTooltipText('Copied')
                if (getCopiedValue) getCopiedValue(value ?? '')
                if (getTooltipText) getTooltipText(value ?? '')
            })
        } catch (error) {
            console.error('Error copying text:', error);
        }
    }

    const handleResetTooltipText = async (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault()
        setTimeout(() => {
            setTooltipText('copy');
        }, 100);
    }

    return (
        <div className="cursor-pointer p-2 group flex relative"
             onClick={handleCopyPaymentLink} onMouseLeave={handleResetTooltipText}>
            <Svg fill="#4F4F4F" path={Copy} customClasses="cursor-pointer"/>
            <span
                className="group-hover:opacity-100 transition-opacity bg-gray-700 px-1 text-sm text-gray-100 rounded absolute top-[-2rem] left-1/2 -translate-x-1/2 opacity-0 m-4 mx-auto z-50 truncate">
                {tooltipText}
            </span>
        </div>
    );
};

export default CopyButton;
