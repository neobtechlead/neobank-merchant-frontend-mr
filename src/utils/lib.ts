import {DateTime, DateTimeUnit} from "luxon";

export const formatAmountGHS = (amount: string) => {
    return (parseFloat(amount) / 100).toFixed(2);
}

export const formatAmount = (amount: number | string = 0, currency: string = 'GHS') => {
    return `${currency}  ${(new Intl.NumberFormat('en-GH', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(Number(amount)))}`
}

export const normalizeDate = (date: string) => {
    return DateTime.fromISO(date).toLocaleString({
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
}

export const calculateDateRange = (range: number = 6, customStart: boolean = false, whereStart: DateTimeUnit = 'month') => {
    const endDate = DateTime.local();
    const dateDifference = endDate.minus({months: range})
    const startDate = customStart ? dateDifference.startOf(whereStart) : dateDifference

    return {
        startDate: startDate.toJSDate(),
        endDate: endDate.toJSDate(),
    };
}

export const camelCaseToWords = (text: string = '') => {
    return text.replace(/([A-Z])/g, ' $1').toLowerCase();
}

export const downloadFile = async (response: Response | Blob, fileName: string = 'sample.txt') => {
    try {
        const blob = (response instanceof Response) ? await response.blob() : response;
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error downloading file:', error);
    }
};
