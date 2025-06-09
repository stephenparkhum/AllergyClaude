export interface HowToStep {
  id: number;
  title: string;
  description: string;
  example?: string;
  details?: string;
}

export interface PhotoTip {
  type: 'good' | 'avoid';
  title: string;
  items: string[];
}

export interface UseCase {
  title: string;
  description: string;
}

export interface Tip {
  icon: string;
  title: string;
  description: string;
}

export interface HowToData {
  pageTitle: string;
  pageSubtitle: string;
  safetyNotice: {
    title: string;
    description: string;
  };
  steps: HowToStep[];
  photoTips: PhotoTip[];
  goodUseCases: UseCase[];
  limitations: UseCase[];
  tips: Tip[];
  callToAction: {
    title: string;
    description: string;
    buttonText: string;
  };
}

export const howToData: HowToData = {
  pageTitle: "How to Use Allergy Agents",
  pageSubtitle: "Learn how to quickly and safely analyze food ingredients for allergens using our AI-powered tool.",
  
  safetyNotice: {
    title: "Important Safety Notice",
    description: "This tool is designed to assist with ingredient analysis but should NEVER be your only method of checking food safety. Always read ingredient labels carefully yourself and consult healthcare providers for medical advice."
  },

  steps: [
    {
      id: 1,
      title: "List Your Allergies",
      description: "Enter all your known allergies in the text area. Be specific and include all forms (e.g., \"milk, dairy, lactose\").",
      example: "peanuts, tree nuts, shellfish, dairy, eggs, soy"
    },
    {
      id: 2,
      title: "Take a Clear Photo",
      description: "Photograph the ingredient list on the food package. Ensure the text is clear and readable."
    },
    {
      id: 3,
      title: "Upload and Analyze",
      description: "Upload your photo and click \"Analyze\" to get instant allergy detection results.",
      details: "The AI will scan the ingredients and cross-reference them with your allergies, including hidden allergens and \"may contain\" warnings."
    }
  ],

  photoTips: [
    {
      type: 'good',
      title: "Good Photos",
      items: [
        "Clear, focused ingredient list",
        "Good lighting",
        "Text is readable",
        "Full ingredients panel visible"
      ]
    },
    {
      type: 'avoid',
      title: "Avoid",
      items: [
        "Blurry or out-of-focus images",
        "Poor lighting/shadows",
        "Partial ingredient lists",
        "Reflective surfaces/glare"
      ]
    }
  ],

  goodUseCases: [
    {
      title: "Packaged Foods",
      description: "Snacks, cereals, canned goods, frozen meals with clear ingredient labels"
    },
    {
      title: "Ingredient Verification",
      description: "Double-checking ingredient lists for hidden allergens or alternative names"
    },
    {
      title: "New Products",
      description: "Trying new foods or brands when you're unsure about their safety"
    },
    {
      title: "Travel & Shopping",
      description: "Quick checks while grocery shopping or when traveling abroad"
    },
    {
      title: "Education",
      description: "Learning about hidden allergens and alternative ingredient names"
    },
    {
      title: "Family Safety",
      description: "Helping family members or caregivers check food safety"
    }
  ],

  limitations: [
    {
      title: "Emergency Situations",
      description: "Never rely solely on this app during allergic reactions. Seek immediate medical help."
    },
    {
      title: "Restaurant Meals",
      description: "Cannot analyze prepared foods, restaurant dishes, or foods without ingredient labels"
    },
    {
      title: "Severe Allergies",
      description: "Always verify ingredients manually if you have life-threatening allergies"
    },
    {
      title: "Cross-Contamination",
      description: "Cannot detect facility cross-contamination beyond what's listed on labels"
    },
    {
      title: "Unclear Images",
      description: "Results may be inaccurate with blurry, partial, or poor-quality images"
    },
    {
      title: "Sole Decision Making",
      description: "Always double-check results and consult healthcare providers for medical advice"
    }
  ],

  tips: [
    {
      icon: "Camera",
      title: "Photo Quality",
      description: "Use good lighting and ensure ingredients text is clear and in focus"
    },
    {
      icon: "FileImage",
      title: "Complete Labels",
      description: "Capture the entire ingredient list including \"may contain\" warnings"
    },
    {
      icon: "Eye",
      title: "Verify Results",
      description: "Always double-check the analysis with your own reading of the label"
    }
  ],

  callToAction: {
    title: "Ready to Get Started?",
    description: "Now that you know how to use Allergy Agents safely and effectively, head back to the main page to start analyzing your food for allergens.",
    buttonText: "Start Analyzing Food"
  }
};