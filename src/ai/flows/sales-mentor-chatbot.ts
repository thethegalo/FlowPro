
'use server';
/**
 * @fileOverview An AI Sales Mentor Chatbot. This file defines a Genkit flow
 * that allows users to ask sales-related questions and receive expert advice.
 *
 * - salesMentorChat - A function that handles user questions and provides sales advice.
 * - SalesMentorChatInput - The input type for the salesMentorChat function.
 * - SalesMentorChatOutput - The return type for the salesMentorChat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

/**
 * Defines the input schema for the sales mentor chatbot, which is a sales-related question.
 */
const SalesMentorChatInputSchema = z.object({
  question: z.string().describe('The sales-related question asked by the user.'),
});
export type SalesMentorChatInput = z.infer<typeof SalesMentorChatInputSchema>;

/**
 * Defines the output schema for the sales mentor chatbot, which is the AI's advice.
 */
const SalesMentorChatOutputSchema = z.object({
  advice: z.string().describe('Relevant and practical sales advice from the AI mentor.'),
});
export type SalesMentorChatOutput = z.infer<typeof SalesMentorChatOutputSchema>;

/**
 * Defines the Genkit prompt for the sales mentor chatbot.
 * It instructs the AI to act as an expert sales mentor and provide actionable advice.
 */
const salesMentorPrompt = ai.definePrompt({
  name: 'salesMentorPrompt',
  input: {schema: SalesMentorChatInputSchema},
  output: {schema: SalesMentorChatOutputSchema},
  prompt: `Você é o Mentor de Vendas Flow, um especialista em fechamento de contratos e prospecção agressiva porém elegante.
Seu objetivo é dar conselhos PRÁTICOS e imediatos. Evite teorias longas.

DIRETRIZES:
1. Responda em Português do Brasil.
2. Use um tom confiante, motivador e direto ao ponto.
3. Se o usuário estiver com dúvida sobre o que dizer, forneça um pequeno script.
4. Foque sempre no fechamento da venda ou no próximo passo (CTA).

Pergunta: "{{{question}}}"

Output format:
{"advice": "Sua orientação prática aqui."}
`,
});

/**
 * Defines the Genkit flow for the sales mentor chatbot.
 * It takes a user's question, processes it using the salesMentorPrompt, and returns sales advice.
 */
const salesMentorChatFlow = ai.defineFlow(
  {
    name: 'salesMentorChatFlow',
    inputSchema: SalesMentorChatInputSchema,
    outputSchema: SalesMentorChatOutputSchema,
  },
  async input => {
    const {output} = await salesMentorPrompt(input);
    if (!output) {
      throw new Error('Failed to get advice from sales mentor.');
    }
    return output;
  }
);

/**
 * Exports a wrapper function that calls the salesMentorChatFlow with the provided input.
 * This function can be called directly from Next.js React components.
 * @param input The sales-related question from the user.
 * @returns A promise that resolves to the sales advice from the AI mentor.
 */
export async function salesMentorChat(
  input: SalesMentorChatInput
):
  Promise<SalesMentorChatOutput> {
  return salesMentorChatFlow(input);
}
