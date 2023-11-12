import React from 'react';

interface Props {
    label?: string
}

const Loading = ({label = "Loading"}: Props) => {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
            <p className="mt-2 text-gray-700">{label}...</p>
        </div>
    );
};

export default Loading;
