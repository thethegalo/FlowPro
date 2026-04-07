
'use server';
/**
 * @fileOverview IA Sales Mentor Chatbot - Estrategista de Elite.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SalesMentorChatInputSchema = z.object({
  question: z.string().describe('A pergunta do usuário sobre vendas ou prospecção.'),
});
export type SalesMentorChatInput = z.infer<typeof SalesMentorChatInputSchema>;

const SalesMentorChatOutputSchema = z.object({
  advice: z.string().describe('A resposta prática e direta do mentor.'),
});
export type SalesMentorChatOutput = z.infer<typeof SalesMentorChatOutputSchema>;

const salesMentorPrompt = ai.definePrompt({
  name: 'salesMentorPrompt',
  input: { schema: SalesMentorChatInputSchema },
  output: { schema: SalesMentorChatOutputSchema },
  prompt: `Você é o Mentor de Vendas FlowPro, um estrategista de elite em persuasão.
Responda à pergunta do usuário com orientações práticas, diretas e motivadoras.

Regras:
- Idioma: Português do Brasil.
- Foco: Fechamento de vendas e quebra de objeções.
- Tom: Mentor mentor e inspirador.

Pergunta: "{{{question}}}"`,
});

const salesMentorChatFlow = ai.defineFlow(
  {
    name: 'salesMentorChatFlow',
    inputSchema: SalesMentorChatInputSchema,
    outputSchema: SalesMentorChatOutputSchema,
  },
  async (input) => {
    const { output } = await salesMentorPrompt(input);
    if (!output) throw new Error('Erro ao processar resposta neural.');
    return output;
  }
);

export async function salesMentorChat(
  input: SalesMentorChatInput
): Promise<SalesMentorChatOutput> {
  return salesMentorChatFlow(input);
}
