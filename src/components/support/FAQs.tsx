import {Disclosure} from '@headlessui/react'
import Svg from "@/components/Svg";
import {CaretDown, CaretUp} from "@/assets/icons/Caret";
import {Question} from "@/assets/icons/Question";
import React, {useState} from "react";

const FAQs = () => {
    const [openAccordion, setOpenAccordion] = useState<number | null>(null);

    const handleToggleAccordion = (index: number) => {
        setOpenAccordion((prevIndex) => (prevIndex === index ? null : index));
    };

    const faqs = [
        {
            question: "What's the best thing about Switzerland?",
            answer:
                "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
        },
        {
            question: "What's the best thing about Switzerland?",
            answer:
                "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
        },
        {
            question: "What's the best thing about Switzerland?",
            answer:
                "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
        },
        {
            question: "What's the best thing about Switzerland?",
            answer:
                "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
        },
    ]

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-7xl px-6 py-24 sm:py-16 lg:px-8 lg:py-0">
                <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
                    <h2 className="text-4xl font-bold leading-10 tracking-tight text-gray-900 text-center">
                        Frequently Asked Questions
                    </h2>
                    <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
                        {faqs.map((faq, index) => (
                            <Disclosure as="div" key={index} className="pt-6">
                                {({open}) => (
                                    <>
                                        <div className="flex items-center justify-between gap-3">
                                            <div className="flex items-center border rounded p-2 row-span-2">
                                                <Svg fill="#4F4F4F" path={Question}/>
                                            </div>

                                            <div className="w-full">
                                                <dt className="flex">
                                                    <Disclosure.Button
                                                        onClick={() => handleToggleAccordion(index)}
                                                        className="flex min-w-full items-center justify-between text-left text-gray-900">
                                                        <span
                                                            className="text-base font-semibold leading-7">{faq.question}</span>
                                                        <span className="ml-6 flex h-7 items-center">
                                                        {openAccordion === index ? (
                                                            <Svg fill="#4F4F4F" path={CaretDown} customClasses="h-6 w-6"
                                                                 aria-hidden="true"/>
                                                        ) : (
                                                            <Svg fill="#4F4F4F" path={CaretUp} customClasses="h-6 w-6"
                                                                 aria-hidden="true"/>
                                                        )}
                                                        </span>
                                                    </Disclosure.Button>
                                                </dt>

                                                <Disclosure.Panel as="dd" className="mt-2 pr-12">
                                                    <p className="text-base leading-7 text-gray-600">{faq.answer}</p>
                                                </Disclosure.Panel>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </Disclosure>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    )
}

export default FAQs