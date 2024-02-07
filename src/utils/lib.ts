import {DateTime, DateTimeFormatOptions, DateTimeUnit} from "luxon";
import {ErrorResponse} from "@/utils/interfaces/IErrorResponse";
import {MonthlyTransactionSummaryType} from "@/utils/types/MonthlyTransactionSummaryType";
import {now} from "d3-timer";
import {TransactionType} from "@/utils/types/TransactionType";
import {PaginationType} from "@/utils/types/PaginationType";
import {ApiMetaType} from "@/utils/types/ApiMetaType";
import {ApiPaginationType} from "@/utils/types/ApiPaginationType";

export const formatAmountGHS = (amount: number | string = ''): string => {
    return (parseFloat(<string>amount) / 100).toFixed(2);
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

export const normalizeDate = (date: string = now().toString(), includeTime: boolean = false) => {
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

export const splitDateAndTime = (date: string = now().toString()) => {
    const dateTime = DateTime.fromISO(date);
    return {
        date: dateTime.toFormat('dd/MM/yyyy'),
        time: dateTime.toFormat('hh:mma'),
    };
};

export const getCurrentDateTimeString = () => {
    return DateTime.local().toFormat('yyyyMMddHHmmss');
};

export const calculateDateRange = (range: number = 5, customStart: boolean = false, whereStart: DateTimeUnit = 'month') => {
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

const isErrorStringFormat = (message: string = '') => {
    const formatRegex = /^\{data=[^,]+, success=[^,]+, message=[^,]+, httpStatusCode=\d+\}$/;
    return formatRegex.test(message);
};

export const getError = (error: ErrorResponse): string => {
    if (error.data) {
        const {violations} = error.data;
        if (violations) return `${violations[0].field} ${violations[0].message}`;
    }


    if (isErrorStringFormat(error.message)) {
        const dataRegex = /data=([^,]*)/;
        const messageRegex = /message=([^,}]*)/;

        const dataMatch = error.message.match(dataRegex);
        const messageMatch = error.message.match(messageRegex);

        const extractedData = {
            data: dataMatch ? dataMatch[1].trim() : null,
            message: messageMatch ? messageMatch[1].trim() : null,
        };

        return extractedData.message ?? ''
    } else
        return error.message
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
                collections: data[month]?.collectionValue
                    ? Number(formatAmountGHS(String(data[month].collectionValue)))
                    : Number(collectionValue),
                disbursements: data[month]?.disbursementValue
                    ? Number(formatAmountGHS(String(data[month].disbursementValue)))
                    : Number(disbursementValue),
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

export const getRSwitch = (phoneNumber: string = 'NEO'): string => {
    const firstThreeDigits = phoneNumber.slice(0, 3);

    const rSwitches = [
        {prefixes: ['024', '055', '053', '059', '054'], value: 'MTN'},
        {prefixes: ['027', '026', '056', '057'], value: 'ATL'},
        {prefixes: ['020', '050'], value: 'VOD'}
    ];

    const matchedRSwitch = rSwitches.find((rSwitch) =>
        rSwitch.prefixes.includes(firstThreeDigits)
    );

    return matchedRSwitch ? matchedRSwitch.value : 'NEO';
};

export const getDisbursementType = (transaction: TransactionType): string => {
    return transaction.batchExternalId ? 'bulk' : 'single';
};

export const isImageAvailable = (imageSrc: string = '', extension: string = 'png') => {
    try {
        const image = new Image();
        image.src = `/assets/images/${imageSrc}.${extension}`;
        return image.complete;
    } catch (error) {
        console.error('Error checking image availability', error);
        return false;
    }
};

export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
};

export const extractPaginationData = (data: { meta: ApiMetaType, pagination: ApiPaginationType, transactions: [] }): PaginationType => {
    const {meta, pagination} = data;
    return {
        firstPage: pagination.firstPage,
        lastPage: pagination.lastPage,
        pageNumber: meta.pageNumber,
        offset: meta.offset,
        size: pagination.size,
        sorting: {...pagination.sorting},
        totalElements: pagination.totalElements,
        totalPages: pagination.totalPages
    };
};

export const formatRelativeTime = (dateString: string) => {
    const dateTime = DateTime.fromISO(dateString);
    const now = DateTime.now();
    const diff = now.diff(dateTime);

    if (diff.as('milliseconds') < 0) {
        const futureDiff = dateTime.diff(now);

        if (futureDiff.as('days') >= 1) return `${Math.floor(futureDiff.as('days'))} days left`
        if (futureDiff.as('hours') >= 1) return `${Math.floor(futureDiff.as('hours'))} hours left`
        return `${Math.floor(futureDiff.as('minutes'))} minutes left`
    }

    if (diff.as('days') >= 1) return `${Math.floor(diff.as('days'))} days ago`
    if (diff.as('hours') >= 1) return `${Math.floor(diff.as('hours'))} hours ago`
    return `${Math.floor(diff.as('minutes'))} minutes ago`
};



