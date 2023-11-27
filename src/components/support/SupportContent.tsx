import React from 'react';
import {IAlert} from "@/utils/interfaces/IAlert";
import SupportChannels from "@/components/support/SupportChannels";
import FAQs from "@/components/support/FAQs";

const SupportContent: React.FC<IAlert> = ({
                                     alertType,
                                     description,
                                     customClasses,
                                     children,
                                     descriptionClasses
                                 }) => {

    return (
        <div className={`rounded p-1 ${customClasses}`}>
           <SupportChannels/>
           <FAQs/>
        </div>
    );
};

export default SupportContent;
