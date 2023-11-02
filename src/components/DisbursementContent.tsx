import React, {useEffect, useState} from 'react';
import {Plus} from '../../public/assets/icons/plus'
import EmptyTransactionCardContent from "@/components/EmptyTransactionCardContent";
import Button from "@/components/forms/Button";
import Svg from "@/components/Svg";
import {IdentificationCard} from "../../public/assets/icons/IdentificationCard"
import {UserCircle} from "../../public/assets/icons/UserCircle"
import {Info} from "../../public/assets/icons/Info"
import OverlayDetailContainer from "@/components/OverlayDetailContainer";
import {Phone} from "../../public/assets/icons/Phone";
import {Calendar} from "../../public/assets/icons/Calendar";
import {ClipboardText} from "../../public/assets/icons/ClipboardText";
import {Download} from "../../public/assets/icons/Download";
import {CheckCircle} from "../../public/assets/icons/CheckCircle";
import {XCircle} from "../../public/assets/icons/XCircle";
import Table from "@/components/tables/Table";
import {CaretRight} from "../../public/assets/icons/Caret";
import Status from "@/components/Status";
import Footer from "@/components/tables/Footer";

const DisbursementContent: React.FC = () => {
    const [hasActivity, setHasActivity] = useState<boolean | null>(true);
    const [open, setOpen] = useState<boolean>(false);
    const [transaction, setTransaction] = useState({
        id: "",
        batchNumber: "",
        type: "",
        amount: 0,
        status: "",
        recipient: "",
        phone: "",
        reference: "",
    });
    const [showAlert, setShowAlert] = useState<boolean>(false);

    const tableHeading = [
        {label: 'date', classes: ''},
        {label: 'batch number', classes: 'hidden sm:table-cell'},
        {label: 'disbursement type', classes: 'hidden md:table-cell'},
        {label: 'amount', classes: ''},
        {label: 'status', classes: ''},
        {label: ' ', classes: ''}
    ]

    const transactions = [
        {
            id: '100000000',
            date: '15/08/2017',
            recipient: 'Kwaku Frimpong',
            type: 'single',
            amount: '6,908',
            status: 'successful',
            phone: '0200000000',
            reference: 'Payment to a single individual'
        },
        {
            id: '100000001',
            date: '15/08/2017',
            batchNumber: 'Batch No. 1',
            type: 'bulk',
            amount: '6,908',
            status: 'completed'
        },
        {
            id: '100000002',
            date: '15/08/2017',
            recipient: 'Kwaku Frimpong',
            type: 'single',
            amount: '6,908',
            status: 'failed',
            phone: '0200000000',
            reference: 'Payment to a single individual'
        },
        {
            id: '100000003',
            date: '15/08/2017',
            recipient: 'Kwaku Frimpong',
            type: 'single',
            amount: '6,908',
            status: 'failed',
            phone: '0200000000',
            reference: 'Payment to a single individual'
        },
        {
            id: '100000004',
            date: '15/08/2017',
            recipient: 'Kwaku Frimpong',
            type: 'single',
            amount: '6,908',
            status: 'successful',
            phone: '0200000000',
            reference: 'Payment to a single individual'
        },
        {
            id: '100000005',
            date: '15/08/2017',
            batchNumber: 'Batch no. 7',
            type: 'bulk',
            amount: '6,908',
            status: 'in progress',
        },
        {
            id: '100000006',
            date: '15/08/2017',
            recipient: 'Kwaku Frimpong',
            type: 'single',
            amount: '6,908',
            status: 'in progress',
            phone: '0200000000',
            reference: 'Payment to a single individual'
        },
        {
            id: '100000007',
            date: '15/08/2017',
            recipient: 'Kwaku Frimpong',
            type: 'single',
            amount: '6,908',
            status: 'failed',
            phone: '0200000000',
            reference: 'Payment to a single individual'
        },
        {
            id: '100000008',
            date: '15/08/2017',
            batchNumber: 'Batch No. 20',
            type: 'bulk',
            amount: '6,908',
            status: 'failed'
        },
        {
            id: '100000009',
            date: '15/08/2017',
            recipient: 'Kwaku Frimpong',
            type: 'single',
            amount: '6,908',
            status: 'successful',
            phone: '0200000000',
            reference: 'Payment to a single individual'
        }
    ]
    const title = "No recent activity"
    const description = "It seems like there's currently no data available regarding funds disbursement in your account. This section will display information about how funds are distributed and any related transactions."
    const singleDisbursementDescription = "Transfer funds or make a payment in a one-time transaction. It is a straightforward and efficient way to send money."
    const bulkDisbursementDescription = "Efficiently distribute funds to multiple recipients in a single operation. This method ensures prompt and accurate disbursements."
    const TransactionDetailDescription = "You can see the details of this transaction. Lorem Ipsum lawal ........You can see the details of this transaction. Lorem Ipsum lawal ........You can see the details of this transaction. Lorem Ipsum lawal ........You can see the details of this transaction. Lorem Ipsum lawal ........"
    const alertProps = {
        type: "completed",
        description: "Transaction Completed",
        classes: "text-sm"
    }

    const handlePrevious = () => {
    }
    const handleNext = () => {
    }

    useEffect(() => {
        setShowAlert(true)
    }, [])

    const handleTransactionDetails = (transaction) => {
        setTransaction(transaction)
        setOpen(true)
        console.log(transaction)
    }

    return (
        <div className="h-full">
            {!hasActivity && <EmptyTransactionCardContent
                iconPath="/assets/images/disbursement.svg"
                iconWidth={324}
                iconHeight={65}
                iconCustomStyle="mt-[83px] mb-[38px]"
                customStyles="h-full border rounded-lg m-5"
                showContent
                title={title}
                description={description}
            >
                <div className="text-center">
                    <div className="flex flex-col mt-10 mb-20">
                        <Button styleType="primary" customStyles="justify-center p-4 md:p-5" buttonType="button">
                            <span className="flex self-center">
                                <Svg customClasses="mr-1" fill="white" path={Plus}/>
                                Initiate Disbursement
                            </span>
                        </Button>
                    </div>
                </div>
            </EmptyTransactionCardContent>}

            <div className="">
                {hasActivity && <div className="">
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
                                <div className="flex flex-col mt-5">
                                    <Button styleType="secondary" customStyles="justify-center p-4 md:p-5"
                                            buttonType="button">
                                        <div className="flex items-center font-semibold">
                                            <Svg customClasses="mr-1 flex items-center" fill="#652D90" path={Plus}/>
                                            <span className="uppercase flex">initiate single disbursement</span>
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
                                <div className="flex flex-col mt-5">
                                    <Button styleType="secondary" customStyles="justify-center p-4 md:p-5"
                                            buttonType="button">
                                        <div className="flex items-center font-semibold">
                                            <Svg customClasses="mr-1 flex items-center" fill="#652D90" path={Plus}/>
                                            <span className="uppercase flex">initiate bulk disbursement</span>
                                        </div>
                                    </Button>
                                </div>
                            </div>
                        </EmptyTransactionCardContent>
                    </div>

                    <div className=" overflow-hidden rounded-lg border border-gray-100 m-5 px-5">
                        <Table title="Disbursement Transaction" headers={tableHeading}>
                            {transactions.map((transaction, key) => (
                                <tr key={key} className={`text-center `}>
                                    <td className="relative py-2 pr-3 text-sm font-normal text-xs">
                                        <div className={` ${key === 0 ?
                                            'absolute top-0 left-0 right-0 h-px w-screen bg-gray-100' : ''}`}/>
                                        <div className={` ${key === 0 ?
                                            'absolute top-0 right-full h-px w-full bg-gray-100' : ''}`}/>

                                        {transaction.date}
                                        <div className={` ${key !== transactions.length - 1 ?
                                            'absolute bottom-0 left-0 right-0 h-px w-screen bg-gray-100' : ''}`}/>
                                        <div className={` ${key !== transactions.length - 1 ?
                                            'absolute bottom-0 right-full h-px w-full bg-gray-100' : ''}`}/>
                                    </td>
                                    <td className="hidden px-3 py-2 text-sm sm:table-cell text-xs">{transaction.batchNumber}</td>
                                    <td className="hidden px-3 py-2 text-sm md:table-cell text-xs capitalize">{transaction.type}</td>
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
                        <Footer from={1} to={10} total={32} handlePrevious={handlePrevious} handleNext={handleNext}/>
                    </div>
                </div>
                }
            </div>

            <OverlayDetailContainer open={open} handleOpen={setOpen} showAlert={showAlert}
                                    title="Transaction Information"
                                    description={TransactionDetailDescription}
                                    alertType={alertProps.type}
                                    alertDescription={alertProps.description}
                                    alertClasses={alertProps.classes}>
                <div className="group relative flex flex-col py-3">
                    <h5 className="font-bold text-2xl">GHS 6,065</h5>

                    <div className="relative flex flex-col min-w-0 flex-1 my-2 mx-4">
                        <div className="grid grid-cols-2">
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
                        </div>

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

                    <Button buttonType="primary" styleType="primary"
                            customStyles="mt-10 justify-center p-4 md:p-5">
                        <div className="flex items-center justify-center gap-2">
                            <div className="flex"><Svg fill="white" path={Download}/></div>
                            <span className="flex">Download Transaction</span>
                        </div>
                    </Button>
                </div>
            </OverlayDetailContainer>
        </div>
    );
};

export default DisbursementContent;
