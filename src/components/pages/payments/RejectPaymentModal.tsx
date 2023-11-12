'use client'
import React from "react";
import ModalDialog from "@/components/pages/payments/ModalDialog";
import TextButton from "@/components/pages/payments/TextButton";
import RejectedHeader from "@/components/pages/payments/RejectedHeader";


interface Props {
    handleReject: () => void,
    handleNoReject: () => void
    isOpen: boolean,
    onClose: () => void,
}


const RejectPaymentModal = ({handleReject, handleNoReject, isOpen, onClose}: Props) => {
    return <>
        <ModalDialog
            isOpen={isOpen}
            onClose={onClose}
            className="w-[31rem] bg-white shadow-lg rounded-lg  mt-8 md:p-10 sm:p-6"
            backdropClassName="bg-black/70"
        >
            <div>
                <div className="flex-col flex items-center justify-center">
                    <RejectedHeader
                        title="Reject Payment"
                        description="Are you sure you want to reject this payment link? This action cannot be undone."/>
                </div>
                <div className="flex justify-center gap-5 mt-12">
                    <TextButton label="No" onClick={handleNoReject} className="border border-[#E6E6E6] flex-1 py-3"/>
                    <TextButton label="Yes" onClick={handleReject} className="text-white bg-[#652D90] flex-1 py-3"/>

                </div>
            </div>

        </ModalDialog>
    </>

};

export default RejectPaymentModal;