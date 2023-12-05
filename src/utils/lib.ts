import {DateTime, DateTimeUnit} from "luxon";

export const formatAmountGHS = (amount: string) => {
    return (parseFloat(amount) / 100).toFixed(2);
}

export const normalizeDate = (date: string) => {
    return DateTime.fromISO(date).toISODate()
}

export const calculateDateRange = (range: number = 6, customStart: boolean = false, whereStart: DateTimeUnit = 'month') => {
    const endDate = DateTime.local();
    const dateDifference = endDate.minus({months: range})
    const startDate =  customStart ? dateDifference.startOf(whereStart) : dateDifference

    return {
        startDate: startDate.toJSDate(),
        endDate: endDate.toJSDate(),
    };
}