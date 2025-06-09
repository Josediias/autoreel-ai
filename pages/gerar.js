// pages/api/gerar.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { tema } = req.body;

  if (!tema || tema.trim() === '') {
    return res.status(400).json({ error: 'Tema é obrigatório.' });
  }

  try {
    const resposta = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'Você é um roteirista de vídeos virais para Reels e TikTok. Crie roteiros curtos, impactantes e com linguagem moderna.',
          },
          {
            role: 'user',
            content: `Crie um roteiro com o tema: ${tema}. Estruture com abertura forte, gancho emocional e final chamativo.`,
          },
        ],
        max_tokens: 800,
        temperature: 0.8,
      }),
    });

    const data = await resposta.json();

    if (!data.choices || !data.choices[0]) {
      return res.status(500).json({ error: 'Erro ao gerar roteiro com IA' });
    }

    const roteiro = data.choices[0].message.content;

    return res.status(200).json({ roteiro });
  } catch (error) {
    console.error('Erro ao gerar roteiro:', error);
    return res.status(500).json({ error: 'Erro interno ao gerar roteiro' });
  }
}
