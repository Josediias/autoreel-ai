import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Gerar() {
  const [tema, setTema] = useState('');
  const [roteiro, setRoteiro] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (router.query.tema) setTema(router.query.tema);
  }, [router.query.tema]);

  const gerarRoteiro = async () => {
    const res = await fetch('/api/gerar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tema }),
    });
    const json = await res.json();
    setRoteiro(json.roteiro);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">🎬 Gerador de Roteiro</h1>
      <input
        className="border p-2 w-full mb-4"
        type="text"
        placeholder="Digite um tema"
        value={tema}
        onChange={(e) => setTema(e.target.value)}
      />
      <button onClick={gerarRoteiro} className="bg-blue-600 text-white px-4 py-2 rounded">
        Gerar
      </button>
      {roteiro && <pre className="mt-4 p-4 bg-gray-100 rounded">{roteiro}</pre>}
    </div>
  );
}