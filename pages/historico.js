// pages/historico.js
import { useEffect, useState } from 'react';
import { useSession } from '@supabase/auth-helpers-react';
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/router';

export default function Historico() {
  const session = useSession();
  const router = useRouter();
  const [supabase, setSupabase] = useState(null);
  const [roteiros, setRoteiros] = useState([]);

  useEffect(() => {
    const supabaseClient = createPagesBrowserClient(); // Só roda no cliente
    setSupabase(supabaseClient);
  }, []);

  useEffect(() => {
    if (!session) return;
    if (!supabase) return;

    const fetchRoteiros = async () => {
      const { data, error } = await supabase
        .from('roteiros')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      if (!error) setRoteiros(data || []);
    };

    fetchRoteiros();
  }, [supabase, session]);

  const handleExcluir = async (id) => {
    if (!supabase || !confirm('Deseja excluir este roteiro?')) return;

    await supabase.from('roteiros').delete().eq('id', id);
    setRoteiros((prev) => prev.filter((r) => r.id !== id));
  };

  if (!session) {
    router.push('/login');
    return null;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">📜 Histórico de Roteiros</h1>
      {roteiros.map((r) => (
        <div key={r.id} className="border rounded-lg p-3 mb-2 shadow">
          <p className="text-sm text-gray-500">{new Date(r.created_at).toLocaleString()}</p>
          <p className="mt-2">{r.roteiro}</p>
          <button
            onClick={() => handleExcluir(r.id)}
            className="mt-2 text-red-500 hover:underline text-sm"
          >
            🗑️ Excluir
          </button>
        </div>
      ))}
    </div>
  );
}
