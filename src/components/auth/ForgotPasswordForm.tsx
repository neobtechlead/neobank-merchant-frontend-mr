import React, {useState} from 'react';
import TextInput from "@/components/forms/TextInput";
import Button from "@/components/forms/Button";
import {TransactionType} from "@/utils/types/TransactionType";
import {useRouter} from "next/navigation";
import {sendResetEmailLink} from "@/api/auth";
import {getError, isValidEmail} from "@/utils/lib";
import {IForgotPasswordForm} from "@/utils/interfaces/IForgotPasswordForm";
import Loader from "@/components/Loader";
import AuthContentWrapper from "@/components/auth/AuthContentWrapper";

const ForgotPasswordForm: React.FC<IForgotPasswordForm> = () => {
    const router = useRouter()
    const [hasError, setHasError] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('Forgot Password');
    const [emailSent, setEmailSent] = useState<boolean>(false);
    const [description, setDescription] = useState<string>('Enter the email address you registered with. We\'ll send you a link to reset your password.');
    const [formData, setFormData] = useState<TransactionType>({
        email: '',
    });

    const isFormValid = () => {
        return ![undefined, null, ''].includes(formData.email?.trim())
    };

    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
        if (isValidEmail(value)) setHasError(false)
    };

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        if (isFormValid()) {
            setLoading(true)
            sendResetEmailLink(formData.email)
                .then(async (response) => {
                    setLoading(false)
                    if (response) {
                        setTitle('Email has been sent')
                        setDescription('Please check your email inbox for a password recovery link.')
                        setEmailSent(true)
                        return setHasError(false)
                    }
                })
                .catch((error) => {
                    setError(getError(error))
                })
        } else
            return setHasError(true);
    };

    const handleReturnToLogin = () => router.push("/")

    return (
        <AuthContentWrapper title={title} description={description} error={error} customClasses={emailSent ? 'mt-20' : 'py-10'}>
            <form method="POST" onSubmit={handleSubmit} className={emailSent ? 'py-10' : ''}>
                {!emailSent && <div className="flex">
                    <TextInput
                        label="email address"
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter email address"
                        required={true}
                        onInputChange={handleInputChange}
                        hasError={setHasError}
                        autoComplete="email"
                        customClasses="w-full"
                        customLabelClasses="flex capitalize"
                    />
                </div>}

                <div className={`mt-2 sm:grid-cols-10 relative ${emailSent ? 'my-5' : ''}`}>
                    {!emailSent && <Button styleType="primary"
                                           customStyles="justify-center p-4 md:p-5 rounded-lg my-4 relative w-full"
                                           buttonType="submit"
                                           disabled={hasError || loading}>
                        {!loading && <span className="flex self-center">Reset password</span>}
                        {loading && <Loader type="default"
                                            customClasses="relative"
                                            customAnimationClasses="w-10 h-10 text-white dark:text-gray-600 fill-purple-900"
                        />}
                    </Button>}

                    <Button styleType="tertiary"
                            customStyles="justify-center p-4 md:p-5 rounded-lg w-full"
                            buttonType="button"
                            onClick={handleReturnToLogin}
                    >
                        <span className="flex self-center font-semibold">Back to login</span>
                    </Button>
                </div>
            </form>
        </AuthContentWrapper>
    );
}

export default ForgotPasswordForm;
