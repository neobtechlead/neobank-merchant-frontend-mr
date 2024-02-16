import React, {Fragment} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {IOverlayDetailContainerProps} from "@/utils/interfaces/IOverlayDetailContainerProps";

const OverlayDetailContainer: React.FC<IOverlayDetailContainerProps> = ({
                                                                            open,
                                                                            handleOpen,
                                                                            title,
                                                                            description,
                                                                            children,
                                                                        }) => {

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={handleOpen}>
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 "/>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-sm">
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                        <div className="p-6 bg-purple-900 px-4 py-6 sm:px-6 min-h-[150px]"
                                             style={{backgroundImage: "url('/assets/images/card-background.svg')"}}>
                                            <div className="flex items-start justify-between">
                                                <Dialog.Title
                                                    className="text-base font-semibold leading-6 text-white">{title}</Dialog.Title>
                                            </div>
                                            <div className="mt-2">
                                                <p className="text-xs text-gray-200">{description}</p>
                                            </div>
                                        </div>
                                        <div className="flex-1 overflow-y-auto">
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
