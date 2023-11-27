import React, {Fragment, useState} from 'react';
import {Listbox, Transition} from '@headlessui/react';
import {CaretDown} from "@/assets/icons/Caret";
import Svg from "@/components/Svg";
import {IListBoxProps} from "@/utils/interfaces/IDropdownProps";

const ListBox: React.FC<IListBoxProps> = ({
                                              data,
                                              optionSelected,
                                              setOptionSelected,
                                              customButtonClasses,
                                              customClasses,
                                              disableFirstKey
                                          }) => {
    return (
        <Listbox value={optionSelected} onChange={setOptionSelected}>
            {({open}) => (
                <div className={`relative ${customClasses}`}>
                    <Listbox.Button
                        className={`flex justify-between w-full cursor-pointer rounded-md bg-white gap-3 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none sm:text-sm sm:leading-6 ${customButtonClasses}`}
                    >
                        <span
                            className="pointer-events-none font-semibold flex items-center">{optionSelected?.label}</span>
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
                            className="absolute mt-2 max-h-60 w-full overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50"
                        >
                            {data.map((item, key) => (
                                <Listbox.Option key={key} value={item} disabled={disableFirstKey ? key === 0 : false}>
                                    {({active}) => (
                                        <div
                                            className={`${active ? 'text-purple-900 bg-purple-200' : ''}
                                            cursor-pointer select-none py-2 pl-3 pr-9 text-gray-900 capitalize
                                            ${disableFirstKey && key === 0 ? 'pointer-events-none opacity-50' : ''}
                                          `}
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
