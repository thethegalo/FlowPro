
'use server';
/**
 * @fileOverview A Genkit flow for generating a personalized sales action plan based on user quiz answers.
 *
 * - generateSalesActionPlan - A function that handles the sales action plan generation process.
 * - GenerateSalesActionPlanInput - The input type for the generateSalesActionPlan function.
 * - GenerateSalesActionPlanOutput - The return type for the generateSalesActionPlan function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateSalesActionPlanInputSchema = z
  .record(z.string(), z.string())
  .describe(
    'A collection of user quiz answers, where keys are question identifiers and values are the user responses.'
  );
export type GenerateSalesActionPlanInput = z.infer<
  typeof GenerateSalesActionPlanInputSchema
>;

const SalesActionPlanStepSchema = z.object({
  title: z.string().describe('The title of the action plan step.'),
  description:
    z.string().describe('A detailed description of the action to be taken for this step.'),
});

const GenerateSalesActionPlanOutputSchema = z.object({
  plan:
    z.array(SalesActionPlanStepSchema).describe('A personalized sales action plan consisting of actionable steps.'),
}).describe('The personalized sales action plan.');
export type GenerateSalesActionPlanOutput = z.infer<
  typeof GenerateSalesActionPlanOutputSchema
>;

export async function generateSalesActionPlan(
  input: GenerateSalesActionPlanInput
): Promise<GenerateSalesActionPlanOutput> {
  return generateSalesActionPlanFlow(input);
}

const salesActionPlanPrompt = ai.definePrompt({
  name: 'salesActionPlanPrompt',
  input: { schema: GenerateSalesActionPlanInputSchema },
  output: { schema: GenerateSalesActionPlanOutputSchema },
  prompt: `Você é um Mentor de Elite do FlowPro. Com base nas respostas do quiz do usuário, gere um plano de ação de vendas personalizado e ultra-prático.
O plano deve focar em como o usuário pode fazer sua PRIMEIRA VENDA em 7 dias usando o tempo e ferramentas que ele possui.

Respostas do Quiz:
{{#each this as |value key|}}
- {{key}}: {{value}}
{{/each}}

REGRAS:
1. Gere um array de 3 passos principais (Fase de Preparação, Fase de Ataque, Fase de Escala).
2. O tom deve ser encorajador e focado em execução.
3. Idioma: Português do Brasil.
`,
});

const generateSalesActionPlanFlow = ai.defineFlow(
  {
    name: 'generateSalesActionPlanFlow',
    inputSchema: GenerateSalesActionPlanInputSchema,
    outputSchema: GenerateSalesActionPlanOutputSchema,
  },
  async (input) => {
    const { output } = await salesActionPlanPrompt(input);
    if (!output) throw new Error("Falha ao gerar plano IA.");
    return output;
  }
);
