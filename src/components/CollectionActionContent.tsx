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
import {useCollectionStore} from "@/store/CollectionStore";
import CollectionConfirmation from "@/components/CollectionConfirmation";
import {ShareNetwork} from "@/assets/icons/ShareNetwork";
import {Copy} from "@/assets/icons/Copy";
import CollectionForm from "@/components/CollectionForm";
import {CollectionFormDataType} from "@/utils/types/CollectionFormDataType";
import {TransactionType} from "@/utils/types/TransactionType";

const CollectionActionContent: React.FC<ICollectionActionContentProps> = ({resetDashboard}) => {
    const [hasError, setHasError] = useState<boolean | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [openOverlay, setOpenOverlay] = useState<boolean>(false);
    const [openModal, setModalOpen] = useState<boolean>(false);
    const [modalTitle, setModalTitle] = useState<string>('Confirm Collection Details');
    const [modalDescription, setModalDescription] = useState<string>('Please confirm the information below before proceeding.');
    const [modalButtonText, setModalButtonText] = useState<string>('Confirm');
    const [transactionSuccessful, setTransactionSuccessful] = useState<boolean>(false);
    const [overlayDetailContainerDescription, setOverlayDetailContainerDescription] = useState<string>('');
    const [formData, setFormData] = useState<TransactionType | undefined>();

    const handleCollectionConfirmation = (formData: CollectionFormDataType) => {
        const data = {...formData}
        setFormData(data)
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
        actionType,
    } = useCollectionStore();

    const handleTransactionConfirmation = () => {
        setModalOpen(true)
    }

    const handleModalOpen = (openModal: boolean | ((prevState: boolean) => boolean)) => {
        setModalOpen(openModal)
    }
    const handlePaymentLinkGeneration = () => {
        if (!transactionSuccessful) {
            // Make an api call
            setModalTitle('Link Created Successfully')
            setModalDescription('You have successfully created a payment link. You can share this link by either copying or through social media platforms.')

            setTransactionSuccessful((transactionSuccessful) => transactionSuccessful = true)

            setModalButtonText('Go to collections dashboard')
            return
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
        setHeaderDescription("Funds Collection is a vital process that involves gathering and consolidating financial contributions or payments from various sources or contributors. Whether you are managing donations for a non-profit organization, collecting payments for goods or services, or coordinating group contributions, efficient funds collection is key to financial success.")
        resetDashboard()
    }

    const paymentLink = "neobank.completefarmer.com/transactions/new-payment-link"

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

                                {transactionSuccessful &&
                                    <div className="flex justify-between rounded mt-[20px] truncate overflow-hidden">
                                        <div
                                            className="flex items-center p-2 border rounded-lg mr-3 h-[50px] text-sm text-gray-700 text-xs">
                                            {paymentLink}
                                        </div>
                                        <Svg fill="#4F4F4F" path={ShareNetwork}/>
                                        <Svg fill="#4F4F4F" path={Copy}/>
                                    </div>}
                            </div>
                        </div>
                    </div>

                    {!transactionSuccessful && <div className="bg-gray-100 my-3 rounded border border-gray-10">
                        <div className="flex flex-col justify-center p-5 py-0 divide-y divide-gray-300">
                            <InfoCardItem description={formData?.recipient ?? 'data'} title="Recipients Name"
                                          customStyles="my-2" customTitleStyles="mt-5"/>
                            <InfoCardItem description={formData?.email} title="Email Address"
                                          customStyles="my-2" customTitleStyles="mt-5"/>
                            <InfoCardItem description={formData?.reference} title="Reference"
                                          customStyles="my-2" customTitleStyles="mt-5"/>
                            <InfoCardItem description={formData?.phone} title="Recipient's Contact Number"
                                          customStyles="my-2" customTitleStyles="mt-5"/>
                            <InfoCardItem description={formData?.amount} title="Total Amount" customStyles="my-2"
                                          customTitleStyles="mt-5"/>
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