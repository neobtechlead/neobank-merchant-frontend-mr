import React, {useState} from 'react';
import TextInput from "@/components/forms/TextInput";
import Button from "@/components/forms/Button";
import Toggle from "@/components/forms/Toggle";
import DatePicker from "@/components/forms/DatePicker";
import TimePicker from "@/components/forms/TimePicker";
import OverlayDetailContainer from "@/components/OverlayDetailContainer";
import TabsNav from "@/components/navigation/TabsNav";
import {IDisbursementActionContent} from "@/utils/interfaces/IDisbursementActionContent";
import {useDashboardStore} from "@/store/DashboardStore";
import {TType} from "ts-interface-checker";
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

const DisbursementActionContent: React.FC<IDisbursementActionContent> = ({
                                                                             contentType,
                                                                             resetDashboard
                                                                         }) => {
    const [hasError, setHasError] = useState<boolean | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [toggleEnabled, setToggleEnabled] = useState<boolean>(false);

    const [selectedTime, setSelectedTime] = useState<TType>('12:00 PM' as TType);
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
    const [openOverlay, setOpenOverlay] = useState<boolean>(false);
    const [openModal, setModalOpen] = useState<boolean>(false);
    const [modalTitle, setModalTitle] = useState<string>('Confirm Transaction Details');
    const [modalDescription, setModalDescription] = useState<string>('Please confirm the information below before disbursing.');
    const [modalButtonText, setModalButtonText] = useState<string>('Confirm');
    const [transactionSuccessful, setTransactionSuccessful] = useState<boolean>(false);
    const [confirmTransaction, setConfirmTransaction] = useState<boolean>(false);
    const [showTransactionDetail, setShowTransactionDetail] = useState<boolean>(false);
    const [overlayDetailContainerDescription, setOverlayDetailContainerDescription] = useState<string>('');

    const [formData, setFormData] = useState({
        recipient: '',
        phone: '',
        amount: '',
        description: '',
        scheduled: false,
        date: selectedDate,
        time: '',
        type: '',
    });

    const handleInputChange = (event) => {
        event.preventDefault()
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    };

    const handleDisbursementConfirmation = (event) => {
        event.preventDefault();
        setOverlayDetailContainerDescription('This generated link will be automatically sent to the customer’s email address provided in the form. Please alert customer to make payment within 5 days after link has been generated.')
        setOpenOverlay(true)
    };

    const handleToggle = (toggle) => {
        setToggleEnabled(() => {
            setFormData((prevFormData) => {
                return {...prevFormData, scheduled: toggle};
            });
            return toggle;
        });
    };

    const handleDateSelected = (date) => {
        setSelectedDate(date)
        setFormData((prevFormData) => {
            return {...prevFormData, date: date};
        });
    }

    const handleTimeSelected = (time) => {
        setSelectedTime(time)
        setShowTimePicker(false)

        setFormData((prevFormData) => {
            return {...prevFormData, time: time};
        });
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
        actionType,
        setActionType
    } = useDisbursementStore();

    const handleNavClick = (nav) => {
        setActionType(() => ({
            actionType: nav
        }));
    }

    const handleTransactionConfirmation = (actionType) => {
        setModalOpen(true)
    }

    const handleModalOpen = (openModal) => {
        setModalOpen(openModal)
    }
    const handleDisbursementTransaction = () => {
        if (!transactionSuccessful) {
            // Make an api call
            setModalTitle('Funds Successfully Disbursed')
            setModalDescription('Payment made to Kwaku Frimpong has been successfully disbursed. They will receive funds in their Neobank wallet and can access it through the Neobank USSD.')

            setTransactionSuccessful((transactionSuccessful) => {
                return transactionSuccessful = true;
            })

            setModalButtonText('Go to disbursement dashboard')
            return
        }

        setModalOpen(false)
        resetDisbursementStore()
    }

    const resetDisbursementStore = () => {
        setShowLogo(true)
        setShowBackButton(false)
        setShowNavigation(true)
        setShowProfileDropdown(true)
        setShowBackButton(false)
        setHeaderTitle('Disburse Funds')
        setHeaderDescription("Disburse Funds is a powerful tool that allows you to efficiently transfer allocated funds to their intended recipients. Whether it's sending payments to vendors, distributing salaries to employees, or making withdrawals, this feature streamlines the process for you.")
        resetDashboard()
    }

    const handleTemplateDownload = () => {
    }

    const handleFileUploaded = () => {
    }

    return (
        <div className="w-full h-full">
            <div className={`pt-10 ${toggleEnabled ? 'mb-50' : ''}`}>
                {contentType === 'initiate' &&
                    <div
                        className="flex justify-center border border-gray-100 rounded-lg text-center mb-10 max-w-xs mx-auto">
                        <TabsNav tabs={[{item: 'single', label: 'single disbursement'}, {item: 'bulk', label:'bulk disbursement'}]} handleClick={handleNavClick}
                                 customClasses="text-xs"/>
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
                            value={formData.recipient}
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
                            required={false}
                            value={formData.phone}
                            onInputChange={handleInputChange}
                            hasError={setHasError}
                            autoComplete=""
                            customClasses="col-span-full"
                        />}

                        {actionType === 'single' && <TextInput
                            label="amount"
                            id="amount"
                            name="amount"
                            type="number"
                            placeholder="0"
                            required={false}
                            value={formData.amount}
                            onInputChange={handleInputChange}
                            hasError={setHasError} autoComplete=""
                            customClasses="col-span-full"
                        >
                                    <span
                                        className="flex select-none items-center px-4 bg-gray-300 sm:text-sm rounded-l-md font-semibold"
                                        style={{background: '#EFEFEF'}}>GHS</span>
                        </TextInput>}

                        <TextInput
                            label="description"
                            id="description"
                            name="description"
                            type="text"
                            placeholder="Enter description"
                            required={false}
                            value={formData.description}
                            onInputChange={handleInputChange}
                            hasError={setHasError} autoComplete=""
                            customClasses="col-span-full"
                        />

                        {actionType === 'bulk' && <div className="col-span-full mb-5">
                            <div className="flex flex-col rounded border mb-5">
                                <div className="flex justify-between m-3">
                                    <InfoCardItem
                                        description="Download for our template content should be here"
                                        title="Bulk Disbursement Template"
                                        customStyles="my-2 gap-x-2"
                                        customDescriptionStyles="text-sm"
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
                            <div className="flex flex-col">
                                <DragAndDrop fileUploaded={handleFileUploaded}/>
                            </div>
                        </div>}

                        <div className="flex gap-4 relative mt-3">
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
                                        <DatePicker selectedDate={handleDateSelected}/>
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
                                         handleCancel={setOpenOverlay}/>
            </OverlayDetailContainer>

            <Modal showCloseButton={true} setModalOpen={handleModalOpen} showModal={openModal} customClasses="relative">
                {transactionSuccessful && <div>
                    <div className="absolute">
                        <Image className="-ml-5 mt-0" src="/assets/images/confetti.svg" alt="confetti" width={765}
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

                    {!transactionSuccessful && <div className="bg-gray-100 my-3 rounded border border-gray-10">
                        <div className="flex flex-col justify-center p-5 py-0 divide-y divide-gray-300">
                            <InfoCardItem description={formData.recipient ?? 'data'} title="Recipients Name"
                                          customStyles="my-2" customTitleStyles="mt-5"/>
                            <InfoCardItem description={formData.phone} title="Recipient's Phone Number"
                                          customStyles="my-2" customTitleStyles="mt-5"/>
                            <InfoCardItem description={formData.amount} title="Total Amount" customStyles="my-2"
                                          customTitleStyles="mt-5"/>
                            <InfoCardItem description={formData.description} title="Description" customStyles="my-2"
                                          customTitleStyles="mt-5"/>
                            {formData.date &&
                                <InfoCardItem description={formData.date} title="Scheduled Date" customStyles="my-2"
                                              customTitleStyles="mt-5"/>}
                            {formData.time &&
                                <InfoCardItem description={formData.time} title="Scheduled Time" customStyles="my-2"
                                              customTitleStyles="mt-5"/>}

                        </div>
                    </div>}

                    <div
                        className={`sm:mt-4 sm:flex sm:flex-row-reverse ${transactionSuccessful ? 'pt-[50px]' : 'mt6'}`}>
                        <Button buttonType="button" styleType="primary" customStyles="p-4 md:p-5 rounded-lg"
                                onClick={handleDisbursementTransaction}>
                            {modalButtonText} {transactionSuccessful &&
                            <Svg fill="#FFFFFF" path={ArrowCircleRight} customClasses="px-2"/>}
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default DisbursementActionContent;