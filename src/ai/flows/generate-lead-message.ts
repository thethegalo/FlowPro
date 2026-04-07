'use server';
/**
 * @fileOverview Gera mensagens personalizadas de abordagem para leads.
 * Focado em prospecção natural e conversão rápida.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateLeadMessageInputSchema = z.object({
  businessName: z.string().describe('O nome do negócio do lead.'),
  businessType: z.string().describe('O nicho ou tipo de negócio.'),
  city: z.string().describe('A cidade do lead.'),
});
export type GenerateLeadMessageInput = z.infer<typeof GenerateLeadMessageInputSchema>;

const GenerateLeadMessageOutputSchema = z.object({
  message: z.string().describe('A mensagem de abordagem personalizada.'),
});
export type GenerateLeadMessageOutput = z.infer<typeof GenerateLeadMessageOutputSchema>;

export async function generateLeadMessage(
  input: GenerateLeadMessageInput
): Promise<GenerateLeadMessageOutput> {
  return generateLeadMessageFlow(input);
}

const leadMessagePrompt = ai.definePrompt({
  name: 'leadMessagePrompt',
  input: { schema: GenerateLeadMessageInputSchema },
  output: { schema: GenerateLeadMessageOutputSchema },
  prompt: `Você é um especialista em Cold Outreach via WhatsApp.
Gere uma mensagem de abertura curta e persuasiva para o dono do negócio "{{{businessName}}}" ({{{businessType}}}) em {{{city}}}.

REQUISITOS:
1. Comece com uma saudação amigável e elogie algo sobre ser um negócio de {{{businessType}}}.
2. Identifique uma oportunidade de melhoria (ex: automação de atendimento ou novos clientes).
3. Termine com uma pergunta aberta para gerar conversa.
4. Máximo 300 caracteres.
5. Tom humano, sem parecer spam.

Gere apenas o conteúdo da mensagem.`,
});

const generateLeadMessageFlow = ai.defineFlow(
  {
    name: 'generateLeadMessageFlow',
    inputSchema: GenerateLeadMessageInputSchema,
    outputSchema: GenerateLeadMessageOutputSchema,
  },
  async (input) => {
    const { output } = await leadMessagePrompt(input);
    if (!output) throw new Error('Falha ao gerar mensagem.');
    return output;
  }
);
