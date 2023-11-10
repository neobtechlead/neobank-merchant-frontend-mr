import React, {ReactNode} from "react";

export interface ITextInput {
    label: string;
    id: string;
    name: string;
    type: string;
    autoComplete: string;
    required: boolean;
    placeholder?: string;
    onInputChange: (event: object) => void;
    hasError: (value: boolean) => void;
    passwordIcon?: boolean;
    disabled?: boolean;
    children?: ReactNode;
    customClasses?: string;
}