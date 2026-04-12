'use server';
/**
 * @fileOverview Fluxo de IA para gerar briefings técnicos e prompts mestres de alta performance.
 * Otimizado para gerar documentação exaustiva e específica por nicho.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateMasterPromptInputSchema = z.object({
  name: z.string().describe('Nome do projeto'),
  niche: z.string().describe('Nicho de atuação'),
  language: z.string().describe('Idioma do briefing'),
  objective: z.string().describe('Objetivo principal'),
  style: z.string().describe('Estilo visual'),
  palette: z.array(z.string()).describe('Cores sugeridas'),
  audience: z.string().describe('Público-alvo'),
  tone: z.string().describe('Tom de voz'),
  sections: z.array(z.string()).describe('Seções da página'),
  differential: z.string().describe('Diferencial competitivo'),
  complexity: z.enum(['simple', 'advanced']).optional().default('advanced'),
});
export type GenerateMasterPromptInput = z.infer<typeof GenerateMasterPromptInputSchema>;

const GenerateMasterPromptOutputSchema = z.object({
  prompt: z.string().describe('O briefing técnico completo e estruturado.'),
  wordCount: z.number().describe('Quantidade de palavras geradas.'),
});
export type GenerateMasterPromptOutput = z.infer<typeof GenerateMasterPromptOutputSchema>;

export async function generateMasterPrompt(
  input: GenerateMasterPromptInput
): Promise<GenerateMasterPromptOutput> {
  return generateMasterPromptFlow(input);
}

const masterPromptPrompt = ai.definePrompt({
  name: 'masterPromptPrompt',
  input: { schema: GenerateMasterPromptInputSchema },
  output: { schema: GenerateMasterPromptOutputSchema },
  prompt: `Você é um Arquiteto de Software Senior e Especialista em UX Design de Alta Performance.
Sua tarefa é transformar os dados do usuário em um "Briefing Técnico Mestre" exaustivo e ultra-detalhado.

DADOS DO PROJETO:
- Nome: {{{name}}}
- Nicho: {{{niche}}}
- Idioma: {{{language}}}
- Objetivo: {{{objective}}}
- Estilo: {{{style}}}
- Cores: {{{palette}}}
- Público: {{{audience}}}
- Tom: {{{tone}}}
- Seções: {{{sections}}}
- Diferencial: {{{differential}}}

REGRAS DE OURO:
1. CONTEÚDO ESPECÍFICO: NUNCA use frases genéricas. Se o nicho for Barbearia, fale sobre agendamento, toalhas quentes e estética vintage. Se for SaaS, fale sobre escalabilidade, API e conversão de trial.
2. EXTENSÃO: O briefing deve ter entre 800 e 1200 palavras. Seja extremamente detalhado em cada seção.
3. ESTRUTURA VISUAL: Use exatamente os separadores ━━━━━━━━━━━━━━ conforme o modelo abaixo.

MODELO DE ESTRUTURA OBRIGATÓRIO:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 PROJETO: [Nome]
📌 TIPO: [Site/App para o Nicho]
🌐 IDIOMA: [Idioma]
🔧 PLATAFORMA: Web Desktop e Mobile
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 VISÃO GERAL DO PROJETO
[Descreva o projeto com profundidade, contexto de mercado e proposta de valor única para o nicho]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📄 DESCRIÇÃO DETALHADA
[Descrição técnica e funcional, arquitetura e fluxos principais de uso específicos]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👥 PÚBLICO-ALVO E PERSONAS
[Dores, necessidades e comportamento digital. Detalhe 2-3 personas do nicho]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚡ FUNCIONALIDADES PRINCIPAIS
[Lista de 6-10 funcionalidades específicas do nicho, com contexto de implementação]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎨 DESIGN SYSTEM E IDENTIDADE VISUAL
Estilo: [Baseado no input]
Cores: [Defina hexadecimais coerentes com o nicho e onde usar cada uma]
Tipografia: [Sugira fontes reais adequadas ao nicho]
Efeitos: [Glassmorphism, micro-interações, etc]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📱 RESPONSIVIDADE
[Diretrizes mobile first para este nicho específico]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔧 REQUISITOS TÉCNICOS
[Stack: Next.js 15, Tailwind, Shadcn UI, Framer Motion, Genkit para IA]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ CHECKLIST DE QUALIDADE
[7-10 itens específicos pro projeto, não genéricos]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 RESULTADO ESPERADO
[Impacto esperado no mercado para este cliente específico]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📌 Gerado pela FlowPro IA — Sua plataforma de criação de sites
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Gere apenas o texto do briefing final, seguindo fielmente este modelo.`,
});

const generateMasterPromptFlow = ai.defineFlow(
  {
    name: 'generateMasterPromptFlow',
    inputSchema: GenerateMasterPromptInputSchema,
    outputSchema: GenerateMasterPromptOutputSchema,
  },
  async (input) => {
    const { output } = await masterPromptPrompt(input);
    if (!output) throw new Error('Falha ao gerar briefing neural.');
    
    // Calcular contagem de palavras simples
    const words = output.prompt.trim().split(/\s+/).length;
    
    return {
      prompt: output.prompt,
      wordCount: words
    };
  }
);
