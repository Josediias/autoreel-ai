import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const [usuario, setUsuario] = useState(null);
  const [resumo, setResumo] = useState({ total: 0, hoje: 0 });
  const router = useRouter();

  useEffect(() => {
    const email = localStorage.getItem('email');
    if (!email) {
      router.push('/');
    } else {
      setUsuario(email);
      // Simula resumo de uso
      setResumo({ total: 27, hoje: 2 });
    }
  }, []);

  const sair = () => {
    localStorage.removeItem('email');
    router.push('/');
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial' }}>
      <h1>🤖 Painel do Usuário - AutoReel AI</h1>

      {usuario && (
        <>
          <p>💬 Logado como: <strong>{usuario}</strong></p>

          <div style={{
            display: 'flex',
            gap: '20px',
            marginTop: '30px',
            flexWrap: 'wrap'
          }}>
            <div style={{ padding: '20px', background: '#f0f0f0', borderRadius: '12px' }}>
              <h3>📈 Total de vídeos: {resumo.total}</h3>
              <p>Gerados desde sua entrada</p>
            </div>

            <div style={{ padding: '20px', background: '#e0ffe0', borderRadius: '12px' }}>
              <h3>📝 Hoje: {resumo.hoje}</h3>
              <p>Novos roteiros gerados hoje</p>
            </div>

            <div style={{ padding: '20px', background: '#fff8dc', borderRadius: '12px' }}>
              <h3>⭐ Recomendação:</h3>
              <p>"Explique um conceito em 30 segundos com um gancho emocional"</p>
              <button onClick={() => router.push('/gerar')} style={{ marginTop: '10px' }}>
                Usar agora
              </button>
            </div>
          </div>

          <div style={{ marginTop: '40px' }}>
            <button
              onClick={() => router.push('/gerar')}
              style={{ marginRight: '20px', padding: '10px 20px', fontSize: '16px' }}>
              🎥 Gerar Novo Vídeo
            </button>
            <button
              onClick={() => router.push('/historico')}
              style={{ marginRight: '20px', padding: '10px 20px', fontSize: '16px' }}>
              📋 Ver Histórico
            </button>
            <button
              onClick={() => alert('Planos Premium em breve!')}
              style={{ marginRight: '20px', padding: '10px 20px', fontSize: '16px', background: 'gold', color: 'black' }}>
              🥇 Upgrade para Premium
            </button>
            <button
              onClick={sair}
              style={{ padding: '10px 20px', fontSize: '16px', background: '#f44', color: 'white' }}>
              ❌ Sair
            </button>
          </div>
        </>
      )}
    </div>
  );
}
