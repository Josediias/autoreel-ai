// pages/dashboard.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabaseClient";
import Link from "next/link";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session?.user) {
        router.push("/login");
      } else {
        setUser(session.user);
        setLoading(false);
      }
    });
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (loading) return <div className="p-4 text-center">Carregando...</div>;

  return (
    <div className="min-h-screen bg-white text-gray-800 p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">AutoReel AI</h1>
        <button
          onClick={handleLogout}
          className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Sair
        </button>
      </header>

      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-gray-800 text-white flex items-center justify-center font-bold text-sm">
          {user?.email?.charAt(0).toUpperCase() || "U"}
        </div>
        <p className="text-lg">Olá, <span className="font-semibold">{user.email}</span></p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <Link href="/gerar">
          <div className="p-4 bg-blue-500 text-white rounded shadow text-center cursor-pointer hover:bg-blue-600 transition">
            🎬 Gerar Novo Vídeo
          </div>
        </Link>

        <Link href="/historico">
          <div className="p-4 bg-gray-700 text-white rounded shadow text-center cursor-pointer hover:bg-gray-800 transition">
            📜 Ver Histórico
          </div>
        </Link>

        <div className="p-4 border rounded shadow text-center">
          <p className="text-sm text-gray-500">Total de vídeos:</p>
          <p className="text-2xl font-semibold">(conectar ao Supabase)</p>
        </div>
      </div>
    </div>
  );
}