import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

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
      subject: "Seu Acesso ao Portal de Treinamento - Academia JT Fitness",
      text: `Olá ${name}! Aqui está seu acesso ao nosso Portal de Treinamento da Academia JT Fitness:\n\n🔗 Acesse aqui: ${appUrl}\n📧 E-mail: ${email}\n🔑 Código: ${accessCode}\n\nLá você encontrará:\n🏋️ Seus Treinos de Musculação\n🍽️ Sua Dieta completa\n📋 Sua Anamnese cadastrada\n📈 Análise de evolução e IA\n\nAcesse agora e confira!`,
    });
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("[Email API] ERRO ao enviar e-mail:", error);
    return res.status(500).json({ error: "Failed to send email." });
  }
}
