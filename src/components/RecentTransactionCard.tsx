import React from 'react';
import Image from "next/image";
import Status from "@/components/Status";
import InfoCardItem from "@/components/InfoCardItem";
import {IRecentTransactionCardProps} from "@/utils/interfaces/IRecentTransactionCardProps";
import {formatAmount, formatAmountGHS, normalizeDate} from "@/utils/lib";

const RecentTransactionCard: React.FC<IRecentTransactionCardProps> = ({transaction, customStyles}) => {
    return (
        <div key={transaction?.externalId} className={`relative flex items-center ${customStyles}`}>
            <div className="min-w-0 flex-1">
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
                            <InfoCardItem description={formatAmount(formatAmountGHS(transaction?.amount ?? ''))}
                                          title={transaction?.accountName ?? ''}
                                          customDescriptionStyles="font-semibold"
                                          customTitleStyles="font-semibold text-xs"
                            />
                            <div
                                className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                <p className="text-xs leading-5 text-gray-500">
                                    {normalizeDate(transaction?.createdAt ?? '')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecentTransactionCard;
