import {DateTime} from "luxon";

export const formatAmountGHS = (amount: string) => {
    return (parseFloat(amount) / 100).toFixed(2);

}

export const normalizeDate = (date: string) => {
    return DateTime.fromISO(date).toISODate()
}

