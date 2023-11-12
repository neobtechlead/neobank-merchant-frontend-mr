import React from 'react';
import {poppins} from "@/fonts";
import {PaymentData} from "@/utils/types";
import LinkButton from "@/components/pages/payments/LinkButton";
import TextButton from "@/components/pages/payments/TextButton";

interface Props {
    data: PaymentData,
    onPaymentReject: () => void
}

const PaymentConfirmationFooter = ({data, onPaymentReject}: Props) => {

    return (
        <div className={`flex flex-col px-6 py-[30px] text-[13px] ${poppins.className}`}>
            <LinkButton
                label="Confirm Payment"
                path="/payments"
                queryParams={{confirm: "true", clientReference: data.clientReference}}
                className="text-white"
                color="bg-[#652D90]"
            />
            <TextButton
                onClick={onPaymentReject}
                label="Reject Payment"
                className="mt-7 text-[#EB2F2F]"
            />
        </div>
    );
};

export default PaymentConfirmationFooter;