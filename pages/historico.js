import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Historico() {
  const [historico, setHistorico] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const email = localStorage.getItem('email');
    if (!email) {
      router.push('/');
      return;
    }

    async function fetchHistorico() {
      try {
        const res = await fetch('/api/historico', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });

        const data = await res.json();
        if (res.ok) {
          setHistorico(data.historico);
        } else {
          console.error(data.message);
        }
      } catch (err) {
        console.error('Erro ao buscar histórico:', err);
      }
      setLoading(false);
    }

    fetchHistorico();
  }, []);

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial' }}>
      <h1>📋 Seu Histórico de Roteiros</h1>

      {loading ? (
        <p>Carregando...</p>
      ) : historico.length === 0 ? (
        <p>Nenhum histórico encontrado.</p>
      ) : (
        historico.map((item, index) => (
          <div key={index} style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ccc', borderRadius: '12px' }}>
            <h3>🎥 Tema: {item.tema}</h3>
            <p><strong>Data:</strong> {item.data}</p>
            <pre style={{ whiteSpace: 'pre-wrap' }}>{item.roteiro}</pre>
          </div>
        ))
      )}

      <button onClick={() => router.push('/dashboard')} style={{ marginTop: '30px' }}>
        ⬅ Voltar ao Painel
      </button>
    </div>
  );
}
