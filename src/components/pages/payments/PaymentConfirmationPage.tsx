'use client'
import React, {useState} from 'react';
import {notFound} from "next/navigation";
import PaymentConfirmationBody from "@/components/pages/payments/PaymentConfirmationBody";
import PaymentConfirmationFooter from "@/components/pages/payments/PaymentConfirmationFooter";
import PaymentConfirmationHeader from "@/components/pages/payments/PaymentConfirmationHeader";
import ModalDialog from "@/components/pages/payments/ModalDialog";
import PaymentModal from "@/components/pages/payments/PaymentModal";
import {PaymentInfo} from "@/utils/types";
import IDCard from "@/assets/svgs/IdCard.svg";
import UserCircle from "@/assets/svgs/UserCircle.svg";
import Amount from "@/assets/svgs/Amount.svg";
import ShortDescription from "@/assets/svgs/ShortDescription.svg";
import CheckCircle from "@/assets/svgs/CheckCircle.svg";
import Error from "@/assets/svgs/Error.svg";

interface Props {
    id: string;
}

const PaymentConfirmationPage = ({id}: Props) => {

    if (!id) return notFound();

    const [isModalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState(""); // 'success' or 'error'

    //To be Fetched
    const data: PaymentInfo = {
        transactionId: "455122",
        amount: "GHS 60,000.00",
        name: "Kwaku Frimpong",
        description: "A Short description of the customer",
    };

    const iconData = [
        {label: "Transaction ID", value: data.transactionId, icon: IDCard},
        {label: "Name", value: data.name, icon: UserCircle},
        {label: "Amount", value: data.amount, icon: Amount},
        {label: "Description", value: data.description, icon: ShortDescription},
    ];

    const handleConfirmPayment = () => {
        setModalType("success");
        setModalOpen(true);
    };

    const handleRejectPayment = () => {
        setModalType("error");
        setModalOpen(true);
    };

    const handleReturn = () => {
        setModalOpen(false);
    };

    //To be Fetched
    const merchantName = "CompleteFarmer";

    return (
        <>
            <ModalDialog isOpen={isModalOpen} onClose={handleReturn}>
                <PaymentModal
                    title={modalType === "success" ? "Payment Successful" : "Payment Failed"}
                    description={
                        modalType === "success"
                            ? `Payment made to ${merchantName} has been made successfully`
                            : "There was an issue trying to process your payment. Please try again."
                    }
                    icon={modalType === "success" ? CheckCircle : Error}
                    iconData={iconData}
                    returnButtonLabel={modalType === "success" ? "Return" : "Try again"}
                    onReturn={handleReturn}
                />
            </ModalDialog>

            <div className="flex justify-center mt-4 mb-[185px]">
                <div className="w-5/12 border rounded-[10px] overflow-hidden">
                    <div className="border-b border-gray-300">
                        <PaymentConfirmationHeader/>
                    </div>
                    <PaymentConfirmationBody/>
                    <PaymentConfirmationFooter onConfirmPayment={handleConfirmPayment}
                                               onRejectPayment={handleRejectPayment}/>
                </div>
            </div>
        </>
    );
};

export default PaymentConfirmationPage;
