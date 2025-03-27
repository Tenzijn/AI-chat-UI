import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { question } = await req.json();

    const url = `http://localhost:8080/ai?message=${encodeURIComponent(
      question
    )}`;

    const response = await fetch(url, {
      method: 'GET',
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      console.error('Local Server Error:', errorDetails);
      return NextResponse.json(
        { error: 'Failed to fetch the answer from the local server' },
        { status: response.status }
      );
    }

    const responseText = await response.text();
    return NextResponse.json({ answer: responseText });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
