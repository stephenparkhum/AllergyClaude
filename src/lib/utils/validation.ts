export function validateAllergies(allergies: string): boolean {
  return allergies.trim().length > 0;
}

export function validateImageData(imageData: string | null): boolean {
  return imageData !== null && imageData.length > 0;
}

export function validateAnalysisRequest(
  imageData: string | null,
  allergies: string
): {
  isValid: boolean;
  error?: string;
} {
  if (!validateImageData(imageData)) {
    return { isValid: false, error: 'Please upload an image' };
  }

  if (!validateAllergies(allergies)) {
    return { isValid: false, error: 'Please enter your allergies' };
  }

  return { isValid: true };
}
