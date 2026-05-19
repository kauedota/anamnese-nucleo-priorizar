import { useEffect, useMemo, useState } from "react";
import jsPDF from "jspdf";
import { supabase } from "../lib/supabase";
import { formSections } from "../data/formFields";

function Admin() {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [anamneses, setAnamneses] = useState([]);
  const [anamneseSelecionada, setAnamneseSelecionada] = useState(null);
  const [busca, setBusca] = useState("");

  const anamnesesFiltradas = useMemo(() => {
    const termo = busca.toLowerCase().trim();

    if (!termo) return anamneses;

    return anamneses.filter((item) => {
      return (
        String(item.nome_crianca || "").toLowerCase().includes(termo) ||
        String(item.nome_responsavel || "").toLowerCase().includes(termo) ||
        String(item.email_responsavel || "").toLowerCase().includes(termo)
      );
    });
  }, [busca, anamneses]);

  useEffect(() => {
    async function carregarSessao() {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);

      if (data.session) {
        buscarAnamneses();
      }
    }

    carregarSessao();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, novaSessao) => {
        setSession(novaSessao);

        if (novaSessao) {
          buscarAnamneses();
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  async function fazerLogin(event) {
    event.preventDefault();

    setErro("");
    setSucesso("");
    setCarregando(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });

    setCarregando(false);

    if (error) {
      setErro("E-mail ou senha inválidos.");
      return;
    }
  }

  async function sair() {
    await supabase.auth.signOut();
    setSession(null);
    setAnamneses([]);
    setAnamneseSelecionada(null);
  }

  async function buscarAnamneses() {
    setCarregando(true);
    setErro("");

    const { data, error } = await supabase
      .from("anamneses")
      .select("*")
      .order("created_at", { ascending: false });

    setCarregando(false);

    if (error) {
      console.error(error);
      setErro("Não foi possível carregar as anamneses.");
      return;
    }

    setAnamneses(data || []);
  }

  async function excluirAnamnese(id) {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir esta anamnese? Essa ação não poderá ser desfeita."
    );

    if (!confirmar) return;

    setErro("");
    setSucesso("");
    setCarregando(true);

    const { error } = await supabase.from("anamneses").delete().eq("id", id);

    setCarregando(false);

    if (error) {
      console.error(error);
      setErro("Não foi possível excluir a anamnese.");
      return;
    }

    setAnamneses((listaAtual) =>
      listaAtual.filter((anamnese) => anamnese.id !== id)
    );

    setAnamneseSelecionada(null);
    setSucesso("Anamnese excluída com sucesso.");
  }

  function formatarData(data) {
    if (!data) return "Não informado";
    return new Date(data).toLocaleString("pt-BR");
  }

  function formatarValor(valor) {
    if (Array.isArray(valor)) {
      return valor.length > 0 ? valor.join(", ") : "Não informado";
    }

    if (typeof valor === "object" && valor !== null) {
      const respostas = Object.entries(valor).map(
        ([pergunta, nota]) => `${pergunta}: ${nota}`
      );

      return respostas.length > 0 ? respostas.join(" | ") : "Não informado";
    }

    return valor || "Não informado";
  }

  function nomeDoArquivo(anamnese, extensao) {
    const nome = anamnese.nome_crianca
      ? anamnese.nome_crianca.toLowerCase().replaceAll(" ", "-")
      : "crianca";

    return `anamnese-${nome}.${extensao}`;
  }

  function baixarPdfAdmin(anamnese) {
    if (!anamnese) return;

    const pdf = new jsPDF();
    const dados = anamnese.dados_completos || {};
    let y = 20;

    function verificarPagina() {
      if (y > 270) {
        pdf.addPage();
        y = 20;
      }
    }

    function adicionarTitulo(texto) {
      pdf.setTextColor(45, 46, 131);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(18);
      pdf.text(texto, 15, y);
      y += 12;
      verificarPagina();
    }

    function adicionarSubtitulo(texto) {
      verificarPagina();
      pdf.setTextColor(45, 46, 131);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(13);
      pdf.text(texto, 15, y);
      y += 8;
      verificarPagina();
    }

    function adicionarTexto(label, valor) {
      verificarPagina();

      pdf.setTextColor(15, 23, 42);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(10);
      pdf.text(`${label}:`, 15, y);
      y += 6;

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);

      const linhas = pdf.splitTextToSize(String(formatarValor(valor)), 180);
      pdf.text(linhas, 15, y);

      y += linhas.length * 6 + 4;
      verificarPagina();
    }

    adicionarTitulo("Anamnese Infantil Integrada");

    pdf.setTextColor(80, 80, 80);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);
    pdf.text(`Recebida em: ${formatarData(anamnese.created_at)}`, 15, y);
    y += 14;

    formSections.forEach((section) => {
      adicionarSubtitulo(section.subtitle);

      section.blocks.forEach((block) => {
        y += 2;
        adicionarSubtitulo(block.title);

        block.fields.forEach((field) => {
          adicionarTexto(field.label, dados[field.name]);
        });

        y += 4;
      });

      y += 4;
    });

    pdf.save(nomeDoArquivo(anamnese, "pdf"));
  }

  function gerarTextoCompleto(anamnese) {
    const dados = anamnese.dados_completos || {};

    let texto = "ANAMNESE INFANTIL INTEGRADA\n\n";
    texto += `Recebida em: ${formatarData(anamnese.created_at)}\n\n`;

    formSections.forEach((section) => {
      texto += `==================================================\n`;
      texto += `${section.subtitle.toUpperCase()}\n`;
      texto += `==================================================\n\n`;

      section.blocks.forEach((block) => {
        texto += `${block.title.toUpperCase()}\n\n`;

        block.fields.forEach((field) => {
          texto += `${field.label}: ${formatarValor(dados[field.name])}\n\n`;
        });
      });

      texto += "\n";
    });

    return texto;
  }

  function baixarWordAdmin(anamnese) {
    if (!anamnese) return;

    const textoHtml = gerarTextoCompleto(anamnese)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll("\n", "<br />");

    const conteudoDoc = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Anamnese Infantil Integrada</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              color: #111827;
              line-height: 1.5;
              padding: 24px;
            }

            h1 {
              color: #2d2e83;
              font-size: 24px;
            }

            p {
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <h1>Anamnese Infantil Integrada</h1>
          <p>${textoHtml}</p>
        </body>
      </html>
    `;

    const arquivo = new Blob([conteudoDoc], {
      type: "application/msword;charset=utf-8",
    });

    const url = URL.createObjectURL(arquivo);
    const link = document.createElement("a");

    link.href = url;
    link.download = nomeDoArquivo(anamnese, "doc");
    link.click();

    URL.revokeObjectURL(url);
  }

  if (!session) {
    return (
      <div className="admin-login-page">
        <div className="admin-login-card">
          <img src="/logo.png" alt="Núcleo Priorizar" />

          <h1>Área da Clínica</h1>
          <p>Entre para visualizar as anamneses recebidas.</p>

          {erro && <div className="mensagem-erro">{erro}</div>}

          <form onSubmit={fazerLogin}>
            <label className="campo">
              <span>E-mail</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@clinica.com.br"
              />
            </label>

            <label className="campo">
              <span>Senha</span>
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Digite sua senha"
              />
            </label>

            <button type="submit" className="botao" disabled={carregando}>
              {carregando ? "Entrando..." : "Entrar"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <header className="admin-topo">
        <div className="marca">
          <div className="logo-wrapper">
            <img src="/logo.png" alt="Núcleo Priorizar" />
          </div>

          <div>
            <strong>Painel da Clínica</strong>
            <span>Anamneses recebidas</span>
          </div>
        </div>

        <button type="button" className="botao-voltar" onClick={sair}>
          Sair
        </button>
      </header>

      <main className="admin-conteudo">
        <section className="admin-lista">
          <div className="admin-lista-topo">
            <div>
              <h1>Anamneses recebidas</h1>
              <p>Total: {anamnesesFiltradas.length}</p>
            </div>

            <button type="button" className="botao" onClick={buscarAnamneses}>
              Atualizar
            </button>
          </div>

          <input
            className="admin-busca"
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar por criança, responsável ou e-mail..."
          />

          {erro && <div className="mensagem-erro">{erro}</div>}
          {sucesso && <div className="mensagem-sucesso">{sucesso}</div>}

          {carregando && <p>Carregando...</p>}

          {!carregando && anamnesesFiltradas.length === 0 && (
            <div className="card">
              <p>Nenhuma anamnese encontrada.</p>
            </div>
          )}

          <div className="admin-cards">
            {anamnesesFiltradas.map((item) => (
              <button
                type="button"
                key={item.id}
                className={
                  anamneseSelecionada?.id === item.id
                    ? "admin-card ativo"
                    : "admin-card"
                }
                onClick={() => setAnamneseSelecionada(item)}
              >
                <strong>{item.nome_crianca || "Criança sem nome"}</strong>
                <span>
                  Responsável: {item.nome_responsavel || "Não informado"}
                </span>
                <span>E-mail: {item.email_responsavel || "Não informado"}</span>
                <span>Recebida em: {formatarData(item.created_at)}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="admin-detalhes">
          {!anamneseSelecionada && (
            <div className="card admin-vazio">
              <h2>Selecione uma anamnese</h2>
              <p>
                Clique em uma anamnese da lista para visualizar os dados
                completos.
              </p>
            </div>
          )}

          {anamneseSelecionada && (
            <div className="card">
              <div className="admin-detalhes-topo">
                <div>
                  <h2>
                    {anamneseSelecionada.nome_crianca || "Criança sem nome"}
                  </h2>
                  <p>
                    Enviada em: {formatarData(anamneseSelecionada.created_at)}
                  </p>
                </div>

                <div className="admin-acoes">
                  <span className="status-admin">
                    {anamneseSelecionada.status || "recebida"}
                  </span>

                  <button
                    type="button"
                    className="botao"
                    onClick={() => baixarPdfAdmin(anamneseSelecionada)}
                  >
                    Baixar PDF
                  </button>

                  <button
                    type="button"
                    className="botao-voltar"
                    onClick={() => baixarWordAdmin(anamneseSelecionada)}
                  >
                    Baixar Word (.doc)
                  </button>

                  <button
                    type="button"
                    className="botao-excluir"
                    onClick={() => excluirAnamnese(anamneseSelecionada.id)}
                    disabled={carregando}
                  >
                    Excluir
                  </button>
                </div>
              </div>

              {formSections.map((section) => (
                <div key={section.title} className="admin-section">
                  <h3>{section.subtitle}</h3>

                  {section.blocks.map((block) => (
                    <div key={block.title} className="admin-block">
                      <h4>{block.title}</h4>

                      <div className="admin-grid">
                        {block.fields.map((field) => (
                          <div key={field.name} className="admin-field">
                            <span>{field.label}</span>
                            <strong>
                              {formatarValor(
                                anamneseSelecionada.dados_completos?.[
                                  field.name
                                ]
                              )}
                            </strong>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Admin;