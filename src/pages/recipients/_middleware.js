import { NextResponse } from 'next/server';
import jwt from '@tsndr/cloudflare-worker-jwt';
// routes
import { PATH_AUTH } from 'Routes/paths';

export function middleware({cookies, url}) {
  const accessToken = cookies.access ?? false;
  if (accessToken && jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL(PATH_AUTH.login, url))
}
