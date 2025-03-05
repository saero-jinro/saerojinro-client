import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Hello from API!' });
}

export async function POST(req: Request) {
  const data = await req.json();
  return NextResponse.json({ received: data });
}
