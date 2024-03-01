import React from "react";
import {IAlert} from "@/utils/interfaces/IAlert";

export interface IAuthContentWrapper {
    title: string
    description: string
    alertInfo?: IAlert
    customClasses?: string
    children?: React.ReactNode
}