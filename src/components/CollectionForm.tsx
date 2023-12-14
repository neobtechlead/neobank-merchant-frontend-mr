import React, {useState} from 'react';
import TextInput from "@/components/forms/TextInput";
import Button from "@/components/forms/Button";
import Svg from "@/components/Svg";
import {CaretDown} from "@/assets/icons/Caret";
import {ICollectionForm} from "@/utils/interfaces/ICollectionForm";
import Image from "next/image";
import {TransactionType} from "@/utils/types/TransactionType";

const CollectionForm: React.FC<ICollectionForm> = ({onSubmit}) => {
    const [hasError, setHasError] = useState<boolean>(false);
    const [formData, setFormData] = useState<TransactionType>({
        recipient: '',
        phone: '',
        email: '',
        amount: 0,
        reference: '',
        type: '',
    });

    const isFormValid = () => {
        return formData.recipient?.trim() !== '' &&
            formData.email?.trim() !== '' &&
            formData.reference?.trim() !== '' &&
            formData.phone?.trim() !== '' &&
            ![undefined, null, 0].includes(formData.amount)
    };

    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        if (isFormValid()) {
            if (onSubmit) onSubmit(formData);
        } else {
            return setHasError(true);
        }
    };

    return (
        <form method="POST" onSubmit={handleSubmit}
              className="flex justify-center items-center overflow-y-auto  mx-5">
            <div className="flex flex-col min-w-full justify-center">
                <div className="flex flex-col items-center">
                    <TextInput
                        label="recipient's name"
                        id="recipientName"
                        name="recipient"
                        type="text"
                        placeholder="Enter recipient's name"
                        required={true}
                        onInputChange={handleInputChange}
                        hasError={setHasError}
                        autoComplete=""
                        customClasses="w-full md:w-2/3 lg:w-1/3"
                    />
                </div>
                <div className="flex flex-col items-center">
                    <TextInput
                        label="recipient's email address"
                        id="email"
                        name="email"
                        type="text"
                        placeholder="Enter email address"
                        required={true}
                        onInputChange={handleInputChange}
                        hasError={setHasError}
                        autoComplete="email"
                        customClasses="w-full md:w-2/3 lg:w-1/3"
                    />
                </div>
                <div className="flex flex-col items-center">
                    <TextInput
                        label="reference"
                        id="reference"
                        name="reference"
                        type="text"
                        placeholder="Enter reference"
                        required={true}
                        onInputChange={handleInputChange}
                        hasError={setHasError}
                        autoComplete=""
                        customClasses="w-full md:w-2/3 lg:w-1/3"
                    />
                </div>
                <div className="flex flex-col items-center">
                    <TextInput
                        label="recipient's contact number"
                        id="phone"
                        name="phone"
                        type="number"
                        placeholder="+233"
                        required={false}
                        onInputChange={handleInputChange}
                        hasError={setHasError} autoComplete=""
                        customClasses="w-full md:w-2/3 lg:w-1/3"
                    >
                        <div
                            className="flex select-none items-center px-4 bg-gray-300 sm:text-sm rounded-l-md font-semibold"
                            style={{background: '#EFEFEF'}}>
                            <Image src="/assets/images/ghana-flag.svg" alt="flag" height={19} width={30}/>
                            <Svg fill="#4F4F4F" path={CaretDown}/>
                        </div>
                    </TextInput>
                </div>
                <div className="flex flex-col items-center">
                    <TextInput
                        label="amount"
                        id="amount"
                        name="amount"
                        type="number"
                        placeholder="0"
                        required={false}
                        onInputChange={handleInputChange}
                        hasError={setHasError} autoComplete=""
                        customClasses="w-full md:w-2/3 lg:w-1/3"
                    >
                            <span
                                className="flex select-none items-center px-4 bg-gray-300 sm:text-sm rounded-l-md font-semibold"
                                style={{background: '#EFEFEF'}}>GHS</span>
                    </TextInput>
                </div>
                <div className="flex flex-col items-center">
                    <div className="w-full md:w-2/3 lg:w-1/3 mt-5">
                        <div className="my-10 sm:grid-cols-10">
                            <Button styleType="primary" customStyles="justify-center p-4 md:p-5 rounded-lg"
                                    buttonType="submit"
                                    disabled={hasError}>
                                <span className="flex self-center">Continue</span>
                            </Button>
                        </div>
                    </div>
                </div>

            </div>
        </form>
    );
}

export default CollectionForm;
