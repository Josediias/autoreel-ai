// pages/api/gerar-video.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { roteiro } = req.body;
  const GEMINI_API_KEY = process.env.PUBLIC_GEMINI_API_KEY;

  if (!GEMINI_API_KEY) {
    return res.status(500).json({ error: "Chave da API Gemini ausente." });
  }

  if (!roteiro || roteiro.length < 10) {
    return res.status(400).json({ error: "Roteiro inválido ou vazio." });
  }

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `Crie um vídeo curto com base neste roteiro:\n\n${roteiro}` }] }]
      })
    });

    const data = await response.json();

    const output = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!output) {
      throw new Error("Gemini não retornou conteúdo.");
    }

    // Aqui você pode conectar com outra API que renderize o vídeo real com base no `output`
    // Por enquanto, simulamos uma URL fictícia
    return res.status(200).json({ video_url: "https://fakevideo.com/generated-by-gemini.mp4", roteiro_expandido: output });

  } catch (error) {
    console.error("Erro com Gemini:", error);
    return res.status(500).json({ error: "Erro ao gerar com Gemini", fallback: "https://fakevideo.com/fallback.mp4" });
  }
}
