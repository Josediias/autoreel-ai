export default function handler(req, res) {
  const { tema } = req.body;
  const roteiroFake = `Roteiro para tema: ${tema}\n1. Introdução\n2. Desenvolvimento\n3. Conclusão`;
  return res.status(200).json({ roteiro: roteiroFake });
}