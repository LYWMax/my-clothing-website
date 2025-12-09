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
  prompt: `You are a chatbot for The Maximum Clothing Shop. Use the following frequently asked questions to answer customer inquiries.

About the Shop

What is The Maximum Clothing Shop?
The Maximum Clothing Shop is an online retail store offering trendy and affordable clothing for men, women, and youths.

Where is The Maximum Clothing Shop based?
We operate online but ship locally and internationally depending on your location.

Do you have physical outlets?
Currently, we operate fully online, but updates on physical stores will be announced on our website and social pages.

Products & Quality

What types of clothing do you sell?
We offer tops, bottoms, dresses, outerwear, activewear, accessories, and seasonal collections.

Are your products authentic?
Yes — all items are sourced from verified suppliers and quality-checked before shipping.

Do your products match the photos shown?
Yes, all product photos are professionally taken to accurately represent the items.

How do I find my correct size?
Each product includes a detailed size chart to help you choose the right fit.

Do you restock sold-out items?
Some items are restocked depending on supplier availability. You may join the waitlist or enable notifications.

Do you offer plus-size clothing?
Yes — selected items are available in extended sizes.

Ordering

How do I place an order?
Simply add items to your cart and proceed to checkout to complete your purchase.

Can I edit my order after placing it?
Changes can be made within a short timeframe — contact our support immediately.

Can I cancel my order?
Orders can be cancelled before they are processed. Once shipped, cancellations are not possible.

Is there a minimum order amount?
No — you may purchase any quantity as long as the item is in stock.

Payments

What payment methods do you accept?
We accept credit/debit cards, PayNow/PayLah (if applicable), PayPal, and major digital wallets.

Are my payment details secure?
Yes — all transactions are encrypted and processed through secure gateways.

Do you offer cash-on-delivery (COD)?
COD may be available depending on region. Check during checkout.

Shipping & Delivery

Where do you ship to?
We ship locally and internationally. Shipping options vary by location.

How long does delivery take?
Delivery typically takes 2–5 business days locally and 7–14 business days internationally.

How much does shipping cost?
Shipping fees vary by location and will be shown at checkout.

Can I track my order?
Yes — a tracking number will be provided once your order is shipped.

What if my order arrives late?
Contact our support team and we will assist in tracking or resolving delays.

Returns & Exchanges

What is your return policy?
Returns are accepted within 7–14 days of receiving the item, provided it’s unused and in original packaging.

How do I request a return or exchange?
Submit a request through our Returns page or contact customer support.

Do I have to pay for return shipping?
Return shipping fees depend on the reason for return.

How long does it take to process a refund?
Refunds typically take 5–10 business days once the returned item is approved.

Can I exchange sizes?
Yes — exchanges are allowed if the requested size is in stock.

Account & Membership

Do I need an account to shop?
No, but creating an account allows faster checkout and order tracking.

How do I create an account?
Click “Sign Up” and follow the steps to register.

Do you offer a membership or loyalty program?
Yes — earn points for every purchase and redeem them for discounts.

Promotions & Gift Cards

Do you offer discounts or promo codes?
Yes — follow our social pages and subscribe to our newsletters for exclusive offers.

Do you sell gift cards?
Yes — digital gift cards are available in various amounts.

Can I use multiple promo codes at once?
Typically, only one promo code can be applied per order.

Customer Support

How can I contact customer service?
You may reach us via email, live chat, or the contact form on our website.

What are your customer service hours?
Support is available Monday to Saturday during business hours.

What should I do if I receive a defective or wrong item?
Contact us immediately with photos and order details; we will arrange a replacement or refund.

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
