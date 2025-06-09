// ✅ Arquivo corrigido: pages/gerar.js
// Corrige uso incorreto do fetch e garante compatibilidade com o GitHub e Vercel

import { useState } from 'react';

export default function GerarPage() {
  const [tema, setTema] = useState('');
  const [roteiro, setRoteiro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);

  const handleGerar = async () => {
    setCarregando(true);
    setErro(null);
    setRoteiro('');

    try {
      const res = await fetch('/api/gerar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tema }),
      });

      if (!res.ok) {
        throw new Error(`Erro na requisição: ${res.status}`);
      }

      const data = await res.json();
      setRoteiro(data.roteiro || 'Nenhum roteiro recebido.');
    } catch (err) {
      console.error('Erro ao gerar:', err);
      setErro('Falha ao gerar o roteiro.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Gerador de Roteiro com IA</h1>

        <input
          type="text"
          placeholder="Digite o tema do vídeo"
          className="w-full p-3 rounded bg-gray-800 border border-gray-600 mb-4"
          value={tema}
          onChange={(e) => setTema(e.target.value)}
        />

        <button
          onClick={handleGerar}
          disabled={carregando || !tema.trim()}
          className="bg-purple-600 hover:bg-purple-500 px-6 py-2 rounded font-medium disabled:opacity-50"
        >
          {carregando ? 'Gerando...' : 'Gerar Roteiro'}
        </button>

        {erro && <p className="mt-4 text-red-400">{erro}</p>}

        {roteiro && (
          <div className="mt-6 bg-gray-800 p-4 rounded border border-gray-700">
            <h2 className="text-xl font-semibold mb-2">Roteiro Gerado:</h2>
            <pre className="whitespace-pre-wrap text-gray-300">{roteiro}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
