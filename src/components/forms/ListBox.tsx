import React, {Fragment, useState} from 'react';
import {Listbox, Transition} from '@headlessui/react';
import {CaretDown} from "../../../public/assets/icons/Caret";
import Svg from "@/components/Svg";

interface Option {
    id: number;
    label: string;
}

interface ListBoxProps {
    options: Option[];
    customClasses?: string;
    children?: React.ReactNode;
}

const ListBox: React.FC<ListBoxProps> = ({options}: ListBoxProps) => {
    const [selected, setSelected] = useState(options[0]); // Set an initial value here

    return (
        <Listbox value={selected} onChange={setSelected}>
            {({open}) => (
                <div className="relative">
                    <Listbox.Button
                        className="flex justify-between w-full cursor-pointer rounded-md bg-white py-1.5 px-2 gap-5 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none sm:text-sm sm:leading-6"
                    >
                        <span className="pointer-events-none font-semibold flex items-center">{selected.label}</span>
                        <Svg fill="#4F4F4F" path={CaretDown}/>
                    </Listbox.Button>

                    <Transition
                        show={open}
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options
                            className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                        >
                            {options.map((item) => (
                                <Listbox.Option key={item.id} value={item}>
                                    {({active}) => (
                                        <div
                                            className={`${
                                                active ? 'text-purple-900' : ''
                                            } cursor-pointer select-none py-2 pl-3 pr-9 text-gray-900`}
                                        >
                                            {item.label}
                                        </div>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            )}
        </Listbox>
    );
};

export default ListBox;
