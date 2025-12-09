'use server';
/**
 * @fileOverview An AI agent that suggests relevant products based on customer inquiries and browsing history.
 *
 * - chatbotSuggestsRelevantProducts - A function that handles the product suggestion process.
 * - ChatbotSuggestsRelevantProductsInput - The input type for the chatbotSuggestsRelevantProducts function.
 * - ChatbotSuggestsRelevantProductsOutput - The return type for the chatbotSuggestsRelevantProducts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatbotSuggestsRelevantProductsInputSchema = z.object({
  customerQuery: z.string().describe('The customer query about products.'),
  browsingHistory: z.string().optional().describe('The customer browsing history.'),
  productCatalog: z.string().describe('The product catalog in JSON format.'),
});
export type ChatbotSuggestsRelevantProductsInput = z.infer<typeof ChatbotSuggestsRelevantProductsInputSchema>;

const ChatbotSuggestsRelevantProductsOutputSchema = z.object({
  suggestedProducts: z.string().describe('The list of suggested products based on the customer query and browsing history.'),
});
export type ChatbotSuggestsRelevantProductsOutput = z.infer<typeof ChatbotSuggestsRelevantProductsOutputSchema>;

export async function chatbotSuggestsRelevantProducts(input: ChatbotSuggestsRelevantProductsInput): Promise<ChatbotSuggestsRelevantProductsOutput> {
  return chatbotSuggestsRelevantProductsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatbotSuggestsRelevantProductsPrompt',
  input: {schema: ChatbotSuggestsRelevantProductsInputSchema},
  output: {schema: ChatbotSuggestsRelevantProductsOutputSchema},
  prompt: `You are a chatbot for Maximum Clothing Shop, an online store selling formal attire. Your goal is to suggest relevant products to customers based on their questions and browsing history.

Here is the customer's query:
{{customerQuery}}

Here is the customer's browsing history:
{{browsingHistory}}

Here is the product catalog:
{{productCatalog}}

Based on the customer's query and browsing history, suggest a list of relevant products from the product catalog. Respond with the list of suggested product names.
`,
});

const chatbotSuggestsRelevantProductsFlow = ai.defineFlow(
  {
    name: 'chatbotSuggestsRelevantProductsFlow',
    inputSchema: ChatbotSuggestsRelevantProductsInputSchema,
    outputSchema: ChatbotSuggestsRelevantProductsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
