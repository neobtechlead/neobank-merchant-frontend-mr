"use client"
import React, {useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import TextInput from '@/components/forms/TextInput';
import CheckboxInput from '@/components/forms/CheckboxInput';
import Carousel from '@/components/Carousel';
import Alert from '@/components/Alert';
import Button from '@/components/forms/Button';

export default function Login() {
    const router = useRouter();
    const [formData, setFormData] = useState({email: '', password: ''});
    const [hasError, setHasError] = useState<boolean | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (hasError) return;
        if (formData.email !== 'jonadab.kwamlah@completefarmer.com') {
            return setError('Incorrect user details');
        }

        router.push('/overview');
    };

    return (
        <div className="h-screen flex overflow-hidden">
            <div className="lg-w-3/5 m-auto">
                <div className="w-full h-full max-w-sm px-3">
                    <div className="m-auto">
                        <Image src="/assets/images/logo.png" width={172} height={70} alt="logo"/>

                        <div className="my-8">
                            <h1 className="text-xl font-semibold">Sign in to your account</h1>
                            <small className="text-gray-400">
                                Log in to your Neobank account and enjoy a smooth & seamless experience.
                            </small>
                        </div>
                    </div>
                    <div className="">
                        {error && (
                            <Alert backgroundColor="bg-red-100" iconSrc="/assets/icons/x-circle.svg"
                                   customClasses="rounded-lg">
                                <p className="flex items-center text-sm text-red-500">{error}</p>
                            </Alert>
                        )}

                        <div className="mt-8">
                            <form onSubmit={handleSubmit} className="space-y-6 flex flex-col">
                                <TextInput
                                    label="email"
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="email"
                                    required={true}
                                    value={formData.email}
                                    onInputChange={handleInputChange}
                                    hasError={setHasError} autoComplete="false"/>
                                <TextInput
                                    label="password"
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="password"
                                    required={true}
                                    value={formData.password}
                                    onInputChange={handleInputChange}
                                    hasError={setHasError} autoComplete="false"/>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <CheckboxInput label="Remember me"/>
                                    </div>

                                    <div className="text-sm leading-6">
                                        <Link href="#"
                                              className="font-semibold text-purple-900 hover:text-purple-500 text-md">
                                            Forgot password?
                                        </Link>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-y-2">
                                    <Button styleType="primary" customStyles="justify-center p-4 md:p-5 rounded-lg" buttonType="submit"
                                            disabled={hasError}>
                                        <span className="flex self-center">Sign in</span>
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative hidden lg:block w-2/5">
                <div
                    className="inset-0 h-full bg-purple-900 pl-[100px]"
                    style={{
                        backgroundImage: `url('/assets/images/login-background.svg')`,
                    }}
                >
                    <div
                        className="flex w-full"
                        style={{
                            backgroundImage: `url('/assets/images/login-background.svg')`,
                            backgroundSize: 'fit',
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                            alignItems: 'end',
                            height: '100vh',
                        }}
                    >
                        <div className="flex flex-col h-full w-full">
                            <div className="flex items-start mt-[50px]">
                                <Carousel/>
                            </div>
                            <div className="w-full h-full">
                                <Image
                                    className="md:object-fit lg:object-cover w-full h-full"
                                    src="/assets/images/dashboard-sample.svg"
                                    alt="dashboard"
                                    height={0}
                                    width={0}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
