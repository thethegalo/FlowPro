'use server';
/**
 * @fileOverview Fluxo de IA para gerar prompts mestres de alta performance.
 * Revisado para máxima compatibilidade com Lovable, ChatGPT e Midjourney.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateMasterPromptInputSchema = z.object({
  category: z.string().describe('A categoria do prompt (ex: sites, logo, abordagem).'),
  variables: z.record(z.string(), z.string()).describe('As variáveis preenchidas pelo usuário.'),
  complexity: z.enum(['simple', 'advanced']).optional().default('advanced'),
});
export type GenerateMasterPromptInput = z.infer<typeof GenerateMasterPromptInputSchema>;

const GenerateMasterPromptOutputSchema = z.object({
  prompt: z.string().describe('O prompt estruturado e pronto para uso.'),
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
  prompt: `Você é um Engenheiro de Prompts Sênior e Especialista em Marketing Digital de Alta Performance.
Sua tarefa é transformar os dados do usuário em um "Comando Mestre" (Prompt) projetado para extrair o resultado máximo de outra IA.

DADOS DO USUÁRIO:
Categoria: {{{category}}}
Variáveis:
{{#each variables}}
- {{ @key }}: {{ this }}
{{/each}}
Complexidade: {{{complexity}}}

DIRETRIZES DE ENGENHARIA (SE CATEGORIA FOR SITES/LP):
Se a categoria for relacionada a Sites ou Landing Pages, gere um prompt otimizado para Lovable, Bolt ou v0.
1. PERSONA: "Expert Senior Fullstack Developer & Web Designer".
2. REQUISITOS: Uso obrigatório de Next.js, React, Tailwind CSS, Shadcn UI e Lucide Icons.
3. ESTRUTURA: Defina seções claras (Hero, Social Proof, Pain Points, Solution, Pricing, FAQ, CTA).
4. CONVERSÃO: Use o framework AIDA (Atenção, Interesse, Desejo, Ação).
5. ESTILO: Aplique as cores {{{variables.colors}}} e o estilo {{{variables.style}}}.

DIRETRIZES GERAIS:
1. O prompt final deve começar definindo uma PERSONA EXPERT (ex: "Atue como um especialista em...").
2. Estruture em seções: [CONTEXTO E PERSONA], [OBJETIVO PRINCIPAL], [REQUISITOS TÉCNICOS], [ESTILO E TOM], [FORMATO DE SAÍDA].
3. Se complexidade for "advanced", inclua restrições negativas (o que a IA NÃO deve fazer) e frameworks de marketing (PAS, AIDA).
4. O tom do prompt gerado deve ser autoritário, técnico e focado em RESULTADO FINAL.
5. NÃO forneça o conteúdo final do serviço, mas sim o COMANDO MESTRE perfeito para que outra IA o execute.

Gere apenas o texto final do prompt estruturado, pronto para ser colado.`,
});

const generateMasterPromptFlow = ai.defineFlow(
  {
    name: 'generateMasterPromptFlow',
    inputSchema: GenerateMasterPromptInputSchema,
    outputSchema: GenerateMasterPromptOutputSchema,
  },
  async (input) => {
    const { output } = await masterPromptPrompt(input);
    if (!output) throw new Error('Falha ao gerar comando neural.');
    return output;
  }
);
