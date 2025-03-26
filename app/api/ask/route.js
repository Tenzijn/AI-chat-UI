import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { question } = await req.json(); // Parse the request body

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // Use server-side environment variable
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo', // Use the newer model
        messages: [{ role: 'user', content: question }], // Chat-based format
        max_tokens: 100, // Limit the response length
        temperature: 0.7, // Adjust creativity level
      }),
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      console.error('OpenAI API Error:', errorDetails);
      return NextResponse.json(
        { error: 'Failed to fetch the answer' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data); // Return the OpenAI API response
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
