import {DateTime} from "luxon";

export type ReportFilterFormDataType = {
    externalId: string | undefined,
    startDate: string | undefined,
    endDate: string | undefined,
    status: string | undefined
}