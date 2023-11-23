import React from 'react';
import Button from "@/components/forms/Button";
import Svg from "@/components/Svg";
import {QuestionFill} from "@/assets/icons/QuestionFill";

const SupportButton: React.FC = () => {
    return (
        <div className="group fixed bottom-10 right-10 flex items-end justify-end rounded-full">
            <Button buttonType="button" styleType="primary"
                    customStyles="flex items-center justify-center rounded-full p-4 md:p-5">
                <Svg fill="white" path={QuestionFill} customClasses="mr-2" width={36} height={36}/>
                <span>Support</span>
            </Button>
        </div>
    );
};

export default SupportButton;
