import EmptyTransactionCardContent from "@/components/EmptyTransactionCardContent";
import Card from "@/components/Card";
import React from "react";
import RecentTransactionCard from "@/components/RecentTransactionCard";
import {IEmptyTransactionCardContentProps} from "@/utils/interfaces/IEmptyTransactionCardContentProps";

const TransactionCardContainer: React.FC<IEmptyTransactionCardContentProps> = ({
                                                                                   title,
                                                                                   data,
                                                                                   emptyTitle = 'No data available',
                                                                                   emptyDescription,
                                                                                   children
                                                                               }) => {
    return (
        <Card
            customStyles={`lg:w-2/3 flex flex-col p-3 w-full border border-purple-900 rounded-l-2xl rounded-r-0 h-[197px] `}>
            <div className="flex flex-col h-full">
                <h5 className="text-sm md:font-medium leading-6">{title}</h5>
                {data?.length === 0 && (
                    <EmptyTransactionCardContent showContent={false}>
                        {children}
                        <div className="flex flex-col justify-center items-center">
                            <h5 className="font-semibold">{emptyTitle}</h5>
                            <p className="font-normal text-xs text-center mt-1 lg:w-2/3 md:w-2/3 sm:w-1/3 sm:mx-6">{emptyDescription}</p>
                        </div>
                    </EmptyTransactionCardContent>
                )}
                <div className="grid grid-cols-2 gap-x-10 gap-y-5">
                    {data?.map((transaction) => (
                        <RecentTransactionCard transaction={transaction}
                                               customStyles="flex-grow space-x-3 rounded-lg hover:border-gray-400"/>
                    ))}
                </div>
            </div>
        </Card>
    );
};

export default TransactionCardContainer