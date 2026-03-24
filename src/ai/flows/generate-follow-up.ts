'use server';
/**
 * @fileOverview Gera mensagens de follow-up para leads que não responderam.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateFollowUpInputSchema = z.object({
  businessName: z.string().describe('O nome do negócio do lead.'),
  previousContext: z.string().optional().describe('Contexto da conversa anterior.'),
});
export type GenerateFollowUpInput = z.infer<typeof GenerateFollowUpInputSchema>;

const GenerateFollowUpOutputSchema = z.object({
  message: z.string().describe('A mensagem de follow-up gerada.'),
});
export type GenerateFollowUpOutput = z.infer<typeof GenerateFollowUpOutputSchema>;

export async function generateFollowUp(
  input: GenerateFollowUpInput
): Promise<GenerateFollowUpOutput> {
  return generateFollowUpFlow(input);
}

const followUpPrompt = ai.definePrompt({
  name: 'followUpPrompt',
  input: { schema: GenerateFollowUpInputSchema },
  output: { schema: GenerateFollowUpOutputSchema },
  prompt: `Você é um mestre em follow-up de vendas. 
Gere uma mensagem curta e educada para retomar o contato com "{{{businessName}}}".

DIRETRIZES:
1. TOM: Amigável, sem pressão, curioso.
2. TAMANHO: Máximo 200 caracteres.
3. GANCHO: "Oi, passando para saber se conseguiu ver minha mensagem anterior" ou "Vi que as coisas devem estar corridas por aí, mas não queria deixar essa oportunidade passar".
4. CTA: Uma pergunta simples no final.

Gere apenas o texto da mensagem.`,
});

const generateFollowUpFlow = ai.defineFlow(
  {
    name: 'generateFollowUpFlow',
    inputSchema: GenerateFollowUpInputSchema,
    outputSchema: GenerateFollowUpOutputSchema,
  },
  async (input) => {
    const { output } = await followUpPrompt(input);
    if (!output) throw new Error('Falha ao gerar follow-up.');
    return output;
  }
);
