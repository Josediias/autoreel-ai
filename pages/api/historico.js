
// pages/api/historico.js

const mockData = {
  "teste@email.com": [
    {
      tema: "Como ganhar dinheiro com vídeos curtos",
      roteiro: "1. Comece com uma pergunta...
2. Mostre prova...
3. CTA final",
      data: "2025-06-06"
    },
    {
      tema: "Como ter hábitos poderosos",
      roteiro: "1. Mostre um hábito ruim...
2. Traga o contraste...
3. Finalize com mudança real",
      data: "2025-06-07"
    }
  ]
};

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método não permitido" });
  }

  const { email } = req.body;

  if (!email || !mockData[email]) {
    return res.status(404).json({ message: "Histórico não encontrado" });
  }

  return res.status(200).json({ historico: mockData[email] });
}
