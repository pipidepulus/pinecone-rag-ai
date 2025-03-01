import { NextResponse } from 'next/server';
import { openai } from '@ai-sdk/openai';
import { getContext } from '@/utils/context';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { message } = await req.json(); // Expecting { message: string }

    // Retrieve context from Pinecone using the user message
    const context = await getContext(message, process.env.PINECONE_INDEX || 'your-index');

    // Generate response using OpenAI with context
    const response = await openai('gpt-4o').doGenerate({
      inputFormat: 'messages',
      mode: { type: 'regular' },
      prompt: [
        { role: 'system', content: `Responde basándote en este contexto: ${context.join(' ')}` },
        { role: 'user', content: message },
      ],
    });

    // Return the reply and context
    return NextResponse.json({
      reply: response.text || 'Lo siento, no pude generar una respuesta.',
      context,
    });
  } catch (error) {
    console.error('Error in /api/chat:', error);
    return NextResponse.json(
      { error: 'Error al procesar el mensaje: ' + (error as Error).message },
      { status: 500 }
    );
  }
}