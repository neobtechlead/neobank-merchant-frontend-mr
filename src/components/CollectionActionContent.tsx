import React, {useState} from 'react';
import Button from "@/components/forms/Button";
import OverlayDetailContainer from "@/components/OverlayDetailContainer";
import {useDashboardStore} from "@/store/DashboardStore";
import Modal from "@/components/Modal";
import {Dialog} from '@headlessui/react'
import {ArrowCircleRight} from "@/assets/icons/ArrowCircle";
import Svg from "@/components/Svg";
import Image from 'next/image';
import InfoCardItem from "@/components/InfoCardItem";
import CollectionConfirmation from "@/components/CollectionConfirmation";
import {ShareNetwork} from "@/assets/icons/ShareNetwork";
import CollectionForm from "@/components/CollectionForm";
import {TransactionType} from "@/utils/types/TransactionType";
import {formatAmount, toMinorDigits} from "@/utils/lib";
import {generatePaymentLink} from "@/api/collection";
import {useUserStore} from "@/store/UserStore";
import {useTransactionStore} from "@/store/TransactionStore";
import CopyButton from "@/components/CopyButton";

const CollectionActionContent: React.FC<ICollectionActionContentProps> = ({resetDashboard}) => {
    const [openOverlay, setOpenOverlay] = useState<boolean>(false);
    const [openModal, setModalOpen] = useState<boolean>(false);
    const [modalTitle, setModalTitle] = useState<string>('Confirm Collection Details');
    const [modalDescription, setModalDescription] = useState<string>('Please confirm the information below before proceeding.');
    const [modalButtonText, setModalButtonText] = useState<string>('Confirm');
    const [transactionSuccessful, setTransactionSuccessful] = useState<boolean>(false);
    const [overlayDetailContainerDescription, setOverlayDetailContainerDescription] = useState<string>('');
    const [formData, setFormData] = useState<TransactionType | undefined>();
    const [paymentLink, setPaymentLink] = useState<string>('');

    const handleCollectionConfirmation = (formData: TransactionType) => {
        setFormData(formData)
        setOverlayDetailContainerDescription('This generated link will be automatically sent to the customer’s email address provided in the form. Please alert customer to make payment within 5 days after link has been generated.')
        setOpenOverlay(true)
    };

    const {
        setShowLogo,
        setShowNavigation,
        setShowBackButton,
        setShowProfileDropdown,
        setHeaderTitle,
        setHeaderDescription
    } = useDashboardStore();

    const {
        user,
        merchant
    } = useUserStore();

    const {
        setCollection,
    } = useTransactionStore();

    const handleTransactionConfirmation = () => {
        setModalOpen(true)
    }

    const handlePaymentLinkGeneration = () => {
        if (!transactionSuccessful) {
            generatePaymentLink(merchant?.externalId, user?.authToken, {
                accountNumber: formData?.phone,
                accountIssuer: "NEO",
                accountName: formData?.recipient,
                narration: formData?.reference,
                email: formData?.email,
                amount: toMinorDigits(formData?.amount),
                processAt: formData?.processAt
            }).then(async response => {
                const feedback = await response.json();

                if (response.ok) {
                    setModalTitle('Link Generated Successfully')
                    setModalDescription('Your payment link was successfully generated. Copy this link to share with your desired recipient.')
                    setTransactionSuccessful(true)
                    setModalButtonText('Go to collections dashboard')
                    if (setCollection) setCollection(feedback?.data)
                    return setPaymentLink(feedback?.data?.emailPaymentLink)
                }
            })
        }
        setModalOpen(false)
        resetCollectionStore()
    }

    const resetCollectionStore = () => {
        setShowLogo(true)
        setShowBackButton(false)
        setShowNavigation(true)
        setShowProfileDropdown(true)
        setShowBackButton(false)
        setHeaderTitle('Funds Collection')
        setHeaderDescription("Collect payments seamlessly from single or multiple sources.")
        resetDashboard()
    }

    return (
        <div className="w-full h-full">
            <div className={`pt-10`}>
                <CollectionForm onSubmit={handleCollectionConfirmation}/>
            </div>

            <OverlayDetailContainer open={openOverlay}
                                    title="Transaction Information"
                                    description={overlayDetailContainerDescription}
                                    handleOpen={setOpenOverlay}>
                <CollectionConfirmation
                    transaction={formData}
                    handleConfirmation={handleTransactionConfirmation}
                    handleCancel={setOpenOverlay}/>
            </OverlayDetailContainer>

            <Modal showCloseButton={true} setModalOpen={setModalOpen} showModal={openModal} customClasses="relative">
                {transactionSuccessful && <div>
                    <div className="">
                        <Image className="mt-5" src="/assets/images/confetti.svg" alt="confetti" width={765}
                               height={765}/>
                    </div>
                    <div className="flex justify-center ">
                        <Image className="" src="/assets/icons/check-circle.svg" alt="success" width={170}
                               height={171}/>
                    </div>
                </div>}

                <div className="flex flex-col p-10">
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

                                {transactionSuccessful &&
                                    <div
                                        className="flex items-center justify-between rounded mt-[20px]">
                                        <div
                                            className="flex items-center p-2 border rounded-md mr-3 max-h-[50px] text-gray-700 text-xs">
                                            {paymentLink}
                                        </div>
                                        <div className="cursor-pointer p-2 group flex relative">
                                            <Svg fill="#4F4F4F" path={ShareNetwork} customClasses="cursor-pointer"/>
                                            <span
                                                className="group-hover:opacity-100 transition-opacity bg-gray-700 px-1 text-sm text-gray-100 rounded absolute top-[-2rem] left-1/2 -translate-x-1/2 opacity-0 m-4 mx-auto z-50 truncate">
                                                Share
                                            </span>
                                        </div>
                                        <CopyButton text={paymentLink}/>
                                    </div>}
                            </div>
                        </div>
                    </div>

                    {!transactionSuccessful && <div className="bg-gray-100 my-3 rounded border border-gray-10">
                        <div className="flex flex-col justify-center p-5 py-0 divide-y divide-gray-300">
                            <InfoCardItem description={formData?.recipient?.toString()} title="Recipients Name"
                                          customStyles="my-2" customTitleStyles="mt-5 text-xs font-semibold"/>
                            <InfoCardItem description={formData?.email?.toString()} title="Email Address"
                                          customStyles="my-2" customTitleStyles="mt-5 text-xs font-semibold"/>
                            <InfoCardItem description={formData?.reference?.toString()} title="Reference"
                                          customStyles="my-2" customTitleStyles="mt-5 text-xs font-semibold"/>
                            <InfoCardItem description={formData?.phone?.toString()} title="Recipient's Contact Number"
                                          customStyles="my-2" customTitleStyles="mt-5 text-xs font-semibold"/>
                            <InfoCardItem description={formatAmount(formData?.amount)} title="Total Amount"
                                          customStyles="my-2"
                                          customTitleStyles="mt-5 text-xs font-semibold"/>
                        </div>
                    </div>}

                    <div
                        className={`sm:mt-4 sm:flex sm:flex-row-reverse ${transactionSuccessful ? 'pt-[50px]' : 'mt6'}`}>
                        <Button buttonType="button" styleType="primary" customStyles="p-4 md:p-5 rounded-lg"
                                onClick={handlePaymentLinkGeneration}>
                            {modalButtonText} {transactionSuccessful &&
                            <Svg fill="#FFFFFF" path={ArrowCircleRight} customClasses="px-2"/>}
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default CollectionActionContent;