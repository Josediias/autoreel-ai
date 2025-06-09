// pages/historico.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';

export default function Historico() {
  const supabase = createPagesBrowserClient();
  const [roteiros, setRoteiros] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const buscarDados = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        router.push('/login');
        return;
      }

      const { data, error } = await supabase
        .from('roteiros')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      if (!error) {
        setRoteiros(data);
      }

      setCarregando(false);
    };

    buscarDados();
  }, []);

  const excluirRoteiro = async (id) => {
    const confirmar = window.confirm('Deseja realmente excluir este roteiro?');
    if (!confirmar) return;

    await supabase.from('roteiros').delete().eq('id', id);
    setRoteiros((prev) => prev.filter((r) => r.id !== id));
  };

  const reutilizarRoteiro = (texto) => {
    router.push(`/gerar?roteiro=${encodeURIComponent(texto)}`);
  };

  if (carregando) {
    return <div className="p-4">Carregando seus roteiros...</div>;
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">📜 Histórico de Roteiros</h1>
      {roteiros.length === 0 && <p className="text-gray-600">Nenhum roteiro encontrado.</p>}
      {roteiros.map((roteiro) => (
        <div key={roteiro.id} className="p-4 border rounded-lg shadow bg-white">
          <p className="whitespace-pre-wrap mb-2">{roteiro.texto}</p>
          <div className="flex gap-4">
            <button
              className="text-sm text-blue-600 hover:underline"
              onClick={() => reutilizarRoteiro(roteiro.texto)}
            >
              🔄 Reutilizar
            </button>
            <button
              className="text-sm text-red-600 hover:underline"
              onClick={() => excluirRoteiro(roteiro.id)}
            >
              🗑️ Excluir
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
