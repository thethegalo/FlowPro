
'use server';
/**
 * @fileOverview IA para geração de scripts de abordagem fria (Cold Outreach).
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateLeadMessageInputSchema = z.object({
  businessName: z.string().describe('Nome da empresa do lead.'),
  businessType: z.string().describe('Nicho de atuação.'),
  city: z.string().describe('Cidade do lead.'),
});
export type GenerateLeadMessageInput = z.infer<typeof GenerateLeadMessageInputSchema>;

const GenerateLeadMessageOutputSchema = z.object({
  message: z.string().describe('A mensagem de abordagem gerada.'),
});
export type GenerateLeadMessageOutput = z.infer<typeof GenerateLeadMessageOutputSchema>;

const leadMessagePrompt = ai.definePrompt({
  name: 'leadMessagePrompt',
  input: { schema: GenerateLeadMessageInputSchema },
  output: { schema: GenerateLeadMessageOutputSchema },
  config: {
    safetySettings: [
      { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
    ],
  },
  prompt: `Você é um especialista em Cold Outreach via WhatsApp.
Gere uma mensagem curta e persuasiva para o dono do negócio "{{{businessName}}}" que atua como {{{businessType}}} em {{{city}}}.

Regras de Ouro:
1. Saudação amigável.
2. Identifique uma oportunidade clara de melhoria.
3. Máximo 300 caracteres.
4. Linguagem humana e natural.

Gere o script agora.`,
});

const generateLeadMessageFlow = ai.defineFlow(
  {
    name: 'generateLeadMessageFlow',
    inputSchema: GenerateLeadMessageInputSchema,
    outputSchema: GenerateLeadMessageOutputSchema,
  },
  async (input) => {
    try {
      const { output } = await leadMessagePrompt(input);
      if (!output) throw new Error('Erro ao gerar mensagem neural.');
      return output;
    } catch (error: any) {
      console.error('[GENKIT FLOW ERROR]', error);
      throw new Error(`Falha na geração: ${error.message}`);
    }
  }
);

export async function generateLeadMessage(
  input: GenerateLeadMessageInput
): Promise<GenerateLeadMessageOutput> {
  return generateLeadMessageFlow(input);
}
