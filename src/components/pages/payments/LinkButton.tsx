import React from 'react';
import Link from "next/link";

interface Props {
    label: string
    color: string
    className?: string
    path: string
    queryParams?: { [key: string]: string | number | boolean }
}

const LinkButton = ({label, path, queryParams, color, className}: Props) => {
    const linkClass = `py-4 px-5 rounded-[5px] font-semibold text-center ${className} ${color}`;
    return (
        <Link href={{
            pathname: path,
            query: {...queryParams},
        }} className={linkClass}>
            {label}
        </Link>
    );
};

export default LinkButton;