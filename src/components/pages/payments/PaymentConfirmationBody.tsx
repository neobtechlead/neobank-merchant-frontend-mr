import React from 'react';
import Image from "next/image";
import ExclamationMark from "@/assets/svgs/ExclamatoryMark.svg";
import IconWithStackedTextLabels from "@/components/pages/payments/IconWithStackedTextLabels";
import UserCircle from "@/assets/svgs/UserCircle.svg";
import Amount from "@/assets/svgs/Amount.svg";
import ShortDescription from "@/assets/svgs/ShortDescription.svg";

const PaymentConfirmationBody = () => {
    return (
        <div className="px-6">
            <div className="flex gap-3 text-orange-920 bg-orange-910 p-1 rounded my-[30px]">
                <Image src={ExclamationMark} alt=""/>
                <span>Only confirm payment if details are correct</span>
            </div>
            <div className="border border-gray-300 rounded-xl p-3">
                <IconWithStackedTextLabels label="Individual Name" value="Kwaku Frimpong" icon={UserCircle}/>
                <IconWithStackedTextLabels label="Amount" value="GHS 60,000" icon={Amount}/>
                <IconWithStackedTextLabels label="Description" value="A short description about the customer"
                                           icon={ShortDescription}/>
            </div>
        </div>
    );
};

export default PaymentConfirmationBody;