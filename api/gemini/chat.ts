import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { message, context } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'GEMINI_API_KEY environment variable is required' });
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `
Você é o Copiloto de Inteligência Artificial da Academia JT Fitness.
Você atua como um assistente de musculação de alta performance, nutrição esportiva e fisiologia para o treinador.
Contexto atual da academia: ${JSON.stringify(context || {})}
Pergunta/Mensagem do treinador: ${message}

Responda em português de forma concisa, técnica, motivadora e prática para treinadores e atletas de musculação.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: prompt,
    });

    return res.status(200).json({ success: true, reply: response.text });
  } catch (error: any) {
    console.error('Error in /api/gemini/chat:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
