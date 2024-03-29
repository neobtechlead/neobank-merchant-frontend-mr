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
import {useTransactionStore} from "@/store/TransactionStore";
import {downloadReport, listTransactions} from "@/api/transaction";
import {useUserStore} from "@/store/UserStore";
import {
    camelToKebab,
    extractPaginationData,
    formatAmount,
    formatAmountGHS,
    normalizeDate
} from "@/utils/lib";
import {IListBoxItem} from "@/utils/interfaces/IDropdownProps";
import {TransactionType} from "@/utils/types/TransactionType";
import {ReportFilterQueryType} from "@/utils/types/ReportFilterQueryType";

const ReportContent: React.FC<IReportContentProps> = ({
                                                          hasActivity,
                                                          setHasActivity,
                                                          showEmptyState,
                                                          setShowEmptyState,
                                                      }) => {
    const {
        setShowSupportButton,
        setNavTitle,
    } = useDashboardStore();

    const {
        transactions,
        setTransactions,
        getTransaction,
    } = useTransactionStore();

    const {merchant, user} = useUserStore();

    const [reports, setReports] = useState<TransactionType[]>([]);
    const [filterQueryString, setFilterQueryString] = useState<string>('');

    useEffect(() => {
        setDashboardState()
        fetchTransactions()
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

    const fetchTransactions = (params: string = '', skipReports = false) => {
        listTransactions(merchant?.externalId, user?.authToken, params)
            .then(async response => {
                if (response.ok) {
                    const feedback = await response.json();
                    const {transactions} = feedback.data;
                    const pagination = extractPaginationData(feedback.data)
                    if (setTransactions) setTransactions({pagination, data: transactions});
                    if (!skipReports) setReports(transactions ?? [])
                }
            })
            .catch((error) => {
                console.log('error: ', error)
            })
    }

    const setDashboardState = () => {
        setShowSupportButton(true)
        setNavTitle('')
        return transactions && transactions?.data?.length > 0 ? setHasActivity(true) : setShowEmptyState(true)
    }

    const [pageOption, setPageOption] = useState<IListBoxItem>({
        label: '10',
        value: '10'
    });

    const perPageOptions: IListBoxItem [] = [
        {label: '10', value: '10'},
        {label: '20', value: '20'},
    ]

    const handlePrevious = () => {
        if (transactions) {
            const {pagination} = transactions
            const previousPageNumber = pagination.pageNumber - 1

            const queryString = prepareFilterQueryString({rows: pageOption.value, pageNumber: previousPageNumber})
            setFilterQueryString(queryString);
            return pagination.firstPage ? null : fetchTransactions(queryString)
        }
    }
    const handleNext = () => {
        if (transactions) {
            const {pagination} = transactions
            const nextPageNumber = pagination.pageNumber + 1

            const queryString = prepareFilterQueryString({rows: pageOption.value, pageNumber: nextPageNumber})
            setFilterQueryString(queryString);

            return pagination.lastPage ? null : fetchTransactions(queryString)
        }
    }

    const prepareFilterQueryString = (queryObject: ReportFilterQueryType) => {
        const queryParams = filterQueryString.split('&')
            .map(param => param.split('='))
            .reduce((obj: Record<string, string>, [key, value]) => {
                if (key !== '' && value != undefined)
                    return {...obj, [key]: value};

                return obj;
            }, {});

        const {startDate, endDate, ...remainingParams} = queryParams;

        const mergedParams = {
            ...remainingParams,
            ...queryObject,
            ...(queryObject.startDate !== undefined && queryObject.startDate !== '' ? {[camelToKebab('startDate')]: queryObject.startDate} : {}),
            ...(queryObject.endDate !== undefined && queryObject.endDate !== '' ? {[camelToKebab('endDate')]: queryObject.endDate} : {})
        };

        const filteredParams = Object.fromEntries(
            Object.entries(mergedParams).filter(([key, value]) => {
                return ![undefined, ''].includes(String(value));
            })
        );

        return Object.entries(filteredParams)
            .map(([key, value]) => `${key}=${value}`)
            .join('&');
    };

    const handleSetPageOption = (pageOption: IListBoxItem) => {
        const queryString = prepareFilterQueryString({rows: pageOption.value})
        setFilterQueryString(queryString);
        fetchTransactions(queryString)
        setPageOption(pageOption)
    }

    const handleDownloadReport = () => downloadReport(merchant?.externalId, user?.authToken, filterQueryString)

    const handleSubmitFilter = (data: ReportFilterFormDataType) => {
        const queryString = prepareFilterQueryString(data)
        setFilterQueryString(queryString)

        if (data.externalId) {
            const filteredTransactions = getTransaction(data.externalId)
            return fetchTransactions(prepareFilterQueryString({externalId: filteredTransactions[0].externalId}))
        }

        return fetchTransactions(queryString)
    }

    const handleResetFilter = () => {
        setFilterQueryString('')
        return fetchTransactions()
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
                title="No data available"
                description="We regret to inform you that the data required to generate reports is currently unavailable. This may be due to various reasons, including system maintenance, data processing delays, or temporary disruptions."
            >
                <div className="mb-20"/>
            </EmptyTransactionCardContent>}

            <div className="h-full">
                {hasActivity && <div>
                    <div className=" overflow-hidden rounded-lg border border-gray-100">
                        <div className="relative rounded-lg border-b border-gray-200">
                            <div className="p-4">
                                <ReportFilter onSubmit={handleSubmitFilter} onReset={handleResetFilter}/>
                            </div>
                            <div className="absolute bottom-0 right-0 w-screen bg-gray-100"/>
                        </div>

                        <Table title="Reports" headers={tableHeading} buttonLabel="Download Report"
                               iconPath={FileDownload} onButtonClick={handleDownloadReport}>
                            {reports?.map((transaction, key) => (
                                <tr key={key} className={`text-center`}>
                                    <td className="relative py-2 pr-3 font-normal text-xs">
                                        <div
                                            className={` ${key === 0 ? 'absolute top-0 left-0 right-0 h-px w-screen bg-gray-100' : ''}`}/>
                                        <div className={` ${key === 0 ?
                                            'absolute top-0 right-full h-px w-full bg-gray-100' : ''}`}/>
                                        {normalizeDate(transaction.createdAt ?? 's')}
                                        <div className={`${key !== reports?.length - 1 ?
                                            'absolute bottom-0 left-0 right-0 h-px w-screen bg-gray-100' : ''}`}/>
                                        <div className={`${key !== reports?.length - 1 ?
                                            'absolute bottom-0 right-full h-px w-full bg-gray-100' : ''}`}/>
                                    </td>
                                    <td className="hidden px-3 py-2 sm:table-cell text-xs">{transaction.internalId}</td>
                                    <td className="hidden px-3 py-2 sm:table-cell text-xs">{transaction.type}</td>
                                    <td className="hidden px-3 py-2 sm:table-cell text-xs">{transaction.accountIssuer}</td>
                                    <td className="hidden px-3 py-2 sm:table-cell text-xs">{transaction.initiatorName}</td>
                                    <td className="hidden px-3 py-2 sm:table-cell text-xs">{transaction.accountName}</td>
                                    <td className="hidden px-3 py-2 sm:table-cell text-xs">{transaction.accountNumber}</td>
                                    <td className="px-3 py-2 text-xs">{formatAmount(formatAmountGHS(transaction.amount?.toString()))}</td>
                                    <td className="px-3 py-2 text-xs">
                                        <Status customStyles="text-red-500"
                                                status={transaction.status?.toLowerCase() ?? ''}/>
                                    </td>
                                    <td className="px-3 py-2 text-xs">{formatAmount(formatAmountGHS(transaction.balanceBefore?.toString()))}</td>
                                </tr>
                            ))}
                        </Table>
                    </div>
                    <div className="mx-5 mb-[100px] mt-5">
                        <Footer pagination={transactions.pagination}
                                pageOption={pageOption}
                                perPageOptions={perPageOptions}
                                setPageOption={handleSetPageOption}
                                handlePrevious={handlePrevious}
                                handleNext={handleNext}/>
                    </div>
                </div>}
            </div>
        </div>
    );
};
export default ReportContent;
