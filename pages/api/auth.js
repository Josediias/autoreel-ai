
// pages/api/auth.js

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método não permitido" });
  }

  const { email } = req.body;

  if (!email || !email.includes("@")) {
    return res.status(400).json({ message: "Email inválido" });
  }

  // Simula login (em breve conectar com Auth real - ex: NextAuth, Supabase, Clerk)
  return res.status(200).json({ user: { email, nome: "Usuário Exemplo", plano: "Free" } });
}
