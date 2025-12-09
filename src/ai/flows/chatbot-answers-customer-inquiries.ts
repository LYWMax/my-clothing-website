'use server';
/**
 * @fileOverview An AI agent to answer customer inquiries about Maximum Clothing Shop.
 *
 * - chatbotAnswersCustomerInquiries - A function that handles customer inquiries.
 * - ChatbotAnswersCustomerInquiriesInput - The input type for the chatbotAnswersCustomerInquiries function.
 * - ChatbotAnswersCustomerInquiriesOutput - The return type for the chatbotAnswersCustomerInquiries function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatbotAnswersCustomerInquiriesInputSchema = z.object({
  query: z.string().describe('The customer query about the clothing shop.'),
});
export type ChatbotAnswersCustomerInquiriesInput = z.infer<typeof ChatbotAnswersCustomerInquiriesInputSchema>;

const ChatbotAnswersCustomerInquiriesOutputSchema = z.object({
  answer: z.string().describe('The answer to the customer query.'),
});
export type ChatbotAnswersCustomerInquiriesOutput = z.infer<typeof ChatbotAnswersCustomerInquiriesOutputSchema>;

export async function chatbotAnswersCustomerInquiries(input: ChatbotAnswersCustomerInquiriesInput): Promise<ChatbotAnswersCustomerInquiriesOutput> {
  return chatbotAnswersCustomerInquiriesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatbotAnswersCustomerInquiriesPrompt',
  input: {schema: ChatbotAnswersCustomerInquiriesInputSchema},
  output: {schema: ChatbotAnswersCustomerInquiriesOutputSchema},
  prompt: `You are a chatbot for Maximum Clothing Shop, a formal attire shop. Use your extensive knowledge to answer customer inquiries about the type of suits, product and quality of suits. Include how to place order, payment method, shipping & delivery, returns and exchanges, account and membership, promotions and gift cards, and customer support.

Answer the following customer query:

{{query}}`,
});

const chatbotAnswersCustomerInquiriesFlow = ai.defineFlow(
  {
    name: 'chatbotAnswersCustomerInquiriesFlow',
    inputSchema: ChatbotAnswersCustomerInquiriesInputSchema,
    outputSchema: ChatbotAnswersCustomerInquiriesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
