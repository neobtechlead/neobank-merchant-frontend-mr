import React from 'react';
import Svg from "@/components/Svg";
import {CheckCircle} from "@/assets/icons/CheckCircle";
import {XCircle} from "@/assets/icons/XCircle";
import {IdentificationCard} from "@/assets/icons/IdentificationCard";
import {UserCircle} from "@/assets/icons/UserCircle";
import {Info} from "@/assets/icons/Info";
import {Phone} from "@/assets/icons/Phone";
import {Calendar} from "@/assets/icons/Calendar";
import {ClipboardText} from "@/assets/icons/ClipboardText";
import Button from "@/components/forms/Button";
import {Download} from "@/assets/icons/Download";
import {ITransactionDetailProps} from "@/utils/interfaces/ITransactionProps";
import Alert from "@/components/Alert";
import InfoCardItem from "@/components/InfoCardItem";

const TransactionDetail: React.FC<ITransactionDetailProps> = ({transaction, customClasses}) => {

    return (
        <div className={`border-gray-200 p-6 ${customClasses}`}>
            <div className="capitalize">
                <Alert
                    alertType={transaction.status}
                    description={`${transaction.status} Transaction`}
                    descriptionClasses=""
                />
            </div>

            <div className="mt-4">
                <h5 className="font-bold text-2xl">GHS {transaction.amount}</h5>
                <div className="relative flex flex-col min-w-0 flex-1 my-2 mx-4">
                    {transaction.type === 'bulk' && <div className="grid grid-cols-2">
                        <InfoCardItem description={"250/270"}
                                      title="Successful"
                                      customStyles="my-2"
                                      customTitleStyles="text-green-700"
                                      customDescriptionStyles="text-green-700"
                                      svgPath={CheckCircle}
                                      svgFill="#008000"
                        />
                        <InfoCardItem description={"20/270"}
                                      title="Failed"
                                      customStyles="my-2"
                                      customTitleStyles="text-red-500"
                                      customDescriptionStyles="text-red-500"
                                      svgPath={XCircle}
                                      svgFill="#EB2F2F"
                        />
                    </div>}

                    <InfoCardItem description={transaction.id}
                                  title="Transaction ID"
                                  customStyles="my-2"
                                  customTitleStyles="mt-5"
                                  svgPath={IdentificationCard}
                    />

                    {transaction.batchNumber &&
                        <InfoCardItem description={transaction.batchNumber}
                                      title="Batch Name"
                                      customStyles="my-2"
                                      customTitleStyles="mt-5"
                                      svgPath={UserCircle}
                        />}

                    {transaction.recipient &&
                        <InfoCardItem description={transaction.recipient}
                                      title="Recipient's Name"
                                      customStyles="my-2"
                                      customTitleStyles="mt-5"
                                      svgPath={Info}
                        />}

                    <InfoCardItem description={transaction.phone}
                                  title="Phone Number"
                                  customStyles="my-2"
                                  customTitleStyles="mt-5"
                                  svgPath={Phone}
                    />

                    <InfoCardItem description={transaction.date}
                                  title="Schedule Date"
                                  customStyles="my-2"
                                  customTitleStyles="mt-5"
                                  svgPath={Calendar}
                    />

                    <InfoCardItem description={transaction.reference}
                                  title="Reference"
                                  customStyles="my-2"
                                  customTitleStyles="mt-5"
                                  svgPath={ClipboardText}
                    />
                </div>

                {transaction.type === 'bulk' && <Button buttonType="button" styleType="primary"
                                                        customStyles="mt-10 justify-center p-4 md:p-5 focus:outline-none rounded-lg">
                    <div className="flex items-center justify-center gap-2">
                        <div className="flex"><Svg fill="white" path={Download}/></div>
                        <span className="flex">Download Transaction</span>
                    </div>
                </Button>}
            </div>
        </div>
    )
}

export default TransactionDetail;