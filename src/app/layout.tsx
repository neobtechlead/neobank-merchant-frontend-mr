import React from 'react'
import './globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import Providers from "@/redux/provider";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'NEO BANK APP',
    description: 'Complete Farmer Payment Service',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers>{children}</Providers>
            </body>
        </html>
    )
}
