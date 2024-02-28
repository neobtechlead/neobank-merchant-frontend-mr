import {ReportFilterFormDataType} from "@/utils/types/ReportFilterFormDataType";

export interface IReportFilterProps {
    onSubmit: (data: ReportFilterFormDataType) => void;
    onReset: () => void;
}