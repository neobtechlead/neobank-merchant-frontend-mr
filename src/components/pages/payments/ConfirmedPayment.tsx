'use client'
import Loading from "@/app/payments/loading";
import ErrorPage from "@/app/payments/error";
import React from "react";
import useConfirmPayment from "@/components/pages/payments/hooks/useConfirmPayment";

interface Props {
    clientReference: string
}

const ConfirmedPayment = ({clientReference}: Props) => {
    const {error, isLoading} = useConfirmPayment(clientReference);
    return isLoading ? <Loading/> : error ? <ErrorPage errorMessage={error}/> : null

};

export default ConfirmedPayment;