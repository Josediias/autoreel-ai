# 📘 AutoReel AI – Projeto Corrigido (APIs + README)

Este projeto está pronto para ser executado com as integrações principais estruturadas, incluindo Supabase, geração de voz com IA, e estrutura preparada para APIs de vídeo como RunwayML, Veed, Pictory e Veo 3.

---

## 📁 Estrutura Incluída

- `app/api/gerar-video/route.js` – Rota real de geração de vídeo via IA.
- `lib/supabaseClient.js` – Conexão Supabase.
- `README.md` – Este guia técnico.

---

## 🚀 Como rodar localmente

1. Clone o projeto e instale as dependências:
```bash
npm install
```

2. Crie um arquivo `.env.local` com:
```
NEXT_PUBLIC_SUPABASE_URL=https://<sua-url>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=chave_anon_public
ELEVENLABS_API_KEY=your_elevenlabs_key
RUNWAY_API_KEY=your_runway_key
```

3. Rode o projeto:
```bash
npm run dev
```

---

## ✅ Teste da API de vídeo (Hoppscotch ou Postman)

**Endpoint:** `POST http://localhost:3000/api/gerar-video`

```json
{
  "roteiro": "Texto de teste com GPT",
  "usarVoz": true,
  "plataforma": "runway"
}
```

---

## 📌 Observações

- `usarVoz`: se true, utiliza ElevenLabs
- `plataforma`: pode ser `"runway"`, `"pictory"`, `"veed"` (estrutura pronta)

---

## 🔗 Integrações futuras

Consulte o `docs/backlog_integracoes_futuras.md` para Stripe, Analytics e +.

---

## 🛠️ Manutenção

- Evite arquivos duplicados nas pastas `/pages` e `/app`
- Use `try/catch` com logs em rotas backend
- Mantenha layout responsivo com Tailwind
