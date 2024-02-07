import React from 'react'
import './globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'CF Transact',
    description: 'Complete Farmer Merchant Payment Solution',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className="h-screen w-screen">
        <body className={inter.className}>
        {children}
        </body>
        </html>
    )
}
