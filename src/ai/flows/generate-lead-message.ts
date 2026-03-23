'use server';
/**
 * @fileOverview Gera mensagens personalizadas de abordagem para leads.
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
  prompt: `Você é um especialista em prospecção de vendas. 
Gere uma mensagem curta, direta e amigável para abordar o dono de um(a) {{{businessType}}} chamado "{{{businessName}}}" em {{{city}}}.

A mensagem deve:
1. Ser focada em ajudar o negócio a crescer ou resolver um problema (como falta de automação ou marketing).
2. Não parecer spam.
3. Terminar com uma pergunta simples para iniciar a conversa.
4. Usar um tom profissional porém informal (estilo WhatsApp/Direct).`,
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
