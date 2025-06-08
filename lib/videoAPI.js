import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

export async function gerarVideoComTexto(texto) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const result = await model.generateContent(texto);
    const response = await result.response;
    const output = await response.text();

    return output;
  } catch (error) {
    console.error('Erro ao gerar vídeo:', error);
    return null;
  }
}
