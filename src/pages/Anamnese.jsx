import { useMemo, useState } from "react";
import jsPDF from "jspdf";
import { CheckCircle2 } from "lucide-react";
import SectionTitle from "../components/SectionTitle";
import InputField from "../components/InputField";
import SummaryCard from "../components/SummaryCard";
import { formSections, initialForm } from "../data/formFields";
import { supabase } from "../lib/supabase";

// Versão do aviso de privacidade/consentimento exibido ao responsável (registrada junto com a anamnese).
const VERSAO_CONSENTIMENTO = "2026-10";
const URL_POLITICA =
  (import.meta.env.VITE_SITE_URL || "https://www.clinicanucleopriorizar.com.br") +
  "/politica-de-privacidade";

function Anamnese() {
  const [form, setForm] = useState(initialForm);
  const [etapaAtual, setEtapaAtual] = useState(0);
  const [erro, setErro] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [consentimento, setConsentimento] = useState(false);

  const totalEtapas = formSections.length;
  const etapaFormulario = formSections[etapaAtual];
  const progressoEtapas = Math.round(((etapaAtual + 1) / totalEtapas) * 100);

  const camposObrigatoriosGerais = [
    "nomeCrianca",
    "dataNascimento",
    "idadeAtual",
    "nomeResponsavel",
    "parentesco",
    "telefoneResponsavel",
    "emailResponsavel",
    "queixaFinal",
    "objetivosFamilia",
    "emailProfissional",
  ];

  const progress = useMemo(() => {
    const campos = Object.keys(form);

    const preenchidos = campos.filter((campo) => {
      const valor = form[campo];

      if (Array.isArray(valor)) return valor.length > 0;

      if (typeof valor === "object" && valor !== null) {
        return Object.keys(valor).length > 0;
      }

      return String(valor || "").trim() !== "";
    });

    return Math.round((preenchidos.length / campos.length) * 100);
  }, [form]);

  function alterarCampo(campo, valor) {
    setErro("");
    setEnviado(false);

    setForm({
      ...form,
      [campo]: valor,
    });
  }

  function campoEstaVazio(nomeCampo) {
    const valor = form[nomeCampo];

    if (Array.isArray(valor)) return valor.length === 0;

    if (typeof valor === "object" && valor !== null) {
      return Object.keys(valor).length === 0;
    }

    return String(valor || "").trim() === "";
  }

  function buscarCampoPorNome(nomeCampo) {
    for (let sectionIndex = 0; sectionIndex < formSections.length; sectionIndex++) {
      const section = formSections[sectionIndex];

      for (const block of section.blocks) {
        for (const field of block.fields) {
          if (field.name === nomeCampo) {
            return {
              field,
              sectionIndex,
            };
          }
        }
      }
    }

    return null;
  }

  function validarEtapaAtual() {
    const camposObrigatoriosDaEtapa = [];

    etapaFormulario.blocks.forEach((block) => {
      block.fields.forEach((field) => {
        if (field.required || camposObrigatoriosGerais.includes(field.name)) {
          camposObrigatoriosDaEtapa.push(field);
        }
      });
    });

    const campoVazio = camposObrigatoriosDaEtapa.find((field) =>
      campoEstaVazio(field.name)
    );

    if (campoVazio) {
      setErro(`Preencha o campo obrigatório: ${campoVazio.label}`);
      return false;
    }

    return true;
  }

  function validarFormularioCompleto() {
    for (const nomeCampo of camposObrigatoriosGerais) {
      if (campoEstaVazio(nomeCampo)) {
        const resultado = buscarCampoPorNome(nomeCampo);

        if (resultado) {
          setEtapaAtual(resultado.sectionIndex);
          setErro(`Preencha o campo obrigatório: ${resultado.field.label}`);

          window.scrollTo({ top: 0, behavior: "smooth" });
          return false;
        }
      }
    }

    return true;
  }

  function proximaEtapa() {
    if (!validarEtapaAtual()) return;

    if (etapaAtual < totalEtapas - 1) {
      setEtapaAtual(etapaAtual + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function etapaAnterior() {
    setErro("");

    if (etapaAtual > 0) {
      setEtapaAtual(etapaAtual - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function irParaEtapa(index) {
    setErro("");
    setEtapaAtual(index);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function enviarFormulario(event) {
    event.preventDefault();

    if (!validarFormularioCompleto()) return;

    // dados de saúde de criança (LGPD arts. 11 e 14): exige consentimento específico do responsável
    if (!consentimento) {
      setErro(
        "Para enviar, confirme o consentimento do responsável legal no aviso de privacidade ao final do formulário."
      );
      return;
    }

    setEnviando(true);
    setErro("");

    const dadosParaSalvar = {
      nome_crianca: form.nomeCrianca || "",
      nome_responsavel: form.nomeResponsavel || "",
      email_responsavel: form.emailResponsavel || "",
      telefone_responsavel: form.telefoneResponsavel || "",
      dados_completos: {
        ...form,
        lgpd_consentimento: {
          aceito: true,
          versao: VERSAO_CONSENTIMENTO,
          data_hora: new Date().toISOString(),
        },
      },
      status: "recebida",
    };

    const { error } = await supabase.from("anamneses").insert([dadosParaSalvar]);

    setEnviando(false);

    if (error) {
      console.error("Erro ao salvar anamnese:", error);

      setErro(
        `Erro ao enviar: ${error.message || "Erro desconhecido"} ${
          error.details ? `Detalhes: ${error.details}` : ""
        }`
      );

      return;
    }

    setEnviado(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function limparFormulario() {
    const confirmar = confirm("Tem certeza que deseja limpar o formulário?");

    if (confirmar) {
      setForm(initialForm);
      setConsentimento(false);
      setEtapaAtual(0);
      setErro("");
      setEnviado(false);
    }
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

  function nomeDoArquivo(extensao) {
    const nome = form.nomeCrianca
      ? form.nomeCrianca.toLowerCase().replaceAll(" ", "-")
      : "crianca";

    return `anamnese-${nome}.${extensao}`;
  }

  function gerarTextoCompleto() {
    let texto = "ANAMNESE INFANTIL INTEGRADA\n\n";
    texto += `Gerado em: ${new Date().toLocaleDateString("pt-BR")}\n\n`;

    formSections.forEach((section) => {
      texto += `==================================================\n`;
      texto += `${section.subtitle.toUpperCase()}\n`;
      texto += `==================================================\n\n`;

      section.blocks.forEach((block) => {
        texto += `${block.title.toUpperCase()}\n\n`;

        block.fields.forEach((field) => {
          texto += `${field.label}: ${formatarValor(form[field.name])}\n\n`;
        });
      });

      texto += "\n";
    });

    return texto;
  }

  function baixarResumo() {
    const pdf = new jsPDF();

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
    pdf.text(`Gerado em: ${new Date().toLocaleDateString("pt-BR")}`, 15, y);
    y += 14;

    formSections.forEach((section) => {
      adicionarSubtitulo(section.subtitle);

      section.blocks.forEach((block) => {
        y += 2;
        adicionarSubtitulo(block.title);

        block.fields.forEach((field) => {
          adicionarTexto(field.label, form[field.name]);
        });

        y += 4;
      });

      y += 4;
    });

    pdf.save(nomeDoArquivo("pdf"));
  }

  function baixarWord() {
    const textoHtml = gerarTextoCompleto()
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
    link.download = nomeDoArquivo("doc");
    link.click();

    URL.revokeObjectURL(url);
  }

  return (
    <div className="pagina">
      <header className="barra-superior">
        <div className="barra-superior-conteudo">
          <div className="marca">
            <div className="logo-wrapper">
              <img src="/logo.png" alt="Núcleo Priorizar" />
            </div>

            <div>
              <strong>Anamnese Infantil Integrada</strong>
              <span>Núcleo Priorizar · Avaliação Multidisciplinar</span>
            </div>
          </div>

          <div className="progresso-topo">
            <span>
              Etapa {etapaAtual + 1} de {totalEtapas}
            </span>

            <div className="barra-topo-progresso">
              <div style={{ width: `${progressoEtapas}%` }}></div>
            </div>
          </div>
        </div>
      </header>

      <main className="conteudo conteudo-com-resumo">
        <div className="etapas">
          {formSections.map((section, index) => (
            <button
              type="button"
              key={section.title}
              className={
                index <= etapaAtual
                  ? etapaAtual === index
                    ? "etapa ativa concluida"
                    : "etapa concluida"
                  : "etapa"
              }
              onClick={() => irParaEtapa(index)}
              title={section.title}
              data-number={index + 1}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <form onSubmit={enviarFormulario} className="formulario">
          {enviado && (
            <div className="mensagem-sucesso">
              <CheckCircle2 size={26} />
              <div>
                <strong>Anamnese enviada com sucesso!</strong>
                <p>
                  Os dados foram enviados para a clínica. Você também pode baixar
                  o documento em PDF ou Word.
                </p>
              </div>
            </div>
          )}

          {erro && <div className="mensagem-erro">{erro}</div>}

          <section className="cabecalho-secao">
            <span>{etapaFormulario.badge}</span>
            <h1>{etapaFormulario.subtitle}</h1>
            <p>{etapaFormulario.description}</p>
          </section>

          {etapaFormulario.blocks.map((block) => (
            <section className="card" key={block.title}>
              <SectionTitle
                icon={() => null}
                title={block.title}
                description=""
              />

              <div className="grade">
                {block.fields.map((field) => (
                  <InputField
                    key={field.name}
                    label={field.label}
                    type={field.type}
                    value={form[field.name]}
                    onChange={(valor) => alterarCampo(field.name, valor)}
                    placeholder={field.placeholder}
                    options={field.options}
                    required={
                      field.required ||
                      camposObrigatoriosGerais.includes(field.name)
                    }
                  />
                ))}
              </div>
            </section>
          ))}

          {etapaAtual === totalEtapas - 1 && (
            <section className="card card-finalizar">
              <h2>Anamnese pronta para enviar!</h2>

              <p>
                Clique abaixo para enviar a anamnese para a clínica. Depois, se
                desejar, baixe uma cópia em PDF ou Word.
              </p>

              {/* TEXTO-MODELO: revisar com advogado antes de publicar (base legal, controlador, prazo de guarda). */}
              <fieldset className="consentimento">
                <legend>Aviso de privacidade e consentimento</legend>
                <p>
                  Esta anamnese reúne <strong>dados pessoais sensíveis de uma
                  criança</strong> (como histórico de saúde e diagnósticos).
                  Eles serão usados pela equipe do Núcleo Priorizar somente para
                  avaliação e acompanhamento clínico, ficarão com acesso restrito
                  aos profissionais autorizados e não serão vendidos nem usados
                  para publicidade.
                </p>
                <p>
                  Você pode pedir acesso, correção ou exclusão a qualquer momento
                  pelo canal do encarregado (DPO) descrito na{" "}
                  <a href={URL_POLITICA} target="_blank" rel="noopener noreferrer">
                    Política de Privacidade
                  </a>
                  .
                </p>
                <label className="consentimento-check">
                  <input
                    type="checkbox"
                    checked={consentimento}
                    onChange={(e) => {
                      setErro("");
                      setConsentimento(e.target.checked);
                    }}
                  />
                  <span>
                    Declaro ser o responsável legal pela criança e consinto, de
                    forma específica e destacada, com o tratamento dos dados de
                    saúde informados para essa finalidade.
                  </span>
                </label>
              </fieldset>

              <div className="botoes-finalizar">
                <button type="submit" className="botao" disabled={enviando}>
                  {enviando ? "Enviando..." : "Enviar anamnese"}
                </button>

                <button type="button" className="botao" onClick={baixarResumo}>
                  Baixar PDF
                </button>

                <button
                  type="button"
                  className="botao-voltar"
                  onClick={baixarWord}
                >
                  Baixar Word (.doc)
                </button>
              </div>
            </section>
          )}

          <div className="navegacao-etapas">
            <button
              type="button"
              className="botao-voltar"
              onClick={etapaAnterior}
              disabled={etapaAtual === 0}
            >
              Voltar
            </button>

            {etapaAtual < totalEtapas - 1 && (
              <button type="button" className="botao" onClick={proximaEtapa}>
                Próxima etapa
              </button>
            )}
          </div>
        </form>

        <SummaryCard
          form={{
            nome: form.nomeCrianca,
            idade: form.idadeAtual,
            objetivo: form.queixaFinal || form.diagnosticosConfirmados,
            consentimento: enviado,
          }}
          progress={progress}
          onReset={limparFormulario}
          onDownload={baixarResumo}
        />
      </main>
    </div>
  );
}

export default Anamnese;