import React from 'react';
import Svg from "@/components/Svg";
import {CheckCircle} from "../../../public/assets/icons/CheckCircle";
import {XCircle} from "../../../public/assets/icons/XCircle";
import {IdentificationCard} from "../../../public/assets/icons/IdentificationCard";
import {UserCircle} from "../../../public/assets/icons/UserCircle";
import {Info} from "../../../public/assets/icons/Info";
import {Phone} from "../../../public/assets/icons/Phone";
import {Calendar} from "../../../public/assets/icons/Calendar";
import {ClipboardText} from "../../../public/assets/icons/ClipboardText";
import Button from "@/components/forms/Button";
import {Download} from "../../../public/assets/icons/Download";
import {ITransactionDetailProps} from "@/utils/interfaces/ITransactionProps";
import Alert from "@/components/Alert";

const TransactionDetail: React.FC<ITransactionDetailProps> = ({transaction, customStyles}) => {

    return (
        <div className={`border-gray-200 p-6 ${customStyles}`}>
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
                        <div className="flex flex-shrink-0 gap-3 my-5">
                            <Svg fill="#008000" path={CheckCircle}/>
                            <div className="truncate" style={{color: "#008000"}}>
                                <p className="truncate text-xs font-semibold">Successful</p>
                                <p className="truncate">250/270</p>
                            </div>
                        </div>
                        <div className="flex flex-shrink-0 gap-3 my-5">
                            <Svg fill="#EB2F2F" path={XCircle}/>
                            <div className="truncate" style={{color: "#EB2F2F"}}>
                                <p className="truncate text-xs font-semibold">Failed</p>
                                <p className="truncate">20/270</p>
                            </div>
                        </div>
                    </div>}

                    <div className="flex flex-shrink-0 gap-3 my-5">
                        <Svg fill="#4F4F4F" path={IdentificationCard}/>
                        <div className="truncate">
                            <p className="truncate text-xs font-semibold text-gray-600">Transaction ID</p>
                            <p className="truncate text-gray-950">{transaction.id}</p>
                        </div>
                    </div>

                    {transaction.batchNumber && <div className="flex flex-shrink-0 gap-3 my-5">
                        <Svg fill="#4F4F4F" path={UserCircle}/>
                        <div className="truncate">
                            <p className="truncate text-xs font-semibold text-gray-600">Batch Name</p>
                            <p className="truncate text-gray-950">{transaction.batchNumber}</p>
                        </div>
                    </div>}

                    {transaction.recipient && <div className="flex flex-shrink-0 gap-3 my-5">
                        <Svg fill="#4F4F4F" path={Info}/>
                        <div className="truncate">
                            <p className="truncate text-xs font-semibold text-gray-600">Recipient's Name</p>
                            <p className="truncate text-gray-950">{transaction.recipient}</p>
                        </div>
                    </div>}

                    <div className="flex flex-shrink-0 gap-3 my-5">
                        <Svg fill="#4F4F4F" path={Phone}/>
                        <div className="truncate">
                            <p className="truncate text-xs font-semibold text-gray-600">Phone Number</p>
                            <p className="truncate text-gray-950">{transaction.phone}</p>
                        </div>
                    </div>

                    <div className="flex flex-shrink-0 gap-3 my-5">
                        <Svg fill="#4F4F4F" path={Calendar}/>
                        <div className="truncate">
                            <p className="truncate text-xs font-semibold text-gray-600">Schedule Date</p>
                            <p className="truncate text-gray-950">{transaction.date}</p>
                        </div>
                    </div>

                    <div className="flex flex-shrink-0 gap-3 my-5">
                        <Svg fill="#4F4F4F" path={ClipboardText}/>
                        <div className="truncate">
                            <p className="truncate text-xs font-semibold text-gray-600">Reference</p>
                            <p className="truncate text-gray-950">{transaction.reference}</p>
                        </div>
                    </div>
                </div>

                {transaction.type === 'bulk' && <Button buttonType="primary" styleType="primary"
                                                        customStyles="mt-10 justify-center p-4 md:p-5 focus:outline-none">
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