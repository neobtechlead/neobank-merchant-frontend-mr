import React, {useEffect, useState} from 'react';
import EmptyTransactionCardContent from "@/components/EmptyTransactionCardContent";
import Table from "@/components/tables/Table";
import Status from "@/components/Status";
import Footer from "@/components/tables/Footer";
import {useDashboardStore} from "@/store/DashboardStore";
import {FileDownload} from "@/assets/icons/FileDownload";
import {IReportContentProps} from "@/utils/interfaces/IReportContentProps";
import ReportFilter from "@/components/ReportFilter";
import {ReportFilterFormDataType} from "@/utils/types/ReportFilterFormDataType";

const ReportContent: React.FC<IReportContentProps> = ({
                                                          hasActivity,
                                                          setHasActivity,
                                                          showEmptyState,
                                                          setShowEmptyState,
                                                          transactions
                                                      }) => {
    const {
        setHeaderTitle,
        setHeaderDescription
    } = useDashboardStore();

    useEffect(() => {
        setDashboardState()
        setHeaderTitle('')
        setHeaderDescription('')
    }, [])

    const tableHeading = [
        {label: 'date', classes: ''},
        {label: 'transaction id', classes: 'hidden sm:table-cell'},
        {label: 'transaction type', classes: ''},
        {label: 'channel/network', classes: ''},
        {label: 'sender name', classes: ''},
        {label: 'recipient name', classes: ''},
        {label: 'recipient number', classes: ''},
        {label: 'amount', classes: ''},
        {label: 'status', classes: ''},
        {label: 'pre balance', classes: ''}
    ]
    const noActivityDescription = "We regret to inform you that the data required to generate reports is currently unavailable. This may be due to various reasons, including system maintenance, data processing delays, or temporary disruptions."
    const setDashboardState = () => {
        return !transactions.length ? setShowEmptyState(true) : setHasActivity(true)
    }

    const handlePrevious = () => {
    }
    const handleNext = () => {
    }

    const handleDownloadReport = () => {
    }

    const handleSubmitFilter = (data: ReportFilterFormDataType) => {
    }

    return (
        <div className="h-full m-5">
            {showEmptyState && <EmptyTransactionCardContent
                iconPath="/assets/images/reports.svg"
                iconWidth={560}
                iconHeight={0}
                iconCustomStyle="mt-[50px] mb-[14px]"
                customStyles="border rounded-lg m-5"
                showContent
                title="Data for reports not available"
                description={noActivityDescription}
            >
                <div className="mb-20"/>
            </EmptyTransactionCardContent>}

            <div className="h-full">
                {hasActivity && <div>
                    <div className=" overflow-hidden rounded-lg border border-gray-100">
                        <div className="relative rounded-lg border-b border-gray-200">
                            <div className="p-4">
                                <ReportFilter onSubmit={handleSubmitFilter}/>
                            </div>
                            <div className="absolute bottom-0 right-0  w-screen bg-gray-100"/>
                        </div>

                        <Table title="Reports" headers={tableHeading} buttonLabel="Download Report"
                               iconPath={FileDownload} onButtonClick={handleDownloadReport}>
                            {transactions.map((transaction, key) => (
                                <tr key={key} className={`text-center`}>
                                    <td className="relative py-2 pr-3 font-normal text-xs">
                                        <div
                                            className={` ${key === 0 ? 'absolute top-0 left-0 right-0 h-px w-screen bg-gray-100' : ''}`}/>
                                        <div className={` ${key === 0 ?
                                            'absolute top-0 right-full h-px w-full bg-gray-100' : ''}`}/>
                                        {transaction.date}
                                        <div className={`${key !== transactions.length - 1 ?
                                            'absolute bottom-0 left-0 right-0 h-px w-screen bg-gray-100' : ''}`}/>
                                        <div className={`${key !== transactions.length - 1 ?
                                            'absolute bottom-0 right-full h-px w-full bg-gray-100' : ''}`}/>
                                    </td>
                                    <td className="hidden px-3 py-2 sm:table-cell text-xs">{transaction.id}</td>
                                    <td className="hidden px-3 py-2 sm:table-cell text-xs">{transaction.type}</td>
                                    <td className="hidden px-3 py-2 sm:table-cell text-xs">{transaction.channel}</td>
                                    <td className="hidden px-3 py-2 sm:table-cell text-xs">{transaction.sender}</td>
                                    <td className="hidden px-3 py-2 sm:table-cell text-xs">{transaction.recipient}</td>
                                    <td className="hidden px-3 py-2 sm:table-cell text-xs">{transaction.phone}</td>
                                    <td className="px-3 py-2 text-xs">GHS {transaction.amount}</td>
                                    <td className="px-3 py-2 text-xs">
                                        <Status color={""} background={""} customStyles="text-red-500"
                                                status={transaction.status}/>
                                    </td>
                                    <td className="px-3 py-2 text-xs">GHS {transaction.balance}</td>
                                </tr>
                            ))}
                        </Table>
                    </div>
                    <div className="mx-5 mb-[100px] mt-5">
                        <Footer from={1} to={10} total={32} handlePrevious={handlePrevious}
                                handleNext={handleNext}/>
                    </div>
                </div>}
            </div>
        </div>
    );
};
export default ReportContent;