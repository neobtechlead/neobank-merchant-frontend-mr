import {DateTime, DateTimeFormatOptions, DateTimeUnit} from "luxon";
import {ErrorResponse} from "@/utils/interfaces/IErrorResponse";
import {MonthlyTransactionSummaryType} from "@/utils/types/MonthlyTransactionSummaryType";

export const formatAmountGHS = (amount: string = ''): string => {
    return (parseFloat(amount) / 100).toFixed(2);
}

export const formatAmount = (amount: number | string = 0, currency: string = 'GHS') => {
    return `${currency}  ${(new Intl.NumberFormat('en-GH', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(Number(amount)))}`
}

export const toMinorDigits = (amount: number | string = 0): number => {
    return parseFloat(String(amount)) * 100;
};

export const normalizeDate = (date: string, includeTime: boolean = false) => {
    const dateOptions: DateTimeFormatOptions = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    };

    const timeOptions: DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    };

    const dateTimeOptions: DateTimeFormatOptions = includeTime
        ? {...dateOptions, ...timeOptions}
        : dateOptions;

    return DateTime.fromISO(date).toLocaleString(dateTimeOptions);
};

export const calculateDateRange = (range: number = 6, customStart: boolean = false, whereStart: DateTimeUnit = 'month') => {
    const endDate = DateTime.local();
    const dateDifference = endDate.minus({months: range})
    const startDate = customStart ? dateDifference.startOf(whereStart) : dateDifference
    return {
        startDate: startDate.toISODate(),
        endDate: endDate.toISODate(),
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

export const getError = (error: ErrorResponse) => {
    if (error.data) {
        const {violations} = error.data;
        if (violations) return violations[0].message;
    }

    return error.message;
};

export const getInitials = (name: string = ''): string => {
    const words = name.split(' ');

    if (words.length === 0) {
        return 'CF'
    } else if (words.length === 1) {
        return words.map(word => word.substring(0, 2).toUpperCase()).join('')
    } else {
        return words.map(word => word.charAt(0).toUpperCase()).slice(0, 2).join('');
    }
};


export const capitalizeFirstLetter = (text: string = ''): string => {
    return text.charAt(0).toUpperCase() + text.slice(1)
};

export const plotGraphData = (data: MonthlyTransactionSummaryType = {}) => {
    const graphTemplate = getGraphTemplate();

    return Object.entries(graphTemplate).reduce(
        (accumulator, [month, values]) => {
            const {collectionCount, collectionValue, disbursementCount, disbursementValue} = values;
            const period = capitalizeFirstLetter(month.slice(0, 3));

            const volumeEntry = {
                name: period,
                collections: data[month]?.collectionCount || collectionCount,
                disbursements: data[month]?.disbursementCount || disbursementCount,
            };

            const valueEntry = {
                name: period,
                collections: data[month]?.collectionValue ? formatAmountGHS(String(data[month].collectionValue)) : collectionValue,
                disbursements: data[month]?.disbursementValue ? formatAmountGHS(String(data[month].disbursementValue)) : disbursementValue,
            };

            accumulator.volume.push(volumeEntry);
            accumulator.value.push(valueEntry);
            return accumulator;
        },
        {volume: [], value: []} as { volume: any[]; value: any[] }
    );
};

export const getGraphTemplate = () => {
    const {startDate, endDate} = calculateDateRange()

    const template: MonthlyTransactionSummaryType = {};

    let currentDate = DateTime.fromFormat(startDate ?? '', 'yyyy-MM-dd').toJSDate();
    let endPeriod = DateTime.fromFormat(endDate ?? '', 'yyyy-MM-dd').toJSDate();
    while (currentDate <= endPeriod) {
        const monthName = new Intl.DateTimeFormat('en-US', {month: 'long'}).format(currentDate);

        template[monthName.toLowerCase()] = {
            disbursementCount: 0,
            collectionCount: 0,
            collectionValue: 0,
            disbursementValue: 0,
        };

        currentDate.setMonth(currentDate.getMonth() + 1);
    }
    return template;
};







