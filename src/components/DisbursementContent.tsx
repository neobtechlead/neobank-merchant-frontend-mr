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
import {normalizeDate} from "@/utils/lib";
import {useDisbursementStore} from "@/store/DisbursementStore";

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

    const {
        setActionType
    } = useDisbursementStore();
    const {disbursements, setDisbursements} = useTransactionStore()
    const {merchant, user} = useUserStore()

    useEffect(() => {
        setDashboardState()
        getDisbursementTransactions()
    }, [])

    const getDisbursementTransactions = () => {
        listDisbursements(merchant?.externalId, user?.authToken)
            .then(async (response) => {
                if (response.ok) {
                    const disbursements = await response.json();
                    const data = disbursements.data;
                    if (setDisbursements) setDisbursements(data.transactions);
                }
            })
            .catch((error) => {
                console.log('error: ', error)
            })
    }

    const [contentType, setContentType] = useState<string>('initiate');
    const [openTransactionDetail, setOpenTransactionDetail] = useState<boolean>(false);
    const [transaction, setTransaction] = useState<TransactionType>({
        date: "",
        id: "",
        batchNumber: "",
        type: "",
        amount: '0',
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
    const noActivityDescription = "It seems like there's currently no data available regarding funds disbursement in your account. This section will display information about how funds are distributed and any related transactions."
    const singleDisbursementDescription = "Transfer funds or make a payment in a one-time transaction. It is a straightforward and efficient way to send money."
    const bulkDisbursementDescription = "Efficiently distribute funds to multiple recipients in a single operation. This method ensures prompt and accurate disbursements."
    const TransactionDetailDescription = "You can see the details of this transaction. Lorem Ipsum lawal ........You can see the details of this transaction. Lorem Ipsum lawal ........You can see the details of this transaction. Lorem Ipsum lawal ........You can see the details of this transaction. Lorem Ipsum lawal ........"

    const disbursementActionDescription = "Transferring funds or making a payment in a one-time transaction. It is a straightforward and efficient way to send money, whether it's for a specific purchase, a salary payment, or any other singular financial transaction."

    const setDashboardState = () => {
        setNavTitle('')
        if (setShowDisbursementActionContent) setShowDisbursementActionContent(false)
        if (disbursements && disbursements.length > 0) {
            if (setShowEmptyState) setShowEmptyState(false)
            if (setHasActivity) setHasActivity(true)
        } else {
            if (setShowEmptyState) setShowEmptyState(true)
            if (setHasActivity) setHasActivity(false)
        }
    }

    const handlePrevious = () => {
    }
    const handleNext = () => {
    }

    const handleTransactionDetails = (transaction: TransactionType) => {
        setTransaction(transaction)
        setOpenTransactionDetail(true)
    }

    const handleDisbursementActionContent = (actionType = '') => {
        let title = ''
        let pageHeading = ''
        let description = ''
        setShowLogo(false)
        setShowBackButton(true)
        setShowSupportButton(false)

        if (disbursements && !disbursements.length) {
            setNavTitle('single')
            setContentType('initiate')
            if (setShowEmptyState) setShowEmptyState(false)
            title = 'Initiate Disbursement'
            pageHeading = 'Disburse Funds'
            description = 'A crucial step in ensuring the smooth, seamless and efficient transfer of funds or assets from one source to another.'
        } else {
            pageHeading = actionType.charAt(0).toUpperCase() + actionType.slice(1) + " Disbursement";
            description = disbursementActionDescription
            setNavTitle(actionType)
            setContentType(actionType)
            setActionType(actionType)
        }

        setNavTitle(pageHeading)
        if (setHasActivity) setHasActivity(false)
        if (setShowDisbursementActionContent) setShowDisbursementActionContent(true)

        setHeaderTitle(title)
        setHeaderDescription(description)
        setShowNavigation(false)
        setShowProfileDropdown(false)
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
                title="No recent activity"
                description={noActivityDescription}
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
                {hasActivity && <div>
                    <div className="grid grid-cols-1 mt-4 md:grid-cols-2 lg:grid-cols-2 xl:gap-x-2 gap-4">
                        <EmptyTransactionCardContent
                            iconPath="/assets/images/single-disbursement.svg"
                            iconWidth={200}
                            iconHeight={97}
                            iconCustomStyle="mb-[44px]"
                            customStyles="h-full border rounded-lg ml-5 py-[40px]"
                            showContent
                            title="SINGLE DISBURSEMENT"
                            description={singleDisbursementDescription}
                        >
                            <div className="text-center">
                                <div className="flex flex-col mt-5 mx-2"
                                     onClick={() => handleDisbursementActionContent('single')}>

                                    <Button styleType="secondary" customStyles="justify-center p-4 md:p-5 rounded"
                                            buttonType="button">
                                        <div className="flex items-center font-semibold">
                                            <Svg customClasses="mr-1 flex items-center" fill="#652D90" path={Plus}/>
                                            <span className="uppercase flex text-sm">initiate single disbursement</span>
                                        </div>
                                    </Button>
                                </div>
                            </div>
                        </EmptyTransactionCardContent>
                        <EmptyTransactionCardContent
                            iconPath="/assets/images/bulk-disbursement.svg"
                            iconWidth={125}
                            iconHeight={125}
                            iconCustomStyle="mb-[17px]"
                            customStyles="h-full border rounded-lg mr-5 py-[40px]"
                            showContent
                            title="BULK DISBURSEMENT"
                            description={bulkDisbursementDescription}
                        >
                            <div className="text-center">
                                <div className="flex flex-col mt-5"
                                     onClick={() => handleDisbursementActionContent('bulk')}>
                                    <Button styleType="secondary" customStyles="justify-center p-4 md:p-5 rounded"
                                            buttonType="button">
                                        <div className="flex items-center font-semibold">
                                            <Svg customClasses="mr-1 flex items-center" fill="#652D90" path={Plus}/>
                                            <span className="uppercase flex text-sm">initiate bulk disbursement</span>
                                        </div>
                                    </Button>
                                </div>
                            </div>
                        </EmptyTransactionCardContent>
                    </div>
                    <div className=" overflow-hidden rounded-lg border border-gray-100 m-5 px-5">
                        <Table title="Disbursement Transaction" headers={tableHeading}>
                            {disbursements && disbursements.map((transaction, key) => (
                                <tr key={key} className={`text-center `}>
                                    <td className="relative py-2 pr-3 font-normal text-xs">
                                        <div
                                            className={` ${key === 0 ? 'absolute top-0 left-0 right-0 h-px w-screen bg-gray-100' : ''}`}/>
                                        <div className={` ${key === 0 ?
                                            'absolute top-0 right-full h-px w-full bg-gray-100' : ''}`}/>

                                        {normalizeDate(transaction.createdAt ?? '')}
                                        <div className={` ${key !== disbursements.length - 1 ?
                                            'absolute bottom-0 left-0 right-0 h-px w-screen bg-gray-100' : ''}`}/>
                                        <div className={` ${key !== disbursements.length - 1 ?
                                            'absolute bottom-0 right-full h-px w-full bg-gray-100' : ''}`}/>
                                    </td>
                                    <td className="hidden px-3 py-2 sm:table-cell text-xs">{transaction.externalId}</td>
                                    <td className="hidden px-3 py-2 md:table-cell text-xs capitalize">{transaction.type}</td>
                                    <td className="px-3 py-2 text-xs">GHS {transaction.amount}</td>
                                    <td className="px-3 py-2 text-xs">
                                        <Status customStyles="text-red-500" status={transaction.status ?? ''}/>
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
                        <Footer from={1} to={10} total={32} handlePrevious={handlePrevious}
                                handleNext={handleNext}/>
                    </div>
                </div>}

                {showDisbursementActionContent &&
                    <DisbursementActionContent
                        contentType={contentType}
                        resetDashboard={setDashboardState}/>}
            </div>

            <OverlayDetailContainer open={openTransactionDetail}
                                    handleOpen={setOpenTransactionDetail}
                                    title="Transaction Information"
                                    description={TransactionDetailDescription}>
                <div className="group relative flex flex-col py-3">
                    <TransactionDetail transaction={transaction}/>
                </div>
            </OverlayDetailContainer>
        </div>
    );
};
export default DisbursementContent;
