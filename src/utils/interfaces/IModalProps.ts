import React from "react";

export interface IModalProps {
    showModal: boolean;
    showCloseButton: boolean;
    setModalOpen: (b: boolean) => void;
    customClasses?: string;
    children?: React.ReactNode
}