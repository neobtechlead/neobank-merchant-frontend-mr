import React from "react";
import Svg from "@/components/Svg";
import Button from "@/components/forms/Button";

interface TableHeader {
    label: string;
    classes: string;
}

interface TableProps {
    title?: string;
    iconPath?: string;
    buttonLabel?: string;
    headers: TableHeader[];
    children?: React.ReactNode;
    onButtonClick?: () => void;
}

const Table: React.FC<TableProps> = ({headers, children, title, iconPath, buttonLabel, onButtonClick}) => {
    return (
        <div className="px-4 sm:px-2 lg:px-5 m-5">
            <div className="grid sm:grid-cols-2 mt-4 items-center">
                {title && (
                    <div className="col-span-1">
                        <h1 className="text-base font-semibold leading-6 text-gray-900">{title}</h1>
                    </div>
                )}
                <div className="sm:ml-16 col-span-1 flex justify-end items-center flex-1 justify-self-end">
                    {(buttonLabel || iconPath) && (
                        <Button
                            buttonType="button"
                            styleType="tertiary"
                            customStyles="flex justify-end"
                            onClick={onButtonClick}
                        >
                            {iconPath && <Svg path={iconPath} fill="#652D90" customClasses="" />}
                            {buttonLabel && <span className="text-xs font-semibold">{buttonLabel}</span>}
                        </Button>
                    )}
                </div>
            </div>

            <div className="mt-4 flow-root">
                <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle">
                        <table className="min-w-full border-separate border-spacing-0 relative">
                            <thead>
                            <tr>
                                {headers.map((header, index) => (
                                    <th key={index} className={`capitalize font-semibold py-3 text-xs ${header.classes}`}>
                                        {header.label}
                                    </th>
                                ))}
                            </tr>
                            </thead>
                            <tbody>
                            {children}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Table;
