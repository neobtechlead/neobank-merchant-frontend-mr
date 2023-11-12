import React from 'react';
import Image from "next/image";

interface Props {
    label: string,
    value: string,
    icon: string

}

const IconWithStackedTextLabels = ({label, value, icon}: Props) => {
    return (
        <div className="flex items-center gap-4 my-6 px-4">
            <div>
                <Image src={icon} alt="" priority={true}/>
            </div>
            <div className={`flex flex-col`}>
                <span className="text-xs text-grey-900 font-semibold leading-4">{label}</span>
                <span className="text-sm">{value}</span>
            </div>

        </div>
    );
};

export default IconWithStackedTextLabels;