import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI, Type } from '@google/genai';

const configObj: any = {
  responseMimeType: 'application/json',
  responseSchema: {
    type: Type.OBJECT,
    properties: {
      title: { type: Type.STRING },
      objective: { type: Type.STRING },
      observations: { type: Type.STRING },
      days: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            exercises: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  exerciseId: { type: Type.STRING },
                  sets: { type: Type.NUMBER },
                  reps: { type: Type.STRING },
                  load: { type: Type.STRING },
                  rest: { type: Type.STRING },
                  method: { type: Type.STRING },
                  observations: { type: Type.STRING }
                },
                required: ['exerciseId', 'sets', 'reps', 'rest']
              }
            }
          },
          required: ['name', 'exercises']
        }
      }
    },
    required: ['title', 'objective', 'days']
  }
};

const MODELS_PRIORITY = [
  'gemini-flash-lite-latest',
  'gemini-3.1-flash-lite',
  'gemini-3.5-flash-lite',
  'gemini-3.8-flash',
  'gemini-flash-latest',
  'gemini-3.6-flash',
  'gemini-3.7-flash'
];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'GEMINI_API_KEY environment variable is required' });
    }

    const ai = new GoogleGenAI({ apiKey });
    let resAi: any = null;
    let lastError: any = null;

    for (const modelName of MODELS_PRIORITY) {
      try {
        resAi = await ai.models.generateContent({
          model: modelName,
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          config: configObj
        });
        if (resAi && resAi.text) {
          break;
        }
      } catch (err: any) {
        lastError = err;
      }
    }

    // Fallback without schema if structured decoding failed
    if (!resAi || !resAi.text) {
      for (const modelName of ['gemini-flash-lite-latest', 'gemini-3.1-flash-lite', 'gemini-3.8-flash']) {
        try {
          resAi = await ai.models.generateContent({
            model: modelName,
            contents: [{ role: 'user', parts: [{ text: `${prompt}\n\nIMPORTANTE: Retorne estritamente um JSON válido sem nenhum texto adicional.` }] }],
            config: { responseMimeType: 'application/json' }
          });
          if (resAi && resAi.text) {
            break;
          }
        } catch (err: any) {
          lastError = err;
        }
      }
    }

    if (!resAi || !resAi.text) {
      return res.status(503).json({
        error: lastError?.message || 'Serviço de IA temporariamente indisponível. Tente novamente em instantes.'
      });
    }

    return res.status(200).json({ success: true, text: resAi.text });
  } catch (error: any) {
    console.error('Error in /api/gemini/generate-workout:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
