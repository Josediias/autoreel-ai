import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ erro: 'Método não permitido' });
  }

  const { tema } = req.body;
  if (!tema) return res.status(400).json({ erro: 'Tema é obrigatório' });

  const roteiroGerado = `Roteiro gerado automaticamente para o tema: ${tema}`;

  try {
    const user = await supabase.auth.getUser();
    const userId = user.data?.user?.id;

    if (!userId) return res.status(401).json({ erro: 'Usuário não autenticado' });

    await supabase.from('roteiros').insert([
      {
        user_id: userId,
        tema,
        roteiro: roteiroGerado,
        created_at: new Date().toISOString()
      }
    ]);

    return res.status(200).json({ roteiro: roteiroGerado });
  } catch (error) {
    console.error('Erro no Supabase:', error.message);
    return res.status(500).json({ erro: 'Erro ao salvar no Supabase' });
  }
}
