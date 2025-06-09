import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ erro: 'Método não permitido' });
  }

  const { tema } = req.body;

  if (!tema) {
    return res.status(400).json({ erro: 'Tema é obrigatório' });
  }

  // Gerar o roteiro (versão fake, usada durante testes)
  const roteiroGerado = `Roteiro gerado automaticamente para o tema: ${tema}. Aqui você verá dicas, frases impactantes e chamadas para ação com base em IA.`;

  try {
    // Conectar ao Supabase com sessão
    const supabase = createServerComponentClient({ cookies });
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return res.status(401).json({ erro: 'Não autenticado' });
    }

    // Salvar no Supabase (opcional, para histórico real)
    await supabase.from('roteiros').insert([
      {
        user_id: session.user.id,
        tema: tema,
        roteiro: roteiroGerado,
        created_at: new Date().toISOString()
      }
    ]);

    // Retorno manual para testes
    return res.status(200).json({
      roteiro: roteiroGerado
    });

  } catch (erro) {
    console.error('Erro ao salvar roteiro:', erro);
    return res.status(500).json({ erro: 'Erro interno ao gerar roteiro' });
  }
}
