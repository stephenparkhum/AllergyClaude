import { generateObject } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';
import { createSystemMessage } from '@/lib/prompts';
import { extractBase64Data } from '@/lib/utils/image';

const resultSchema = z.object({
  safe: z.boolean().describe('Whether the food is safe for the user to consume'),
  food_name: z
    .string()
    .describe(
      'Name of the food product if visible in the image, or "Unknown Product" if not clearly visible'
    ),
  food_brand: z
    .string()
    .describe('Brand name if visible in the image, or "Unknown Brand" if not clearly visible'),
  detected_allergens: z
    .array(z.string())
    .describe("List of allergens found that match the user's allergies"),
  potential_allergens: z
    .array(z.string())
    .describe('List of ingredients that might contain allergens or are uncertain'),
  safe_ingredients: z
    .array(z.string())
    .describe("List of ingredients that are safe for the user's allergies"),
  warning_ingredients: z
    .array(z.string())
    .describe('List of ingredients that might be problematic or uncertain'),
  unsafe_ingredients: z
    .array(z.string())
    .describe("List of ingredients that are definitely unsafe for the user's allergies"),
  ingredients: z.array(z.string()).describe('List of all ingredients detected in the image'),
  analysis: z.string().describe('Brief explanation of the analysis and recommendations'),
});

export async function POST(request: Request) {
  try {
    const { image, allergies } = await request.json();

    if (!image || !allergies) {
      return Response.json({ error: 'Image and allergies are required' }, { status: 400 });
    }

    const base64Data = extractBase64Data(image);

    const result = await generateObject({
      model: google('gemini-1.5-pro-latest'),
      schema: resultSchema,
      system: createSystemMessage(allergies),
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `Please analyze this food ingredient label/package and tell me:

PRODUCT IDENTIFICATION:
1. What is the name of the food product? (food_name) - If not clearly visible, use "Unknown Product"
2. What is the brand name? (food_brand) - If not clearly visible, use "Unknown Brand"

SAFETY ANALYSIS:
3. If it's safe for me to consume given my specific allergies
4. What allergens you detected that match my allergies (detected_allergens)
5. What ingredients might potentially contain allergens or are uncertain (potential_allergens) - these could include unclear ingredients, "may contain" warnings, or ingredients that could be derived from allergens
6. Categorize ALL ingredients into safety levels:
   - safe_ingredients: Ingredients that are completely safe for the user's allergies
   - warning_ingredients: Ingredients that might be problematic, uncertain, or have "may contain" warnings
   - unsafe_ingredients: Ingredients that definitely contain the user's allergens
7. List all ingredients you can identify in the image (ingredients)
8. Provide a detailed analysis and safety recommendation

Please be thorough in checking for hidden allergens and cross-contamination warnings like "may contain" statements. Make sure every ingredient is categorized into one of the three safety levels. Only include product name and brand information that is actually visible and readable in the image.`,
            },
            {
              type: 'image',
              image: base64Data,
            },
          ],
        },
      ],
    });

    return Response.json(result.object);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error analyzing image:', error);
    return Response.json({ error: 'Failed to analyze image' }, { status: 500 });
  }
}
