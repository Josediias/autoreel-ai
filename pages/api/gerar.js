import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ erro: 'Método não permitido' });
  }

  const supabase = createRouteHandlerClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return res.status(401).json({ erro: 'Não autenticado' });
  }

  const { tema } = req.body;
  if (!tema) {
    return res.status(400).json({ erro: 'Tema é obrigatório' });
  }

  const roteiroGerado = `Roteiro gerado automaticamente para o tema: ${tema}`;

  await supabase.from('roteiros').insert([
    {
      user_id: session.user.id,
      tema,
      roteiro: roteiroGerado,
      created_at: new Date().toISOString()
    }
  ]);

  return res.status(200).json({ roteiro: roteiroGerado });
}
