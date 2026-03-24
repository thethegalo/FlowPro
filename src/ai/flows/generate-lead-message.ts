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
  prompt: `Você é um especialista em prospecção de vendas (Cold Outreach) via WhatsApp e Direct.
Gere uma mensagem de abertura para o dono do negócio "{{{businessName}}}" ({{{businessType}}}) em {{{city}}}.

DIRETRIZES DA MENSAGEM:
1. TOM: Amigável, profissional e "humano". Evite parecer um robô ou script de vendas pronto.
2. ESTRUTURA:
   - Saudação informal (ex: "Opa, tudo bem?").
   - Elogio ou Gancho: Mencione que viu o perfil deles e achou o trabalho de {{{businessType}}} interessante.
   - Dor/Oportunidade: Mencione algo específico que pode ser melhorado (ex: automação de atendimento ou captação de clientes).
   - Pergunta Aberta: Termine com uma pergunta simples para iniciar a conversa (ex: "Vocês já usam algo para automatizar isso por aí?").
3. TAMANHO: Máximo 350 caracteres. Deve caber na tela do celular sem precisar de "ver mais".

Gere apenas o texto da mensagem final.`,
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
