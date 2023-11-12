import React from 'react';
import {poppins, roboto} from '@/fonts';
import Image from 'next/image';
import SolidX from '@/assets/svgs/SolidX.png';
import MSOutLookLogo from '@/assets/svgs/MSOutlookLogo.svg';
import LinkSVG from '@/assets/svgs/Link.svg';
import {PaymentData} from "@/utils/types";

interface Props {
    data: PaymentData
}

const PaymentConfirmationHeader = ({data}: Props) => {
    return (
        <div>
            <div className="bg-[#652D90]">
                <div className={`px-6 py-10 bg-[url('/assets/svgs/PurpleSVG.svg')] text-white ${poppins.className}`}>
                    <div className="flex gap-3 p-2">
                        <Image src={LinkSVG} alt=""/>
                        <span>Payment Link</span>
                    </div>
                    <p className="text-[13px] text-gray-200 ">
                        You received this payment link from the creator. Please provide the necessary information here
                        to inform the
                        customer about the purpose of this page and what actions they need to take. This should be about
                        4-5 lines of
                        content.
                    </p>
                </div>
            </div>
            <div className="flex-col items-center px-6">
                <span className={`text-xs text-grey-900 font-semibold ${poppins.className}`}>From</span>
                <div className="flex justify-between items-center mb-3">
                    <div className="flex gap-2 items-center">
                        <Image src={SolidX} alt=""/>
                        <span className={`font-bold text-lg ${roboto.className}`}>{data.merchantName}</span>
                    </div>
                    <div className="flex items-center gap-4 my-2 px-4">
                        <div>
                            <Image src={MSOutLookLogo} alt="" priority={true}/>
                        </div>
                        <div className={`flex flex-col ${poppins.className}`}>
                            <span className="text-xs text-grey-900 font-semibold">To</span>
                            <span className="text-sm">{data.email}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentConfirmationHeader;
