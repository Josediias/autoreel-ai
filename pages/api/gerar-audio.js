// pages/api/gerar-audio.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { roteiro } = req.body;
  const ELEVEN_API_KEY = process.env.ELEVEN_API_KEY;
  const VOICE_ID = "EXAVITQu4vr4xnSDxMaL"; // Voz padrão da ElevenLabs

  if (!ELEVEN_API_KEY) {
    return res.status(500).json({ error: "Chave da ElevenLabs ausente" });
  }

  if (!roteiro || roteiro.length < 10) {
    return res.status(400).json({ error: "Roteiro inválido ou vazio" });
  }

  try {
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
      method: "POST",
      headers: {
        "xi-api-key": ELEVEN_API_KEY,
        "Content-Type": "application/json",
        "Accept": "audio/mpeg"
      },
      body: JSON.stringify({
        text: roteiro,
        model_id: "eleven_monolingual_v1",
        voice_settings: {
          stability: 0.3,
          similarity_boost: 0.8
        }
      })
    });

    if (!response.ok) {
      const erro = await response.text();
      return res.status(400).json({ error: `Erro na geração de áudio: ${erro}` });
    }

    const audioBuffer = await response.arrayBuffer();
    const base64Audio = Buffer.from(audioBuffer).toString("base64");

    res.status(200).json({ audio: `data:audio/mpeg;base64,${base64Audio}` });

  } catch (erro) {
    console.error("Erro ao gerar áudio:", erro);
    res.status(500).json({ error: "Falha ao gerar áudio" });
  }
}
