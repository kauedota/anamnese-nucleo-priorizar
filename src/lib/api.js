// Envio da ficha para a API da clínica (mesmo domínio: o servidor da clínica encaminha só esta rota ao backend).
// Em desenvolvimento, aponte VITE_API_URL para o backend (ex.: http://localhost:8080) ou use o proxy do Vite.
const API = import.meta.env.VITE_API_URL ?? "";

export async function enviarAnamnese(payload) {
  const resposta = await fetch(`${API}/api/v1/public/anamnese`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (resposta.ok) return;

  let mensagem = "Não foi possível enviar agora. Tente novamente em alguns minutos.";
  if (resposta.status === 429) {
    mensagem = "Muitos envios em pouco tempo. Aguarde um pouco e tente de novo.";
  } else {
    try {
      const erro = await resposta.json();
      if (erro?.detail) mensagem = erro.detail;
    } catch {
      /* mantém a mensagem padrão */
    }
  }
  throw new Error(mensagem);
}
