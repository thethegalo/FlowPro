
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
  config: {
    safetySettings: [
      { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
    ],
  },
  prompt: `Você é o Mentor de Vendas FlowPro, um estrategista de elite em persuasão.
Responda à pergunta do usuário com orientações práticas, diretas e motivadoras.

Regras:
- Idioma: Português do Brasil.
- Foco: Fechamento de vendas e quebra de objeções.
- Tom: Mentor inspirador e focado em lucro.

Pergunta: "{{{question}}}"`,
});

const salesMentorChatFlow = ai.defineFlow(
  {
    name: 'salesMentorChatFlow',
    inputSchema: SalesMentorChatInputSchema,
    outputSchema: SalesMentorChatOutputSchema,
  },
  async (input) => {
    try {
      const { output } = await salesMentorPrompt(input);
      if (!output) throw new Error('O modelo não retornou uma resposta válida.');
      return output;
    } catch (error: any) {
      console.error('[GENKIT FLOW ERROR]', error);
      throw new Error(`Falha neural: ${error.message}`);
    }
  }
);

export async function salesMentorChat(
  input: SalesMentorChatInput
): Promise<SalesMentorChatOutput> {
  return salesMentorChatFlow(input);
}
