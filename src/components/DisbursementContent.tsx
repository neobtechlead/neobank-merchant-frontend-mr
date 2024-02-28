'use client'
import React, {useEffect, useState} from 'react';
import {Plus} from '@/assets/icons/plus'
import EmptyTransactionCardContent from "@/components/EmptyTransactionCardContent";
import Button from "@/components/forms/Button";
import Svg from "@/components/Svg";
import OverlayDetailContainer from "@/components/OverlayDetailContainer";
import Table from "@/components/tables/Table";
import {CaretRight} from "@/assets/icons/Caret";
import Status from "@/components/Status";
import Footer from "@/components/tables/Footer";
import {useDashboardStore} from "@/store/DashboardStore";
import DisbursementActionContent from "@/components/DisbursementActionContent";
import TransactionDetail from "@/components/transactions/TransactionDetail";
import {TransactionType} from "@/utils/types/TransactionType";
import {IDisbursementContent} from "@/utils/interfaces/IDisbursementContent";
import {useTransactionStore} from "@/store/TransactionStore";
import {useUserStore} from "@/store/UserStore";
import {listDisbursements} from "@/api/disbursement";
import {extractPaginationData, formatAmount, formatAmountGHS, getDisbursementType, normalizeDate} from "@/utils/lib";
import {useDisbursementStore} from "@/store/DisbursementStore";
import {IListBoxItem} from "@/utils/interfaces/IDropdownProps";

const DisbursementContent: React.FC<IDisbursementContent> = ({
                                                                 showDisbursementActionContent,
                                                                 setShowDisbursementActionContent,
                                                                 showEmptyState,
                                                                 setHasActivity,
                                                                 hasActivity,
                                                                 setShowEmptyState,
                                                             }) => {
    const {
        setShowLogo,
        setShowNavigation,
        setShowBackButton,
        setShowProfileDropdown,
        setHeaderTitle,
        setHeaderDescription,
        setNavTitle,
        setShowSupportButton,
    } = useDashboardStore();
    const {disbursements, setDisbursements} = useTransactionStore()
    const {merchant, user} = useUserStore()

    useEffect(() => {
        setDashboardState()
    }, [])

    const getDisbursementTransactions = (params: string) => {
        listDisbursements(merchant?.externalId, user?.authToken, params)
            .then(async (response) => {
                if (response.ok) {
                    const feedback = await response.json();
                    const {transactions} = feedback.data
                    const pagination = extractPaginationData(feedback.data)
                    if (setDisbursements) setDisbursements({pagination, transactions});
                }
            })
            .catch((error) => {
                console.log('error: ', error)
            })
    }

    const [openTransactionDetail, setOpenTransactionDetail] = useState<boolean>(false);
    const [transaction, setTransaction] = useState<TransactionType>({
        date: "",
        id: "",
        batchNumber: "",
        type: "",
        amount: 0,
        status: "",
        recipient: "",
        phone: "",
        reference: "",
        time: ""
    });

    const tableHeading = [
        {label: 'date', classes: ''},
        {label: 'batch number', classes: 'hidden sm:table-cell'},
        {label: 'disbursement type', classes: 'hidden md:table-cell'},
        {label: 'amount', classes: ''},
        {label: 'status', classes: ''},
        {label: ' ', classes: ''}
    ]

    const setDashboardState = () => {
        getDisbursementTransactions('')
        setNavTitle('')
        if (setShowDisbursementActionContent) setShowDisbursementActionContent(false)
        if (disbursements?.transactions && disbursements?.transactions.length > 0) {
            if (setShowEmptyState) setShowEmptyState(false)
            if (setHasActivity) setHasActivity(true)
        } else {
            if (setShowEmptyState) setShowEmptyState(true)
            if (setHasActivity) setHasActivity(false)
        }
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
        if (disbursements) {
            const {pagination} = disbursements
            const previousPageNumber = pagination.pageNumber - 1
            return pagination.firstPage ? null : getDisbursementTransactions(`rows=${pageOption.value}&pageNumber=${previousPageNumber}`)
        }
    }
    const handleNext = () => {
        if (disbursements) {
            const {pagination} = disbursements
            const nextPageNumber = pagination.pageNumber + 1
            return pagination.lastPage ? null : getDisbursementTransactions(`rows=${pageOption.value}&pageNumber=${nextPageNumber}`)
        }
    }

    const handleSetPageOption = (pageOption: IListBoxItem) => {
        getDisbursementTransactions(`rows=${pageOption.value}`)
        setPageOption(pageOption)
    }

    const handleTransactionDetails = (transaction: TransactionType) => {
        setTransaction(transaction)
        setOpenTransactionDetail(true)
    }

    const handleDisbursementActionContent = () => {
        setShowLogo(false)
        setShowBackButton(true)
        setShowSupportButton(false)
        setShowNavigation(false)
        setShowProfileDropdown(false)

        setNavTitle('Disburse Funds')
        setHeaderTitle('Initiate Disbursement')
        setHeaderDescription('A crucial step in ensuring the smooth, seamless and efficient transfer of funds or assets from one source to another.')

        if (setShowEmptyState) setShowEmptyState(false)
        if (setHasActivity) setHasActivity(false)
        if (setShowDisbursementActionContent) setShowDisbursementActionContent(true)
    }

    return (
        <div className="h-full">
            {showEmptyState && <EmptyTransactionCardContent
                iconPath="/assets/images/disbursement.svg"
                iconWidth={324}
                iconHeight={65}
                iconCustomStyle="mt-[83px] mb-[38px]"
                customStyles="border rounded-lg m-5"
                showContent
                title="No transactions to display"
                description="You haven't made any transactions yet. Your transactions will be displayed here."
            >
                <div className="text-center">
                    <div className="flex flex-col mt-10 mb-20">
                        <Button styleType="primary" customStyles="justify-center p-4 md:p-5 rounded-lg"
                                buttonType="button"
                                onClick={handleDisbursementActionContent}>
                            <span className="flex self-center">
                                <Svg customClasses="mr-1" fill="white" path={Plus}/>
                                Initiate Disbursement
                            </span>
                        </Button>
                    </div>
                </div>
            </EmptyTransactionCardContent>}

            <div className="h-full">
                {hasActivity && <div className="overflow-hidden rounded-lg m-5">
                    <Button styleType="primary" customStyles="justify-center p-4 md:p-5 rounded mb-5 max-w-xs ml-auto"
                            buttonType="button"
                            onClick={handleDisbursementActionContent}>
                        <div className="flex items-center font-semibold">
                            <Svg customClasses="mr-1 flex items-center" fill="#FFF" path={Plus}/>
                            <span className="uppercase flex text-sm">initiate disbursement</span>
                        </div>
                    </Button>
                    <div className="overflow-hidden rounded-lg border border-gray-100">
                        <Table title="Disbursement Transaction" headers={tableHeading}>
                            {disbursements?.transactions && disbursements?.transactions.map((transaction, key) => (
                                <tr key={key} className={`text-center `}>
                                    <td className="relative py-2 pr-3 font-normal text-xs">
                                        <div
                                            className={` ${key === 0 ? 'absolute top-0 left-0 right-0 h-px w-screen bg-gray-100' : ''}`}/>
                                        <div className={` ${key === 0 ?
                                            'absolute top-0 right-full h-px w-full bg-gray-100' : ''}`}/>
                                        {normalizeDate(transaction.createdAt, true)}
                                        <div className={` ${key !== disbursements?.transactions.length - 1 ?
                                            'absolute bottom-0 left-0 right-0 h-px w-screen bg-gray-100' : ''}`}/>
                                        <div className={` ${key !== disbursements?.transactions.length - 1 ?
                                            'absolute bottom-0 right-full h-px w-full bg-gray-100' : ''}`}/>
                                    </td>
                                    <td className="hidden px-3 py-2 sm:table-cell text-xs">
                                        {transaction.batchExternalId ?? transaction.internalId}
                                    </td>
                                    <td className="hidden px-3 py-2 md:table-cell text-xs capitalize">{getDisbursementType(transaction)}</td>
                                    <td className="px-3 py-2 text-xs">{formatAmount(formatAmountGHS(transaction.amount?.toString()))}</td>
                                    <td className="px-3 py-2 text-xs">
                                        <Status customStyles="text-red-500"
                                                status={transaction.status?.toLowerCase() ?? ''}/>
                                    </td>
                                    <td className="relative py-2 pl-3 text-right text-xs font-medium flex justify-end col-end-2">
                                        <div onClick={() => handleTransactionDetails(transaction)}
                                             className="cursor-pointer">
                                            <Svg fill="#4F4F4F" path={CaretRight}/>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </Table>
                    </div>
                    <div className="mx-5 mb-[100px]">
                        <Footer pagination={disbursements.pagination}
                                pageOption={pageOption}
                                perPageOptions={perPageOptions}
                                setPageOption={handleSetPageOption}
                                handlePrevious={handlePrevious}
                                handleNext={handleNext}/>
                    </div>
                </div>}

                {showDisbursementActionContent && <DisbursementActionContent resetDashboard={setDashboardState}/>}
            </div>

            <OverlayDetailContainer open={openTransactionDetail}
                                    handleOpen={setOpenTransactionDetail}
                                    title="Transaction Information"
                                    description="Here are the details of your transaction">
                <div className="group relative flex flex-col py-3">
                    <TransactionDetail transaction={transaction}/>
                </div>
            </OverlayDetailContainer>
        </div>
    );
};
export default DisbursementContent;
