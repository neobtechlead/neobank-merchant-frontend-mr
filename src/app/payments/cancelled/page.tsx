import React, {Suspense} from 'react';
import RejectedHeader from "@/components/pages/payments/RejectedHeader";
import {sendRejectionNotification} from "@/api/payment";
import Loading from "@/app/payments/loading";

interface Props {
    searchParams: {
        id: string
    }
}

const RejectedPaymentPage = async ({searchParams: {id}}: Props) => {
    await sendRejectionNotification(id)
    return (
        <Suspense fallback={<Loading/>}>
            <div className="fixed inset-0 w-screen overflow-y-auto bg-gray-100">
                <div
                    className="flex flex-col items-center justify-center m-auto rounded-xl  w-[31rem] bg-white shadow-lg  border border-[#E6E6E6] mt-8 md:p-10 sm:p-6">
                    <RejectedHeader
                        title="Payment Link Rejected"
                        description="Contact merchant if you performed this action by mistake."/>

                </div>
            </div>

        </Suspense>
    );
};

export const dynamic = 'dynamic force';

export default RejectedPaymentPage;
