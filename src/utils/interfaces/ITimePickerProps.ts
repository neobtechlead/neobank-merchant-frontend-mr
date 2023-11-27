import {TType} from "ts-interface-checker";

export interface ITimePickerProps {
    showTimePicker: boolean;
    selectedTime: any;
    onTimeSelected: (time: string) => void;
    handleButtonClick?: (event: boolean) => boolean;
}