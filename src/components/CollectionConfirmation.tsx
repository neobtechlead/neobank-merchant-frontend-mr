import React from 'react';
import {UserCircle} from "@/assets/icons/UserCircle";
import {Phone} from "@/assets/icons/Phone";
import {ClipboardText} from "@/assets/icons/ClipboardText";
import Button from "@/components/forms/Button";
import {Tag} from "@/assets/icons/Tag";
import Alert from "@/components/Alert";
import InfoCardItem from "@/components/InfoCardItem";
import {Email} from "@/assets/icons/Email";
import {ICollectionConfirmationProps} from "@/utils/interfaces/ICollectionConfirmationProps";

const CollectionConfirmation: React.FC<ICollectionConfirmationProps> = ({
                                               transaction,
                                               customStyles,
                                               handleConfirmation,
                                               handleCancel
                                           }) => {
    return (
        <div className="m-6 flex flex-col h-full">
            <Alert customClasses="rounded bg-orange-400 my-5 text-white" alertType="warning" description="Expires after 5 days"/>

            <div className={`flex flex-2 ${customStyles}`}>
                <div className={`relative flex flex-col min-w-0 flex-1 rounded-lg border px-4 mb-10 ${customStyles}`}>
                    <InfoCardItem description={transaction?.recipient} svgPath={UserCircle} title="Recipients Name"
                                  customStyles="py-5"/>
                    <InfoCardItem description={transaction?.email} svgPath={Email} title="Email Address"
                                  customStyles="py-5"/>
                    <InfoCardItem description={transaction?.reference} svgPath={ClipboardText} title="Reference"
                                  customStyles="py-5"/>
                    <InfoCardItem description={transaction?.phone} svgPath={Phone} title="Recipient's Contact Number"
                                  customStyles="py-5"/>
                    <InfoCardItem description={transaction?.amount} svgPath={Tag} title="Amount"
                                  customStyles="py-5"/>
                </div>
            </div>

            <div className="pb-10">
                <Button buttonType="button" styleType="primary"
                        customStyles="mt-10 justify-center p-4 md:p-5 rounded-lg"
                        onClick={handleConfirmation}
                >
                    <div className="flex items-center justify-center gap-2">Generate link</div>
                </Button>

                <Button buttonType="button" styleType="tertiary"
                        customStyles="mt-4 justify-center p-4 md:p-5 border border-red-500 rounded-lg"
                        onClick={() => handleCancel(false)}
                >
                    <div className="flex items-center justify-center gap-2 text-red-500">Cancel</div>
                </Button>
            </div>
        </div>
    )
}

export default CollectionConfirmation;