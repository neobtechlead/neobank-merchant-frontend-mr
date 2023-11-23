import {CheckIcon} from '@heroicons/react/20/solid'
import Svg from "@/components/Svg";
import {Plus} from "@/assets/icons/plus";
import Button from "@/components/forms/Button";
import React from "react";

const includedFeatures = [
    'Private forum access',
    'Member resources',
    'Entry to annual conference',
    'Official member t-shirt',
]

export default function Sample() {
    return (
        <div className="bg-blue-200">
            <div className="mx-auto max-w-7xl">
                <div className="mx-auto max-w-2xl rounded-3xl lg:mx-0 lg:flex lg:max-w-none">
                    <div className="-mt-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
                        <div
                            className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
                            <div className="mx-auto max-w-xs px-8">
                                <p className="text-base font-semibold text-gray-600">Pay once, own it forever</p>
                                <p className="mt-6 flex items-baseline justify-center gap-x-2">
                                    <span className="text-5xl font-bold tracking-tight text-gray-900">$349</span>
                                    <span
                                        className="text-sm font-semibold leading-6 tracking-wide text-gray-600">USD</span>
                                </p>
                                <a
                                    href="#"
                                    className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Get access
                                </a>
                                <p className="mt-6 text-xs leading-5 text-gray-600">
                                    Invoices and receipts available for easy company reimbursement
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 sm:p-10 lg:flex-auto">
                        <h3 className="text-2xl font-bold tracking-tight text-gray-900">Generate payment links</h3>
                        <p className="mt-6 text-base leading-7 text-gray-600">
                            Create and share payment link to buyers instantly.
                        </p>

                        <div
                            className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6">
                            <Button styleType="primary"
                                    customStyles="justify-center p-4 md:p-5 rounded-md"
                                    buttonType="button"
                                    onClick="">
                                <div className="flex items-center font-semibold">
                                    <Svg customClasses="mr-1 flex items-center" fill="white"
                                         path={Plus}/>
                                    <span className="uppercase flex">generate link</span>
                                </div>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
