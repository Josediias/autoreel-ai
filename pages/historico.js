'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';

export default function Historico() {
  const [supabase, setSupabase] = useState(null);
  const [roteiros, setRoteiros] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const supabaseClient = createPagesBrowserClient();
    setSupabase(supabaseClient);

    supabaseClient.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.push('/login');
      } else {
        fetchRoteiros(supabaseClient);
      }
    });
  }, []);

  const fetchRoteiros = async (supabaseClient) => {
    const { data, error } = await supabaseClient
      .from('roteiros')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error) {
      setRoteiros(data);
    }
    setLoading(false);
  };

  const excluirRoteiro = async (id) => {
    if (!confirm('Tem certeza que deseja excluir este roteiro?')) return;
    await supabase.from('roteiros').delete().eq('id', id);
    setRoteiros((prev) => prev.filter((r) => r.id !== id));
  };

  if (loading) return <p className="p-4">Carregando...</p>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📜 Histórico de Roteiros</h1>
      {roteiros.length === 0 ? (
        <p>Nenhum roteiro encontrado.</p>
      ) : (
        <ul className="space-y-4">
          {roteiros.map((roteiro) => (
            <li key={roteiro.id} className="border p-4 rounded-xl shadow">
              <p><strong>Tema:</strong> {roteiro.tema}</p>
              <p><strong>Roteiro:</strong> {roteiro.roteiro}</p>
              <div className="flex gap-2 mt-2">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                  onClick={() => router.push(`/gerar?tema=${encodeURIComponent(roteiro.tema)}`)}
                >
                  🔄 Reutilizar
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  onClick={() => excluirRoteiro(roteiro.id)}
                >
                  🗑️ Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
