
// pages/api/gerar-video.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { roteiro, audioBase64 } = req.body;

  if (!roteiro || roteiro.length < 10) {
    return res.status(400).json({ error: "Roteiro inválido" });
  }

  if (!audioBase64 || !audioBase64.startsWith("data:audio/mpeg;base64")) {
    return res.status(400).json({ error: "Áudio inválido ou ausente" });
  }

  // Simula vídeo (substituir pela lógica real quando conectar com Veo AI)
  const videoSimulado = "https://www.w3schools.com/html/mov_bbb.mp4";

  return res.status(200).json({ video: videoSimulado });
}
