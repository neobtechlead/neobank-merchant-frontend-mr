import React, {useEffect, useState} from 'react';
import TextInput from "@/components/forms/TextInput";
import DatePicker from "@/components/forms/DatePicker";
import Button from "@/components/forms/Button";
import ListBox from "@/components/forms/ListBox";
import {IListBoxItem} from "@/utils/interfaces/IDropdownProps";
import {DateTime} from "luxon";
import {ReportFilterFormDataType} from "@/utils/types/ReportFilterFormDataType";
import {IReportFilterProps} from "@/utils/interfaces/IReportFilterProps";
import {convertDateTimeToISOFormat} from "@/utils/lib";
import {now} from "d3-timer";

const ReportFilter: React.FC<IReportFilterProps> = ({onSubmit, onReset}) => {
    const [formData, setFormData] = useState<ReportFilterFormDataType>({
        externalId: '',
        startDate: '',
        endDate: '',
        // startDate: new Date().toLocaleDateString(),
        // endDate: new Date().toLocaleDateString(),
        status: ''
    });

    const dropdownData: IListBoxItem[] = [
        {label: 'select status', value: 'select status'},
        {label: 'in progress', value: 'in progress'},
        {label: 'queued', value: 'queued'},
        {label: 'failed', value: 'failed'},
        {label: 'completed', value: 'completed'},
    ]

    const [hasError, setHasError] = useState<boolean>(false);
    const [statusFilter, setStatusFilter] = useState<IListBoxItem>(dropdownData[0]);
    const [disableExternalIdInput, setDisableExternalIdInput] = useState<boolean>(false);
    const [disableStatusInput, setDisableStatusIdInput] = useState<boolean>(false);
    const [disableDateInput, setDisableDateInput] = useState<boolean>(false);
    const [startDateError, setStartDateError] = useState<string>('');
    const [endDateError, setEndDateError] = useState<string>('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        const {name, value} = event.target;
        handleDisableOtherInputFields(value)
        setFormData({...formData, [name]: value});
    };

    const handleDisableOtherInputFields = (value: string) => {
        let inputState = false
        if (value.length > 0) inputState = true
        setDisableStatusIdInput(inputState)
        setDisableDateInput(inputState)
    };

    const handleDateSelected = (name: string, date: Date) => {
        try {
            const formattedDate = new Intl.DateTimeFormat('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            }).format(date);

            const parsedDate = DateTime.fromFormat(formattedDate, 'dd/MM/yyyy');
            if (parsedDate.isValid) {
                const formattedDate = parsedDate.toFormat('dd-MM-yyyy');
                setFormData({
                    ...formData,
                    [name]: formattedDate
                });

                checkDateCombinations(name, formattedDate)
                setDisableExternalIdInput(true)
            }

        } catch (error) {
            console.error('Error parsing date string:', error);
        }
    };

    const checkDateCombinations = (type: string = 'startDate', value: string = '') => {
        const {startDate, endDate} = formData;
        const formattedValue = DateTime.fromFormat(value, 'dd-MM-yyyy')
        if (type === 'startDate' && endDate && DateTime.fromFormat(endDate, 'dd-MM-yyyy') < formattedValue) {
            setStartDateError('Start date cannot be after end date');
        } else if (type === 'endDate' && startDate && DateTime.fromFormat(startDate, 'dd-MM-yyyy') > formattedValue) {
            setEndDateError('End date cannot be before start date');
        } else {
            resetDateErrors();
        }
    };

    const resetDateErrors = () => {
        setStartDateError('')
        setEndDateError('')
    }
    const handleSetStatusFilter = (option: IListBoxItem) => {
        setStatusFilter(option)
        setFormData({...formData, ['status']: option.value});
        setDisableExternalIdInput(true)
    };

    const handleSubmitFilter: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault()

        const data = formData.externalId === '' ? {
            startDate: convertDateTimeToISOFormat(formData?.startDate?.toString(), 'dd-MM-yyyy'),
            endDate: convertDateTimeToISOFormat(formData?.endDate?.toString(), 'dd-MM-yyyy'),
            status: formData.status
        } : {
            externalId: formData.externalId
        }

        if (Object.values(formData).every(value => value === '')) return
        if (onSubmit) onSubmit(data);
    }

    const handleResetFilter: React.FormEventHandler<HTMLFormElement> = (event) => {
        setStatusFilter(dropdownData[0])
        handleDateSelected('startDate', new Date())
        handleDateSelected('endDate', new Date())
        setDisableStatusIdInput(false)
        setDisableDateInput(false)
        setDisableExternalIdInput(false)
        setFormData({
            externalId: '',
            startDate: '',
            endDate: '',
            status: ''
        })
        resetDateErrors()
        onReset()
    }

    return (
        <div className="h-full">
            <form id="reportFilter" onSubmit={handleSubmitFilter} onReset={handleResetFilter}>
                <div className="">
                    <div
                        className="grid grid-cols-1 gap-x-8 md:grid-cols-3">
                        <div
                            className="grid min-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12 sm:col-span-full">
                            <div className="sm:col-span-3">
                                <TextInput
                                    label="transaction ID"
                                    id="externalId"
                                    name="externalId"
                                    type="text"
                                    placeholder="Enter ID here"
                                    required={false}
                                    onInputChange={handleInputChange}
                                    hasError={setHasError}
                                    disabled={disableExternalIdInput}
                                />
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="startDate"
                                       className="block text-sm font-medium leading-6 text-gray-900">
                                    Start Date
                                </label>
                                <div className="mt-2">
                                    <div id="startDate"
                                         className={`flex flex-col transition-opacity opacity-100 duration-500 ease-in-out`}>
                                        <DatePicker minDate={new Date('2023/07/31')}
                                                    selectedDate={new Date(formData.startDate ?? now().toString())}
                                                    setSelectedDate={(date: Date) => handleDateSelected('startDate', date)}
                                                    disabled={disableDateInput}
                                                    error={startDateError}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="endDate"
                                       className="block text-sm font-medium leading-6 text-gray-900">
                                    End Date
                                </label>
                                <div className="mt-2">
                                    <div id="endDate"
                                         className={`flex flex-col transition-opacity opacity-100 duration-500 ease-in-out`}>
                                        <DatePicker
                                            minDate={new Date('2023/07/31')}
                                            selectedDate={new Date(formData.endDate ?? now().toString())}
                                            setSelectedDate={(date: Date) => handleDateSelected('endDate', date)}
                                            disabled={disableDateInput}
                                            error={endDateError}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <h5 className="block text-sm font-medium leading-6 text-gray-900">
                                    Transaction Status
                                </h5>
                                <ListBox
                                    data={dropdownData}
                                    customButtonClasses="py-4 px-3 capitalize truncate"
                                    customClasses="mt-2"
                                    optionSelected={statusFilter}
                                    setOptionSelected={handleSetStatusFilter}
                                    disableFirstKey={true}
                                    disableButton={disableStatusInput}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-x-5">
                    <div className="flex">
                        <Button buttonType="reset" styleType="tertiary" customStyles="rounded">
                            <span className="font-semibold">Reset</span>
                        </Button>
                        <Button buttonType="submit" styleType="primary"
                                customStyles="ml-2 px-5 py-5 rounded truncate"
                                disabled={hasError}
                        >
                            <span className="text-sm">Apply Filter</span>
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};
export default ReportFilter;
