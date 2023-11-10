import React from 'react';
import Svg from "@/components/Svg";
import {UserCircle} from "../../../public/assets/icons/UserCircle";
import {Phone} from "../../../public/assets/icons/Phone";
import {Calendar} from "../../../public/assets/icons/Calendar";
import {ClipboardText} from "../../../public/assets/icons/ClipboardText";
import Button from "@/components/forms/Button";
import {Clock} from "../../../public/assets/icons/Clock";
import {Tag} from "../../../public/assets/icons/Tag";


const TransactionConfirmation: React.FC = ({transaction, customStyles, handleConfirmation, handleCancel}) => {
    return (
        <div className="m-6 flex flex-col h-full">
            <div className="flex flex-2">
                <div className={`relative flex flex-col min-w-0 flex-1 rounded-lg border px-4 mb-10 ${customStyles}`}>
                    <div className="flex flex-shrink-0 gap-3 my-5">
                        <Svg fill="#4F4F4F" path={UserCircle}/>
                        <div className="truncate">
                            <p className="truncate text-xs font-semibold text-gray-600">Recipients Name</p>
                            <p className="truncate text-gray-950">{transaction.recipient}</p>
                        </div>
                    </div>

                    <div className="flex flex-shrink-0 gap-3 my-5">
                        <Svg fill="#4F4F4F" path={Phone}/>
                        <div className="truncate">
                            <p className="truncate text-xs font-semibold text-gray-600">Recipient's Phone Number</p>
                            <p className="truncate text-gray-950">{transaction.phone}</p>
                        </div>
                    </div>

                    <div className="flex flex-shrink-0 gap-3 my-5">
                        <Svg fill="#4F4F4F" path={Tag}/>
                        <div className="truncate">
                            <p className="truncate text-xs font-semibold text-gray-600">Total Amount</p>
                            <p className="truncate text-gray-950">{transaction.amount}</p>
                        </div>
                    </div>

                    <div className="flex flex-shrink-0 gap-3 my-5">
                        <Svg fill="#4F4F4F" path={ClipboardText}/>
                        <div className="truncate">
                            <p className="truncate text-xs font-semibold text-gray-600">Description</p>
                            <p className="truncate text-gray-950">{transaction.description}</p>
                        </div>
                    </div>

                    {transaction.time && <div className="flex flex-shrink-0 gap-3 my-5">
                        <Svg fill="#4F4F4F" path={Calendar}/>
                        <div className="truncate">
                            <p className="truncate text-xs font-semibold text-gray-600">Scheduled Date</p>
                            <p className="truncate text-gray-950">{transaction.date}</p>
                        </div>
                    </div>}

                    {transaction.time && <div className="flex flex-shrink-0 gap-3 my-5">
                        <Svg fill="#4F4F4F" path={Clock}/>
                        <div className="truncate">
                            <p className="truncate text-xs font-semibold text-gray-600">Scheduled Time</p>
                            <p className="truncate text-gray-950">{transaction.time}</p>
                        </div>
                    </div>}
                </div>
            </div>

            <div className="">
                <Button buttonType="button" styleType="primary"
                        customStyles="mt-10 justify-center p-4 md:p-5"
                        onClick={handleConfirmation}
                >
                    <div className="flex items-center justify-center gap-2">Disburse Funds</div>
                </Button>

                <Button buttonType="button" styleType="tertiary"
                        customStyles="mt-4 justify-center p-4 md:p-5 border border-red-500"
                        onClick={() => handleCancel(false)}
                >
                    <div className="flex items-center justify-center gap-2 text-red-500">Cancel</div>
                </Button>
            </div>
        </div>
    )
}

export default TransactionConfirmation;