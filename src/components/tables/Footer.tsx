import React, {useState} from 'react';
import Svg from "@/components/Svg";
import {CaretLeft, CaretRight} from "@/assets/icons/Caret";
import ListBox from "@/components/forms/ListBox";
import {IListBoxItem} from "@/utils/interfaces/IDropdownProps";

interface FooterProps {
    from?: number;
    to?: number;
    total?: number;
    handlePrevious: () => void;
    handleNext: () => void;
}

const Footer: React.FC<FooterProps> = ({handlePrevious, handleNext, from, to, total}) => {
    const perPageOptions = [
        {label: '10', value: '10'},
        {label: '20', value: '20'}
    ]

    const [pageOption, setPageOption] = useState<IListBoxItem>({
        label: '10',
        value: '10'
    });

    return (
        <div className="flex items-center justify-between bg-white px-4 sm:px-6">
            <div className="flex flex-1 justify-between items-center sm:hidden">
                <div className="text-xs">
                    <span className="font-medium">{from}</span> to <span
                    className="font-medium">{to}</span> of{' '}
                    <span className="font-medium">57</span>
                </div>

                <div className="flex">
                    <div onClick={() => handlePrevious} className="cursor-pointer">
                        <Svg fill="#4F4F4F" path={CaretLeft}/>
                    </div>
                    <div onClick={() => handleNext} className="cursor-pointer">
                        <Svg fill="#4F4F4F" path={CaretRight}/>
                    </div>
                </div>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div className="flex items-center">
                    <p className="text-sm text-gray-700 font-semibold mr-3">
                        Show rows per page
                    </p>
                    <ListBox data={perPageOptions} optionSelected={pageOption} setOptionSelected={setPageOption} customButtonClasses="p-2"/>
                </div>
                <div className="flex items-center">
                    <div className="text-xs mr-5">
                        <span className="font-medium">{from}</span> to <span
                        className="font-medium">{to}</span> of{' '}
                        <span className="font-medium">{total}</span>
                    </div>

                    <div onClick={() => handlePrevious} className="cursor-pointer">
                        <Svg fill="#4F4F4F" path={CaretLeft}/>
                    </div>
                    <div onClick={() => handleNext} className="cursor-pointer">
                        <Svg fill="#4F4F4F" path={CaretRight}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;

