'use client'

import React, {useEffect, useState} from 'react';
import TextInput from "@/components/forms/TextInput";
import Button from "@/components/forms/Button";
import Toggle from "@/components/forms/Toggle";
import DatePicker from "@/components/forms/DatePicker";
import TimePicker from "@/components/forms/TimePicker";
import OverlayDetailContainer from "@/components/OverlayDetailContainer";
import TabsNav from "@/components/navigation/TabsNav";
import {IDisbursementActionContent} from "@/utils/interfaces/IDisbursementActionContent";
import {useDashboardStore} from "@/store/DashboardStore";
import TransactionConfirmation from "@/components/transactions/TransactionConfirmation";
import Modal from "@/components/Modal";
import {Dialog} from '@headlessui/react'
import {ArrowCircleRight} from "@/assets/icons/ArrowCircle";
import Svg from "@/components/Svg";
import Image from 'next/image';
import {Download} from "@/assets/icons/Download";
import {File} from "@/assets/icons/File";
import DragAndDrop from "@/components/forms/DragAndDrop";
import InfoCardItem from "@/components/InfoCardItem";
import {useDisbursementStore} from "@/store/DisbursementStore";
import {DateTime} from "luxon";
import {TransactionType} from "@/utils/types/TransactionType";
import {disburse, downloadBulkDisbursementTemplate} from "@/api/disbursement";
import {
    convertDateTimeToISOFormat,
    formatAmount,
    getCurrentDateTimeString,
    getError,
    getInitials, objectToFormData,
    toMinorDigits
} from "@/utils/lib";
import {useUserStore} from "@/store/UserStore";
import {useTransactionStore} from "@/store/TransactionStore";
import Alert from "@/components/Alert";
import {DropdownInput} from "@/components/forms/DropdownInput";
import {DropdownInputItemType} from "@/utils/types/DropdownInputItemType";
import Loader from "@/components/Loader";

const DisbursementActionContent: React.FC<IDisbursementActionContent> = ({
                                                                             contentType,
                                                                             resetDashboard
                                                                         }) => {
    const [hasError, setHasError] = useState<boolean>(true);
    const [error, setError] = useState<string | null>('');
    const [toggleEnabled, setToggleEnabled] = useState<boolean>(false);
    const [selectedTime, setSelectedTime] = useState<string>();
    const [selectedDate, setSelectedDate] = useState<Date>();
    const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
    const [openOverlay, setOpenOverlay] = useState<boolean>(false);
    const [openModal, setModalOpen] = useState<boolean>(false);
    const [modalTitle, setModalTitle] = useState<string>('Confirm Transaction Details');
    const [modalDescription, setModalDescription] = useState<string>('Please confirm the information below before proceeding.');
    const [modalButtonText, setModalButtonText] = useState<string>('Confirm');
    const [transactionSuccessful, setTransactionSuccessful] = useState<boolean>(false);
    const [overlayDetailContainerDescription, setOverlayDetailContainerDescription] = useState<string>('');
    const [uploadedFileName, setUploadedFileName] = useState<string>('');
    const [uploadedFile, setUploadedFile] = useState<Blob | undefined>(undefined);

    const providers: DropdownInputItemType[] = [
        {id: 0, name: 'Select Provider', code: ''},
        {id: 1, name: 'MTN', code: 'MTN'},
        {id: 2, name: 'Vodafone', code: 'VOD'},
        {id: 3, name: 'AirtelTigo', code: 'ATL'},
        {id: 4, name: 'CF Transact', code: 'NEO'}
    ]

    useEffect(() => {
        if (setLoading) setLoading(false);
    }, [])

    const [provider, setProvider] = useState(providers[0])

    const [formData, setFormData] = useState<TransactionType>({
        recipient: '',
        phone: '',
        amount: 0,
        description: '',
        scheduled: false,
        date: new Date().toLocaleDateString(),
        time: '',
        type: '',
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    };

    const handleSetProvider = (provider: DropdownInputItemType) => {
        return setProvider(provider)
    };

    const handleDisbursementConfirmation: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        setOverlayDetailContainerDescription('Here are the details of your transaction.')
        setOpenOverlay(true)
        !toggleEnabled ? handleToggle(false) : setFormData({...formData, date: new Date().toLocaleDateString(),})

        if (actionType === 'bulk') {
            const currentDateTimeString = getCurrentDateTimeString();
            const merchantInitials = getInitials(merchant?.businessName);

            return getBulkDisbursementFileSummary({
                merchantId: merchant?.externalId,
                batchDescription: formData.description,
                batchName: `${merchantInitials}-BD-${currentDateTimeString}`,
                file: uploadedFile,
            }).then(response => {
                console.log('response: ', response)
            })
        }
    };

    const handleToggle = (toggle: boolean) => {
        setToggleEnabled(toggle);
        setFormData((formData) => {
            if (!toggle) {
                const {date, time, ...formDataWithoutDateAndTime} = formData;
                return {...formDataWithoutDateAndTime, scheduled: toggle};
            }
            return {...formData, scheduled: toggle};
        });
    };

    const handleDateSelected = (date: Date) => {
        try {
            const parsedDate = DateTime.fromJSDate(date);

            if (parsedDate.isValid) {
                const formattedDate = parsedDate.toFormat('dd/MM/yyyy');
                setFormData({...formData, date: formattedDate});
                setSelectedDate(parsedDate.toJSDate());
            }
        } catch (error) {
            console.error('Error parsing date string:', error);
        }
    };

    const handleTimeSelected = (time: string) => {
        setSelectedTime(time)
        setShowTimePicker(false)
        setFormData({...formData, time: time});
    }

    const {
        setShowLogo,
        setShowNavigation,
        setShowBackButton,
        setShowProfileDropdown,
        setHeaderTitle,
        setHeaderDescription
    } = useDashboardStore();

    const {
        merchant,
        user,
    } = useUserStore();

    const {
        actionType,
        setActionType
    } = useDisbursementStore();

    const {disbursements, setDisbursements, loading, setLoading} = useTransactionStore();

    const handleTransactionConfirmation = () => {
        setModalOpen(true)
    }

    const handleModalOpen = (openModal: boolean) => {
        setModalOpen(openModal)
        setError('')
    }

    const handleDisbursementTransaction = async () => {
        if (provider.code === '') return

        if (!transactionSuccessful) {
            if (setLoading) setLoading(true)
            let payload = {}
            if (actionType === 'single') {
                payload = {
                    merchantId: merchant?.externalId,
                    accountNumber: formData.phone,
                    accountIssuer: provider.code,
                    accountName: formData.recipient,
                    narration: formData.description,
                    amount: toMinorDigits(formData.amount),
                    processAt: toggleEnabled ? handleConvertDateTimeToISOFormat() : null
                };
            } else if (actionType === 'bulk') {
                const currentDateTimeString = getCurrentDateTimeString();
                const merchantInitials = getInitials(merchant?.businessName);

                payload = {
                    merchantId: merchant?.externalId,
                    batchDescription: formData.description,
                    batchName: `${merchantInitials}-BD-${currentDateTimeString}`,
                    file: uploadedFile,
                }
            }

            const response = await disburse(actionType, user?.authToken, {...payload});
            const feedback = await response.json()
            const {data} = feedback

            if (setLoading) setLoading(false)
            if (response.ok) {
                setModalTitle('Transaction Successful')
                setModalDescription(`Payment sent to ${formData.recipient} was successful. They can access the funds in their wallet using USSD.`)

                const transactions = disbursements.transactions?.length > 0
                    ? {transactions: [data, ...disbursements.transactions], pagination: disbursements.pagination}
                    : {transactions: [data], pagination: disbursements.pagination}

                if (setDisbursements) setDisbursements(transactions);

                setTransactionSuccessful(true);
                return setModalButtonText('Go to disbursement dashboard');
            }

            setHasError(true)
            return setError(getError(feedback))
        }
        setModalOpen(false)
        resetDisbursementStore()
    }

    const handleConvertDateTimeToISOFormat = () => {
        const timeString = formData.time?.trim().replace(/\s+/g, '');
        const dateTimeString = `${formData.date} ${timeString}`.trim();

        return convertDateTimeToISOFormat(dateTimeString)
    }

    const getBulkDisbursementFileSummary = async (payload: {
        merchantId?: string,
        batchDescription?: string,
        batchName?: string,
        file?: Blob,
    }) => {
        const newData = objectToFormData(payload)

        return await disburse(actionType, user?.authToken, newData).then(response => {
            const feedback = response.json()
        });
    }

    const resetDisbursementStore = () => {
        setShowLogo(true)
        setShowBackButton(false)
        setShowNavigation(true)
        setShowProfileDropdown(true)
        setShowBackButton(false)
        setHeaderTitle('Disburse Funds')
        setHeaderDescription("Disburse Funds is a powerful tool that allows you to efficiently transfer allocated funds to their intended recipients. Whether it's sending payments to vendors, distributing salaries to employees, or making withdrawals, this feature streamlines the process for you.")
        if (resetDashboard) resetDashboard()
        setUploadedFileName('')
    }

    const handleTemplateDownload = async () => {
        return await downloadBulkDisbursementTemplate(merchant?.externalId)
    }

    const handleFileUploaded = (files: FileList) => {
        setUploadedFile(files[0])
        const fileNames = Array.from(files).map((file) => file.name);
        setUploadedFileName(fileNames[0])
    }

    return (
        <div className="w-full h-full">
            <div className={`pt-10 ${toggleEnabled ? 'mb-50' : ''}`}>
                {contentType === 'initiate' &&
                    <div
                        className="flex justify-center border border-gray-100 rounded-lg text-center mb-10 max-w-xs mx-auto">
                        <TabsNav
                            tabs={[
                                {item: 'single', label: 'single disbursement'},
                                {item: 'bulk', label: 'bulk disbursement'}
                            ]}
                            handleClick={setActionType}
                            customClasses="text-xs" activeTab={actionType}/>
                    </div>}

                <form method="POST" onSubmit={handleDisbursementConfirmation}
                      className="flex justify-center overflow-y-auto min-h-[50vh]">
                    <div className="grid grid-cols-3">
                        {actionType === 'single' && <TextInput
                            label="recipient's name"
                            id="recipient"
                            name="recipient"
                            type="text"
                            placeholder="Enter recipient's name"
                            required={true}
                            onInputChange={handleInputChange}
                            hasError={setHasError}
                            autoComplete=""
                            customClasses="col-span-full"
                        />}

                        {actionType === 'single' && <TextInput
                            label="recipient's phone number"
                            id="phone"
                            name="phone"
                            type="number"
                            placeholder="Enter phone number"
                            required={true}
                            onInputChange={handleInputChange}
                            hasError={setHasError}
                            autoComplete=""
                            customClasses="col-span-full"
                        />}

                        {actionType === 'single' &&
                            <DropdownInput label="Provider" selected={provider} setSelected={handleSetProvider}
                                           data={providers}
                                           customClasses="gap-y-2 mb-4"/>}

                        {actionType === 'single' && <TextInput
                            label="amount"
                            id="amount"
                            name="amount"
                            type="number"
                            placeholder="0"
                            required={true}
                            onInputChange={handleInputChange}
                            hasError={setHasError} autoComplete=""
                            customClasses="col-span-full"
                        >
                            {{
                                left: <span
                                    className="flex select-none items-center px-4 bg-gray-300 sm:text-sm rounded-l-md font-semibold"
                                    style={{background: '#EFEFEF'}}>GHS</span>
                            }}
                        </TextInput>}

                        <TextInput
                            label="description"
                            id="description"
                            name="description"
                            type="text"
                            placeholder="Enter description"
                            required={false}
                            onInputChange={handleInputChange}
                            hasError={setHasError} autoComplete=""
                            customClasses="col-span-full"
                        />

                        {actionType === 'bulk' && <div className="col-span-full">
                            <div className="col-span-full">
                                {!uploadedFileName && <>
                                    <div className="flex flex-col rounded border">
                                        <div className="flex justify-between m-3">
                                            <InfoCardItem
                                                description="Download for our template content should be here"
                                                title="Bulk Disbursement Template"
                                                customStyles="my-2 gap-x-2"
                                                customDescriptionStyles="text-sm"
                                                customTitleStyles="text-xs"
                                                svgFill="#652D90"
                                                svgPath={File}
                                            />
                                            <div
                                                className="shrink-0 flex sm:flex-col sm:items-end justify-center cursor-pointer"
                                                onClick={handleTemplateDownload}>
                                                <Svg fill="#4F4F4F" path={Download}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col mt-4">
                                        <DragAndDrop filesUploaded={handleFileUploaded}/>
                                    </div>
                                </>}

                                {uploadedFileName && <>
                                    <div className="flex flex-col rounded border mb-3 relative">
                                        <div className="flex justify-between m-3">
                                            <InfoCardItem
                                                description={uploadedFileName}
                                                title="Bulk Disbursement File"
                                                customStyles="my-2 gap-x-2"
                                                customDescriptionStyles="text-sm"
                                                customTitleStyles="text-xs"
                                                svgFill="#652D90"
                                                svgPath={File}
                                            />
                                            <div
                                                className="bg-purple-900 h-1 w-full absolute bottom-0 right-0 rounded-b"/>
                                        </div>
                                    </div>
                                </>}
                            </div>
                        </div>}

                        <div className="flex gap-x-4 relative mt-4">
                            <div className="flex text-sm">Schedule disbursement</div>
                            <div className="absolute right-[-310px]">
                                <Toggle enabled={toggleEnabled} handleToggle={handleToggle}/>
                            </div>
                        </div>

                        {toggleEnabled && (
                            <div className="col-span-full">
                                <div className="grid grid-cols-2 gap-4 my-4">
                                    <div
                                        className={`flex flex-col transition-opacity ${toggleEnabled ? 'opacity-100 duration-500 ease-in-out' : 'opacity-0 duration-500 ease-in-out'}`}>
                                        <div className="flex text-xs mb-2">Date</div>
                                        <DatePicker
                                            selectedDate={selectedDate}
                                            minDate={new Date()}
                                            setSelectedDate={handleDateSelected}/>
                                    </div>

                                    <div
                                        className={`flex flex-col transition-opacity ${toggleEnabled ? 'opacity-100 duration-500' : 'opacity-100 duration-500 ease-in-out'}`}>
                                        <div className="flex text-xs mb-2">Time</div>
                                        <TimePicker
                                            showTimePicker={showTimePicker}
                                            selectedTime={selectedTime}
                                            onTimeSelected={handleTimeSelected}/>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="col-span-full mt-5">
                            <div className="my-10 sm:grid-cols-10">
                                <Button styleType="primary" customStyles="justify-center p-4 md:p-5 rounded-lg"
                                        buttonType="submit"
                                        disabled={hasError}>
                                    <span className="flex self-center">Continue</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <OverlayDetailContainer open={openOverlay}
                                    title="Transaction Information"
                                    description={overlayDetailContainerDescription}
                                    handleOpen={setOpenOverlay}>
                <TransactionConfirmation transactionType={actionType}
                                         transaction={formData}
                                         handleConfirmation={handleTransactionConfirmation}
                                         handleCancel={setOpenOverlay}
                />
            </OverlayDetailContainer>

            <Modal showCloseButton={true} setModalOpen={handleModalOpen} showModal={openModal} customClasses="relative">
                {transactionSuccessful && <div>
                    <div className="absolute">
                        <Image className="-ml-5 mt-10" src="/assets/images/confetti.svg" alt="confetti" width={765}
                               height={765}/>
                    </div>
                    <div className="flex justify-center ">
                        <Image className="mt-[87px]" src="/assets/icons/check-circle.svg" alt="success" width={170}
                               height={171}/>
                    </div>
                </div>}

                <div className="flex flex-col p-10 mt-10">
                    <div className="sm:flex sm:items-start justify-center">
                        <div className="text-center sm:ml-4 sm:mt-0 sm:text-left">
                            <Dialog.Title as="h3"
                                          className="text-base font-semibold leading-6 text-gray-900 text-center">
                                {modalTitle}
                            </Dialog.Title>
                            <div className="mt-4">
                                <p className="text-xs text-gray-500 text-center">
                                    {modalDescription}
                                </p>
                            </div>
                        </div>
                    </div>

                    {error && <Alert alertType="error" description={error} customClasses="rounded p-2 mt-3 mb-1"/>}

                    {!transactionSuccessful && <div className="bg-gray-100 my-3 rounded border border-gray-10">
                        <div className="flex flex-col justify-center p-5 py-0 divide-y divide-gray-300">
                            {actionType === 'single' &&
                                <InfoCardItem description={formData.recipient ?? 'data'} title="Recipients Name"
                                              customStyles="my-2" customTitleStyles="mt-5 text-xs"/>}
                            {actionType === 'single' &&
                                <InfoCardItem description={formData.phone ?? ''} title="Recipient's Phone Number"
                                              customStyles="my-2" customTitleStyles="mt-5 text-xs"/>}
                            <InfoCardItem description={formData.description ?? ''} title="Description"
                                          customStyles="my-2"
                                          customTitleStyles="mt-5 text-xs"/>
                            <InfoCardItem description={formatAmount(formData.amount)} title="Total Amount"
                                          customStyles="my-2"
                                          customTitleStyles="mt-5 text-xs"/>
                            {formData.date &&
                                <InfoCardItem description={formData.date} title="Scheduled Date" customStyles="my-2"
                                              customTitleStyles="mt-5 text-xs"/>}
                            {formData.time &&
                                <InfoCardItem description={formData.time} title="Scheduled Time" customStyles="my-2"
                                              customTitleStyles="mt-5 text-xs"/>}
                        </div>
                    </div>}

                    <div
                        className={`sm:mt-4 sm:flex sm:flex-row-reverse ${transactionSuccessful ? 'pt-[50px]' : 'mt6'}`}>
                        <Button buttonType="button" styleType="primary" customStyles="p-4 md:p-5 rounded-lg"
                                onClick={handleDisbursementTransaction} disabled={loading}>
                            {!loading && <>
                                {modalButtonText} {transactionSuccessful &&
                                <Svg fill="#FFFFFF" path={ArrowCircleRight} customClasses="px-2"/>}
                            </>}

                            {loading && <Loader type="default"
                                                customClasses="relative"
                                                customAnimationClasses="w-10 h-10 text-white dark:text-gray-600 fill-purple-900"
                            />}
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default DisbursementActionContent;