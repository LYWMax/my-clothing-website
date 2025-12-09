'use server';

import { chatbotAnswersCustomerInquiries } from '@/ai/flows/chatbot-answers-customer-inquiries';

export async function getChatbotAnswer(query: string): Promise<string> {
  try {
    const result = await chatbotAnswersCustomerInquiries({ query });
    return result.answer;
  } catch (error) {
    console.error('Error getting chatbot answer:', error);
    return 'Sorry, I am having trouble connecting to my knowledge base. Please try again later.';
  }
}
