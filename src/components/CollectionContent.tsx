import React, {useEffect, useState} from 'react';
import {Plus} from '@/assets/icons/plus'
import EmptyTransactionCardContent from "@/components/EmptyTransactionCardContent";
import Button from "@/components/forms/Button";
import Svg from "@/components/Svg";
import OverlayDetailContainer from "@/components/OverlayDetailContainer";
import Table from "@/components/tables/Table";
import Status from "@/components/Status";
import Footer from "@/components/tables/Footer";
import {useDashboardStore} from "@/store/DashboardStore";
import TransactionDetail from "@/components/transactions/TransactionDetail";
import {TransactionType} from "@/utils/types/TransactionType";
import Image from "next/image";
import CollectionActionContent from "@/components/CollectionActionContent";
import {ICollectionContentProps} from "@/utils/interfaces/ICollectionContentProps";
import {useTransactionStore} from "@/store/TransactionStore";
import {listCollections} from "@/api/collection";
import {useUserStore} from "@/store/UserStore";
import {formatAmount, formatAmountGHS, normalizeDate} from "@/utils/lib";
import TextInput from "@/components/forms/TextInput";
import {Search} from "@/assets/icons/Search";
import {IListBoxItem} from "@/utils/interfaces/IDropdownProps";

const CollectionContent: React.FC<ICollectionContentProps> = ({
                                                                  showPaymentLinkForm,
                                                                  setShowPaymentLinkForm,
                                                                  hasActivity,
                                                                  setHasActivity,
                                                                  showEmptyState,
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
        setShowSupportButton
    } = useDashboardStore();
    const {setCollections, collections, transaction} = useTransactionStore()
    const {merchant, user} = useUserStore();

    useEffect(() => {
        setDashboardState()
    }, [])

    const [pageOption, setPageOption] = useState<IListBoxItem>({
        label: '10',
        value: '10'
    });

    const getCollectionTransactions = (params: string) => {
        listCollections(merchant?.externalId, user?.authToken, params)
            .then(async (response) => {
                if (response.ok) {
                    const feedback = await response.json();
                    const {pagination, transactions} = feedback.data
                    if (setCollections) setCollections({pagination, transactions});
                }
            })
            .catch((error) => {
                console.log('error: ', error)
            })
    }

    const [openTransactionDetail, setOpenTransactionDetail] = useState<boolean>(false);

    const handleSetPageOption = (pageOption: IListBoxItem) => {
        getCollectionTransactions(`rows=${pageOption.value}`)
        setPageOption(pageOption)
    }

    const perPageOptions: IListBoxItem [] = [
        {label: '10', value: '10'},
        {label: '20', value: '20'},
    ]

    const tableHeading = [
        {label: 'date', classes: ''},
        {label: 'client name', classes: 'hidden sm:table-cell'},
        {label: 'amount', classes: ''},
        {label: 'status', classes: ''}
    ]

    const setDashboardState = () => {
        getCollectionTransactions('')
        setShowSupportButton(true)
        setShowPaymentLinkForm(false)
        setNavTitle('')

        if (collections?.transactions && collections.transactions.length > 0) {
            setShowEmptyState(false)
            setHasActivity(true)
        } else {
            setShowEmptyState(true)
            setHasActivity(false)
        }
    }

    const handlePrevious = () => {
    }
    const handleNext = () => {
    }

    const handleCollectionActionContent = () => {
        setShowEmptyState(false)
        setShowLogo(false)
        setShowBackButton(true)
        setHeaderTitle("Generate Payment Link")
        setHeaderDescription("Generate links instantly to collect payments from various parties.")
        setShowNavigation(false)
        setShowProfileDropdown(false)
        setHasActivity(false)
        setNavTitle("Generate Link")
        setShowPaymentLinkForm(true)
        setShowSupportButton(false)
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
                title="No collections to display"
                description={"You haven't made any collections yet. Your collection activity will be displayed here."}
            >
                <div className="text-center">
                    <div className="flex flex-col my-10">
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
                                               style={{width: 'auto'}}
                                        />
                                        <Image src="/assets/images/successful-badge.svg"
                                               alt="payment-link"
                                               height={57}
                                               width={57}
                                               className="absolute -top-5 -right-4"
                                               style={{width: 'auto'}}
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
                                                customStyles="justify-center p-4 sm:p-5 rounded-md text-sm"
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

                    <div className="w-1/4 ml-auto my-8">
                        <TextInput label="" id="search" name="search" type="search" placeholder="Search" autoComplete=""
                                   customInputClasses="grid ml-auto mr-4">
                            {{
                                left: <Svg fill="#4F4F4F" path={Search} customClasses="ml-2"/>
                            }}
                        </TextInput>
                    </div>

                    <div className="overflow-hidden rounded-lg border border-gray-100 px-5 ml-5">
                        <Table title="Payment Links" headers={tableHeading}>
                            {collections?.transactions && collections.transactions.map((transaction: TransactionType, key: number) => (
                                <tr key={key} className={`text-center `}>
                                    <td className="relative py-2 pr-3 font-normal text-xs">
                                        <div
                                            className={` ${key === 0 ? 'absolute top-0 left-0 right-0 h-px w-screen bg-gray-100' : ''}`}/>
                                        <div className={` ${key === 0 ?
                                            'absolute top-0 right-full h-px w-full bg-gray-100' : ''}`}/>

                                        {normalizeDate(transaction.createdAt ?? '', true)}
                                        <div className={` ${key !== collections.transactions.length - 1 ?
                                            'absolute bottom-0 left-0 right-0 h-px w-screen bg-gray-100' : ''}`}/>
                                        <div className={` ${key !== collections.transactions.length - 1 ?
                                            'absolute bottom-0 right-full h-px w-full bg-gray-100' : ''}`}/>
                                    </td>
                                    <td className="hidden px-3 py-2 sm:table-cell text-xs">{transaction.accountName}</td>
                                    <td className="px-3 py-2 text-xs">{formatAmount(formatAmountGHS(transaction.amount?.toString()))}</td>
                                    <td className="px-3 py-2 text-xs">
                                        <Status customStyles="text-red-500"
                                                status={transaction.status?.toLowerCase() ?? ''}/>
                                    </td>
                                </tr>
                            ))}
                        </Table>
                    </div>
                    <div className="mx-5 mb-[100px]">
                        <Footer pagination={collections.pagination}
                                handlePrevious={handlePrevious}
                                handleNext={handleNext}
                                pageOption={pageOption}
                                setPageOption={handleSetPageOption}
                                perPageOptions={perPageOptions}
                        />
                    </div>
                </div>}

                {showPaymentLinkForm && <CollectionActionContent resetDashboard={setDashboardState}/>}
            </div>

            <OverlayDetailContainer open={openTransactionDetail}
                                    handleOpen={setOpenTransactionDetail}
                                    title="Transaction Information"
                                    description="This generated link will be automatically sent to the customer’s email address provided in the form. Please alert customer to make payment within some days after link has been generated.">
                <div className="group relative flex flex-col py-3">
                    <TransactionDetail transaction={transaction}/>
                </div>
            </OverlayDetailContainer>
        </div>
    );
};
export default CollectionContent;
