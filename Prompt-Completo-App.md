# 📋 Especificação Completa do Sistema: Plataforma para Personal Trainers e Nutricionistas

## 1. Visão Geral e Objetivo
O aplicativo é uma plataforma Full-Stack web responsiva focada na gestão de alunos de consultoria fitness e nutricional. O sistema possui dois ambientes principais: o **Painel do Treinador (Admin)** e o **Portal do Aluno**. O grande diferencial é a profunda integração com a Inteligência Artificial (Google Gemini) para gerar análises de físico ("Shape") através de visão computacional e gerar dietas hiper-personalizadas.

## 2. Stack Tecnológica Base
*   **Frontend:** React.js (com Functional Components e Hooks), TypeScript, Vite.
*   **Estilização:** Tailwind CSS (focado em Dark Mode com detalhes "Neon/Tech").
*   **Banco de Dados & Backend:** Google Firebase (Firestore NoSQL, Firebase Storage para imagens, Firebase Auth).
*   **Inteligência Artificial:** SDK `@google/genai` (Modelo `gemini-1.5-flash` ou `gemini-flash-latest`).
*   **Gráficos e UI:** `recharts` para gráficos de evolução, `lucide-react` para iconografia, animações com `motion/react`.
*   **Exportação:** `jsPDF` para salvar relatórios técnicos e laudos em PDF.
*   **Busca Ágil:** `fuse.js` para sistema de "Auto-complete" nas buscas de alimentos.

## 3. Arquitetura e Módulos Principais

### A. Módulo Administrativo (Visão do Treinador)
O treinador loga através de E-mail/Senha pelo Firebase Auth com acesso total à base de dados.
*   **Gestão de Alunos (`AlunosView.tsx`)**:
    *   Listagem, cadastro e exclusão de alunos. Filtro de buscas na tabela.
    *   Métricas e cálculo automático: Fórmulas de IMC, % de Gordura corporal, Massa Magra, Massa Gorda.
    *   Métodos de Adipometria: Suporte a 3 dobras, 7 dobras, ou Bioimpedância.
    *   Mapeamento de Perimetria Completo (Braços, coxas, panturrilhas, ombro, cintura, etc).
    *   Histórico e Gráficos Crossover de avaliações passadas.
*   **Galeria Fotográfica e IA de Shape**:
    *   Upload e compressão de imagens (Frente, Costas, Perfil) enviadas para o Firebase Storage.
    *   Ferramenta de **Análise IA de Físico**: A IA analisa as imagens da galeria e gera um laudo estruturado identificando Pontos Fortes, Pontos a Melhorar (Pontos Fracos) e Sugestões Analíticas, salvando tudo no banco ou gerando PDF. Com botão de exclusão de laudos de IA para poupar carga de dados.
*   **Gestor de Dieta e Prescrição (`DietasView.tsx`)**:
    *   Cálculo basal automático dos macronutrientes (Proteínas, Carboidratos, Gorduras) baseado na TMB e nos objetivos.
    *   **Dieta por IA**: Agente estruturador que gera dietas automatizadas baseadas em orçamento (baixo custo sem suplementos vs flexível).
    *   Montagem manual de dieta com "Auto-complete": Acesso imediato à tabela TBCA de equivalentes nacionais e macros.
    *   Adição de refeições guiadas, ingestão hídrica, e alertas do horário da água.
    *   Tabela e cards para Suplementação (ex: Whey, Creatina, Manipulados).
    *   Gráficos estilo "Donut" com o atingimento das calorias de cada macro no dia.
*   **Clínica e Feedback**: Bloco de texto para anotações médicas particulares pelo treinador. Visibilidade da caixa de mensagens do aluno com suas respostas.

### B. Módulo do Cliente (Portal do Aluno - `StudentPortalView.tsx`)
Acessado via Código e/ou Senha de Autenticação pelo paciente, apresentando uma UI agradável voltado a mobile e PWA.
*   **Dashboard e Plano Alimentar**: O aluno visualiza o bloco de dietas preescritas, os horários, água e as medições de peso.
*   **Físico e Evolução**:
    *   Anamnese Completa: Questionário preenchido pelo aluno sinalizando rotina, doenças, restrições e comportamento.
    *   Evolução de Gráfico em "AreaChart" que acompanha o Peso corporal através do Tempo com fade de cores interativas.
    *   Card renderizado do Último Laudo da IA indicando para onde ele deve guiar o treino e melhorar as assimetrias.
*   **Suporte / Comunicação**: Chat e painel de Feedback, onde o aluno digita e a requisição cai direto na lousa do treinador para queixas e relato de treinos.

## 4. Estrutura do Banco de Dados (Firestore NoSQL)
A Coleção principal é `students`, onde o `documentId` da raiz já é o UID principal representativo. Os dados da raiz são:
*   `name`, `email`, `age`, `gender`, `objective`, `activityLevel`
*   `accessCode`, `accessPassword`
*   `feedback` (Caixa de mensagens), `observations` (Anotações do Coach)
*   `evaluations` (Array): Matriz de medições de peso, fotos, circumferences, folds.
*   `dietPlan` (Objeto): Objeto unificando refeições, alimentos, calorias totais, e suplementos.
*   `aiAnalyses` (Array): Acervo cronológico de respostas JSON salvas após a API do Gemini inspecionar fotos.
*   `anamnesis` (Objeto): Campos informativos de patologias do paciente.

## 5. Diretrizes Especiais de IA e Implantação
*   **Configuração de Segurança Vercel**: A variável `GEMINI_API_KEY` deve ser mapeada em ambiente.
*   **Fallback Tolerante à Falha**: A aplicação conta com um sistema de recuperação onde, se a hospedagem/Vercel falhar na decodificação do Token, o React lança um `window.prompt` obrigando o Admin a imputar a chave em nuvem. A chave provisória é fixada em `localStorage`, permitindo operação robusta sem falhas de deploy.
*   **Regras de Redirecionamento e Segurança**: Tratamento com bloco defensivo quando a cota API é excedida ou quando o "Firebase Domain" trava chaves não irrestritas de APIs de IA.
*   **Visual Elements**: Componentes focados em cantos arredondados (`rounded-[16px]`), bordas minimalistas neon (`border-dark-border`), layouts bento-grid sem amarras genéricas, sombras (`shadow-xl`) controladas e navegações em multi-abas (`motion.div state tabs`).
