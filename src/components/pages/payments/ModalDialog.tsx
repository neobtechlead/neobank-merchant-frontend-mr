import React, {Fragment, ReactNode, useRef} from 'react';
import {Dialog, Transition} from "@headlessui/react";

interface Props {
    isOpen: boolean,
    children: ReactNode,
    onClose: () => any
}


const ModalDialog = ({isOpen, children, onClose}: Props) => {

    const dialogRef = useRef<HTMLDivElement>(null);
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                open={isOpen}
                onClose={onClose}
                className="relative z-50"
                initialFocus={dialogRef}
            >
                {/* The backdrop, rendered as a fixed sibling to the panel container */}
                <div className="fixed inset-0 bg-black/20" aria-hidden="true"/>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <div className="fixed inset-0 w-screen overflow-y-auto">
                        <div className="flex justify-center">
                            <Dialog.Panel ref={dialogRef}
                                          className="w-6/12 rounded-[5px] overflow-hidden bg-white p-[94px]">
                                {children}
                            </Dialog.Panel>
                        </div>
                    </div>
                </Transition.Child>
            </Dialog>
        </Transition>
    );
};

export default ModalDialog;
