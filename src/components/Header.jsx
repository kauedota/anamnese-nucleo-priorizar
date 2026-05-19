import { ClipboardList, CheckCircle2 } from "lucide-react";

function Header() {
  return (
    <header className="topo">
      <div className="topo-conteudo">
        <div>
          <div className="selo">
            <ClipboardList size={18} />
            Formulário de Anamnese Online
          </div>

          <h1>Anamnese completa, simples e profissional.</h1>

          <p>
            Preencha as informações abaixo para registrar os principais dados
            do paciente antes do atendimento.
          </p>
        </div>

        <div className="card-progresso">
          <CheckCircle2 size={36} />
          <strong>Etapa inicial</strong>
          <span>Preencha os dados com atenção.</span>
        </div>
      </div>
    </header>
  );
}

export default Header;