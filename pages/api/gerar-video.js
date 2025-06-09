import axios from 'axios'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método não permitido' })

  const { roteiro } = req.body

  if (!roteiro) return res.status(400).json({ error: 'Roteiro ausente no corpo da requisição' })

  try {
    // Exemplo de integração com Gemini API (ajuste conforme seu endpoint real)
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
      {
        contents: [
          {
            parts: [{ text: `Crie um vídeo curto a partir do seguinte roteiro: ${roteiro}` }],
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.GEMINI_API_KEY}`,
        },
      }
    )

    // Substitua isso com lógica real de geração de vídeo (URL, ID, etc.)
    const videoSimulado = {
      url: 'https://example.com/video-simulado.mp4',
      status: 'success',
      mensagem: 'Vídeo gerado com sucesso (simulado)',
    }

    return res.status(200).json({ video: videoSimulado })
  } catch (err) {
    console.error('Erro ao gerar vídeo com Gemini:', err.message)

    // Fallback simulando retorno
    return res.status(200).json({
      video: {
        url: 'https://www.w3schools.com/html/mov_bbb.mp4', // vídeo de exemplo
        status: 'placeholder',
        mensagem: 'Falha na geração com Gemini. Retornando vídeo simulado.',
      },
    })
  }
}
