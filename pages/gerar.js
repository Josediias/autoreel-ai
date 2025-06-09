import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function Gerar() {
  const [tema, setTema] = useState('');
  const [roteiro, setRoteiro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const checkLogin = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) router.push('/login');
    };
    checkLogin();

    if (router.query.tema) setTema(router.query.tema);
  }, [router]);

  const gerarRoteiro = async () => {
    if (!tema.trim()) return;
    setCarregando(true);
    try {
      const res = await fetch('/api/gerar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tema }),
      });
      const data = await res.json();
      if (res.ok) setRoteiro(data.roteiro);
      else alert('Erro: ' + data.erro);
    } catch (e) {
      console.error(e);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🎬 Gerador de Roteiros com IA</h1>
      <input
        type="text"
        placeholder="Digite um tema..."
        value={tema}
        onChange={(e) => setTema(e.target.value)}
        className="w-full px-4 py-2 border rounded mb-4"
      />
      <button
        onClick={gerarRoteiro}
        disabled={carregando}
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
      >
        {carregando ? 'Gerando...' : '🚀 Gerar Roteiro com IA'}
      </button>

      {roteiro && (
        <div className="mt-6 bg-gray-100 p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">🧠 Roteiro Gerado</h2>
          <p className="whitespace-pre-line">{roteiro}</p>
        </div>
      )}
    </div>
  );
}
