"use client"
import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import TextInput from '@/components/forms/TextInput';
import CheckboxInput from '@/components/forms/CheckboxInput';
import Carousel from '@/components/Carousel';
import Alert from '@/components/Alert';
import Button from '@/components/forms/Button';
import {login, logout} from "@/api/auth";
import {useUserStore} from "@/store/UserStore";
import {getError} from "@/utils/lib";
import Logo from "@/assets/images/logo.svg";

export default function Login() {
    const router = useRouter();
    const [formData, setFormData] = useState({email: '', password: ''});
    const [hasError, setHasError] = useState<boolean | undefined>(false);
    const [error, setError] = useState<string | null>(null);
    const {
        user,
        setUser,
        setMerchant,
        setIsAuthenticated
    } = useUserStore();

    useEffect(() => {
        logout(user?.authToken).then(async (response) => {
            if (response.ok) {
                if (setUser) setUser({})
                if (setMerchant) setMerchant({})
                if (setIsAuthenticated) setIsAuthenticated(false)
            }
        }).catch(error => {
            console.log(error)
        })
    }, [])

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        if (hasError) return;
        setError('')
        login(formData.email, formData.password)
            .then(async (response) => {
                const feedback = (await response.json())
                if (response.ok) {
                    const {data} = feedback;
                    if (setUser) setUser({
                        externalId: data.id,
                        email: data.email,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        authToken: data.token,
                        roles: data.roles
                    })
                    if (setIsAuthenticated) setIsAuthenticated(true)
                    if (setMerchant) setMerchant(data.merchant)
                    return router.push('/overview')
                }

                return setError(getError(feedback))
            })
            .catch((error) => {
                console.log('error:', error)
                setError(error.message)
            })
    };

    return (
        <div className="h-screen flex overflow-hidden">
            <div className="lg-w-3/5 m-auto">
                <div className="w-full h-full max-w-sm px-3">
                    <div className="m-auto">
                        <Image src={Logo} width={257} height={34} alt="CF Transact" style={{width: "auto"}}/>

                        <div className="my-8">
                            <h1 className="text-xl font-semibold">Sign in to your account</h1>
                            <small className="text-gray-400">
                                Log in to your Neobank account and enjoy a smooth & seamless experience.
                            </small>
                        </div>
                    </div>
                    <div className="">
                        {error && <Alert alertType="error" description={error} customClasses="rounded-lg"/>}

                        <div className="mt-8">
                            <form onSubmit={handleSubmit} className="space-y-6 flex flex-col">
                                <TextInput
                                    label="email"
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="email"
                                    required={true}
                                    onInputChange={handleInputChange}
                                    hasError={setHasError} autoComplete="false"/>
                                <TextInput
                                    label="password"
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="password"
                                    required={true}
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
                                    <Button styleType="primary" customStyles="justify-center p-4 md:p-5 rounded-lg"
                                            buttonType="submit"
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
