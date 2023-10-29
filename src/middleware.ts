import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'

export function middleware(request: NextRequest) {
    return new URL(request.url).searchParams.has('token')
        ? NextResponse.next()
        : NextResponse.redirect(new URL('/', request.url))
}

export const config = {
    matcher: '/verify',
}