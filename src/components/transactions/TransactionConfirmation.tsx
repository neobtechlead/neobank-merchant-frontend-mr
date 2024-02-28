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
import {ITransactionConfirmation} from "@/utils/interfaces/ITransactionConfirmation";
import {formatAmount, formatAmountGHS} from "@/utils/lib";

const TransactionConfirmation: React.FC<ITransactionConfirmation> = ({
                                                                         transactionType,
                                                                         transaction,
                                                                         summary,
                                                                         customStyles,
                                                                         handleConfirmation,
                                                                         handleCancel
                                                                     }) => {
    const transactionHasDuplicates = () => ![0, null, undefined].includes(summary?.totalDuplicateCount)

    return (
        <div className="m-6 flex flex-col h-full">
            {transactionType === 'single' && <div className={`flex flex-2 ${customStyles}`}>
                <div className={`relative flex flex-col min-w-0 flex-1 rounded-lg border px-4 mb-10 ${customStyles}`}>
                    <InfoCardItem description={transaction.recipient ?? ''} svgPath={UserCircle} title="Recipients Name"
                                  customStyles="py-5" customDescriptionStyles="text-sm"/>
                    <InfoCardItem description={transaction.phone ?? ''} svgPath={Phone} title="Recipient's Phone Number"
                                  customStyles="py-5" customDescriptionStyles="text-sm"/>
                    <InfoCardItem description={formatAmount(transaction.amount)} svgPath={Tag} title="Total Amount"
                                  customStyles="py-5" customDescriptionStyles="text-sm"/>
                    <InfoCardItem description={transaction.description ?? ''} svgPath={ClipboardText}
                                  title="Description"
                                  customStyles="py-5"
                                  customTitleStyles="truncate"
                    />
                    {transaction.scheduled &&
                        <InfoCardItem description={transaction.date ?? ''} svgPath={Calendar} title="Scheduled Date"
                                      customStyles="py-5" customDescriptionStyles="text-sm"/>}
                    {transaction.scheduled &&
                        <InfoCardItem description={transaction.time ?? ''} svgPath={Clock} title="Scheduled Time"
                                      customStyles="py-5" customDescriptionStyles="text-sm"/>}
                </div>
            </div>}

            {transactionType === 'bulk' && <div className={`${customStyles}`}>
                <h5 className="mb-3 text-xs truncate">After analysing your file, we found the following results</h5>

                <div className={`relative flex justify-between min-w-0 flex-1 rounded-lg border px-4 ${customStyles}`}>
                    <div className="flex flex-shrink-0 gap-3 my-5">
                        <InfoCardItem
                            description={summary?.totalCount.toString()}
                            svgPath={Sigma} title="Total Count"
                            customStyles="py-5"
                            customTitleStyles="text-xs font-semibold text-gray-950"
                        />
                    </div>
                    <div className="flex flex-shrink-0 gap-3 my-5 text-orange-400">
                        <InfoCardItem
                            description={summary?.totalDuplicateCount.toString()}
                            svgFill="#F29339"
                            svgPath={Copy} title="Duplicates"
                            customStyles="py-5"
                            customTitleStyles="text-xs font-semibold text-orange-400"
                            customDescriptionStyles="text-orange-400"
                        />
                    </div>
                </div>

                {transactionHasDuplicates() && <Alert customClasses="rounded-lg bg-orange-400 mt-5 text-white">
                    <div className="p-2">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <Svg fill="white" path={WarningTriangle}/>
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium">ALERT!</h3>
                                <div className="mt-2 text-xs">
                                    <p>{`If you continue with this transaction, you will transfer a sum of ${formatAmount(formatAmountGHS(summary?.totalAmount))}
                                        including ${summary?.totalDuplicateCount} duplicates
                                    `}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Alert>}

                <div className="relative flex flex-col min-w-0 flex-1 rounded-lg border px-4 mb-10 mt-5">
                    <div className="flex flex-shrink-0 mt-1">
                        <InfoCardItem
                            description={transaction?.description ?? ''}
                            svgPath={ClipboardText} title="Description"
                            customStyles="py-5"
                            customTitleStyles="text-xs font-semibold"
                            customDescriptionStyles="text-sm"
                        />
                    </div>
                    <div className="flex flex-shrink-0 gap-3 mb-1">
                        <InfoCardItem
                            description={formatAmount(formatAmountGHS(summary?.totalAmount))}
                            svgPath={Tag} title="Total Amount"
                            customStyles="py-5"
                            customTitleStyles="text-xs font-semibold"
                            customDescriptionStyles="text-sm"
                        />
                    </div>
                </div>
            </div>}

            <div className="">
                <Button buttonType="button" styleType="primary"
                        customStyles="mt-10 justify-center p-4 md:p-5 rounded-lg w-full"
                        onClick={() => handleConfirmation(transactionType)}
                >
                    <div className="flex items-center justify-center gap-2">Proceed</div>
                </Button>

                <Button buttonType="button" styleType="tertiary"
                        customStyles="mt-4 justify-center p-4 md:p-5 border border-red-500 rounded-lg w-full"
                        onClick={() => handleCancel(false)}
                >
                    <div className="flex items-center justify-center gap-2 text-red-500">Cancel</div>
                </Button>
            </div>
        </div>
    )
}

export default TransactionConfirmation;