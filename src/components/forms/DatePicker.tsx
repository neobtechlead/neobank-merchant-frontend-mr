import React, {useState} from 'react';
import Datepicker from "tailwind-datepicker-react"
import Svg from "@/components/Svg";
import {ArrowCircleLeft, ArrowCircleRight} from "../../../public/assets/icons/ArrowCircle";
import {Calendar} from "../../../public/assets/icons/Calendar";

const DatePicker = ({selectedDate}) => {
    const [show, setShow] = useState<boolean>(false)
    const handleChange = (date: Date) => {
        const formattedDate = new Intl.DateTimeFormat('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        }).format(date);

        return selectedDate(formattedDate)
    }
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

    const options = {
        autoHide: true,
        todayBtn: false,
        clearBtn: true,
        clearBtnText: "Clear",
        maxDate: new Date("2030-01-01"),
        minDate: new Date(getCurrentDate()),
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
        }
    }

    return (
        <Datepicker classNames="relative" options={options} onChange={handleChange} show={show} setShow={handleClose}/>
    )
}

export default DatePicker;
