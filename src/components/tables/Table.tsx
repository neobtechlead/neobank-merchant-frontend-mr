import React from "react";
import Svg from "@/components/Svg";
import {FileDownload} from "../../../public/assets/icons/FileDownload";
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

const Table: React.FC<TableProps> = ({headers, children, title, iconPath, buttonLabel, onButtonClick}: TableProps) => {
    return (
        <div className="px-4 sm:px-2 lg:px-4">
            <div className="sm:flex sm:items-center mt-4 justify-between">
                {title && <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900">{title}</h1>
                </div>}
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none flex justify-end">
                    {(buttonLabel || iconPath) &&
                        <Button buttonType="tertiary" styleType="tertiary" customStyles="gap-x-1"
                                onClick={onButtonClick}>
                            {iconPath && <Svg path={FileDownload} fill="#652D90" customStyle="mx-5"/>}
                            {buttonLabel && <span>{buttonLabel}</span>}
                        </Button>}
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
