import React, {Fragment, useState} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import DashboardLayout from "@/components/layouts/DashboardLayout";
import Svg from "@/components/Svg";
import {ArrowLeft} from "../../public/assets/icons/ArrowLeft";
import DisbursementActionContent from "@/components/DisbursementActionContent";
import {IDisbursementActionContainer} from "@/utils/interfaces/IDisbursement";
import {useDashboardStore} from "@/store/DashboardStore";

const DisbursementActionContainer: React.FC<IDisbursementActionContainer> = ({
                                                                                 title,
                                                                                 description,
                                                                                 open,
                                                                                 handleOpen,
                                                                                 customClasses,
                                                                                 children,
                                                                             }) => {
    const {
        setShowLogo,
        setShowNavigation,
        setShowProfileDropdown,
        setHeaderTitle,
        setHeaderDescription
    } = useDashboardStore();



    const [hasError, setHasError] = useState<boolean | null>(null);
    const [formData, setFormData] = useState({
        batchNumber: 'auto generated',
        recipientName: '',
        recipientNumber: '',
        amount: 0,
        description: 0
    });

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    };

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="fixed inset-0 z-50 overflow-y-hidden" onClose={() => handleOpen(!open)}>
                <div className="bg-white bg-blue-500">
                    <DisbursementActionContent type={'single'}/>
                    {/*<DashboardLayout*/}
                    {/*    headerTitle={title}*/}
                    {/*    headerDescription={description}*/}
                    {/*    showHeader={true}*/}
                    {/*    showNavigation={false}*/}
                    {/*    logoStyles="lg:ml-[48px]"*/}
                    {/*>*/}
                    {/*    {{*/}
                    {/*        logo: <div className="flex cursor-pointer gap-2 lg:pl-5" onClick={() => handleOpen(!open)}>*/}
                    {/*            <Svg fill="#4F4F4F" path={ArrowLeft}/>*/}
                    {/*            Back*/}
                    {/*        </div>,*/}
                    {/*        navigationLinks: <span*/}
                    {/*            className="hidden md:block flex items-center sm:justify-end lg:justify-center font-semibold lg:text-2xl sm:text-lg capitalize">*/}
                    {/*            {title}</span>,*/}
                    {/*        body: <div className="place-content-center"><DisbursementActionContent type={'single'}/></div>,*/}
                    {/*    }}*/}

                    {/*</DashboardLayout>*/}
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default DisbursementActionContainer;
