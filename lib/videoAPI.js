
export async function gerarVideoComTexto(texto) {
  const endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  const prompt = `Gere um roteiro impactante e direto para um vídeo no estilo Reels/TikTok com base no tema: "${texto}".`;

  const response = await fetch(\`\${endpoint}?key=\${apiKey}\`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
    }),
  });

  if (!response.ok) {
    console.error('Erro ao gerar vídeo:', await response.text());
    throw new Error('Falha na geração do vídeo');
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
}
