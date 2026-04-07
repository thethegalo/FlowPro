'use server';
/**
 * @fileOverview An AI Sales Mentor Chatbot.
 *
 * - salesMentorChat - A function that handles user questions and provides sales advice.
 * - SalesMentorChatInput - The input type for the salesMentorChat function.
 * - SalesMentorChatOutput - The return type for the salesMentorChat function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SalesMentorChatInputSchema = z.object({
  question: z.string().describe('The sales-related question asked by the user.'),
});
export type SalesMentorChatInput = z.infer<typeof SalesMentorChatInputSchema>;

const SalesMentorChatOutputSchema = z.object({
  advice: z.string().describe('Relevant and practical sales advice from the AI mentor.'),
});
export type SalesMentorChatOutput = z.infer<typeof SalesMentorChatOutputSchema>;

const salesMentorPrompt = ai.definePrompt({
  name: 'salesMentorPrompt',
  input: { schema: SalesMentorChatInputSchema },
  output: { schema: SalesMentorChatOutputSchema },
  prompt: `Você é o Mentor de Vendas Flow, um estrategista de elite especializado em fechamento de contratos e prospecção.
Sua missão é dar orientações PRÁTICAS e acionáveis.

DIRETRIZES:
1. Responda sempre em Português do Brasil.
2. Seja direto, motivador e focado no fechamento (CTA).
3. Se o usuário precisar de um script, forneça o texto pronto para copiar.
4. Evite introduções longas ou teorias abstratas.

Pergunta do usuário: "{{{question}}}"`,
});

const salesMentorChatFlow = ai.defineFlow(
  {
    name: 'salesMentorChatFlow',
    inputSchema: SalesMentorChatInputSchema,
    outputSchema: SalesMentorChatOutputSchema,
  },
  async (input) => {
    const { output } = await salesMentorPrompt(input);
    if (!output) {
      throw new Error('Falha ao processar resposta do mentor.');
    }
    return output;
  }
);

export async function salesMentorChat(
  input: SalesMentorChatInput
): Promise<SalesMentorChatOutput> {
  return salesMentorChatFlow(input);
}
