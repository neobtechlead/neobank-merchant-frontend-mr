import React from 'react';
import Svg from "@/components/Svg";
import {UserCircle} from "@/assets/icons/UserCircle";
import {Phone} from "@/assets/icons/Phone";
import {Calendar} from "@/assets/icons/Calendar";
import {ClipboardText} from "@/assets/icons/ClipboardText";
import Button from "@/components/forms/Button";
import {Clock} from "@/assets/icons/Clock";
import {Tag} from "@/assets/icons/Tag";
import {Sigma} from "@/assets/icons/Sigma";
import {Copy} from "@/assets/icons/Copy";
import Alert from "@/components/Alert";
import {WarningTriangle} from "@/assets/icons/WarningTriangle";
import InfoCardItem from "@/components/InfoCardItem";

const TransactionConfirmation: React.FC = ({
                                               transactionType,
                                               transaction,
                                               summary,
                                               customStyles,
                                               handleConfirmation,
                                               handleCancel
                                           }) => {
    return (
        <div className="m-6 flex flex-col h-full">
            {transactionType === 'single' && <div className={`flex flex-2 ${customStyles}`}>
                <div className={`relative flex flex-col min-w-0 flex-1 rounded-lg border px-4 mb-10 ${customStyles}`}>
                    <InfoCardItem description={transaction.recipient} svgPath={UserCircle} title="Recipients Name"
                                  customStyles="py-5"/>
                    <InfoCardItem description={transaction.phone} svgPath={Phone} title="Recipient's Phone Number"
                                  customStyles="py-5"/>
                    <InfoCardItem description={transaction.amount} svgPath={Tag} title="Total Amount"
                                  customStyles="py-5"/>
                    <InfoCardItem description={transaction.description} svgPath={ClipboardText} title="Description"
                                  customStyles="py-5"/>
                    {transaction.date &&
                        <InfoCardItem description={transaction.date} svgPath={Calendar} title="Scheduled Date"
                                      customStyles="py-5"/>}
                    {transaction.time &&
                        <InfoCardItem description={transaction.time} svgPath={Clock} title="Scheduled Time"
                                      customStyles="py-5"/>}
                </div>
            </div>}

            {transactionType === 'bulk' && <div className={`${customStyles}`}>
                <h5 className="mb-3 text-xs truncate">After analysing your file, we found the following results</h5>

                <div className={`relative flex justify-between min-w-0 flex-1 rounded-lg border px-4 ${customStyles}`}>
                    <div className="flex flex-shrink-0 gap-3 my-5">
                        <Svg fill="black" path={Sigma}/>
                        <div className="truncate">
                            <p className="truncate text-xs font-bold text-gray-600">Total Count</p>
                            <p className="truncate text-gray-950">{summary?.count} 250</p>
                        </div>
                    </div>
                    <div className="flex flex-shrink-0 gap-3 my-5">
                        <Svg fill="#F29339" path={Copy}/>
                        <div className="truncate text-orange-400">
                            <p className="truncate text-xs font-semibold">Duplicates</p>
                            <p className="truncate font-sans">{summary?.duplicates } 0</p>
                        </div>
                    </div>
                </div>

                <Alert customClasses="rounded-lg bg-orange-400 my-5 text-white">
                    <div className="p-2">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <Svg fill="white" path={WarningTriangle}/>
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium">ALERT!</h3>
                                <div className="mt-2 text-xs">
                                    <p>
                                        If you continue with this transaction, you will transfer a sum of GHS 59,000.00 including 20 duplicates
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Alert>

                <div className={`relative flex flex-col min-w-0 flex-1 rounded-lg border px-4 mb-10`}>
                    <div className="flex flex-shrink-0 gap-3 my-5">
                        <Svg fill="#4F4F4F" path={ClipboardText}/>
                        <div className="truncate">
                            <p className="truncate text-xs text-gray-600">Description</p>
                            <p className="truncate text-gray-950">{summary?.description}</p>
                        </div>
                    </div>

                    <div className="flex flex-shrink-0 gap-3 my-5">
                        <Svg fill="#4F4F4F" path={Tag}/>
                        <div className="truncate">
                            <p className="truncate text-xs text-gray-600">Total Amount</p>
                            <p className="truncate text-gray-950">GHS {summary?.amount}</p>
                        </div>
                    </div>
                </div>
            </div>}

            <div className="">
                <Button buttonType="button" styleType="primary"
                        customStyles="mt-10 justify-center p-4 md:p-5 rounded-lg"
                        onClick={() => handleConfirmation(transactionType)}
                >
                    <div className="flex items-center justify-center gap-2">Disburse Funds</div>
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

export default TransactionConfirmation;