import React from 'react';
import {Dialog, Transition} from '@headlessui/react';
import Alert from '@/components/Alert';

interface OverlayDetailContainerProps {
    open: boolean;
    handleOpen: (open: boolean) => void;
    title: string;
    description: string;
    showAlert: boolean;
    children: React.ReactNode;
}

const OverlayDetailContainer: React.FC<OverlayDetailContainerProps> = ({
                                                                           open,
                                                                           handleOpen,
                                                                           title,
                                                                           description,
                                                                           showAlert,
                                                                           children,
                                                                           alertType,
                                                                           alertDescription,
                                                                           alertClasses
                                                                       }: OverlayDetailContainerProps) => {
    return (
        <Transition.Root show={open} as={React.Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => handleOpen(!open)}>
                <div className="fixed inset-0"/>
                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                            <Transition.Child
                                as={React.Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                        <div className="bg-purple-900 px-4 py-6 sm:px-6 min-h-[150px]"
                                             style={{backgroundImage: "url('/assets/images/card-background.svg')"}}>
                                            <div className="flex items-center justify-between">
                                                <Dialog.Title className="text-base font-semibold leading-6 text-white">
                                                    {title}
                                                </Dialog.Title>
                                            </div>
                                            <div className="mt-2">
                                                <p className="text-xs text-gray-200">{description}</p>
                                            </div>
                                        </div>
                                        <div className="border-gray-200 p-6 mt-4">
                                            {showAlert && (
                                                <Alert
                                                    alertType={alertType}
                                                    description={alertDescription}
                                                    descriptionClasses={alertClasses}
                                                />
                                            )}
                                            {children}
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default OverlayDetailContainer;
