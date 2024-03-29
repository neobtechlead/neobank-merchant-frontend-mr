interface ICopyProps {
    text: string;
    tooltipText?: string;
    getTooltipText?: (text: string) => void;
    getCopiedValue?: (text: string) => void;
    position?: string;
    showTooltip?: boolean;
    customClasses?: string;
}