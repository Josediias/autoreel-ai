import { useState } from 'react';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function getServerSideProps(ctx) {
  const supabase = createServerComponentClient({ cookies: () => ctx.req.headers.cookie });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: session.user,
    },
  };
}

export default function Gerar({ user }) {
  const [tema, setTema] = useState('');
  const [roteiro, setRoteiro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const gerarRoteiro = async () => {
    if (tema.length < 3) return alert('Tema muito curto.');
    setCarregando(true);

    try {
      const res = await fetch('/api/gerar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tema }),
      });

      const data = await res.json();
      setRoteiro(data.roteiro || 'Falha ao gerar roteiro');
    } catch (err) {
      console.error('Erro:', err);
      setRoteiro('Erro ao gerar roteiro');
    }

    setCarregando(false);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🎬 Gerador de Roteiros</h1>
      <input
        type="text"
        value={tema}
        onChange={(e) => setTema(e.target.value)}
        placeholder="Digite um tema..."
        className="w-full p-2 border rounded mb-4"
      />
      <button
        onClick={gerarRoteiro}
        disabled={carregando}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {carregando ? 'Gerando...' : 'Gerar Roteiro'}
      </button>

      {roteiro && (
        <div className="mt-6 bg-gray-100 p-4 rounded whitespace-pre-wrap">
          <h2 className="text-lg font-semibold mb-2">📝 Roteiro Gerado:</h2>
          {roteiro}
        </div>
      )}
    </div>
  );
}
