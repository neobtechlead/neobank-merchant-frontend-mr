import React from 'react';
import Alert from "@/components/Alert";
import {IAuthContentWrapper} from "@/utils/interfaces/IAuthContentWrapper";

const AuthContentWrapper: React.FC<IAuthContentWrapper> = ({
                                                               title,
                                                               description,
                                                               error,
                                                               children
                                                           }) => {
    return (
        <div className="flex justify-center items-center h-[60vh]">
            <div className="bg-white rounded-xl shadow-lg h-full max-w-lg flex justify-center items-center">
                <div className="flex flex-col justify-center items-center space-y-2 my-10 px-10">
                    <div className="flex flex-col items-center justify-center text-center space-y-2">
                        <div className="font-semibold text-3xl">
                            <p>{title}</p>
                        </div>
                        <div className="flex flex-row text-sm font-medium text-gray-800">
                            <p className="max-w-lg">{description}</p>
                        </div>
                    </div>

                    <div className="w-full">
                        <div className="my-8">
                            {error &&
                                <Alert alertType="error" description={error ?? ''}
                                       customClasses="rounded-md text-sm"/>}
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthContentWrapper;
