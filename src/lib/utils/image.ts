export function isValidImageFile(file: File): boolean {
  return file.type.startsWith("image/");
}

export function convertFileToDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      resolve(result);
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

export function extractBase64Data(dataURL: string): string {
  return dataURL.replace(/^data:image\/[a-z]+;base64,/, "");
}