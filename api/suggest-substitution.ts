import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { exerciseName, muscleGroup, equipment } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'GEMINI_API_KEY environment variable is required' });
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `
      A student is in a gym and does not have the machine/equipment available to perform the following exercise:
      - Exercise: ${exerciseName}
      - Target Muscle: ${muscleGroup}
      - Equipment required: ${equipment}
      
      Please provide 3 valid alternative exercises that target the same muscle group, preferably using different equipment (e.g., dumbbells, barbells, or bodyweight).
      Format the output purely as a short, clean, direct Markdown numbered list with the name of the exercise in bold and a very brief reason (1 sentence) for why it's a good alternative. 
      Do not add long introductions or conclusions, just return the list in Portuguese.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: prompt,
    });

    return res.status(200).json({ success: true, text: response.text });
  } catch (error: any) {
    console.error('Error in /api/suggest-substitution:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
