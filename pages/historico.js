import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function Historico() {
  const [roteiros, setRoteiros] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchRoteiros = async () => {
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

      if (error) console.error('Erro ao buscar roteiros:', error);
      else setRoteiros(data);

      setCarregando(false);
    };

    fetchRoteiros();
  }, []);

  const excluirRoteiro = async (id) => {
    await supabase.from('roteiros').delete().eq('id', id);
    setRoteiros((prev) => prev.filter((r) => r.id !== id));
  };

  const reutilizar = (tema) => {
    router.push(`/gerar?tema=${encodeURIComponent(tema)}`);
  };

  if (carregando) return <p className="p-4">Carregando...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🧠 Histórico de Roteiros</h1>
      {roteiros.length === 0 ? (
        <p>Nenhum roteiro salvo ainda.</p>
      ) : (
        <ul className="space-y-4">
          {roteiros.map((r) => (
            <li key={r.id} className="bg-white rounded-xl p-4 shadow flex justify-between items-start">
              <div>
                <p className="font-semibold mb-2">{r.tema}</p>
                <p className="text-sm text-gray-600">{new Date(r.created_at).toLocaleString()}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => reutilizar(r.tema)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                >
                  🔄 Reutilizar
                </button>
                <button
                  onClick={() => excluirRoteiro(r.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
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
