import {ChatCircle} from "@/assets/icons/ChatCircle";
import {MapPin} from "@/assets/icons/MapPin";
import {Phone} from "@/assets/icons/Phone";
import {EnvelopeOpen} from "@/assets/icons/Envelope";
import Svg from "@/components/Svg";
import Image from "next/image";

const cards = [
    {
        name: 'Visit Us',
        description: 'Visit our office HQ.',
        cta: 'View on Google Maps',
        icon: MapPin,
    },
    {
        name: 'Call Us',
        description: 'Mon-Fri  from 8am - 5pm',
        cta: '+233 30 33 333 3333',
        icon: Phone,
    },
    {
        name: 'Email Us',
        description: 'Email Us On',
        cta: 'neobank@gmail.com',
        icon: EnvelopeOpen,
    },
    {
        name: 'Chat Us',
        description: 'Chat with our tech support.',
        cta: 'chat@neobank.com',
        icon: ChatCircle,
    },
]

export default function SupportChannels() {
    return (
        <div className="relative isolate overflow-hidden bg-transparent py-10 sm:py-16">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto text-center">
                    <div className="flex justify-center mb-10">
                        <Image src="/assets/images/NB.svg" alt="logo" height={0} width={98} className="flex justify-center w-auto h-auto"/>
                    </div>
                    <h2 className="font-bold tracking-tight sm:text-2xl lg:text-4xl">Contact our team</h2>
                    <p className="text-sm leading-8">Let us know how we can help.</p>
                </div>
                <div
                    className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-6 sm:mt-10 lg:mx-0 lg:max-w-none lg:grid-cols-4 lg:gap-8">
                    {cards.map((card) => (
                        <div key={card.name}
                             className="gap-x-4 rounded-xl bg-white p-6 ring-1 ring-inset ring-gray-200">
                            <div className="flex ring-1 ring-inset ring-gray-200 rounded p-2 mb-[87px] w-10">
                                <Svg fill="#4F4F4F" path={card.icon}
                                     customClasses="flex text-indigo-400"/>
                            </div>
                            <div className="text-base leading-7">
                                <h3 className="font-bold">{card.name}</h3>
                                <p className="mt-1 text-gray-800 text-xs">{card.description}</p>
                                <p className="mt-3 text-blue-500 text-xs underline">{card.cta}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}