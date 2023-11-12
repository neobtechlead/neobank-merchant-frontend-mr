import React from 'react';
import Image from "next/image";
import {poppins} from "@/fonts";
import TextButton from "@/components/pages/payments/TextButton";
import IconWithStackedTextLabels from "@/components/pages/payments/IconWithStackedTextLabels";
import type {IconWithData} from "@/utils/types";


interface Props {
    title: string;
    description: string;
    icon: string;
    iconData: IconWithData[];
    returnButtonLabel: string;
    onReturn: () => void;
}

const PaymentModal = ({
                          title,
                          description,
                          icon,
                          iconData,
                          returnButtonLabel,
                          onReturn,
                      }: Props) => {

    return (
        <>
            <div className={`flex flex-col items-center justify-center ${poppins.className}`}>
                <Image src={icon} alt="" priority={true} className="mb-5"/>
                <span className="text-[28px] font-semibold mb-[5px]">{title}</span>
                <span className="text-grey-900 text-center">{description}</span>
            </div>
            <div className="border border-gray-300 rounded-xl p-3 my-[42px]">
                {iconData.map((data, index) => (
                    <IconWithStackedTextLabels key={index} label={data.label ?? ""} value={data.value ?? ""}
                                               icon={data.icon ?? ""}/>
                ))}
            </div>

            <div className={`flex flex-col  text-[13px]`}>
                <TextButton label={returnButtonLabel} onClick={onReturn}
                            className="mt-4 bg-[#652D90] text-white py-4 px-5"/>
            </div>
        </>
    );
};

export default PaymentModal;
