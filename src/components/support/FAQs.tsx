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
            question: "Can I schedule future fund disbursements for specific dates and times?",
            answer:
                "Yes, you can schedule future fund disbursements by accessing the Schedule Payments section under disbursement and providing the desired date and time.",
        },
        {
            question: "What is a Payment link?",
            answer:
                "A payment link is created within the Collections section by furnishing essential details such as description and amount, alongside necessary payment information including the recipient's name, contact number, email, and address.",
        },
        {
            question: "How does the Payment Link Fulfillment process work for clients?",
            answer:
                "Clients receive an email with the payment request, review the details, click the confirm button, select their preferred payment option, and provide payment details for authentication. Completing the payment triggers confirmation notifications to both the client and merchant.",
        },
        {
            question: "What products or services does CFT offer?",
            answer:
                "CFT offers a Merchant Portal that plugs into a licensed aggregator for managing transactions, a secure USSD system for customers, and features such as scheduled payments, payment link generation, and detailed reporting for enhanced financial control.",
        },
        {
            question: "What geographical regions does CFT operate in?",
            answer:
                "We currently operate in Ghana. However, collections can be made from all over the world via card payments processed through our licensed aggregators.",
        },
    ]

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-7xl px-6 py-24 sm:py-16 lg:px-8 lg:pb-10 lg:pt-0">
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