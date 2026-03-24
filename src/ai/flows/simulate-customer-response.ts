'use server';
/**
 * @fileOverview Fluxo de IA para simular a resposta de um cliente.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SimulateResponseInputSchema = z.object({
  userMessage: z.string().describe('A mensagem que o usuário enviou para o cliente.'),
  personality: z.enum(['skeptical', 'busy', 'interested', 'rude']).optional().default('skeptical'),
});
export type SimulateResponseInput = z.infer<typeof SimulateResponseInputSchema>;

const SimulateResponseOutputSchema = z.object({
  customerResponse: z.string().describe('A resposta simulada do cliente.'),
  analysis: z.string().describe('Uma breve análise do que o usuário pode melhorar.'),
});
export type SimulateResponseOutput = z.infer<typeof SimulateResponseOutputSchema>;

export async function simulateCustomerResponse(
  input: SimulateResponseInput
): Promise<SimulateResponseOutput> {
  return simulateCustomerFlow(input);
}

const simulatePrompt = ai.definePrompt({
  name: 'simulateCustomerPrompt',
  input: { schema: SimulateResponseInputSchema },
  output: { schema: SimulateResponseOutputSchema },
  prompt: `Você é um dono de negócio local recebendo uma abordagem de vendas.
Sua personalidade hoje é: {{{personality}}} (skeptical = desconfiado, busy = sem tempo, interested = curioso, rude = grosseiro).

O usuário te enviou esta mensagem: "{{{userMessage}}}"

REGRAS:
1. Responda como o cliente responderia no WhatsApp (curto, direto, as vezes com erros de português propositais para parecer real).
2. Forneça uma análise separada sobre a abordagem do usuário (se foi agressiva demais, se faltou clareza, etc).

Idioma: Português do Brasil.`,
});

const simulateCustomerFlow = ai.defineFlow(
  {
    name: 'simulateCustomerFlow',
    inputSchema: SimulateResponseInputSchema,
    outputSchema: SimulateResponseOutputSchema,
  },
  async (input) => {
    const { output } = await simulatePrompt(input);
    if (!output) throw new Error('Falha na simulação neural.');
    return output;
  }
);
