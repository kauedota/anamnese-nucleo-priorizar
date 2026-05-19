import { CheckCircle2, Download, RotateCcw } from "lucide-react";

function SummaryCard({ form, progress, onReset, onDownload }) {
  return (
    <aside className="resumo-card">
      <div className="resumo-topo">
        <CheckCircle2 size={32} />
        <div>
          <h3>Resumo da anamnese</h3>
          <p>{progress}% preenchido</p>
        </div>
      </div>

      <div className="barra-progresso">
        <div style={{ width: `${progress}%` }}></div>
      </div>

      <div className="resumo-info">
        <div>
          <span>Paciente</span>
          <strong>{form.nome || "Não informado"}</strong>
        </div>

        <div>
          <span>Idade</span>
          <strong>{form.idade || "Não informado"}</strong>
        </div>

        <div>
          <span>Objetivo</span>
          <strong>{form.objetivo || "Não informado"}</strong>
        </div>

        <div>
          <span>Consentimento</span>
          <strong>{form.consentimento ? "Confirmado" : "Pendente"}</strong>
        </div>
      </div>

      <button type="button" className="botao-secundario" onClick={onDownload}>
        <Download size={18} />
        Baixar PDF
      </button>

      <button type="button" className="botao-limpar" onClick={onReset}>
        <RotateCcw size={18} />
        Limpar formulário
      </button>
    </aside>
  );
}

export default SummaryCard;