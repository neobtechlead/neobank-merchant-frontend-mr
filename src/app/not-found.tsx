import React from 'react';
import Link from 'next/link';

const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-200">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-md">
                <p className="text-center text-3xl text-red-600 font-bold mb-4">
                    Oops! Page Not Found
                </p>
                <p className="text-center text-gray-800">
                    The requested page could not be found
                </p>
                <p className="text-center mt-4">
                    <Link href="/" className="text-blue-600 hover:underline">
                        Go to Home
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default NotFound;
