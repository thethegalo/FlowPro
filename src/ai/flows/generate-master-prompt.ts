'use server';
/**
 * @fileOverview Fluxo de IA para gerar prompts mestres de alta performance.
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
  prompt: `Você é um Engenheiro de Prompts Sênior e Especialista em Marketing Digital.
Sua tarefa é transformar os dados fornecidos pelo usuário em um comando (PROMPT) estruturado de alta performance.

DADOS DO USUÁRIO:
Categoria: {{{category}}}
Variáveis:
{{#each variables}}
- {{ @key }}: {{ this }}
{{/each}}
Complexidade: {{{complexity}}}

DIRETRIZES DE ENGENHARIA (SE CATEGORIA FOR SITES/LP):
Se a categoria for relacionada a Sites ou Landing Pages, gere um prompt otimizado para ferramentas de IA de código (como Lovable, Bolt ou v0).
1. Instrua a IA a agir como um "Expert Web Designer e Desenvolvedor Frontend (React/Tailwind)".
2. Exija o uso de componentes modernos (Shadcn UI, Lucide Icons).
3. Defina a estrutura: Hero Section, Prova Social, Grade de Benefícios, Seção de Preços (AIDA framework) e CTA.
4. Inclua a paleta de cores e estilo visual informados.

DIRETRIZES GERAIS:
1. O prompt final deve instruir a IA a agir como uma PERSONA específica.
2. Deve conter seções claras: [CONTEXTO], [TAREFA], [REQUISITOS TÉCNICOS], [ESTILO VISUAL/TOM], [FORMATO DE SAÍDA].
3. Se a complexidade for "advanced", use frameworks de marketing (AIDA, PAS ou Inversão de Risco).
4. O tom do prompt gerado deve ser autoritário e técnico.
5. NÃO forneça o conteúdo final, mas sim o COMANDO MESTRE para que outra IA execute a tarefa perfeitamente.

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
    if (!output) throw new Error('Falha ao gerar prompt mestre.');
    return output;
  }
);
