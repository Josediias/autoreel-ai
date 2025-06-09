export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
    const { tema } = req.body;

    if (!tema || tema.length < 3) {
      return res.status(400).json({ message: 'Tema inválido' });
    }

    const prompt = `
Crie um roteiro cativante e viral para um vídeo curto com o tema: "${tema}".
Siga este formato:

1. Hook de impacto (2 segundos)
2. Curiosidade ou problema
3. Reviravolta ou dica prática
4. Final com uma chamada emocional para ação

Seja objetivo, emocional e poderoso. Formate como um roteiro.
`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.8,
        max_tokens: 500,
      }),
    });

    const data = await response.json();
    console.log("🧠 RESPOSTA GPT:", JSON.stringify(data, null, 2));

    const roteiro = data.choices?.[0]?.message?.content || "Erro ao gerar roteiro.";
    return res.status(200).json({ roteiro });

  } catch (error) {
    console.error("[ERRO GPT-3.5]", error);
    return res.status(500).json({ roteiro: 'Erro ao gerar roteiro.' });
  }
}
