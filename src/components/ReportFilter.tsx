import React, {useState} from 'react';
import TextInput from "@/components/forms/TextInput";
import DatePicker from "@/components/forms/DatePicker";
import Button from "@/components/forms/Button";
import ListBox from "@/components/forms/ListBox";
import {IListBoxItem} from "@/utils/interfaces/IDropdownProps";
import {DateTime} from "luxon";
import {ReportFilterFormDataType} from "@/utils/types/ReportFilterFormDataType";
import {IReportFilterProps} from "@/utils/interfaces/IReportFilterProps";

const ReportFilter: React.FC<IReportFilterProps> = ({onSubmit}) => {
    const [formData, setFormData] = useState<ReportFilterFormDataType>({
        externalId: '',
        startDate: new Date().toLocaleDateString(),
        endDate: new Date().toLocaleDateString(),
        status: ''
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    };

    const dropdownData: IListBoxItem[] = [
        {label: 'select status', value: 'select status'},
        {label: 'in progress', value: 'in progress'},
        {label: 'success', value: 'success'},
        {label: 'failed', value: 'failed'},
        {label: 'completed', value: 'completed'},
    ]

    const [hasError, setHasError] = useState<boolean | null>(null);
    const [statusFilter, setStatusFilter] = useState<IListBoxItem>(dropdownData[0]);

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
                setFormData({...formData, [name]: formattedDate});
            }
        } catch (error) {
            console.error('Error parsing date string:', error);
        }
    };

    const handleSetStatusFilter = (option: IListBoxItem) => {
        setStatusFilter(option)
        setFormData({...formData, ['status']: option.value});
    };

    const handleSubmitFilter: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault()
        if (onSubmit) onSubmit(formData)
    }

    const handleResetFilter: React.FormEventHandler<HTMLFormElement> = (event) => {
        // event.preventDefault()
        setFormData({...formData, ['externalId']: ''});
        setStatusFilter(dropdownData[0])
        handleDateSelected('startDate', new Date())
        handleDateSelected('endDate', new Date())
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
                                                    selectedDate={new Date(formData.startDate ?? '')}
                                                    setSelectedDate={(date: Date) => handleDateSelected('startDate', date)}/>
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
                                            selectedDate={new Date(formData.endDate ?? '')}
                                            setSelectedDate={(date: Date) => handleDateSelected('endDate', date)}/>
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
                                customStyles="ml-2 px-5 py-5 rounded truncate">
                            <span className="text-sm">Apply Filter</span>
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};
export default ReportFilter;
