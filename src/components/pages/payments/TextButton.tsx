interface Props {
    label: string;
    onClick: () => void;
    color: string; // CSS class for button color (e.g., "bg-[#652D90] text-white")
    className?: string; // Additional CSS class for styling (optional)
}

const TextButton = ({label, onClick, color, className}: Props) => {
    const buttonClass = `py-4 px-5 rounded-[5px] font-semibold ${className} ${color}`;

    return (
        <button className={buttonClass} onClick={onClick}>
            {label}
        </button>
    );
};

export default TextButton;
