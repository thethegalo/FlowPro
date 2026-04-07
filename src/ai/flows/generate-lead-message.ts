
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
  prompt: `Você é um especialista em Cold Outreach via WhatsApp.
Gere uma mensagem curta e persuasiva para o dono do negócio "{{{businessName}}}" em {{{city}}}.

REGRAS:
1. Comece com uma saudação amigável.
2. Identifique uma oportunidade de melhoria rápida.
3. Máximo 300 caracteres.
4. Linguagem humana, evite parecer robô ou spam.`,
});

const generateLeadMessageFlow = ai.defineFlow(
  {
    name: 'generateLeadMessageFlow',
    inputSchema: GenerateLeadMessageInputSchema,
    outputSchema: GenerateLeadMessageOutputSchema,
  },
  async (input) => {
    const { output } = await leadMessagePrompt(input);
    if (!output) throw new Error('Erro ao gerar mensagem de abordagem.');
    return output;
  }
);

export async function generateLeadMessage(
  input: GenerateLeadMessageInput
): Promise<GenerateLeadMessageOutput> {
  return generateLeadMessageFlow(input);
}
