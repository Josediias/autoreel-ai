// pages/historico.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabaseClient";
import Link from "next/link";

export default function Historico() {
  const [user, setUser] = useState(null);
  const [roteiros, setRoteiros] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserAndRoteiros = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const sessionUser = sessionData?.session?.user;
      if (!sessionUser) {
        router.push("/login");
        return;
      }
      setUser(sessionUser);

      const { data, error } = await supabase
        .from("roteiros")
        .select("*")
        .eq("user_id", sessionUser.id)
        .order("created_at", { ascending: false });

      if (error) console.error("Erro ao buscar roteiros:", error);
      else setRoteiros(data);

      setLoading(false);
    };

    fetchUserAndRoteiros();
  }, []);

  const excluirRoteiro = async (id) => {
    await supabase.from("roteiros").delete().eq("id", id);
    setRoteiros((prev) => prev.filter((r) => r.id !== id));
  };

  if (loading) return <p className="p-4 text-center">Carregando histórico...</p>;

  return (
    <div className="min-h-screen p-6 bg-white text-gray-900">
      <h1 className="text-2xl font-bold mb-6">📜 Histórico de Roteiros</h1>

      {roteiros.length === 0 && (
        <p className="text-center text-gray-500">Nenhum roteiro encontrado.</p>
      )}

      <div className="grid gap-4">
        {roteiros.map((r) => (
          <div key={r.id} className="p-4 border rounded shadow-md bg-gray-50">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-semibold">{r.tema}</h2>
              <span className="text-xs text-gray-400">
                {new Date(r.created_at).toLocaleDateString()}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-2">{r.roteiro.slice(0, 150)}...</p>
            <div className="flex gap-2">
              <button
                onClick={() => router.push(`/gerar?tema=${encodeURIComponent(r.tema)}`)}
                className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
              >
                🔄 Reutilizar
              </button>
              <button
                onClick={() => excluirRoteiro(r.id)}
                className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
              >
                🗑️ Excluir
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <Link href="/dashboard" className="text-blue-600 underline text-sm">
          ← Voltar ao Painel
        </Link>
      </div>
    </div>
  );
}