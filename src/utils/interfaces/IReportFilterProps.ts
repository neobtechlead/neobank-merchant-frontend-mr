import React from "react";
import {TransactionType} from "@/utils/types/TransactionType";
import {ReportFilterFormDataType} from "@/utils/types/ReportFilterFormDataType";

export interface IReportFilterProps {
    onSubmit: (data: ReportFilterFormDataType) => void;
}