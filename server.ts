import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize Gemini API client on the server
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Status & Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasGemini: !!apiKey,
    model: 'gemini-3.8-flash',
  });
});

// Interactive AI Tutor Endpoint (French CSS Quest Professor)
app.post('/api/tutor', async (req, res) => {
  const { message, context, action } = req.body;

  if (!message && !action) {
    return res.status(400).json({ error: 'Message ou action requis' });
  }

  // System instruction for Professor CSS
  const systemInstruction = `Tu es le Professeur CSS de « CSS Quest », un mentor expert, pédagogue, bienveillant et passionné par le CSS moderne (CSS3, CSS Grid, Flexbox, Box Model, Container Queries, variables :root, nesting natif, cascade & spécificité, animations).
Ta mission : guider les apprenants francophones de zéro à expert en CSS pur moderne sans jargon opaque ni surcharge cognitive.

Règles pédagogiques strictes :
1. Réponds toujours en français clair, chaleureux et direct.
2. Adopte une approche par analogies concrètes (ex: le Box Model comme un tableau avec son cadre et son passe-partout, Flexbox comme des passagers dans un wagon).
3. Si l'action est 'hint', donne un indice sans révéler la réponse complète directement.
4. Si l'action est 'explain_code', décompose le code ligne par ligne en expliquant le rôle de chaque propriété et valeur.
5. Si l'action est 'beginner', vulgarise au maximum comme pour quelqu'un qui n'a jamais codé.
6. Sois synthétique (idéal pour la synthèse vocale Web Speech en 2 à 4 phrases percutantes).
7. Mets en garde contre les pièges classiques (ex: fusion des marges, z-index sans position, align-items vs justify-content, box-sizing: content-box vs border-box).`;

  if (!ai || !apiKey) {
    // Provide a smart local fallback response when API key is not configured
    let fallbackReply = "Bonjour ! Je suis votre Professeur CSS Quest. ";
    if (action === 'hint') {
      fallbackReply += "Indice pédagogique : Observez le conteneur parent ! Avez-vous pensé à définir 'display: flex' ou 'display: grid' avant d'utiliser des propriétés d'alignement comme 'justify-content' ou 'gap' ?";
    } else if (action === 'explain' || action === 'explain_code') {
      fallbackReply += "En CSS moderne, chaque élément HTML est une boîte (Box Model). Avec 'box-sizing: border-box', le padding et la bordure sont inclus dans la largeur totale, ce qui évite les débordements imprévus.";
    } else if (action === 'beginner') {
      fallbackReply += "Imaginez le CSS comme la décoration et l'architecture d'une maison : le HTML pose les briques et les murs, tandis que le CSS choisit les couleurs, dispose les meubles (Flexbox/Grid) et ajoute les rideaux animés !";
    } else {
      fallbackReply += "CSS moderne permet de créer des mises en page réactives élégantes grâce à Flexbox, CSS Grid et les variables :root. Posez-moi une question sur une propriété ou demandez un indice !";
    }
    return res.json({ reply: fallbackReply, isFallback: true });
  }

  try {
    const promptText = `Contexte de la quête CSS :
- Notion / Mission : ${context?.currentLessonTitle || 'Concepts CSS modernes'}
- Code actuel : ${context?.currentCode ? '\n```css\n' + context.currentCode + '\n```' : 'Aucun code fourni'}
- Action pédagogique : ${action || 'question libre'}

Message de l'élève :
"${message || 'Explique-moi ce concept simplement avec un exemple concret.'}"`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: promptText,
      config: {
        systemInstruction,
        temperature: 0.6,
      },
    });

    const reply = response.text || "Désolé, je n'ai pas pu formuler de réponse. Réessayez !";
    return res.json({ reply, isFallback: false });
  } catch (error: any) {
    console.error('Error querying Gemini API:', error);
    return res.status(500).json({
      error: "Erreur lors de la communication avec le professeur d'IA.",
      details: error?.message || String(error),
      fallbackReply: "Astuce CSS Quest : Pensez toujours mobile-first et utilisez 'box-sizing: border-box' pour des calculs de largeur fiables !",
    });
  }
});

// Dev vs Production Setup
const isProduction = process.env.NODE_ENV === 'production';

async function startServer() {
  if (!isProduction) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Tailwind Quest Server] running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
