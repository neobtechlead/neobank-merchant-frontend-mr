import React, {useState} from 'react';
import Datepicker from "tailwind-datepicker-react"
import Svg from "@/components/Svg";
import {ArrowCircleLeft, ArrowCircleRight} from "@/assets/icons/ArrowCircle";
import {Calendar} from "@/assets/icons/Calendar";

const DatePicker: React.FC<IDatePickerProps> = ({selectedDate, setSelectedDate, minDate, disabled = false}) => {
    const [show, setShow] = useState<boolean>(false)

    const handleClose = (state: boolean) => {
        setShow(state)
    }

    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');

        return new Date(`${year}-${month}-${day}`);
    };

    const handleClearButtonClick = () => {
        setSelectedDate(getCurrentDate());
    };

    const options: object = {
        autoHide: true,
        todayBtn: false,
        clearBtn: true,
        clearBtnText: "Clear",
        maxDate: new Date("2030-01-01"),
        clearBtnClick: handleClearButtonClick,
        minDate: minDate ? minDate : getCurrentDate(),
        theme: {
            background: "bg-white dark:bg-gray-700",
            todayBtn: "bg-gray-100 focus:outline-none",
            clearBtn: "bg-gray-100 text-purple-900 focus:outline-none border-0 p-2 font-normal w-1/3 grid ml-auto mr-4",
            icons: <span><Svg fill={"#4F4F4F"} path={Calendar}/></span>,
            text: "",
            disabledText: "",
            input: "h-[56px] focus:outline-none focus:border-purple-900 bg-transparent",
            inputIcon: <span><Svg fill={"#4F4F4F"} path={Calendar}/></span>,
            selected: "bg-purple-900",
        },
        icons: {
            prev: () => <span className="focus:outline-none hover:bg-transparent border-0">
                <Svg fill={"#4F4F4F"} path={ArrowCircleLeft}/></span>,
            next: () => <span><Svg fill={"#4F4F4F"} path={ArrowCircleRight}/></span>
        },
        datepickerClassNames: "top-[65px] flex-grow border rounded-lg",
        defaultDate: false,
        language: "en",
        disabledDates: [],
        weekDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        inputNameProp: "date",
        inputIdProp: "date",
        inputPlaceholderProp: "Select Date",
        inputDateFormatProp: {
            day: "numeric",
            month: "long",
            year: "numeric"
        },
        disabled: disabled
    }

    return (
        <Datepicker classNames={`relative ${disabled ? 'pointer-events-none opacity-50' : ''}`} options={options}
                    onChange={setSelectedDate} show={show} setShow={handleClose}/>
    )
}

export default DatePicker;
