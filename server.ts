import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Load .env explicitly if it exists
dotenv.config({ path: '.env', override: true });

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Email API route
  app.post("/api/send-access", async (req, res) => {
    const { email, name, accessCode, appUrl } = req.body;
    
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("[Email API] ERRO: Credenciais de e-mail não configuradas no servidor.");
      return res.status(500).json({ error: "Email configuration missing." });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Seu Acesso ao Portal de Treinamento",
        text: `Olá ${name}! Aqui está seu acesso ao nosso Portal de Treinamento:\n\n🔗 Acesse aqui: ${appUrl}\n📧 E-mail: ${email}\n🔑 Código: ${accessCode}\n\nLá você encontrará:\n🍽️ Sua Dieta completa\n📋 Sua Anamnese cadastrada\n📈 Análise de evolução e IA\n\nAcesse agora e confira!`,
      });
      res.status(200).json({ success: true });
    } catch (error) {
      console.error("[Email API] ERRO ao enviar e-mail:", error);
      res.status(500).json({ error: "Failed to send email." });
    }
  });

  app.get("/api/videos", async (req, res) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    // Bunny.net integration removed per user request. Exercises now utilize illustrative equipment visuals.
    res.json([]);
  });

  app.post("/api/suggest-substitution", async (req, res) => {
    try {
      const { exerciseName, muscleGroup, equipment } = req.body;
      
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
         return res.status(500).json({ error: "Gemini API Key missing in server" });
      }

      // Dynamic import to avoid esbuild top-level issues if any
      const { GoogleGenAI } = await import('@google/genai');
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
        model: 'gemini-flash-lite-latest',
        contents: prompt,
      });

      res.status(200).json({ success: true, text: response.text });
    } catch (e: any) {
      console.error("[Gemini API] Error:", e);
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/gemini/chat", async (req, res) => {
    try {
      const { message, context } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "Gemini API Key missing in server" });
      }

      const { GoogleGenAI } = await import('@google/genai');
      const ai = new GoogleGenAI({ apiKey });

      const prompt = `
Você é o Copiloto de Inteligência Artificial da Academia JT Fitness.
Você atua como um assistente de musculação de alta performance, nutrição esportiva e fisiologia para o treinador.
Contexto atual da academia: ${JSON.stringify(context || {})}
Pergunta/Mensagem do treinador: ${message}

Responda em português de forma concisa, técnica, motivadora e prática para treinadores e atletas de musculação.
`;

      let response: any = null;
      let lastErr: any = null;
      for (const m of ['gemini-flash-lite-latest', 'gemini-3.1-flash-lite', 'gemini-3.8-flash', 'gemini-3.6-flash', 'gemini-3.7-flash']) {
        try {
          response = await ai.models.generateContent({
            model: m,
            contents: prompt,
          });
          if (response?.text) break;
        } catch (err) {
          lastErr = err;
        }
      }

      if (!response?.text) {
        return res.status(503).json({ error: lastErr?.message || "Erro ao consultar IA" });
      }

      res.status(200).json({ success: true, reply: response.text });
    } catch (e: any) {
      console.error("[Gemini Chat API] Error:", e);
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/gemini/generate-workout", async (req, res) => {
    try {
      const { prompt } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "Gemini API Key missing in server" });
      }

      const { GoogleGenAI, Type } = await import('@google/genai');
      const ai = new GoogleGenAI({ apiKey });

      const configObj: any = {
        responseMimeType: "application/json",
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
                      required: ["exerciseId", "sets", "reps", "rest"]
                    }
                  }
                },
                required: ["name", "exercises"]
              }
            }
          },
          required: ["title", "objective", "days"]
        }
      };

      const modelsToTry = [
        "gemini-flash-lite-latest",
        "gemini-3.1-flash-lite",
        "gemini-3.5-flash-lite",
        "gemini-3.8-flash",
        "gemini-flash-latest",
        "gemini-3.6-flash",
        "gemini-3.7-flash"
      ];

      let resAi: any = null;
      let lastError: any = null;

      for (const m of modelsToTry) {
        try {
          resAi = await ai.models.generateContent({
            model: m,
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            config: configObj
          });
          if (resAi?.text) break;
        } catch (err: any) {
          lastError = err;
        }
      }

      if (!resAi?.text) {
        // Fallback without schema
        for (const m of ["gemini-flash-lite-latest", "gemini-3.1-flash-lite", "gemini-3.8-flash"]) {
          try {
            resAi = await ai.models.generateContent({
              model: m,
              contents: [{ role: "user", parts: [{ text: `${prompt}\n\nIMPORTANTE: Retorne estritamente um JSON válido.` }] }],
              config: { responseMimeType: "application/json" }
            });
            if (resAi?.text) break;
          } catch (err: any) {
            lastError = err;
          }
        }
      }

      if (!resAi?.text) {
        return res.status(503).json({ error: lastError?.message || "IA indisponível no momento" });
      }

      res.status(200).json({ success: true, text: resAi.text });
    } catch (e: any) {
      console.error("[Generate Workout API] Error:", e);
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/save-missing", async (req, res) => {
    try {
       const fs = await import("fs");
       const { exercises } = req.body;
       const existing = fs.existsSync("missing.json") ? JSON.parse(fs.readFileSync("missing.json", "utf-8")) : [];
       const combined = Array.from(new Set([...existing, ...exercises]));
       fs.writeFileSync("missing.json", JSON.stringify(combined, null, 2));
       res.json({ success: true, count: combined.length });
    } catch(e) { console.error(e); res.status(500).json({error: "Failed"}); }
  });

  app.use((req, res, next) => {
    if (
      req.path === "/" ||
      req.path.endsWith(".html") ||
      req.path === "/sw.js" ||
      req.path === "/registerSW.js" ||
      req.path.startsWith("/workbox-") ||
      req.path.endsWith(".webmanifest") ||
      req.path === "/manifest.json" ||
      req.path === "/manifest-student.json"
    ) {
      res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
      res.setHeader("Pragma", "no-cache");
      res.setHeader("Expires", "0");
    }
    next();
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath, {
      setHeaders: (res, filePath) => {
        if (
          filePath.endsWith(".html") ||
          filePath.endsWith("sw.js") ||
          filePath.endsWith("registerSW.js") ||
          filePath.endsWith(".webmanifest") ||
          filePath.endsWith("manifest.json") ||
          filePath.endsWith("manifest-student.json")
        ) {
          res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
          res.setHeader("Pragma", "no-cache");
          res.setHeader("Expires", "0");
        }
      }
    }));
    app.get('*', (req, res) => {
      res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
      res.setHeader("Pragma", "no-cache");
      res.setHeader("Expires", "0");
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
