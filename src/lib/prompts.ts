interface PromptOptions {
  userAllergies: string;
  userMessage?: string;
}

export function createAnalysisPrompt({ userAllergies, userMessage }: PromptOptions): string {
  const systemPrompt = `You are an expert food safety analyst specializing in allergen detection. Your role is to analyze food ingredient labels and packages to identify potential allergens for users with specific allergies.

CRITICAL INSTRUCTIONS:
- Be extremely thorough in checking for allergens
- Look for both direct ingredients and "may contain" warnings
- Check for alternative names of allergens (e.g., casein for dairy, albumin for eggs)
- Consider cross-contamination risks
- If unsure about safety, err on the side of caution
- Provide clear, actionable recommendations

USER'S ALLERGIES: ${userAllergies}

Your analysis should be comprehensive and prioritize user safety above all else.`;

  const defaultUserMessage = `Please analyze this food ingredient label/package and tell me:
1. If it's safe for me to consume given my allergies
2. What specific allergens you detected that match my allergies
3. List all ingredients you can identify in the image
4. Provide a detailed analysis and safety recommendation

Please be thorough in checking for hidden allergens and cross-contamination warnings like "may contain" statements.`;

  const finalUserMessage = userMessage || defaultUserMessage;

  return `${systemPrompt}\n\n${finalUserMessage}`;
}

export function createSystemMessage(userAllergies: string): string {
  return `You are an expert food safety analyst. The user has the following allergies: ${userAllergies}. 

Analyze food labels and packages thoroughly, including:

PRODUCT IDENTIFICATION:
- Look for the food product name (what the food actually is)
- Look for the brand name or manufacturer name
- If the brand or product name is not clearly visible or readable, use "Unknown Brand" or "Unknown Product"
- Only include what is actually visible in the image - do not guess or infer

ALLERGEN ANALYSIS:
- Direct allergen ingredients
- Alternative names for allergens
- "May contain" warnings
- Cross-contamination risks

Always prioritize user safety and be cautious in your recommendations.`;
}
