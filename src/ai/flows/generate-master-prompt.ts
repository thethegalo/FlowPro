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
Sua tarefa é transformar os dados fornecidos pelo usuário em um comando (PROMPT) estruturado que ele usará em outras IAs (ChatGPT, Claude, Gemini).

DADOS DO USUÁRIO:
Categoria: {{{category}}}
Variáveis:
{{#each variables}}
- {{ @key }}: {{ this }}
{{/each}}
Complexidade: {{{complexity}}}

DIRETRIZES PARA O PROMPT GERADO:
1. O prompt final deve instruir a IA a agir como uma PERSONA específica.
2. Deve conter seções claras: [CONTEXTO], [TAREFA], [REQUISITOS], [FORMATO DE SAÍDA].
3. Se a complexidade for "advanced", inclua restrições negativas (o que evitar) e use frameworks de marketing (AIDA, PAS ou Inversão de Risco).
4. O tom do prompt gerado deve ser autoritário e técnico.
5. NÃO forneça a resposta para a tarefa, mas sim o COMANDO para que outra IA resolva a tarefa.

Gere apenas o texto final do prompt estruturado.`,
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
