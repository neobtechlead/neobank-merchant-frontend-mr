import {TType} from "ts-interface-checker";

export interface ITimePickerProps {
    showTimePicker: boolean;
    selectedTime: any;
    onTimeSelected: (event: boolean) => void;
    handleButtonClick?: (event: boolean) => boolean;
}