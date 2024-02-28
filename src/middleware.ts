import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'

export function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith('/auth/verify')) {
        const token = new URL(request.url).searchParams.get('token')
        return new URL(request.url).searchParams.has('token') && token
            ? NextResponse.next()
            : NextResponse.redirect(new URL('/', request.url))
    }
}

export const config = {
    matcher: ['/auth/verify', '/overview', '/disbursements', '/collections', '/reports'],
}