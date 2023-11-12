import React from 'react';
import Image from "next/image";
import XCircle from "@/assets/svgs/Error.svg";
import {sourceSans3} from "@/fonts";

interface Props {
    title: string
    description: string

}

const RejectedHeader = ({title, description}: Props) => {
    return (
        <>
            <div className="mb-8">
                <Image src={XCircle} alt="" priority={true} width={80} height={80}/>
            </div>
            <div className={`text-center ${sourceSans3.className}`}>
                <h5 className="font-bold text-2xl mb-3">{title}</h5>
                <p>{description}</p>
            </div>

        </>
    );
};

export default RejectedHeader;