'use client'
import React from 'react';

interface Props {
    error?: Error;
    errorMessage?: string
}

const ErrorPage = ({error, errorMessage}: Props) => {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-md">
                <p className="text-center text-2xl text-red-600 font-bold mb-4">
                    Error
                </p>
                <p className="text-center text-red-500">{errorMessage || error?.message}</p>
            </div>
        </div>
    );
};

export default ErrorPage;
