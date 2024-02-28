'use client'
import React from 'react';
import Image from "next/image";
import {useRouter} from "next/navigation";
import {IOtpLayoutProps} from "@/utils/interfaces/IOtpLayoutProps";
import Logo from "@/assets/images/logo.svg";

const OtpLayout: React.FC<IOtpLayoutProps> = ({children}) => {
    const router = useRouter()
    const handleLoginRoute = () => router.push("/")

    return (
        <div className="min-h-full">
            <div style={{background: '#59D3D4'}}>
                <div className='pb-64' style={{
                    backgroundImage: `url('/assets/images/login-background.svg')`,
                    backgroundSize: 'fit'
                }}>
                    <nav className="bg-white">
                        <div className="max-w-full sm:px-6 lg:px-8">
                            <div className="flex h-16 items-center justify-between px-4 sm:px-0">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="block h-8 w-auto">
                                            <Image
                                                src={Logo}
                                                alt="CF Transact"
                                                width={85}
                                                height={35}
                                                style={{width: "auto"}}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="justify-end">
                                    <div onClick={handleLoginRoute}
                                         className="border-0 bg-transparent p-2 text-xs font-semibold text-gray-900 capitalize cursor-pointer">
                                        login
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>

            <div className="-mt-32">
                {children}
            </div>
        </div>
    );
}
export default OtpLayout;
