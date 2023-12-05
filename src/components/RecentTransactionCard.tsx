import React from 'react';
import Image from "next/image";
import Status from "@/components/Status";
import InfoCardItem from "@/components/InfoCardItem";
import {IRecentTransactionCardProps} from "@/utils/interfaces/IRecentTransactionCardProps";
import {normalizeDate} from "@/utils/lib";

const RecentTransactionCard: React.FC<IRecentTransactionCardProps> = ({transaction, customStyles}) => {
    return (
        <li className={`overflow-hidden flex justify-between gap-x-2 mb-2 ${customStyles}`}>
            <div className="flex min-w-0 gap-x-3">
                <Image src="/assets/icons/file-dark.svg" alt="file"
                       width={0} height={24} style={{width: "auto"}}/>

                <div className="min-w-0">
                    <div className="flex items-center">
                        <Status status={transaction?.status ?? ''} customStyles="flex items-center pb-[6px]"/>
                        <div
                            className="w-1 h-1 bg-gray-900 rounded-full flex items-end justify-center p-[2px] m-1"/>
                        <div className="text-xs">{transaction?.type}</div>
                    </div>

                    <div className="flex justify-between md:gap-4">
                        <InfoCardItem description={transaction?.amount}
                                      title={transaction?.recipient}
                                      customDescriptionStyles="font-semibold"/>
                        <div
                            className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                            <p className="text-xs leading-5 text-gray-500">
                                {normalizeDate(transaction?.createdAt ?? '')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
};

export default RecentTransactionCard;
