export const formSections = [
  {
    title: "Identificação",
    subtitle: "Dados da Criança e da Família",
    description: "Informações básicas necessárias para o registro do prontuário.",
    badge: "Seção 1",
    blocks: [
      {
        title: "Dados da criança",
        fields: [
          {
            name: "nomeCrianca",
            label: "Nome completo da criança",
            type: "text",
            required: true,
            placeholder: "Nome completo",
          },
          {
            name: "dataNascimento",
            label: "Data de nascimento",
            type: "date",
            required: true,
          },
          {
            name: "idadeAtual",
            label: "Idade atual",
            type: "text",
            placeholder: "Ex: 5 anos e 3 meses",
          },
          {
            name: "sexoBiologico",
            label: "Sexo biológico",
            type: "radio",
            options: ["Masculino", "Feminino"],
          },
          {
            name: "identidadeGenero",
            label: "Identidade de gênero, se aplicável",
            type: "text",
            placeholder: "Conforme indicado pelo responsável",
          },
          {
            name: "cidadeEstado",
            label: "Cidade / Estado",
            type: "text",
            placeholder: "Ex: São Paulo - SP",
          },
          {
            name: "escola",
            label: "Escola / Instituição que frequenta",
            type: "text",
            placeholder: "Nome da escola",
          },
          {
            name: "anoSerie",
            label: "Ano / Série escolar",
            type: "text",
            placeholder: "Ex: 1º ano EF",
          },
          {
            name: "diagnosticosConfirmados",
            label: "Diagnóstico(s) já confirmado(s)",
            type: "text",
            placeholder: "Ex: TEA nível 2, TDAH...",
          },
          {
            name: "cidDsm",
            label: "CID / DSM",
            type: "text",
            placeholder: "Ex: F84.0, F90.0",
          },
        ],
      },
      {
        title: "Responsável principal",
        fields: [
          {
            name: "nomeResponsavel",
            label: "Nome do responsável",
            type: "text",
            required: true,
            placeholder: "Nome completo",
          },
          {
            name: "parentesco",
            label: "Parentesco",
            type: "select",
            options: ["Mãe", "Pai", "Avó/Avô", "Tio/Tia", "Responsável legal", "Outro"],
          },
          {
            name: "telefoneResponsavel",
            label: "Telefone",
            type: "text",
            placeholder: "(11) 99999-9999",
          },
          {
            name: "emailResponsavel",
            label: "E-mail para envio da anamnese",
            type: "email",
            required: true,
            placeholder: "email@exemplo.com",
          },
          {
            name: "estadoCivilPais",
            label: "Estado civil dos pais",
            type: "select",
            options: ["Casados", "Separados", "Divorciados", "União estável", "Solteiro(a)", "Outro"],
          },
          {
            name: "escolaridadeResponsavel",
            label: "Escolaridade do responsável",
            type: "select",
            options: ["Fundamental", "Médio", "Técnico", "Superior", "Pós-graduação"],
          },
        ],
      },
      {
        title: "Composição familiar",
        fields: [
          {
            name: "pessoasResidencia",
            label: "Quantas pessoas residem com a criança",
            type: "text",
            placeholder: "Ex: 4",
          },
          {
            name: "temIrmaos",
            label: "Há irmãos?",
            type: "radio",
            options: ["Sim", "Não"],
          },
          {
            name: "dinamicaFamiliar",
            label: "Descreva brevemente a dinâmica familiar",
            type: "textarea",
            placeholder: "Ex: Criança vive com mãe, pai e uma irmã mais velha...",
          },
          {
            name: "historicoFamiliar",
            label: "Há histórico familiar de transtornos do neurodesenvolvimento?",
            type: "textarea",
            placeholder: "Ex: Tio paterno com diagnóstico de TEA...",
          },
        ],
      },
      {
        title: "Profissional responsável",
        fields: [
          {
            name: "nomeProfissional",
            label: "Nome do profissional",
            type: "text",
            placeholder: "Nome completo",
          },
          {
            name: "areaEspecialidade",
            label: "Área / Especialidade",
            type: "text",
            placeholder: "Ex: Psicóloga Clínica / ABA",
          },
          {
            name: "registroProfissional",
            label: "Registro profissional",
            type: "text",
            placeholder: "Ex: CRP 06/123456",
          },
          {
            name: "dataPreenchimento",
            label: "Data de preenchimento",
            type: "date",
          },
        ],
      },
    ],
  },
  {
    title: "Histórico Clínico",
    subtitle: "Saúde, Gestação e Primeiros Anos",
    description: "Histórico médico e informações importantes sobre o início da vida.",
    badge: "Seção 2",
    blocks: [
      {
        title: "Gestação",
        fields: [
          {
            name: "tipoGestacao",
            label: "Tipo de gestação",
            type: "radio",
            options: ["Planejada", "Não planejada"],
          },
          {
            name: "acompanhamentoPreNatal",
            label: "Acompanhamento pré-natal",
            type: "radio",
            options: ["Sim", "Não", "Parcial"],
          },
          {
            name: "intercorrenciasGestacao",
            label: "Intercorrências durante a gestação",
            type: "textarea",
            placeholder: "Ex: hipertensão, infecções, uso de medicamentos...",
          },
          {
            name: "usoSubstanciasGestacao",
            label: "Uso de substâncias durante a gestação",
            type: "checkbox",
            options: ["Álcool", "Tabaco", "Medicamentos", "Nenhuma"],
          },
          {
            name: "semanasGestacao",
            label: "Semanas de gestação ao nascer",
            type: "text",
            placeholder: "Ex: 38",
          },
        ],
      },
      {
        title: "Parto / neonatal",
        fields: [
          {
            name: "tipoParto",
            label: "Tipo de parto",
            type: "radio",
            options: ["Normal", "Cesárea", "Fórceps"],
          },
          {
            name: "intercorrenciasParto",
            label: "Intercorrências no parto",
            type: "checkbox",
            options: ["Sofrimento fetal", "Circular de cordão", "Anóxia", "Nenhuma"],
          },
          {
            name: "pesoNascer",
            label: "Peso ao nascer",
            type: "text",
            placeholder: "Ex: 3.200",
          },
          {
            name: "comprimentoNascer",
            label: "Comprimento ao nascer",
            type: "text",
            placeholder: "Ex: 50",
          },
          {
            name: "apgar",
            label: "APGAR",
            type: "text",
            placeholder: "Ex: 8/9",
          },
          {
            name: "necessitouUTI",
            label: "Necessitou de UTI neonatal?",
            type: "radio",
            options: ["Sim", "Não"],
          },
          {
            name: "amamentacao",
            label: "Amamentação",
            type: "radio",
            options: ["Aleitamento materno exclusivo", "Misto", "Fórmula", "Não amamentou"],
          },
        ],
      },
      {
        title: "Saúde geral",
        fields: [
          {
            name: "doencasDiagnosticos",
            label: "Doenças, diagnósticos médicos ou condições neurológicas",
            type: "textarea",
            placeholder: "Ex: epilepsia, hipotonia, síndrome, cardiopatia congênita...",
          },
          {
            name: "medicamentosUso",
            label: "Medicamentos em uso",
            type: "textarea",
            placeholder: "Nome, dosagem, frequência e motivo de uso...",
          },
          {
            name: "alergiasRelevantes",
            label: "Alergias conhecidas",
            type: "textarea",
            placeholder: "Alimentares, medicamentosas, ambientais...",
          },
          {
            name: "cartaoVacinacao",
            label: "Cartão vacinal atualizado?",
            type: "radio",
            options: ["Sim", "Não", "Parcial"],
          },
          {
            name: "examesRecentes",
            label: "Últimos exames realizados",
            type: "text",
            placeholder: "Ex: EEG 2024, audiometria 2023...",
          },
          {
            name: "hospitalizacoes",
            label: "Histórico de hospitalizações ou cirurgias",
            type: "textarea",
            placeholder: "Descreva internações, cirurgias e procedimentos...",
          },
        ],
      },
    ],
  },
  {
    title: "Desenvolvimento",
    subtitle: "Desenvolvimento Global e Comportamento",
    description: "Marcos do desenvolvimento neuropsicomotor, comportamento e aspectos emocionais.",
    badge: "Seção 3",
    blocks: [
      {
        title: "Marcos do desenvolvimento motor",
        fields: [
          { name: "sustentouCabeca", label: "Sustentou a cabeça", type: "text", placeholder: "Ex: 3 meses" },
          { name: "sentouSemApoio", label: "Sentou sem apoio", type: "text", placeholder: "Ex: 7 meses" },
          { name: "engatinhou", label: "Engatinhou", type: "text", placeholder: "Ex: 9 meses" },
          { name: "ficouPeComApoio", label: "Ficou em pé com apoio", type: "text", placeholder: "Ex: 10 meses" },
          { name: "andouSozinho", label: "Andou sozinho", type: "text", placeholder: "Ex: 13 meses" },
          { name: "subiuEscadas", label: "Subiu/desceu escadas", type: "text", placeholder: "Ex: 24 meses" },
        ],
      },
      {
        title: "Marcos da linguagem",
        fields: [
          { name: "primeirasVocalizacoes", label: "Primeiras vocalizações", type: "text", placeholder: "Ex: 2 meses" },
          { name: "balbucio", label: "Balbucio", type: "text", placeholder: "Ex: 6 meses" },
          { name: "primeirasPalavras", label: "Primeiras palavras", type: "text", placeholder: "Ex: 12 meses" },
          { name: "juncaoPalavras", label: "Junção de 2 palavras", type: "text", placeholder: "Ex: 24 meses" },
          { name: "frasesCompletas", label: "Frases completas", type: "text", placeholder: "Ex: 36 meses" },
          { name: "houveRegressaoLinguagem", label: "Houve regressão da linguagem?", type: "radio", options: ["Sim", "Não"] },
        ],
      },
      {
        title: "Comportamentos sociais e comunicação",
        fields: [
          {
            name: "comportamentosSociais",
            label: "Avalie a frequência dos comportamentos abaixo",
            type: "scale",
            options: [
              "Mantém contato visual",
              "Responde ao próprio nome",
              "Sorri de forma responsiva",
              "Aponta para mostrar ou pedir algo",
              "Imita ações ou sons",
              "Busca compartilhar interesse com outras pessoas",
              "Entende emoções dos outros",
              "Brinca com outras crianças",
              "Jogo simbólico / faz de conta",
              "Inicia interação social espontaneamente",
            ],
          },
        ],
      },
      {
        title: "Comportamentos repetitivos e restritos",
        fields: [
          {
            name: "comportamentosRepetitivos",
            label: "Quais comportamentos repetitivos apresenta?",
            type: "checkbox",
            options: [
              "Balanço corporal",
              "Flapping",
              "Andar na ponta dos pés",
              "Alinhamento de objetos",
              "Ecolalia",
              "Rituais / rotina rígida",
              "Interesses restritos e intensos",
              "Movimentos autoestimulatórios",
            ],
          },
          {
            name: "descricaoComportamentosRepetitivos",
            label: "Descreva com mais detalhes os comportamentos acima",
            type: "textarea",
            placeholder: "Frequência, contextos, o que acalma ou exacerba...",
          },
        ],
      },
      {
        title: "Aspectos emocionais e comportamentais",
        fields: [
          {
            name: "mudancasRotina",
            label: "Como a criança reage a mudanças de rotina?",
            type: "textarea",
            placeholder: "Ex: chora intensamente, fica agressiva, aceita bem...",
          },
          {
            name: "comportamentosDesafiadores",
            label: "Comportamentos desafiadores",
            type: "textarea",
            placeholder: "Descreva frequência, intensidade e gatilhos...",
          },
          {
            name: "medosFobias",
            label: "Medos e fobias",
            type: "textarea",
            placeholder: "Ex: medo de banhos altos, lugares novos...",
          },
          {
            name: "sonoRotina",
            label: "Sono — descreva a rotina e dificuldades",
            type: "textarea",
            placeholder: "Horário de dormir, número de horas, acorda durante a noite...",
          },
          {
            name: "controleEsfincteriano",
            label: "Controle esfincteriano",
            type: "radio",
            options: ["Controle diurno e noturno", "Apenas diurno", "Em processo", "Sem controle"],
          },
        ],
      },
    ],
  },
  {
    title: "Linguagem / Fono",
    subtitle: "Linguagem, Fala e Comunicação",
    description: "Avaliação detalhada das habilidades comunicativas verbais e não verbais.",
    badge: "Seção 4",
    blocks: [
      {
        title: "Comunicação atual",
        fields: [
          {
            name: "comunicacaoPrincipal",
            label: "Como a criança se comunica principalmente?",
            type: "checkbox",
            options: ["Fala oral", "Gestos / apontar", "PECS / figuras", "CAA", "Libras", "Choro / expressão corporal"],
          },
          {
            name: "inteligibilidadeFala",
            label: "Inteligibilidade da fala",
            type: "select",
            options: ["Boa", "Regular", "Baixa", "Não se aplica"],
          },
          {
            name: "vocabularioExpressivo",
            label: "Vocabulário expressivo estimado",
            type: "select",
            options: ["Ausente", "Poucas palavras", "Frases simples", "Frases complexas"],
          },
          {
            name: "apresentaEcolalia",
            label: "Apresenta ecolalia?",
            type: "radio",
            options: ["Não", "Ecolalia imediata", "Ecolalia tardia", "Ambas"],
          },
          {
            name: "compreensaoVerbal",
            label: "Compreensão verbal",
            type: "checkbox",
            options: [
              "Segue instruções simples",
              "Segue instruções de 2 passos",
              "Compreende perguntas sim/não",
              "Compreende linguagem figurada",
              "Compreende narrativas complexas",
            ],
          },
        ],
      },
      {
        title: "Aspectos oromiofuncionais",
        fields: [
          {
            name: "dificuldadesMastigacao",
            label: "Dificuldades de mastigação / deglutição",
            type: "textarea",
            placeholder: "Ex: engole sem mastigar, rejeita alimentos sólidos...",
          },
          {
            name: "respiracaoPredominante",
            label: "Respiração predominante",
            type: "radio",
            options: ["Nasal", "Oral", "Mista"],
          },
          {
            name: "hipersalivacao",
            label: "Hipersalivação?",
            type: "radio",
            options: ["Sim", "Não"],
          },
          {
            name: "transicaoAlimentar",
            label: "Tempo para transição alimentar ou textura?",
            type: "textarea",
            placeholder: "Período, abordagem utilizada, evolução observada...",
          },
          {
            name: "avaliacaoAuditiva",
            label: "Avaliação auditiva já realizada?",
            type: "radio",
            options: ["Sim, normal", "Sim, com alteração", "Não realizada"],
          },
        ],
      },
    ],
  },
  {
    title: "Pedagógico",
    subtitle: "Aprendizagem e Vida Escolar",
    description: "Avaliação das habilidades cognitivas, acadêmicas e de inclusão escolar.",
    badge: "Seção 5",
    blocks: [
      {
        title: "Cognição e aprendizagem",
        fields: [
          {
            name: "nivelCognitivo",
            label: "Como você descreveria o nível cognitivo da criança?",
            type: "radio",
            options: ["Acima da média", "Na média", "Abaixo da média", "Não avaliado"],
          },
          {
            name: "habilidadesAcademicas",
            label: "Habilidades acadêmicas presentes",
            type: "checkbox",
            options: [
              "Reconhece letras",
              "Lê sílabas",
              "Lê palavras",
              "Lê frases/textos",
              "Escreve o nome",
              "Escreve palavras",
              "Reconhece números",
              "Operações matemáticas",
            ],
          },
          {
            name: "avaliacaoPsicoeducacional",
            label: "Avaliação psicoeducacional já realizada?",
            type: "textarea",
            placeholder: "Ex: WISC, Rorschach, avaliação pedagógica formal...",
          },
          {
            name: "dificuldadeAtencao",
            label: "Dificuldades de atenção e concentração",
            type: "textarea",
            placeholder: "Ex: distrai facilmente, não consegue manter atenção por mais de 5 minutos...",
          },
        ],
      },
      {
        title: "Vida escolar e inclusão",
        fields: [
          {
            name: "modalidadeEnsino",
            label: "Modalidade de ensino atual",
            type: "select",
            options: ["Regular", "Especializada", "Integral", "Domiciliar", "Outra"],
          },
          {
            name: "possuiAuxiliarEscolar",
            label: "Possui auxiliar/cuidador na escola?",
            type: "radio",
            options: ["Sim", "Não"],
          },
          {
            name: "adaptacoesCurriculares",
            label: "Adaptações curriculares utilizadas",
            type: "checkbox",
            options: ["PEI", "Plano educacional individualizado", "Provas adaptadas", "Tempo estendido", "Material visual/pictórico", "Nenhuma"],
          },
          {
            name: "relacionamentoEscolar",
            label: "Relacionamento com colegas e professores",
            type: "textarea",
            placeholder: "Como a criança interage no ambiente escolar...",
          },
          {
            name: "queixasProfessores",
            label: "Queixas principais dos professores",
            type: "textarea",
            placeholder: "Dificuldades relatadas pelos educadores...",
          },
        ],
      },
    ],
  },
  {
    title: "Motor / Fisio / TO",
    subtitle: "Motricidade, Sensorial e Terapias",
    description: "Avaliação motora, atividades de vida diária e processamento sensorial.",
    badge: "Seção 6",
    blocks: [
      {
        title: "Motricidade grossa",
        fields: [
          {
            name: "habilidadesGrossas",
            label: "Habilidades motoras grossas presentes",
            type: "checkbox",
            options: ["Corre", "Pula com os dois pés", "Pula num pé só", "Sobe/desce escadas alternando pés", "Anda de bicicleta/triciclo", "Chuta bola", "Arremessa bola"],
          },
          {
            name: "equilibrio",
            label: "Equilíbrio",
            type: "select",
            options: ["Adequado", "Regular", "Alterado"],
          },
          {
            name: "tonusMuscular",
            label: "Tônus muscular",
            type: "select",
            options: ["Normal", "Hipotonia", "Hipertonia", "Misto"],
          },
          {
            name: "dificuldadesMotoras",
            label: "Dificuldades motoras relatadas",
            type: "textarea",
            placeholder: "Ex: cai com frequência, dificuldade em atividades físicas...",
          },
        ],
      },
      {
        title: "Motricidade fina e AVDs",
        fields: [
          {
            name: "motricidadeFina",
            label: "Habilidades de motricidade fina",
            type: "checkbox",
            options: ["Segura lápis/caneta", "Pinta dentro do contorno", "Recorta com tesoura", "Abotoa/desabotoa", "Amarra cadarços", "Encaixe/manipulação de objetos pequenos"],
          },
          {
            name: "avds",
            label: "Atividades de vida diária",
            type: "checkbox",
            options: ["Veste-se sozinha", "Escova os dentes com auxílio", "Toma banho com auxílio", "Come sozinha", "Usa o banheiro sozinha"],
          },
          {
            name: "lateralidade",
            label: "Lateralidade",
            type: "radio",
            options: ["Destro", "Canhoto", "Indefinida"],
          },
        ],
      },
      {
        title: "Processamento sensorial",
        fields: [
          {
            name: "perfilTatil",
            label: "Tato",
            type: "radio",
            options: ["Normal / sem alteração", "Hiper", "Hipo"],
          },
          {
            name: "perfilAuditivo",
            label: "Audição",
            type: "radio",
            options: ["Normal / sem alteração", "Hiper", "Hipo"],
          },
          {
            name: "perfilVisual",
            label: "Visão",
            type: "radio",
            options: ["Normal / sem alteração", "Hiper", "Hipo"],
          },
          {
            name: "perfilOlfatoPaladar",
            label: "Paladar / Olfato",
            type: "radio",
            options: ["Normal / sem alteração", "Hiper", "Hipo"],
          },
          {
            name: "perfilPropriocepcao",
            label: "Propriocepção",
            type: "radio",
            options: ["Normal / sem alteração", "Hiper", "Hipo"],
          },
          {
            name: "perfilVestibular",
            label: "Vestibular",
            type: "radio",
            options: ["Normal / sem alteração", "Hiper", "Hipo"],
          },
        ],
      },
      {
        title: "Terapias em andamento",
        fields: [
          {
            name: "fisioterapia",
            label: "Fisioterapia",
            type: "textarea",
            placeholder: "Objetivos, frequência, tempo de terapia, evolução...",
          },
          {
            name: "terapiaOcupacional",
            label: "Terapia Ocupacional",
            type: "textarea",
            placeholder: "Objetivos, frequência, tempo de terapia, evolução...",
          },
        ],
      },
    ],
  },
  {
    title: "Nutrição",
    subtitle: "Alimentação e Estado Nutricional",
    description: "Hábitos alimentares, seletividade e aspectos nutricionais.",
    badge: "Seção 7",
    blocks: [
      {
        title: "Perfil alimentar",
        fields: [
          { name: "pesoAtual", label: "Peso atual", type: "text", placeholder: "Ex: 25kg" },
          { name: "alturaAtual", label: "Altura atual", type: "text", placeholder: "Ex: 1,10m" },
          { name: "imcPercentil", label: "IMC / Percentil", type: "text", placeholder: "Calculado pelo nutricionista" },
          {
            name: "curvaCrescimento",
            label: "Curva de crescimento",
            type: "select",
            options: ["Adequada", "Abaixo do esperado", "Acima do esperado", "Não avaliada"],
          },
          {
            name: "apetite",
            label: "Apetite",
            type: "radio",
            options: ["Baixo", "Bom", "Aumentado"],
          },
          {
            name: "quantidadeRefeicoes",
            label: "Quantidade de refeições por dia",
            type: "checkbox",
            options: ["1 refeição", "2 refeições", "3 refeições", "4 ou mais refeições"],
          },
          {
            name: "rotinaAlimentar",
            label: "Rotina alimentar",
            type: "textarea",
            placeholder: "Ex: café da manhã, almoço, lanche e jantar...",
          },
          {
            name: "alimentosRecusados",
            label: "Lista de alimentos recusados",
            type: "textarea",
            placeholder: "Ex: frutas, legumes, carnes, arroz, feijão...",
          },
        ],
      },
      {
        title: "Hábitos e dificuldades",
        fields: [
          {
            name: "comportamentosAlimentares",
            label: "Comportamentos durante as refeições",
            type: "checkbox",
            options: [
              "Dificuldade de ficar sentado",
              "Come bem frente à tela",
              "Engasgos com frequência",
              "Come muito rapidamente",
              "Come muito devagar",
              "Recusa experimentar novos alimentos",
              "Come muito pouco",
              "Come em excesso",
            ],
          },
          {
            name: "seletividadeAlimentar",
            label: "Seletividade alimentar / recusa alimentar",
            type: "textarea",
            placeholder: "Ex: rejeita cor, textura, temperatura, cheiro...",
          },
          {
            name: "dietasEspeciais",
            label: "Dietas especiais seguidas",
            type: "checkbox",
            options: ["Sem glúten", "Sem caseína", "Sem corantes/conservantes", "Cetogênica", "Modificada pelo responsável"],
          },
          {
            name: "dificuldadesGastrointestinais",
            label: "Dificuldades gastrointestinais",
            type: "checkbox",
            options: ["Constipação", "Diarreia frequente", "Dores abdominais", "Refluxo", "Nenhuma"],
          },
          {
            name: "observacoesNutricionais",
            label: "Observações nutricionais relevantes",
            type: "textarea",
            placeholder: "Qualquer informação relevante sobre alimentação e estado nutricional...",
          },
        ],
      },
    ],
  },
  {
    title: "Finalizar",
    subtitle: "Revisão e Envio da Anamnese",
    description: "Adicione informações complementares e gere o documento final.",
    badge: "Seção 8",
    blocks: [
      {
        title: "Informações complementares",
        fields: [
          {
            name: "queixaFinal",
            label: "Queixa principal / motivo do atendimento",
            type: "textarea",
            placeholder: "O que motivou a busca pelo serviço ou pelo preenchimento desta anamnese...",
          },
          {
            name: "terapiasAtuaisFinal",
            label: "Terapias e intervenções atuais",
            type: "textarea",
            placeholder: "Liste todas as terapias e profissionais que a criança já atende...",
          },
          {
            name: "objetivosFamilia",
            label: "Objetivos e expectativas da família",
            type: "textarea",
            placeholder: "O que a família espera alcançar com o acompanhamento profissional...",
          },
          {
            name: "pontosFortes",
            label: "Pontos fortes e habilidades da criança",
            type: "textarea",
            placeholder: "O que a criança faz bem, seus interesses especiais, talentos...",
          },
          {
            name: "observacoesFinais",
            label: "Observações gerais / informações adicionais",
            type: "textarea",
            placeholder: "Qualquer outro dado relevante não contemplado nas seções anteriores...",
          },
          {
            name: "emailProfissional",
            label: "E-mail do profissional para constar no documento",
            type: "email",
            placeholder: "profissional@clinica.com.br",
          },
        ],
      },
    ],
  },
];

export const initialForm = formSections.reduce((acc, section) => {
  section.blocks.forEach((block) => {
    block.fields.forEach((field) => {
      acc[field.name] = field.type === "checkbox" ? [] : "";
    });
  });

  return acc;
}, {});