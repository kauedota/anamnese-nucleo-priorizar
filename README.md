# Anamnese Infantil Integrada - Núcleo Priorizar

![React](https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react&logoColor=000)
![Vite](https://img.shields.io/badge/Vite-Build-646CFF?style=for-the-badge&logo=vite&logoColor=fff)
![JavaScript](https://img.shields.io/badge/JavaScript-Language-F7DF1E?style=for-the-badge&logo=javascript&logoColor=000)
![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase&logoColor=fff)
![Vercel](https://img.shields.io/badge/Vercel-Deploy-000000?style=for-the-badge&logo=vercel&logoColor=fff)
![Status](https://img.shields.io/badge/Status-Em%20Funcionamento-009B4E?style=for-the-badge)

Sistema web desenvolvido para coleta, organização e gerenciamento de anamneses infantis em contexto clínico multidisciplinar.

O projeto permite que responsáveis preencham uma anamnese online e que a equipe autorizada da clínica visualize as respostas em um painel administrativo privado.

---

## Visão Geral

Este sistema foi criado para facilitar o processo de anamnese infantil, substituindo formulários manuais por uma solução digital, organizada e responsiva.

A anamnese é dividida em etapas para tornar o preenchimento mais simples para os responsáveis e mais prático para a equipe clínica analisar as informações posteriormente.

O sistema contempla dados de identificação, histórico clínico, desenvolvimento, linguagem, aprendizagem, motricidade, alimentação e informações complementares.

---

## Funcionalidades

### Área pública para responsáveis

- Formulário online de anamnese infantil
- Formulário dividido em 8 etapas
- Validação de campos obrigatórios
- Navegação por seções
- Barra de progresso por etapa
- Layout responsivo para celular, tablet e computador
- Envio das respostas para banco de dados
- Download da anamnese em PDF
- Download da anamnese em Word `.doc`
- Identidade visual personalizada com logo da clínica

### Painel administrativo da clínica

- Acesso privado com login e senha
- Listagem das anamneses recebidas
- Busca por nome da criança, responsável ou e-mail
- Visualização completa dos dados preenchidos
- Download da anamnese em PDF
- Download da anamnese em Word `.doc`
- Exclusão de anamneses pelo administrador
- Proteção de acesso para usuários autenticados

---

## Seções da Anamnese

O formulário é dividido nas seguintes etapas:

1. Identificação
2. Histórico Clínico
3. Desenvolvimento
4. Linguagem / Fono
5. Pedagógico
6. Motor / Fisio / TO
7. Nutrição
8. Finalização

---

## Tecnologias Utilizadas

- React
- Vite
- JavaScript
- CSS
- Supabase
- Vercel
- jsPDF
- Lucide React
- Git
- GitHub

---

## Estrutura do Projeto

```bash
src/
├── components/
│   ├── Header.jsx
│   ├── InputField.jsx
│   ├── SectionTitle.jsx
│   └── SummaryCard.jsx
├── data/
│   └── formFields.js
├── lib/
│   └── supabase.js
├── pages/
│   ├── Admin.jsx
│   └── Anamnese.jsx
├── App.jsx
├── index.css
└── main.jsx
```

---

## Rotas do Sistema

### Formulário público

```text
/
```

Rota utilizada pelos responsáveis para preenchimento da anamnese.

### Painel administrativo

```text
/admin
```

Rota privada utilizada pela equipe da clínica para visualizar, buscar, baixar e excluir anamneses recebidas.

---

## Banco de Dados

O sistema utiliza o Supabase para banco de dados e autenticação.

Tabela principal:

```text
anamneses
```

Campos principais:

```text
id
nome_crianca
nome_responsavel
email_responsavel
telefone_responsavel
dados_completos
status
created_at
```

O campo `dados_completos` armazena todas as respostas da anamnese em formato JSON.

---

## Segurança

O painel administrativo possui autenticação via Supabase Auth.

As regras de segurança foram configuradas com Row Level Security, permitindo:

- envio público de anamneses pelo formulário;
- leitura apenas para usuários autenticados;
- exclusão apenas para usuários autenticados.

As variáveis sensíveis do projeto não são versionadas no repositório.

O arquivo `.env.local` deve permanecer fora do GitHub.

---

## Variáveis de Ambiente

Para executar o projeto localmente, é necessário criar um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
```

Observação: nunca utilizar a Secret Key ou Service Role Key no frontend.

---

## Como Executar Localmente

Clone o repositório:

```bash
git clone URL_DO_REPOSITORIO
```

Acesse a pasta do projeto:

```bash
cd anamnese-nucleo-priorizar
```

Instale as dependências:

```bash
npm install
```

Crie o arquivo `.env.local` com as variáveis do Supabase:

```env
VITE_SUPABASE_URL=SUA_URL_DO_SUPABASE
VITE_SUPABASE_PUBLISHABLE_KEY=SUA_PUBLISHABLE_KEY_DO_SUPABASE
```

Execute o projeto:

```bash
npm run dev
```

Acesse no navegador:

```text
http://localhost:5173
```

Painel administrativo local:

```text
http://localhost:5173/admin
```

---

## Deploy

O projeto está configurado para deploy na Vercel.

Configurações utilizadas:

```text
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

As variáveis de ambiente também precisam ser cadastradas na Vercel em:

```text
Project Settings > Environment Variables
```

Variáveis necessárias:

```env
VITE_SUPABASE_URL
VITE_SUPABASE_PUBLISHABLE_KEY
```

Para permitir acesso direto à rota `/admin`, foi criado o arquivo `vercel.json`:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

## Comandos Git Utilizados

Adicionar alterações:

```bash
git add .
```

Criar commit:

```bash
git commit -m "Mensagem do commit"
```

Enviar para o GitHub:

```bash
git push
```

---

## Objetivo do Projeto

O objetivo do projeto é oferecer uma solução prática, digital e organizada para clínicas que realizam atendimentos infantis e precisam coletar informações detalhadas antes da avaliação ou acompanhamento multidisciplinar.

O sistema contribui para:

- reduzir o uso de formulários em papel;
- facilitar o preenchimento pelos responsáveis;
- centralizar informações clínicas;
- melhorar a organização dos dados;
- agilizar a análise pela equipe profissional;
- gerar documentos digitais em PDF e Word;
- manter um histórico de anamneses recebidas.

---

## Status do Projeto

Projeto em funcionamento com:

- formulário público online;
- integração com Supabase;
- painel administrativo privado;
- autenticação;
- listagem de anamneses;
- busca por registros;
- download em PDF;
- download em Word `.doc`;
- exclusão de registros;
- deploy online na Vercel.

---

## Melhorias Futuras

Possíveis melhorias para próximas versões:

- filtro por status da anamnese;
- alteração de status: recebida, em análise e finalizada;
- melhoria visual do PDF com cabeçalho e logo;
- envio automático de e-mail para a clínica;
- termo de consentimento LGPD mais detalhado;
- múltiplos usuários administrativos;
- painel com estatísticas de preenchimento;
- histórico de alterações;
- exportação geral das anamneses;
- backup automático;
- integração com WhatsApp ou e-mail.

---

## Observações Importantes

Este projeto lida com dados sensíveis relacionados à saúde, desenvolvimento infantil e informações familiares.

Por isso, recomenda-se:

- manter o repositório privado;
- não versionar arquivos `.env`;
- não compartilhar credenciais de acesso;
- não expor chaves secretas;
- não inserir dados reais de pacientes em prints públicos;
- utilizar apenas contas autorizadas no painel administrativo.

---

## Autor

Desenvolvido por Kauê Dota.

LinkedIn: https://www.linkedin.com/in/kaue-dota-ba105124b/  
GitHub: https://github.com/kauedota