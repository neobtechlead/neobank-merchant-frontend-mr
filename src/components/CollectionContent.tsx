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
import TransactionDetail from "@/components/transactions/TransactionDetail";
import {TransactionType} from "@/utils/types/TransactionType";
import Image from "next/image";
import CollectionForm from "@/components/CollectionActionContent";

const CollectionContent: React.FC = ({
                                         setCollectionNavTitle,
                                         showPaymentLinkForm,
                                         setShowPaymentLinkForm,
                                         hasActivity,
                                         setHasActivity,
                                         showEmptyState,
                                         setShowEmptyState,
                                         transactions
                                     }) => {
    const {
        setShowLogo,
        setShowNavigation,
        setShowBackButton,
        setShowProfileDropdown,
        setHeaderTitle,
        setHeaderDescription
    } = useDashboardStore();

    useEffect(() => {
        setDashboardState()
        setHeaderTitle('')
        setHeaderDescription('')
    }, [])


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
        {label: 'client name', classes: 'hidden sm:table-cell'},
        {label: 'amount', classes: ''},
        {label: 'status', classes: ''},
        {label: ' ', classes: ''}
    ]
    const noActivityDescription = "It seems like there's currently no data available regarding funds collection in your account. This section will display information when funds are collected and any related transactions."
    const TransactionDetailDescription = "You can see the details of this transaction. Lorem Ipsum lawal ........You can see the details of this transaction. Lorem Ipsum lawal ........You can see the details of this transaction. Lorem Ipsum lawal ........You can see the details of this transaction. Lorem Ipsum lawal ........"

    const collectionActionDescription = "Generate Payment Link is a valuable feature that empowers businesses and individuals to create customized and convenient payment links for secure and efficient transactions. Whether you are a seller, service provider, or fundraiser, this tool simplifies the payment process and allows you to receive payments seamlessly."

    const setDashboardState = () => {
        setShowPaymentLinkForm(false)
        setCollectionNavTitle('')
        return !transactions.length ? setShowEmptyState(true) : setHasActivity(true)
    }

    const handlePrevious = () => {
    }
    const handleNext = () => {
    }

    const handleTransactionDetails = (transaction) => {
        setTransaction(transaction)
        setOpenTransactionDetail(true)
    }

    const handleCollectionActionContent = () => {
        setShowEmptyState(false)
        setShowLogo(false)
        setShowBackButton(true)
        setHeaderTitle("Generate Payment Link")
        setHeaderDescription(collectionActionDescription)
        setShowNavigation(false)
        setShowProfileDropdown(false)
        setHasActivity(false)
        setCollectionNavTitle("Generate Link")
        setShowPaymentLinkForm(true)
    }

    return (
        <div className="h-full">
            {showEmptyState && <EmptyTransactionCardContent
                iconPath="/assets/images/collection.svg"
                iconWidth={299}
                iconHeight={330}
                iconCustomStyle="mt-[58px] mb-[38px]"
                customStyles="border rounded-lg m-5"
                showContent
                title="No recent activity"
                description={noActivityDescription}
            >
                <div className="text-center">
                    <div className="flex flex-col mt-10 mb-10">
                        <Button styleType="primary" customStyles="justify-center p-4 md:p-5 rounded-md"
                                buttonType="button"
                                onClick={handleCollectionActionContent}>
                            <span className="flex self-center">
                                <Svg customClasses="mr-1" fill="white" path={Plus}/>
                                Generate payment link
                            </span>
                        </Button>
                    </div>
                </div>
            </EmptyTransactionCardContent>}

            <div className="h-full">
                {hasActivity && <div>
                    <div className="grid grid-cols-1 mt-4 xl:gap-x-2 gap-4">
                        <EmptyTransactionCardContent
                            iconPath=""
                            iconWidth={0}
                            iconHeight={0}
                            iconCustomStyle="mb-[44px]"
                            customStyles="h-full border rounded-lg ml-5 pt-[20px] ring-1 ring-inset ring-purple-900"
                            showContent
                            title=""
                            description=""
                        >
                            <div className="grid grid-cols-3 gap-x-4">
                                <div className="col-span-1">
                                    <div className="lg:flex flex-col mt-2 relative hidden ">
                                        <Image src="/assets/images/payment-links-generated.svg"
                                               alt="payment-link"
                                               height={87}
                                               width={387}
                                               className="border-b border-purple-900"
                                        />
                                        <Image src="/assets/images/successful-badge.svg"
                                               alt="payment-link"
                                               height={57}
                                               width={57}
                                               className="absolute -top-5 -right-4"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between col-span-2 min-w-full">
                                    <div className="flex flex-col justify-center text-sm">
                                        <h5 className="font-semibold">Generate Payment Links</h5>
                                        <p>Create and share payment link to buyers instantly.</p>
                                    </div>

                                    <div className="flex col-end-4 col-span-1">
                                        <Button styleType="primary"
                                                customStyles="justify-center p-4 md:p-5 rounded-md text-sm"
                                                buttonType="button"
                                                onClick={handleCollectionActionContent}>
                                            <div className="flex items-center font-semibold">
                                                <Svg customClasses="mr-1 flex items-center" fill="white"
                                                     path={Plus}/>
                                                <span className="uppercase flex">generate link</span>
                                            </div>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </EmptyTransactionCardContent>
                    </div>

                    <div className=" overflow-hidden rounded-lg border border-gray-100 m-5 px-5">
                        <Table title="Payment Links" headers={tableHeading}>
                            {transactions.map((transaction, key) => (
                                <tr key={key} className={`text-center `}>
                                    <td className="relative py-2 pr-3 text-sm font-normal text-xs">
                                        <div
                                            className={` ${key === 0 ? 'absolute top-0 left-0 right-0 h-px w-screen bg-gray-100' : ''}`}/>
                                        <div className={` ${key === 0 ?
                                            'absolute top-0 right-full h-px w-full bg-gray-100' : ''}`}/>

                                        {transaction.date}
                                        <div className={` ${key !== transactions.length - 1 ?
                                            'absolute bottom-0 left-0 right-0 h-px w-screen bg-gray-100' : ''}`}/>
                                        <div className={` ${key !== transactions.length - 1 ?
                                            'absolute bottom-0 right-full h-px w-full bg-gray-100' : ''}`}/>
                                    </td>
                                    <td className="hidden px-3 py-2 text-sm sm:table-cell text-xs">{transaction.client}</td>
                                    <td className="px-3 py-2 text-sm text-xs">GHS {transaction.amount}</td>
                                    <td className="px-3 py-2 text-sm text-xs">
                                        <Status color={""} background={""} customStyles="text-red-500"
                                                status={transaction.status}/>
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

                {showPaymentLinkForm &&
                    <CollectionForm
                        resetDashboard={setDashboardState}
                    />}
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
export default CollectionContent;
