
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Teste() {
  const router = useRouter();

  useEffect(() => {
    localStorage.setItem('email', 'teste@autoreel.com');
    router.push('/dashboard');
  }, []);

  return <p>🔒 Redirecionando para seu painel privado...</p>;
}
